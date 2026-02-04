"use client";
import CorneredBoxes from '@/components/atoms/CorneredBoxes'

import Logo from '@/components/atoms/icons/Logo'
import "./style.css"
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence, Variants } from "framer-motion"
import JointMarker from '@/components/molecules/JointMarker';
import InjuryDetailsForm from '@/components/organisms/InjuryDetailsForm';
import PaginationDots from '@/components/atoms/paginationlog';
import CustomDropdown from '@/components/molecules/dropdown';
import HelloCard from '@/components/organisms/helloCard';
// import HelloCard from '@/components/organisms/HelloCard';
// import DropDown from '@/components/molecules/Dropdown';
import Typography from '@/components/atoms/Typography';
import { useAuthFlow } from '@/hooks/useAuthFlow';
import { CreatePartialUserInput, CreateFullUserInput } from '@/types/auth';
import { Country, State } from 'country-state-city';
import { isValidEmail, isValidSaudiPhone, isValidSaudiID } from '@/lib/utils/validators';
// dssd
// sdsd
// Mock Data for Joints
const JOINTS = {
  front: [
    { id: 'neck', x: 50, y: 25, label: 'Neck', side: 'right' },
    { id: 'r_shoulder', x: 35, y: 30, label: 'Right Shoulder', side: 'left' },
    { id: 'l_shoulder', x: 65, y: 30, label: 'Left Shoulder', side: 'right' },
    { id: 'r_elbow', x: 33, y: 38, label: 'Right Elbow', side: 'left' },
    { id: 'l_elbow', x: 67, y: 38, label: 'Left Elbow', side: 'right' },
    { id: 'r_wrist', x: 20, y: 48, label: 'Right Wrist', side: 'left' },
    { id: 'l_wrist', x: 80, y: 48, label: 'Left Wrist', side: 'right' },
    { id: 'r_knee', x: 44, y: 72, label: 'Right Knee', side: 'left' },
    { id: 'l_knee', x: 56, y: 72, label: 'Left Knee', side: 'right' },
    { id: 'r_ankle', x: 45, y: 95, label: 'Right Ankle', side: 'left' },
    { id: 'l_ankle', x: 55, y: 95, label: 'Left Ankle', side: 'right' },
  ],
  back: [
    { id: 'neck', x: 50, y: 25, label: 'Neck', side: 'right' },
    { id: 'upper_back', x: 50, y: 32, label: 'Upper Back', side: 'right' },
    { id: 'lower_back', x: 50, y: 45, label: 'Lower Back', side: 'right' },
    { id: 'r_shoulder_back', x: 65, y: 30, label: 'Right Shoulder', side: 'right' },
    { id: 'l_shoulder_back', x: 35, y: 30, label: 'Left Shoulder', side: 'left' },
    { id: 'r_elbow_back', x: 67, y: 38, label: 'Right Elbow', side: 'right' },
    { id: 'l_elbow_back', x: 33, y: 38, label: 'Left Elbow', side: 'left' },
    { id: 'r_wrist_back', x: 80, y: 48, label: 'Right Wrist', side: 'right' },
    { id: 'l_wrist_back', x: 20, y: 48, label: 'Left Wrist', side: 'left' },
    { id: 'r_knee_back', x: 56, y: 72, label: 'Right Knee', side: 'right' },
    { id: 'l_knee_back', x: 44, y: 72, label: 'Left Knee', side: 'left' },
    { id: 'r_ankle_back', x: 55, y: 95, label: 'Right Ankle', side: 'right' },
    { id: 'l_ankle_back', x: 45, y: 95, label: 'Left Ankle', side: 'left' },
  ]
} as const;




