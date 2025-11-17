import SideBar from "@components/SideBar/SideBar";
import NavBar from "@components/NavBar/NavBar";
import Button2 from "@components/atoms/button2";

import { IBM_Plex_Sans } from "next/font/google";
import Profile from "@/components/icons/Profile";
import FeatureCard from "@/components/molecules/featureCard";
import Pagination from "@/pages/pagination";

const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const memberinfo = [
  {
    name: "Bryan",
    major: "BranchChiropractor Aqiq Branch",
    fill: "#d5ece3",
  },
  {
    name: "Saad Al Omar",
    major: "Chiropractor Aqiq Branch",
    fill: "#167c4f",
  },
  {
    name: "Abdallah El Mahya",
    major: "Physiotherapy Specialist Aqiq Branch",
    fill: "#112a4d",
  },
  {
    name: "Mohammed Alzahrani",
    major: "Physiotherapy Specialist Aqiq Branch",
    fill: "#ee3124",
  },
  {
    name: "Aly El Sennedy",
    major: "Physiotherapy Specialist Aqiq Branch",
    fill: "#fdb515",
  },
];

const cards = [
  {
    title: "HOLIDAY HOURS UPDATE",
    desc: "Our clinic will be closed on Friday, Sept 25, for maintenance. Online services remain available.",
  },
  {
    title: "NEW SPECIALIST JOINS OUR TEAM",
    desc: "Welcome Dr. Hany, our new physiotherapy expert specializing in sports injury recovery.",
  },
  {
    title: "YOUR RECOVERY UPDATES",
    desc: "Learn about new features added to improve your recovery tracking.",
  },
];

export default function Home() {
  return (
    <div className="con bg-[#9fd5e2]">
      <div
        className={"h-screen w-full flex flex-col justify-center items-center"}
      >
        {/*{Don't push code to the repo in here}*/}
        <main
          className={
            "bg-red-950 py-4 px-[8px] rounded-[22px] w-[98%] h-[96%] flex flex-col content-center items-center"
          }
          style={{
            backgroundImage: "url('./banner.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <NavBar />
          <div
            className={`content ${ibmPlex.className} absolute bottom-[-70px] my-[170px] text-white flex flex-col justify-center items-center`}
          >
            <h1 className="text-[64px] leading-[100%] font-bold font-['IBM_Plex_Sans']">
              Your Recovery, Made Simple.
            </h1>

            <p className="mt-4 leading-[150%] text-[20px] font-medium max-w-[700px] text-center">
              Book physiotherapy sessions, access your medical reports, and
              follow your personalized exercise plan – all in one secure
              platform.
            </p>
            <Button2 text="Get Started" />
          </div>
        </main>
      </div>
      <section className="who_we_are flex justify-center items-center h-screen text-[#fff] flex-col">
        <h2 className="text-[64px] text-center w-[60%] font-bold mb-[40px]">
          Who We Are
        </h2>
        <p className="text-center w-[46%] font-medium ">
          At Joint Clinic, we believe recovery should be simple, secure, and
          effective. Our team of physiotherapists and specialists combine
          medical expertise with digital innovation to bring you a seamless care
          experience. From online booking and secure reports to guided
          exercises, we make every step of your recovery journey easier.
        </p>
      </section>
      <section className="team_section bg-[#9fd5e2] h-screen flex flex-col justify-center items-center gap-8 py-auto">
        <h1
          className={`text-[128px] font-bold mt-[15%] font-['IBM_Plex_Sans'] text-[#fff]`}
        >
          Meet Our Team
        </h1>
        <div className="members w-full m-auto flex flex-row gap-8 flex-wrap justify-center">
          {memberinfo.map((member, index) => (
            <div key={index} className="p-6 flex flex-col items-center">
              <Profile fill={member.fill} className="w-[60px] mb-[10px]" />

              <h4 className="text-[20px] w-[250px] text-[#fff] font-bold text-center">
                {member.name}
              </h4>

              <p className="text-[16px] w-[160px] text-[#fff] text-center">
                {member.major}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="chooseUs h-screen flex flex-col justify-center items-center gap-8 py-auto">
        <h2
          className={`text-[64px] font-bold mt-[15%] font-['IBM_Plex_Sans'] text-[#fff]`}
        >
          Why Choose Us?
        </h2>
        <div className="cards w-full m-auto flex flex-row gap-8 flex-wrap justify-center">
          <FeatureCard
            title="Effortless Recovery"
            description="Book physiotherapy sessions, access your medical reports, and follow your personalized exercise plan – all in one secure platform."
          />
          <FeatureCard
            title="Effortless Recovery"
            description="Book physiotherapy sessions, access your medical reports, and follow your personalized exercise plan – all in one secure platform."
          />
          <FeatureCard
            title="Effortless Recovery"
            description="Book physiotherapy sessions, access your medical reports, and follow your personalized exercise plan – all in one secure platform."
          />
          <FeatureCard
            title="Effortless Recovery"
            description="Book physiotherapy sessions, access your medical reports, and follow your personalized exercise plan – all in one secure platform."
          />
        </div>
      </section>

      <Pagination total={5} />
      
    </div>
  );
}
