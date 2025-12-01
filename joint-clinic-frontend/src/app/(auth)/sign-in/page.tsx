"use client";
import CorneredBoxes from '@/components/atoms/CorneredBoxes'
import PaginationDots from '@/components/atoms/paginationlog'
import Logo from '@/components/icons/Logo'
import "./style.css"
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence, Variants } from "framer-motion"
import HelloCard from '@/components/organisms/helloCard';
import CustomDropdown from '@/components/molecules/dropdown';

const Page = () => {

  const [step, setStep] = React.useState(1);

  const [activeN, setActiveN] = React.useState(false);
  const [activeC, setActiveC] = React.useState(false);
  const [activeIdentifier, setActiveIdentifier] = React.useState(false);
  const [activeMarital, setActiveMarital] = React.useState(false);
  const [activeLanguage, setActiveLanguage] = React.useState(false);
  const [showHello, setShowHello] = React.useState(true);

  const pageAnim: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: .6, ease: "easeOut" } },
    exit: { opacity: 0, y: -40, transition: { duration: .4 } }
  };

  return (
    <main
      className="w-[100%] min-h-screen relative bg-cover relative bg-center flex items-center justify-start overflow-y-auto"
      style={{ backgroundImage: "url('./loginbg.png')" }}
    >
      <div className="w-full h-full flex items-center justify-start pl-[6%]">
        {showHello && (
          <HelloCard
            onGo={() => {
              setShowHello(false);
              setStep(1);
            }}
          />
        )}
      </div>
      {
        !showHello && (
          <div className="w-[100vw] relative right-[50%] translate-x-[50%] min-h-screen flex items-center justify-center">

            <CorneredBoxes type="glass" className="w-[80vw] min-h-[100vh] absolute right-[50%] top-[5%] translate-x-[50%] mb-[10%]">

              <Logo fill="#112a4d" className="w-[150px] h-[150px] absolute top-[10px] right-[40px]" />

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
                      <h2 className="text-[42px] font-bold bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent text-center">
                        Looks like you’re new here!
                      </h2>

                      <p className="text-center bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent mt-3 mb-8 font-medium text-[20px] leading-relaxed">
                        Let’s get you started. Please enter your phone number or email.
                      </p>

                      <div className="inputs flex flex-row gap-[30px]">
                        <input
                          type="text"
                          placeholder="Full Name"
                          className="w-[450px] h-[80px] text-[24px] px-5 rounded-full border border-[#0D294D] bg-transparent
                                 text-[#0D294D] placeholder:text-[#7b8a99] text-center outline-none focus:ring-2
                                 focus:ring-[#1E5598]/30 transition"
                        />

                        <input
                          type="date"
                          className="w-[380px] text-[24px] text-center h-[80px] px-5 rounded-full border border-[#0D294D]
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
                      <h2 className="text-[42px] font-bold bg-gradient-to-b from-[#0D294D] to-[#1E5598]
                                 bg-clip-text text-transparent text-center">
                        Perfect,
                      </h2>

                      <p className="text-center bg-gradient-to-b from-[#0D294D] to-[#1E5598]
                                bg-clip-text text-transparent mt-[14px] mb-[50px] font-medium text-[20px] leading-relaxed">
                        now we’ll send you a code to verify your phone/email. Please enter the code when it arrives
                      </p>

                      <input
                        type="text"
                        placeholder="Verification Code"
                        className="w-[460px] h-[80px] px-5 text-[24px] rounded-full border border-[#0D294D] bg-transparent
                               text-[#0D294D] placeholder:text-[#7b8a99] text-center outline-none focus:ring-2
                               focus:ring-[#1E5598]/30 transition"
                      />

                      <a href="#" className="text-[24px] text-[#1E5598] font-medium underline mt-2">Resend code</a>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="p3"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={pageAnim}
                      className="page3 flex flex-col items-center justify-center"
                    >
                      <h2 className="text-[42px] font-bold bg-gradient-to-b from-[#0D294D] to-[#1E5598]
                                bg-clip-text text-transparent text-center">
                        Personal Information,
                      </h2>

                      <p className="text-center bg-gradient-to-b mt-[14px] mb-[50px] from-[#0D294D] to-[#1E5598]
                                bg-clip-text text-transparent font-medium text-[20px] leading-relaxed">
                        We need more details about you.
                      </p>

                      <form action="" className='flex flex-row gap-[30px] flex-wrap justify-center items-center'>

                        <input type="email" placeholder="Email Address" className="w-[580px] h-[80px] px-5 text-[24px] rounded-full border border-[#0D294D] bg-transparent text-[#0D294D] placeholder:text-[#7b8a99] text-center outline-none focus:ring-2 focus:ring-[#1E5598]/30 transition" />

                        <input type="text" placeholder="NID or Iqama ID" className="w-[350px] h-[80px] px-5 text-[24px] rounded-full border border-[#0D294D] bg-transparent text-[#0D294D] placeholder:text-[#7b8a99] text-center outline-none focus:ring-2 focus:ring-[#1E5598]/30 transition" />

                        <div className="relative">
                          <FontAwesomeIcon icon={faCaretDown} size="xl" className="absolute top-[50%] translate-y-[-50%] right-[50px]" />
                          <CustomDropdown
                            items={[
                              "Saudi Arabia",
                              "United Arab Emirates",
                              "Egypt",
                              "Jordan",
                              "Sudan",
                              "Kuwait"
                            ]}
                            width="w-[305px]"
                            text="Nationality"
                          />
                        </div>

                        <div className="relative">
                          <FontAwesomeIcon icon={faCaretDown} size="xl" className="absolute top-[50%] translate-y-[-50%] right-[50px]" />
                          <CustomDropdown
                            items={[
                              "Cairo",
                              "Alexandria",
                              "Giza",
                              "Shubra El-Kheima",
                              "Port Said",
                              "Zagazig"
                            ]}
                            width="w-[275px]"
                            text="City"
                          />
                        </div>

                        <input type="text" placeholder="Address" className="w-[1000px] h-[80px] px-5 text-[24px] rounded-full border border-[#0D294D] bg-transparent text-[#0D294D] placeholder:text-[#7b8a99] text-center outline-none focus:ring-2 focus:ring-[#1E5598]/30 transition" />

                        <div className="relative">
                          <FontAwesomeIcon icon={faCaretDown} size="xl" className="absolute top-[50%] translate-y-[-50%] right-[170px]" />
                          <CustomDropdown
                            items={[
                              "Saudi Arabia",
                              "United Arab Emirates",
                              "Egypt",
                              "Jordan",
                              "Sudan",
                              "Kuwait"
                            ]}
                            width="w-[560px]"
                            text="Identifier type"
                          />
                        </div>

                        <div className="relative">
                          <FontAwesomeIcon icon={faCaretDown} size="xl" className="absolute top-[50%] translate-y-[-50%] right-[50px]" />
                          <CustomDropdown
                            items={[
                              "Single",
                              "Married",
                              "Divorced",
                              "Widowed"
                            ]}
                            width="w-[310px]"
                            text="Marital Status"
                          />
                        </div>

                        <div className="relative">
                          <FontAwesomeIcon icon={faCaretDown} size="xl" className="absolute top-[50%] translate-y-[-50%] right-[50px]" />
                          <CustomDropdown
                            items={[
                              "English",
                              "Arabic",
                              "Other"
                            ]}
                            width="w-[375px]"
                            text="Speaking Language"
                          />
                        </div>
                      </form>

                      <div className="part2 flex flex-col items-center justify-center">
                        <h2 className="text-[42px] font-bold mt-0 bg-gradient-to-b mt-[60px] from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent tracking-wide text-center">Guardian Information,</h2>
                        <p className="text-center w-[60%]  mt-[14px] mb-[50px] bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent tracking-wide text-center my-[10px] font-medium text-[20px] leading-relaxed">
                          The guardian will be taking decision on patient’ behalf in  case that the patient is a minor or
                          can’t make decisions due to medical conditions.
                        </p>
                        <form action="" className='flex flex-row gap-[30px] flex-wrap justify-center items-center'>
                          <input type="text" placeholder="Guardian’s Full Name" className="w-[750px] h-[80px] px-5 text-[24px] rounded-full border border-[#0D294D] bg-transparent text-[#0D294D] placeholder:text-[#7b8a99] text-center outline-none focus:ring-2 focus:ring-[#1E5598]/30 transition" />
                          <input type="text" placeholder="Guardian’s Phone Number" className="w-[540px] h-[80px] px-5 text-[24px] rounded-full border border-[#0D294D] bg-transparent text-[#0D294D] placeholder:text-[#7b8a99] text-center outline-none focus:ring-2 focus:ring-[#1E5598]/30 transition" />
                          <input type="text" placeholder="Guardian’s NID or Iqama ID" className="w-[570px] h-[80px] px-5 text-[24px] rounded-full border border-[#0D294D] bg-transparent text-[#0D294D] placeholder:text-[#7b8a99] text-center outline-none focus:ring-2 focus:ring-[#1E5598]/30 transition" />
                          <input type="email" placeholder="Guardian’s Email Address" className="w-[720px] h-[80px] px-5 text-[24px] rounded-full border border-[#0D294D] bg-transparent text-[#0D294D] placeholder:text-[#7b8a99] text-center outline-none focus:ring-2 focus:ring-[#1E5598]/30 transition" />
                          <input type="text" placeholder="Blood Group" className="w-[440px] h-[80px] px-5 text-[24px] rounded-full border border-[#0D294D] bg-transparent text-[#0D294D] placeholder:text-[#7b8a99] text-center outline-none focus:ring-2 focus:ring-[#1E5598]/30 transition" />
                          <input type="text" placeholder="Patient Category" className="w-[450px] h-[80px] px-5 text-[24px] rounded-full border border-[#0D294D] bg-transparent text-[#0D294D] placeholder:text-[#7b8a99] text-center outline-none focus:ring-2 focus:ring-[#1E5598]/30 transition" />
                          <div className="relative">
                            <input
                              id="upload"
                              type="file"
                              className="hidden"
                              onChange={(e) => console.log(e.target.files?.[0])}
                            />

                            <label
                              htmlFor="upload"
                              className="w-[370px] h-[80px] px-5 text-[24px] rounded-full border border-[#0D294D] bg-transparent text-[#6d7a80] text-center flex items-center justify-center cursor-pointer outline-none border-dashed transition"
                            >
                              Upload File
                            </label>
                          </div>
                        </form>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>

                {/* BUTTONS */}
                <div className="btns mt-[40px] flex flex-row gap-[30px]">

                  {step > 1 && (
                    <button
                      onClick={() => setStep(step - 1)}
                      className="w-[220px] h-[60px] cursor-pointer py-3 bg-transparent border-[4px]
                             border-[#fff] text-[#fff] rounded-full font-semibold mt-4 hover:bg-[#fff]
                             hover:text-[#ea392f] transition-all duration-300">
                      Back
                    </button>
                  )}

                  {step < 4 && (
                    <button
                      onClick={() => setStep(step + 1)}
                      className="w-[220px] h-[60px] cursor-pointer py-3 bg-[#ea392f] text-white rounded-full
                             font-semibold mt-4 hover:bg-transparent hover:text-[#ea392f]
                             hover:border-[#ea392f] border-[4px] border-[#ea392f] transition-all duration-300">
                      Continue
                    </button>
                  )}

                </div>

              </div>

            </CorneredBoxes>

          </div>
        )
      }

    </main>
  )
}

export default Page;
