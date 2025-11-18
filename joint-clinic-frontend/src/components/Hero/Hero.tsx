import React from 'react'
import Button2 from '../atoms/button2'
import NavBar from '../NavBar/NavBar'
import { NextFont } from 'next/dist/compiled/@next/font'

interface HeroProps {
  font: NextFont
}

const Hero = ({font}: HeroProps) => {
  return (
    <>
        {/*{Don't push code to the repo in here}*/}
        <main
          className={
            "bg-red-950 py-4 px-[10px] rounded-[22px] w-[98%] h-[96%] flex flex-col content-center items-center"
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
            className={`content ${font.className} absolute bottom-[60px] md:bottom-[10px] md:mt-[250px] text-white flex flex-col justify-center items-center`}
          >
            <h1 className="text-[50px] leading-[100%] font-bold font-['IBM_Plex_Sans'] text-center">
              Your Recovery, Made Simple.
            </h1>

            <p className="mt-4 leading-[150%] text-[15px] font-medium max-w-[350px] md:max-w-[650px] text-center">
              Book physiotherapy sessions, access your medical reports, and
              follow your personalized exercise plan – all in one secure
              platform.
            </p>
            <Button2 text="Get Started" />
          </div>
        </main>
    </>
  )
}

export default Hero
