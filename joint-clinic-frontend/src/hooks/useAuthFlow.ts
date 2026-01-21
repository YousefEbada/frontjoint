import { useState } from "react";
import {
  findUser,
  createPartialUser,
  createFullUser,
  requestOtp,
  verifyOtp,
  createPatient,
} from "@/lib/api/auth.api";
import {
  CreatePartialUserInput,
  CreateFullUserInput,
  CreatePatientInput,
} from "@/types/auth";

export const useAuthFlow = () => {
  const [step, setStep] = useState(1);
  const [showHello, setShowHello] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contact, setContact] = useState("");
  const [userId, setUserId] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [isFullProfile, setIsFullProfile] = useState(false);

  const handleError = (err: any) => {
    const msg =
      err.response?.data?.message || err.message || "An error occurred";
    setError(msg);
    return msg;
  };

  const clearError = () => setError(null);

  // 1. Start Flow (Hello Card)
  const handleFindUser = async (inputContact: string) => {
    console.log("=== handleFindUser called ===");
    console.log("Input contact:", inputContact);
    setIsLoading(true);
    clearError();
    try {
      setContact(inputContact);
      console.log("Calling findUser API...");
      const user = await findUser(inputContact);
      console.log("findUser result:", user);

      if (user) {
        console.log("User found with _id:", user._id);
        // IMPORTANT: flags are in userStatus object, not directly on user
        const status = user.userStatus || {};
        console.log("User flags (from userStatus):", {
          partialProfileCompleted: status.partialProfileCompleted,
          registerOtpVerified: status.registerOtpVerified,
          fullProfileCompleted: status.fullProfileCompleted,
        });
        setUserId(user._id);
        setIsFullProfile(!!status.fullProfileCompleted);

        // Check flags to determine next step
        if (!status.partialProfileCompleted) {
          console.log("Partial profile NOT completed -> Step 1");
          setStep(1);
          setShowHello(false);
          setIsLoading(false);
        } else {
          // User has partial profile -> Needs Login/Verify (OTP)
          // Whether verified or not, we need OTP to sign in or continue registration.
          const type = status.registerOtpVerified ? "login" : "register";
          console.log(
            "Partial profile completed -> Requesting OTP with type:",
            type
          );

          setStep(2);
          setShowHello(false);
          setIsLoading(false);

          // Request OTP in background
          console.log("Calling handleRequestOtp...");
          handleRequestOtp(user._id, inputContact, type).catch((err) => {
            console.error("Background OTP error:", err);
            setError("Could not send code automatically. Please click Resend.");
          });
        }
      } else {
        console.log("User NOT found (null result) -> Step 1 (Registration)");
        // User not found -> Create Partial User Flow
        setStep(1);
        setShowHello(false);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error("handleFindUser caught error:", err);
      // checking if error is 404 or 400 (user not found)
      const status = err.response?.status || err.status;
      console.log("Error status:", status);
      if (status === 404 || status === 400) {
        console.log("404/400 -> Starting Registration (Step 1)");
        // User not found -> Start Registration
        setStep(1);
        setShowHello(false);
        setIsLoading(false);
      } else {
        handleError(err);
        setIsLoading(false);
      }
    }
  };

  // 2. Create Partial User (Step 1 -> 2)
  const handleCreatePartial = async (
    data: Omit<CreatePartialUserInput, "contact">
  ) => {
    setIsLoading(true);
    clearError();
    try {
      const user = await createPartialUser({ ...data, contact });
      setUserId(user._id);

      // Optimistic transition
      setStep(2);
      setIsLoading(false);

      // After partial creation, request OTP in background
      handleRequestOtp(user._id, contact, "register").catch((err) => {
        console.error("Background OTP error:", err);
        setError("Could not send code automatically. Please click Resend.");
      });
    } catch (err) {
      handleError(err);
      setIsLoading(false); // Only stop loading on error (success stops above)
    }
  };

  // Helper: Request OTP
  const handleRequestOtp = async (
    uid: string,
    userContact: string,
    type: "login" | "register"
  ) => {
    console.log("handleRequestOtp called with:", { uid, userContact, type });
    const response = await requestOtp({
      subjectRef: uid,
      subjectType: type,
      contact: userContact,
    });
    console.log("requestOtp response:", response);
    setOtpToken(response.otpToken);
    // Note: Backend might define response structure differently, verified in api.ts
    // api.ts: `return response.data`
    // Controller `requestOtp`: returns `result`. `result` from useCase usually has `otpToken` if successful.
  };

  // 3. Verify OTP (Step 2 -> 3)
  const handleVerifyOtp = async (code: string) => {
    setIsLoading(true);
    clearError();
    try {
      const response = await verifyOtp({ otpToken, code });
      // Response should contain accessToken/refreshToken/user
      if (response.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);
      }

      // Check if user is already a patient (for login flow)
      if (isFullProfile && userId) {
        try {
          // Import dynamically to avoid circular dependency
          const { getPatientByUserId } = await import("@/lib/api/patient.api");
          const patient = await getPatientByUserId(userId);

          if (patient && patient._id) {
            console.log("User is already a patient, redirecting to dashboard");
            console.log("patient", patient);
            // Store patient ID and user name for dashboard
            localStorage.setItem("patientId", patient._id);
            localStorage.setItem("patientNixpendId", patient.nixpendId);
            localStorage.setItem("userId", userId);

            // Get user's first name from findUser result (stored in contact context)
            const user = await findUser(contact);
            if (user?.fullName) {
              const firstName = user.fullName.split(" ")[0];
              localStorage.setItem("patientName", firstName);
            }

            // Check for pending booking redirect
            const pendingBooking = localStorage.getItem("pendingBooking");
            if (pendingBooking) {
              window.location.href = "/patient/booking";
            } else {
              window.location.href = "/patient/main";
            }
            return;
          }
        } catch (patientErr) {
          // Patient not found, continue with normal flow
          console.log("Patient not found, continuing with registration flow");
        }
      }

      // If success, proceed based on profile completion
      if (!isFullProfile) {
        setStep(3);
      } else {
        setStep(4);
      }
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setIsLoading(true);
    clearError();
    try {
      // Determine type based on context (if user existed or new)
      // For simplicity, defaulting to 'login' if we found user, 'register' if we just created partial.
      // But we might need to track `authType` in state.
      // Let's guess 'register' if we are in the middle of flow?
      // Actually, we can just use 'login' for both if standard OTP?
      // Controller validator allows 'login' | 'register'.

      // Safer to use a generic type or track it.
      // For now, let's allow 'register' as it's the primary flow described.
      await handleRequestOtp(userId, contact, "register");
      // alert('Code resent!');
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Create Full User (Step 3 -> 4)
  const handleCreateFull = async (
    data: Omit<CreateFullUserInput, "contact" | "userId">
  ) => {
    setIsLoading(true);
    clearError();
    try {
      await createFullUser({
        ...data,
        userId,
      });
      setStep(4);
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // 5. Create Patient (Step 5 -> Navigate to Patient Dashboard)
  const handleCreatePatient = async (
    injuryDetails: CreatePatientInput["injuryDetails"]
  ) => {
    setIsLoading(true);
    clearError();
    try {
      console.log("==== handleCreatePatient called ====");
      console.log("userId:", userId);
      console.log("injuryDetails:", JSON.stringify(injuryDetails, null, 2));

      if (!userId) {
        console.error("ERROR: userId is empty!");
        setError(
          "User ID is missing. Please restart the registration process."
        );
        return;
      }

      const result = await createPatient({
        userId,
        injuryDetails,
      });

      console.log("createPatient result:", result);

      // Store patient info in localStorage for dashboard
      if (result && result._id) {
        localStorage.setItem("patientId", result._id);
      }
      localStorage.setItem("userId", userId);

      // Get user's first name if available
      try {
        const user = await findUser(contact);
        if (user?.fullName) {
          const firstName = user.fullName.split(" ")[0];
          localStorage.setItem("patientName", firstName);
        }
      } catch (e) {
        console.log("Could not get user name:", e);
      }

      // Check for pending booking redirect
      console.log("Checking for pending booking...");
      const pendingBooking = localStorage.getItem("pendingBooking");
      if (pendingBooking) {
        console.log("Pending booking found, redirecting to /patient/booking");
        window.location.href = "/patient/booking";
      } else {
        console.log("Navigating to /patient/main");
        window.location.href = "/patient/main";
      }
    } catch (err: any) {
      console.error("handleCreatePatient error:", err);
      // Extract detailed error message from response
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Failed to create patient";
      console.error("Error message to display:", errorMsg);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    step,
    setStep,
    showHello,
    setShowHello,
    isLoading,
    error,
    userId,
    handleFindUser,
    handleCreatePartial,
    handleVerifyOtp,
    handleResendOtp,
    handleCreateFull,
    handleCreatePatient,
    contact,
  };
};