const Page = () => {

  const {
    step,
    setStep,
    showHello,
    handleFindUser,
    handleCreatePartial,
    handleVerifyOtp,
    handleResendOtp,
    handleCreateFull,
    handleCreatePatient,
    userId,
    isLoading,
    error,
    contact
  } = useAuthFlow();

  // Local Form States
  const [partialData, setPartialData] = React.useState<Omit<CreatePartialUserInput, 'contact'>>({
    fullName: '',
    birthdate: '',
    gender: 'Male' // default
  });

  const [otpCode, setOtpCode] = React.useState('');
  const [resendCountdown, setResendCountdown] = React.useState(0);
  // Countdown timer effect for resend OTP
  React.useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const handleResendWithCooldown = () => {
    if (resendCountdown > 0) return;
    handleResendOtp();
    setResendCountdown(30);
  };

  const [fullData, setFullData] = React.useState<Omit<CreateFullUserInput, 'contact' | 'userId'>>({
    email: '',
    phone: '',
    identifier: '',
    identifierType: 'National ID',
    nationality: 'Saudi Arabia',
    city: 'Riyadh',
    address: '',
    maritalStatus: 'Single',
    speakingLanguages: ['Arabic'],
    guardianInformation: {
      guardianName: '',
      guardianPhone: '',
      guardianIdentifier: '',
      guardianEmail: '',
      guardianBloodType: '',
      patientCategory: '',
    } // initialize properly
  });

  const [view, setView] = React.useState<'front' | 'back'>('front');
  const [selectedJoint, setSelectedJoint] = React.useState<string | null>(null);
  const [showInjuryForm, setShowInjuryForm] = React.useState(false); // maybe unused now?

  // Injury Details State
  const [injuryDetails, setInjuryDetails] = React.useState({
    affectedArea: '',
    startDate: undefined as Date | undefined,
    receivedTreatment: false,
    painSeverity: 5,
    howDidInjurHappened: '',
    painOccasionalOrConstant: 'occasional' as 'occasional' | 'constant',
    affectDailyActivities: false,
    additionalNotes: '',
    medicalReports: [] as string[]
  });

  // Max date for birthdate (5 years ago)
  const maxDateString = React.useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 5);
    return d.toISOString().split('T')[0];
  }, []);

  // Country-City dynamic data
  const countries = React.useMemo(() => Country.getAllCountries(), []);
  const countryNames = React.useMemo(() => countries.map(c => c.name), [countries]);

  const selectedCountry = React.useMemo(() =>
    countries.find(c => c.name === fullData.nationality),
    [countries, fullData.nationality]
  );

  const cities = React.useMemo(() =>
    selectedCountry ? State.getStatesOfCountry(selectedCountry.isoCode) || [] : [],
    [selectedCountry]
  );
  const cityNames = React.useMemo(() => cities.map(c => c.name), [cities]);

  // Reset city when country changes and current city is not in new country
  React.useEffect(() => {
    if (cityNames.length > 0 && (!fullData.city || !cityNames.includes(fullData.city))) {
      setFullData(prev => ({ ...prev, city: cityNames[0] }));
    }
  }, [cityNames, fullData.city]);

  // Pre-fill phone or email from contact when entering step 3
  React.useEffect(() => {
    if (contact && step === 3) {
      // Check if contact looks like a phone number (starts with + or digit)
      const isPhone = /^[\+]?[0-9]/.test(contact);
      if (isPhone && !fullData.phone) {
        setFullData(prev => ({ ...prev, phone: contact }));
      } else if (!isPhone && !fullData.email) {
        setFullData(prev => ({ ...prev, email: contact }));
      }
    }
  }, [contact, step]);

  // Handlers
  const onPartialSubmit = () => {
    if (!partialData.fullName || !partialData.birthdate) {
      alert("Please fill all fields");
      return;
    }

    // Validation: Check if full name has at least 2 words
    const nameParts = partialData.fullName.trim().split(/\s+/);
    if (nameParts.length < 2) {
      alert("Invalid full name. Please enter your full name (First and Last name).");
      return;
    }

    handleCreatePartial(partialData);
  };

  const onOtpSubmit = () => {
    if (otpCode.length < 4) { // usually 6
      alert("Please enter valid code");
      return;
    }
    handleVerifyOtp(otpCode);
  };

  // Import validators (assuming auto-import or manual add at top, verify imports)
  // Since I can't see the top imports in this chunk, I will rely on the user to have imports or I should add them.
  // Wait, I should add imports at the top first? The tool `replace_file_content` works on contiguous blocks.
  // I will add the validation logic here, and then I might need another call for imports if the environment doesn't auto-handle it.
  // Actually, I can use `multi_replace` to add imports and change this function in one go, but I'll stick to one change per tool for safety or just assume I need to add imports.
  // Let's assume I need to add imports. I'll do that in a separate step or `multi_replace`.
  // For now let's just replace the function logic.

  const onFullSubmit = () => {
    // 1. Check for Empty fields (Basic Required Check)
    const {
      email,
      identifier,
      nationality,
      city,
      phone,
      address,
      identifierType,
      maritalStatus,
      speakingLanguages
    } = fullData;

    if (
      !email ||
      !identifier ||
      !nationality ||
      !city ||
      !phone ||
      !address ||
      !identifierType ||
      !maritalStatus ||
      !speakingLanguages ||
      speakingLanguages.length === 0
    ) {
      alert("Invalid. Please complete all personal information.");
      return;
    }

    // 2. Strict Validations using validators
    // We need to import these functions. I will add them to the file imports in a separate 'multi_replace' or just assume I can add them later? 
    // It's better to use variables helper here if imports aren't available yet, but I created the file.
    // I will assume I will add imports in the next step or use dynamic import? No, standard import is better.
    // Let's implement logic assuming `isValidEmail` etc are available.

    if (!isValidEmail(email)) {
      alert("Invalid Email Address");
      return;
    }

    if (!isValidSaudiPhone(phone)) {
      alert("Invalid Phone. Must start with 966 and be 12 digits (e.g. 9665XXXXXXXX).");
      return;
    }

    if (!isValidSaudiID(identifier, identifierType)) {
      if (identifierType === 'National ID') alert("Invalid National ID. Must be at least 9 digits.");
      else if (identifierType === 'Iqama') alert("Invalid Iqama ID. Must be 10 digits and start with 2.");
      else alert("Invalid ID format.");
      return;
    }

    // 3. Guardian Validation (Only if any guardian field is filled)
    const g = fullData.guardianInformation;
    if (
      g?.guardianName ||
      g?.guardianPhone ||
      g?.guardianIdentifier ||
      g?.guardianEmail ||
      g?.guardianBloodType ||
      g?.patientCategory
    ) {
      // If ANY field is filled, enforce stricter checks or at least valid formats for provided ones?
      // User said "Guardian Information is not required", but "if entered... invalid values should be blocked".
      // "All the fields... missing validations... Same in the guardian’s data"

      if (g.guardianEmail && !isValidEmail(g.guardianEmail)) {
        alert("Invalid Guardian Email");
        return;
      }
      if (g.guardianPhone && !isValidSaudiPhone(g.guardianPhone)) {
        alert("Invalid Guardian Phone. Must start with 966.");
        return;
      }
      // Guardian ID usually defaults to National ID check if not specified type? 
      // The guardian form has "Guardian's NID or Iqama ID" but NO dropdown for type.
      // Usually we check if it starts with 1 or 2 and validates length?
      // Let's perform generic 10-digit check or infer type.
      if (g.guardianIdentifier) {
        // Simple check: Must be at least 9 digits
        if (!/^\d{9,}$/.test(g.guardianIdentifier)) {
          alert("Invalid Guardian ID. Must be at least 9 digits.");
          return;
        }
      }
    }

    handleCreateFull(fullData);
  }


  /* 
   * Dynamic Zoom Origin Calculation
   * ===============================
   * User Requirement: 
   * 1. Left Joint -> Appears on Left Side (Anchor Right so Left expands?) -> No, "Appears on Left" means we want to see the Left side.
   *    If we are zoomed in, we need to shift the view to the Left. 
   *    CSS transform-origin works by pinning a point. 
   *    - To see the LEFT side, we should pin the LEFT side (origin-left) or Top-Left. 
   *      Reason: Pinning (0,0) ensures the top-left content stays at (0,0) and grows outwards. 
   *      If we pinned Center, the Left content would move further Left, potentially out of view.
   * 
   * 2. Vertical: "Third quarter of the upper half".
   *    - Upper half = 0-50%. Third quarter of that is approx 30-40%.
   *    - origin-top keeps top fixed. Point at y=30% moves to 30% * 2.5 = 75%. Too low.
   *    - We want the FINAL position to be comfortable.
   *    Let's stick to a robust Quadrant system:
   *    - Top-Left Joint -> origin-top-left
   *    - Top-Right Joint -> origin-top-right
   *    - Bottom-Left -> origin-bottom-left
   *    - Bottom-Right -> origin-bottom-right
   *    - Center -> origin-center
   */
  const zoomOrigin = React.useMemo(() => {
    if (!selectedJoint) return 'origin-center';

    const joint = [...JOINTS.front, ...JOINTS.back].find(j => j.id === selectedJoint);
    if (!joint) return 'origin-center';

    let vOrigin = 'center';
    let hOrigin = 'center';

    // Vertical Logic (y < 40: Top, y > 60: Bottom, else Center)
    if (joint.y < 40) vOrigin = 'top';
    else if (joint.y > 60) vOrigin = 'bottom';

    // Horizontal Logic (x < 45: Left, x > 55: Right)
    // Note: In SVG, x=0 is Left, x=100 is Right.
    if (joint.x < 45) hOrigin = 'left';
    else if (joint.x > 55) hOrigin = 'right';

    // Construct Tailwind class
    if (vOrigin === 'center' && hOrigin === 'center') return 'origin-center';

    // Tailwind explicit mappings for all combinations
    if (vOrigin === 'top' && hOrigin === 'left') return 'origin-top-left';
    if (vOrigin === 'top' && hOrigin === 'right') return 'origin-top-right';
    if (vOrigin === 'top' && hOrigin === 'center') return 'origin-top';

    if (vOrigin === 'bottom' && hOrigin === 'left') return 'origin-bottom-left';
    if (vOrigin === 'bottom' && hOrigin === 'right') return 'origin-bottom-right';
    if (vOrigin === 'bottom' && hOrigin === 'center') return 'origin-bottom';

    if (vOrigin === 'center' && hOrigin === 'left') return 'origin-left';
    if (vOrigin === 'center' && hOrigin === 'right') return 'origin-right';

    return 'origin-center';
  }, [selectedJoint]);

  // ... (existing state)

  // ... inside render ...

  // Find the selected joint label
  // ... inside render ...

  // Find the selected joint label
  const activeJointLabel = [...JOINTS.front, ...JOINTS.back].find(j => j.id === selectedJoint)?.label || '';


  // ...



  const pageAnim: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: .6, ease: "easeOut" } },
    exit: { opacity: 0, y: -40, transition: { duration: .4 } }
  };

  return (
    <main
      className="w-full min-h-screen relative bg-cover bg-center flex items-center justify-start overflow-y-auto"
      style={{ backgroundImage: step >= 4 ? "none" : "url('./loginbg.png')" }}
    >
      <div className="w-full h-full flex items-center justify-start">
        <AnimatePresence mode="wait">
          {showHello && (
            <motion.div
              key="hello"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full h-full flex items-center justify-start"
            >
              <HelloCard
                isLoading={isLoading}
                error={error}
                onGo={(contact) => {
                  handleFindUser(contact);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {!showHello && (
          step === 4 ? (
            // STEP 4: Full Screen Layout
            <div className="fixed top-0 left-0 w-screen h-screen z-[100] grid grid-cols-1 md:grid-cols-2 items-center justify-center overflow-y-auto bg-[#d5ece3] p-4 md:p-0">
              {/* Independent Logo & Pagination for Step 4 */}
              <Logo fill="#112a4d" className="w-[80px] md:w-[150px] h-[80px] md:h-[150px] absolute top-[10px] right-[20px] md:right-[40px] z-[101]" />
              <div className="page4-pagination absolute top-[10%] left-1/2 -translate-x-1/2 z-[101] hidden md:block">
                <PaginationDots total={4} activeIndex={3} className="mb-0" />
              </div>

              <div className="w-full h-full flex items-center justify-between relative z-10 md:col-span-2">
                <motion.div
                  key="p4"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="page4 w-full min-h-full flex items-center justify-between lg:px-[15%] relative gap-8"
                >
                  {/* Left Section - Text & Globe */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5, duration: 1.2 }}
                    className="page4-text flex flex-col items-center md:items-start gap-4 max-w-[500px] z-30 text-center md:text-left order-2 md:order-1"
                  >
                    {/* Globe Icon */}
                    <div className="page4-planet w-16 h-16 mb-4 hidden md:block">
                      <img src={require('@/assets/figures/red-striped-ball.svg').default.src} alt="Globe" className="w-full h-full animate-spin-slow" />
                    </div>

                    <Typography
                      variant="heading2"
                      className='text-[#0a1c32] font-bold leading-tight'
                      text="Tell us more about your injury."
                    />

                    <Typography
                      variant="bodyRegular"
                      className='text-[#0a1c32] opacity-80 leading-relaxed'
                      text="This will help your physiotherapist understand your condition better and prepare the right treatment plan."
                    />

                    <div className='flex flex-col gap-2'>
                      <Typography
                        variant="bodyRegular"
                        className='text-[#0a1c32] opacity-70'
                        text="Click on the area of your body where you’re experiencing pain or discomfort."
                      />
                      <Typography
                        variant="bodyRegular"
                        className='text-[#0a1c32] opacity-70'
                        text="Once selected, a short form will appear to help us understand your injury in more detail."
                      />
                    </div>

                    <button
                      onClick={() => {
                        if (selectedJoint) {
                          setStep(5);
                        } else {
                          // Allow skipping: Create patient with empty injury details
                          handleCreatePatient({});
                        }
                      }}
                      className={`mt-6 px-8 py-3 cursor-pointer rounded-full font-semibold transition-colors bg-[#ea392f] text-white hover:bg-[#d63228]`}
                    >
                      Confirm
                    </button>
                  </motion.div>

                  {/* Body Figure & Controls Section */}
                  <div className="page4-body flex flex-col items-center justify-center relative z-20 order-1 md:order-2">
                    {/* Body Figure Animation */}
                    <motion.div
                      initial={{ x: "-25vw", opacity: 0 }}
                      animate={{
                        x: 0,
                        opacity: 1,
                      }}
                      transition={{
                        opacity: { duration: 1, ease: "easeOut" },
                        x: { delay: 1.2, duration: 1.2, ease: "easeInOut" }
                      }}
                      className="page4-figure h-[50vh] md:h-[70vh] w-auto relative mb-4"
                    >
                      <div className="relative h-full w-auto aspect-346/500">
                        <img
                          src={view === 'front'
                            ? require('@/assets/figures/body-front.svg').default.src
                            : require('@/assets/figures/body-back.svg').default.src}
                          alt="Body Figure"
                          className="h-full w-full object-contain transition-opacity duration-300"
                        />

                        {/* Render Joint Markers */}
                        {JOINTS[view].map((joint) => (
                          <JointMarker
                            key={joint.id}
                            x={joint.x}
                            y={joint.y}
                            label={joint.label}
                            side={joint.side as 'left' | 'right'}
                            isSelected={selectedJoint === joint.id}
                            onClick={() => setSelectedJoint(selectedJoint === joint.id ? null : joint.id)}
                          />
                        ))}
                      </div>
                    </motion.div>

                    {/* Navigation Arrows for Rotation */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="flex items-center justify-center mt-4 w-full"
                    >
                      <button
                        onClick={() => setView(prev => prev === 'front' ? 'back' : 'front')}
                        className="relative w-[193px] h-[44px] transition-transform duration-300 hover:scale-105 active:scale-95"
                      >
                        <img
                          src={require('@/assets/figures/Right-Left-Arrows.svg').default.src}
                          alt="Rotate View"
                          className="w-full h-full object-contain"
                        />
                      </button>
                    </motion.div>
                  </div>

                </motion.div>
              </div >
            </div >

          ) : step === 5 ? (
            // STEP 5: Detailed Injury Form (Fixed Body + Scrollable Overlay)
            <div className="fixed inset-0 z-100 bg-[#d5ece3]">

              {/* 1. Fixed Body Background (No Scroll) */}
              <div className="absolute inset-0 pointer-events-none z-0 flex justify-center items-start overflow-hidden">
                <div className={`relative h-full w-auto aspect-[346/500] transform scale-[1.5] md:scale-[2.5] ${zoomOrigin} transition-transform duration-700 origin-top`}>
                  <img
                    src={view === 'front'
                      ? require('@/assets/figures/body-front.svg').default.src
                      : require('@/assets/figures/body-back.svg').default.src}
                    alt="Body Background"
                    className="h-full w-full object-contain opacity-80"
                  />
                  {/* Render Joint Markers */}
                  {JOINTS[view].map((joint) => (
                    <JointMarker
                      key={joint.id}
                      x={joint.x}
                      y={joint.y}
                      label={joint.label}
                      side={joint.side as 'left' | 'right'}
                      isSelected={selectedJoint === joint.id}
                      onClick={() => { }}
                    />
                  ))}
                </div>
              </div>

              {/* 2. Scrollable Overlay for Form */}
              <div className="absolute inset-0 z-10 overflow-y-auto custom-scrollbar">
                <div className="min-h-screen w-full flex flex-col items-center justify-end pb-10 pt-[55vh] md:pt-[45vh]">
                  <motion.div
                    initial={{ y: 300, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 300, opacity: 0 }}
                    className="w-full flex justify-center px-4"
                  >
                    <InjuryDetailsForm
                      jointName={activeJointLabel}
                      onBack={() => setStep(4)}
                      isLoading={isLoading}
                      error={error}
                      onContinue={(details) => {
                        // Set affected area from selected joint and call create patient
                        handleCreatePatient({
                          ...details,
                          affectedArea: activeJointLabel,
                          startDate: details.startDate ? new Date(details.startDate) : undefined,
                        });
                      }}
                    />
                  </motion.div>
                </div>
              </div>

            </div>
          ) : (
            <div className="w-screen relative right-1/2 translate-x-1/2 min-h-screen flex items-center justify-center">

              <CorneredBoxes type="glass" className="w-[95vw] py-[100px] md:w-[80vw] min-h-screen absolute right-1/2 top-[5%] translate-x-1/2 mb-[10%]">

                <Logo fill="#112a4d" className="w-[100px] md:w-[150px] h-[100px] md:h-[150px] absolute top-[10px] right-[40px]" />

                <div className='my-[10%] flex flex-col justify-center items-center'>

                  <PaginationDots total={4} activeIndex={step - 1} className="mb-[30px]" />

                  {/* ANIMATED PAGES */}
                  <AnimatePresence mode="wait">

                    {step === 1 && (
                      <motion.div
                        key="p1"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={pageAnim}
                        className="page1 flex flex-col items-center justify-center"
                      >
                        <h2 className="md:text-[42px] text-[25px] font-bold bg-linear-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent text-center">
                          Looks like you’re new here!
                        </h2>

                        <p className="text-center bg-linear-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent mt-3 mb-8 font-medium md:text-[20px] text-[15px] w-[80%] leading-relaxed">
                          Let’s create your account. Can you tell us your full name and date of birth?
                        </p>

                        {error && <p className="text-red-500 mb-4">{error}</p>}

                        <div className="inputs flex md:flex-row flex-col justify-center items-center md:gap-[30px] gap-[10px]">
                          <input
                            type="text"
                            placeholder="Full Name"
                            value={partialData.fullName}
                            onChange={(e) => setPartialData({ ...partialData, fullName: e.target.value })}
                            className="md:w-[450px] w-full h-[80px] md:text-[24px] text-[18px] px-5 rounded-full border border-[#0D294D] bg-transparent
                                 text-[#0D294D] placeholder:text-[#7b8a99] text-center outline-none focus:ring-2
                                 focus:ring-[#1E5598]/30 transition"
                          />

                          <input
                            type="date"
                            max={maxDateString}
                            value={partialData.birthdate}
                            onChange={(e) => setPartialData({ ...partialData, birthdate: e.target.value })}
                            className="md:w-[380px] bg-transparent w-full md:text-[24px] text-[18px] text-center h-[80px] px-5 rounded-full border border-[#0D294D]
                                 bg-transparent text-[#0D294D] placeholder:text-[#7b8a99] outline-none
                                 focus:ring-2 focus:ring-[#1E5598]/30 transition"
                          />

                          <div className="relative">
                            <FontAwesomeIcon icon={faCaretDown} className="absolute top-1/2 -translate-y-1/2 right-[20px]" />
                            <CustomDropdown
                              items={[
                                "Male",
                                "Female"
                              ]}
                              width="w-[300px]"
                              text="Gender"
                              value={partialData.gender}
                              onSelect={(val) => setPartialData({ ...partialData, gender: val as any })}
                              maxHeight="200px"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="p2"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={pageAnim}
                        className="page2 flex flex-col justify-center items-center"
                      >
                        <h2 className="md:text-[42px] text-[25px] font-bold bg-linear-to-b from-[#0D294D] to-[#1E5598]
                                 bg-clip-text text-transparent text-center">
                          Perfect,
                        </h2>

                        <p className="text-center bg-linear-to-b from-[#0D294D] to-[#1E5598]
                                bg-clip-text text-transparent mt-[14px] mb-[50px] font-medium md:text-[20px] text-[14px] w-[90vw] leading-relaxed">
                          now we’ll send you a code to verify your phone/email. Please enter the code when it arrives
                        </p>

                        {error && <p className="text-red-500 mb-4">{error}</p>}

                        <input
                          type="text"
                          placeholder="Verification Code"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          className="md:w-[460px] w-[80%] h-[80px] px-5 md:text-[24px] text-[18px] rounded-full border border-[#0D294D] bg-transparent
                               text-[#0D294D] placeholder:text-[#7b8a99] text-center outline-none focus:ring-2
                               focus:ring-[#1E5598]/30 transition"
                        />

                        <button
                          onClick={handleResendWithCooldown}
                          disabled={resendCountdown > 0}
                          className={`md:text-[24px] text-[20px] font-medium mt-2 bg-transparent border-none transition-colors ${resendCountdown > 0
                            ? 'text-[#ABABAB] cursor-not-allowed'
                            : 'text-[#1E5598] underline cursor-pointer'
                            }`}
                        >
                          {resendCountdown > 0
                            ? `Resend code in ${resendCountdown}s`
                            : 'Resend code'}
                        </button>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="p3"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={pageAnim}
                        className="page3 bg flex flex-col md:flex-row flex-wrap items-center justify-center"
                      >
                        <h2 className="md:text-[42px] text-[25px] md:w-[80%] w-full font-bold bg-linear-to-b from-[#0D294D] to-[#1E5598]
                                bg-clip-text text-transparent text-center">
                          Personal Information,
                        </h2>

                        {error && <p className="text-red-500 mb-4 w-full text-center">{error}</p>}

                        <p className="md:text-[20px] text-[16px] text-center bg-linear-to-b mt-[14px] mb-[50px] from-[#0D294D] to-[#1E5598]
                                bg-clip-text text-transparent font-medium w-[80%] leading-relaxed">
                          We need more details about you.
                        </p>

                        <div
                          className="flex md:flex-row flex-col gap-[30px] flex-wrap justify-center w-full items-center"
                        >
                          {/* ---- FIRST ROW: 3 inputs ---- */}
                          <input
                            type="email"
                            placeholder="Email Address"
                            value={fullData.email}
                            onChange={(e) => setFullData({ ...fullData, email: e.target.value })}
                            className="md:w-[39%] w-[90vw] h-[80px] px-5 md:text-[24px] text-[18px] rounded-full border border-[#0D294D] bg-transparent text-[#0D294D] placeholder:text-[#7b8a99] text-center outline-none focus:ring-2 focus:ring-[#1E5598]/30 transition"
                          />

                          <input
                            type="text"
                            placeholder="NID or Iqama ID"
                            value={fullData.identifier}
                            onChange={(e) => setFullData({ ...fullData, identifier: e.target.value })}
                            className="md:w-[25%] w-[90vw] h-[80px] px-5 md:text-[24px] text-[18px] rounded-full border border-[#0D294D] bg-transparent text-[#0D294D] placeholder:text-[#7b8a99] text-center outline-none focus:ring-2 focus:ring-[#1E5598]/30 transition"
                          />

                          <div className="relative md:w-[17%] w-[90vw]">
                            <FontAwesomeIcon
                              icon={faCaretDown}
                              size="xl"
                              className="absolute top-[50%] translate-y-[-50%] md:right-[20px] right-[30px]"
                            />
                            <CustomDropdown
                              items={countryNames}
                              width="w-full"
                              text="Nationality"
                              value={fullData.nationality}
                              maxHeight="280px"
                              onSelect={(val) => setFullData({ ...fullData, nationality: val })}
                            />
                          </div>

                          {/* ---- SECOND ROW: City + Address ---- */}
                          <div className="relative md:w-[21.4%] w-[90vw]">
                            <FontAwesomeIcon
                              icon={faCaretDown}
                              size="xl"
                              className="absolute top-[50%] translate-y-[-50%] md:right-[20px] right-[30px]"
                            />
                            <CustomDropdown
                              items={cityNames}
                              width="w-full"
                              text="City"
                              value={fullData.city}
                              maxHeight="280px"
                              onSelect={(val) => setFullData({ ...fullData, city: val })}
                            />
                          </div>

                          <input
                            type="tel"
                            required
                            placeholder="Phone *"
                            value={fullData.phone}
                            onChange={(e) => setFullData({ ...fullData, phone: e.target.value })}
                            className="md:w-[28%] w-[90vw] h-[80px] px-5 text-[24px] rounded-full border border-[#0D294D] bg-transparent text-[#0D294D] placeholder:text-[#7b8a99] text-center outline-none focus:ring-2 focus:ring-[#1E5598]/30 transition"
                          />

                          <input
                            type="text"
                            placeholder="Address"
                            value={fullData.address}
                            onChange={(e) => setFullData({ ...fullData, address: e.target.value })}
                            className="md:w-[32%] w-[90vw] h-[80px] px-5 text-[24px] rounded-full border border-[#0D294D] bg-transparent text-[#0D294D] placeholder:text-[#7b8a99] text-center outline-none focus:ring-2 focus:ring-[#1E5598]/30 transition"
                          />

                          {/* ---- THIRD ROW: 3 dropdowns ---- */}
                          <div className="relative md:w-[36.5%] w-[90vw]">
                            <FontAwesomeIcon
                              icon={faCaretDown}
                              size="xl"
                              className="absolute top-[50%] translate-y-[-50%] md:right-[20px] right-[30px]"
                            />
                            <CustomDropdown
                              items={[
                                "National ID",
                                "Iqama",
                                "Passport"
                              ]}
                              width="w-full"
                              text="Identifier type"
                              // value={fullData.identifierType}
                              maxHeight="150px"
                              onSelect={(val) => setFullData({ ...fullData, identifierType: val })}
                            />
                          </div>

                          <div className="relative md:w-[20%] w-[90vw]">
                            <FontAwesomeIcon
                              icon={faCaretDown}
                              size="xl"
                              className="absolute top-[50%] translate-y-[-50%] md:right-[20px] right-[30px]"
                            />
                            <CustomDropdown
                              items={["Single", "Married", "Divorced", "Widowed"]}
                              width="w-full"
                              text="Marital Status"
                              // value={fullData.maritalStatus}
                              maxHeight="150px"
                              onSelect={(val) => setFullData({ ...fullData, maritalStatus: val })}
                            />
                          </div>

                          <div className="relative md:w-[25%] w-[90vw]">
                            <FontAwesomeIcon
                              icon={faCaretDown}
                              size="xl"
                              className="absolute top-[50%] translate-y-[-50%] md:right-[20px] right-[30px]"
                            />
                            <CustomDropdown
                              items={["English", "Arabic", "Other"]}
                              width="w-full"
                              text="Speaking Language"
                              // value={fullData.speakingLanguages?.[1]}
                              // placeholder="Speaking Language"
                              maxHeight="150px"
                              onSelect={(val) => setFullData({ ...fullData, speakingLanguages: [val] })}
                            />
                          </div>
                        </div>


                        <div className="part2 flex flex-col items-center justify-center">
                          <h2 className="md:text-[42px] text-[24px] font-bold mt-0 bg-gradient-to-b mt-[60px] from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent tracking-wide text-center">Guardian Information,</h2>
                          <p className="text-center w-[60%]  mt-[14px] mb-[50px] bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent tracking-wide text-center my-[10px] font-medium md:text-[20px] w-[90vw] text-[16px] leading-relaxed">
                            The guardian will be taking decision on patient’ behalf in  case that the patient is a minor or
                            can’t make decisions due to medical conditions.
                          </p>
                          <div className='flex flex-row gap-[30px] flex-wrap justify-center items-center'>
                            <input type="text" placeholder="Guardian’s Full Name"
                              value={fullData.guardianInformation?.guardianName || ''}
                              onChange={(e) => setFullData({ ...fullData, guardianInformation: { ...fullData.guardianInformation, guardianName: e.target.value } })}
                              className="md:w-[48%] w-[90vw] h-[80px] px-5 text-[24px] rounded-full border border-[#0D294D] bg-transparent text-[#0D294D] placeholder:text-[#7b8a99] text-center outline-none focus:ring-2 focus:ring-[#1E5598]/30 transition" />
                            <input type="text" placeholder="Guardian’s Phone Number"
                              value={fullData.guardianInformation?.guardianPhone || ''}
                              onChange={(e) => setFullData({ ...fullData, guardianInformation: { ...fullData.guardianInformation, guardianPhone: e.target.value } })}
                              className="md:w-[35%] w-[90vw] h-[80px] px-5 text-[24px] rounded-full border border-[#0D294D] bg-transparent text-[#0D294D] placeholder:text-[#7b8a99] text-center outline-none focus:ring-2 focus:ring-[#1E5598]/30 transition" />
                            <input type="text" placeholder="Guardian’s NID or Iqama ID"
                              value={fullData.guardianInformation?.guardianIdentifier || ''}
                              onChange={(e) => setFullData({ ...fullData, guardianInformation: { ...fullData.guardianInformation, guardianIdentifier: e.target.value } })}
                              className="md:w-[37%] w-[90vw] h-[80px] px-5 text-[24px] rounded-full border border-[#0D294D] bg-transparent text-[#0D294D] placeholder:text-[#7b8a99] text-center outline-none focus:ring-2 focus:ring-[#1E5598]/30 transition" />
                            <input type="email" placeholder="Guardian’s Email Address"
                              value={fullData.guardianInformation?.guardianEmail || ''}
                              onChange={(e) => setFullData({ ...fullData, guardianInformation: { ...fullData.guardianInformation, guardianEmail: e.target.value } })}
                              className="md:w-[46.2%] w-[90vw] h-[80px] px-5 text-[24px] rounded-full border border-[#0D294D] bg-transparent text-[#0D294D] placeholder:text-[#7b8a99] text-center outline-none focus:ring-2 focus:ring-[#1E5598]/30 transition" />
                            <input type="text" placeholder="Blood Group"
                              value={fullData.guardianInformation?.guardianBloodType || ''}
                              onChange={(e) => setFullData({ ...fullData, guardianInformation: { ...fullData.guardianInformation, guardianBloodType: e.target.value } })}
                              className="md:w-[29%] w-[90vw] h-[80px] px-5 text-[24px] rounded-full border border-[#0D294D] bg-transparent text-[#0D294D] placeholder:text-[#7b8a99] text-center outline-none focus:ring-2 focus:ring-[#1E5598]/30 transition" />
                            <input type="text" placeholder="Patient Category"
                              value={fullData.guardianInformation?.patientCategory || ''}
                              onChange={(e) => setFullData({ ...fullData, guardianInformation: { ...fullData.guardianInformation, patientCategory: e.target.value } })}
                              className="md:w-[29%] w-[90vw] h-[80px] px-5 text-[24px] rounded-full border border-[#0D294D] bg-transparent text-[#0D294D] placeholder:text-[#7b8a99] text-center outline-none focus:ring-2 focus:ring-[#1E5598]/30 transition" />
                            <div className="relative md:w-[23.5%] w-[90vw] flex items-center justify-center">
                              <input
                                id="upload"
                                type="file"
                                className="hidden"
                                onChange={(e) => console.log(e.target.files?.[0])}
                              />

                              <label
                                htmlFor="upload"
                                className="md:w-[100%] w-[90vw] h-[80px] px-5 text-[24px] rounded-full border border-[#0D294D] bg-transparent text-[#6d7a80] text-center flex items-center justify-center cursor-pointer outline-none border-dashed transition"
                              >
                                Upload File
                              </label>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>

                  {/* BUTTONS */}
                  <div className="btns mt-[40px] flex md:flex-row flex-col md:gap-[30px]">


                    <button
                      onClick={() => {
                        // Back logic handled by hook? Or custom?
                        // Actually hook just exposes setStep, so we can do it here.
                        if (showHello) return;
                        if (step === 1) {
                          // Go back to Hello
                          // But we used `setShowHello` from hook. 
                          // We should probably just reload or reset.
                          window.location.reload();
                        } else {
                          setStep(step - 1);
                        }
                      }}
                      className="w-[220px] h-[60px] cursor-pointer py-3 bg-transparent border-[4px]
                              border-white text-white rounded-full font-semibold mt-4 hover:bg-white
                              hover:text-[#ea392f] transition-all duration-300"
                    >
                      Back
                    </button>



                    {step < 5 && (
                      <button
                        onClick={() => {
                          if (step === 1) onPartialSubmit();
                          else if (step === 2) onOtpSubmit();
                          else if (step === 3) onFullSubmit();
                          else if (step === 4) setStep(5);
                        }}
                        disabled={isLoading}
                        className="w-[220px] h-[60px] cursor-pointer py-3 bg-[#ea392f] text-white rounded-full
                             font-semibold mt-4 hover:bg-transparent hover:text-[#ea392f]
                             hover:border-[#ea392f] border-[4px] border-[#ea392f] transition-all duration-300 disabled:opacity-50">
                        {isLoading ? 'Loading...' : (step === 4 ? "Submit" : "Continue")}
                      </button>
                    )}

                  </div>

                </div>

              </CorneredBoxes>

            </div>
          )
        )}
      </AnimatePresence >

      <AnimatePresence>
        { /* REMOVED OVERLAY FORM, NOW HANDLED IN STEP 5 */}
      </AnimatePresence>
    </main >
  )
}

export default Page;
