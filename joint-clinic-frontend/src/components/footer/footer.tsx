import Logo from "../icons/Logo";
import "./footer.css";

const Footer = () => {
  return (
    <footer
      className="
        w-full lg:w-[92%]
        mx-auto 
        bg-[#0D294D] 
        text-white 
        pt-12 md:pt-16 
        pb-10 md:pb-14 
        rounded-t-[30px] md:rounded-t-[40px]
        mt-16 md:mt-20
        overflow-hidden
        relative
      "
    >
      <div className="px-6 md:px-10">
        {/* TOP SECTION */}
        <div className="w-full flex flex-col gap-10 md:gap-12 md:mx-[80px] lg:mx-[100px]">
          {/* LOGO */}
          <Logo
            fill="white"
            className="
              w-[180px] h-[70px]
              sm:w-[220px] sm:h-[90px]
              md:w-[260px] md:h-[110px]
              lg:w-[300px] lg:h-[120px]
              mx-auto md:mx-0
            "
          />

          {/* LINKS GRID */}
          <div
            className="
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4 
              gap-x-10 sm:gap-x-12 
              gap-y-14 sm:gap-y-20 md:gap-y-28 lg:gap-y-32
              text-[16px] sm:text-[18px]
              mt-[40px] md:mt-[60px]
            "
          >
            <ul
              className="hidden md:block space-y-[30px] sm:space-y-[40px] md:space-y-[50px]"
            >
              <li className="text-[#F6574D] lnk">Who We Are</li>
              <li className="text-[#F6574D] lnk">Why Choose Us</li>
              <li className="text-[#F6574D] lnk">How It Works</li>
              <li className="text-[#F6574D] lnk">Testimonials</li>
            </ul>

            <ul
              className="hidden md:block space-y-[30px] sm:space-y-[40px] md:space-y-[50px]"
            >
              <li className="text-[#F6574D] lnk">Sign Up</li>
              <li className="text-[#F6574D] lnk">Login</li>
              <li className="text-[#F6574D] lnk">Book an appointment</li>
            </ul>

            <ul className="space-y-[30px] sm:space-y-[40px] md:space-y-[50px]">
              <li className="text-[#F6574D] lnk">For Partners</li>
              <li className="text-[#F6574D] lnk">For Business</li>
              <li className="text-[#F6574D] lnk">Join Our Team</li>
            </ul>

            <ul className="space-y-[30px] sm:space-y-[40px] md:space-y-[50px]">
              <li className="text-[#F6574D] lnk">Terms & Conditions</li>
              <li className="text-[#F6574D] lnk">Privacy Policy</li>
              <li className="text-[#F6574D] lnk">FAQs</li>
              <li className="text-[#F6574D] lnk">Contact Us</li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div
          className="
            w-full 
            text-center 
            text-[#97A3B6] 
            text-[14px] sm:text-[16px]
            mt-12 md:mt-0
            absolute left-0 right-0 
            bottom-[25px] md:bottom-[40px]
          "
        >
          © 2025 Joint. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
