
import NavBar from "@/components/organisms/NavBar/NavBar";
import Button2 from "@/components/atoms/Button2";

interface HeroProps {
  font: {
    className: string;
  };
}

const Hero = ({ font }: HeroProps) => {
  return (
    <>
      <main
        className="
          relative 
          py-4 px-[10px] rounded-[22px] 
          w-[98%] h-[96%] 
          flex flex-col justify-center items-center
          overflow-hidden

          /* BACKGROUND GIF */
          bg-[url('/Project2.gif')]
          bg-cover bg-center
        "
      >
        {/* Dark overlay (optional… keeps text readable) */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>

        <NavBar />

        {/* Content */}
        <div
          className={`
            content ${font.className} 
            absolute bottom-[60px] md:bottom-[10px] md:mt-[250px] 
            text-white flex flex-col justify-center items-center 
            z-[1]
          `}
        >
          <h1 className="text-[50px] leading-[100%] font-bold font-['IBM_Plex_Sans'] text-center">
            Your Recovery, Made Simple.
          </h1>

          <p className="mt-4 leading-[150%] text-[15px] font-medium max-w-[350px] md:max-w-[650px] text-center">
            Book physiotherapy sessions, access your medical reports, and
            follow your personalized exercise plan – all in one secure platform.
          </p>

          <Button2 text="Get Started" />
        </div>
      </main>
    </>
  );
};

export default Hero;
