import {
  CreateFullUserInput,
  CreatePartialUserInput,
  CreatePatientInput,
  RequestOTPInput,
  VerifyOTPInput,
} from "@/types/auth";
import api from "./axios";
import { Verify } from "crypto";

export const findUser = async (data: string) => {
  try {
    const response = await api.get(`api/auth/find?contact=${data}`);
    console.log("findUser response:", response.data.user);
    return response.data.user;
  } catch (error) {
    console.error("Error finding user:", (error as any).message);
    throw error;
  }
};

export const createPartialUser = async (data: CreatePartialUserInput) => {
  try {
    const response = await api.post("/auth/create-partial", data);
    console.log("createPartialUser response:", response.data);
    return response.data.user;
  } catch (error) {
    console.error(
      "Error creating partial user:",
      (error as any).response?.data || (error as any).message
    );
    throw error;
  }
};

export const createFullUser = async (data: CreateFullUserInput) => {
  try {
    const response = await api.post("/auth/create-full", data);
    console.log("createFullUser response:", response.data);
    return response.data.user;
  } catch (error) {
    console.error(
      "Error creating full user:",
      (error as any).response?.data || (error as any).message
    );
    throw error;
  }
};

export const requestOtp = async (data: RequestOTPInput) => {
  console.log("=== requestOtp API called ===");
  console.log("Request payload:", JSON.stringify(data, null, 2));
  console.log("API base URL:", api.defaults.baseURL);
  try {
    const response = await api.post("/auth/otp/request", data);
    console.log("requestOtp SUCCESS response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("requestOtp FAILED:");
    console.error("- Status:", error.response?.status);
    console.error("- Data:", error.response?.data);
    console.error("- Message:", error.message);
    throw error;
  }
};

export const verifyOtp = async (data: VerifyOTPInput) => {
  try {
    const response = await api.post("/auth/otp/verify", data);
    console.log("verifyOtp response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error verifying OTP:",
      (error as any).response?.data || (error as any).message
    );
    throw error;
  }
};

export const createPatient = async (data: CreatePatientInput) => {
  try {
    const response = await api.post("/patient/create", data);
    console.log("createPatient response:", response.data);
    return response.data.patient;
  } catch (error) {
    console.error(
      "Error creating patient:",
      (error as any).response?.data || (error as any).message
    );
    throw error;
  }
};

// ------------ find user test -------------
// export const testAuth = () => {
//     console.log('Testing createPartialUser...')
//     findUser('1234567890')
// }

// ------------ create full user test -------------
// export const testAuth = () => {
//     console.log('Testing createFullUser...')
//     createFullUser({
//         userId: '694c7c9077fef35964ce275a',
//         contact: '1234567890',
//         fullName: 'John Doe',
//         birthdate: '1990-01-01',
//         gender: 'Male',
//         email: 'johndoe@example.com',
//         phone: '1234567890',
//         identifier: 'A1234567',
//         identifierType: 'Passport',
//         address: '123 Main St',
//         city: 'Metropolis',
//         maritalStatus: 'Single',
//         nationality: 'Countryland',
//         speakingLanguages: ['English', 'Spanish'],
//         guardianInformation: {
//             guardianName: 'Jane Doe',
//             guardianEmail: 'janedoe@example.com',
//             guardianPhone: '0987654321',
//             guardianBloodType: 'O+',
//             guardianRelation: 'Mother',
//             guardianIdentifier: 'B7654321',
//             guardianIdentifierType: 'Driver License',
//             patientCategory: 'Adult'
//         }
//     })
// }

// ------------ create partial user test -------

// export const testAuth = () => {
//     console.log('Testing createPartialUser...')
//     createPartialUser({
//         fullName: 'John Doe',
//         gender: 'Male',
//         contact: '1234567890',
//         birthdate: '1990-01-01'
//     })
// }

// ------------ request OTP test -------------
// export const testAuth = () => {
//     console.log('Testing requestOtp...')
//     requestOtp({
//         subjectRef: "694c7c9077fef35964ce275a",
//         subjectType: "register",
//         contact: "aywork73@gmail.com"
//     })
// }

// ------------ verify OTP test -------------
// export const testAuth = () => {
//     console.log('Testing verifyOtp...')
//     verifyOtp({
//         otpToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0VHlwZSI6InJlZ2lzdGVyIiwic3ViamVjdFJlZiI6IjY5NGM3YzkwNzdmZWYzNTk2NGNlMjc1YSIsImlhdCI6MTc2NjYyNTkyNywiZXhwIjoxNzY2NjI2NTI3fQ.7BkY3Zw6g_Y2UJ2ej3EPuoGcTVLvY4nn6CufjwzUHnI",
//         code: "400022"
//     })
// }

// ------------ create patient test -------------
// export const testAuth = () => {
//     console.log('Testing createPatient...')
//     createPatient('694c7c9077fef35964ce275a', {
//         medicalRecordNumber: 'MRN789012',
//         insuranceId: 'INS345678',
//         bloodGroup: 'A+',
//         allergies: ['Peanuts', 'Penicillin'],
//         medicalHistory: ['Asthma', 'High blood pressure'],
//         injuryDetails: {
//             affectedArea: 'Left Arm',
//             startDate: '2023-01-15',
//             receivedTreatment: true,
//             painSeverity: 5
//         }
//     })
// }
