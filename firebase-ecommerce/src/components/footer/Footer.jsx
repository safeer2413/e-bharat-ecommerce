import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaYoutube
} from "react-icons/fa6";
import SocialIcon from "../socialIcon/SocialIcon";

function Footer() {
  return (
    <footer className="bg-pink-600 text-white mt-10 py-6">
      <div className="max-w-6xl mx-auto px-4">

        {/* Main Row */}
        <div className="flex flex-col md:flex-col lg:flex-row 
                        items-center lg:items-center 
                        justify-evenly gap-6">

          {/* Logo - Left */}
          <div className="flex justify-start w-full lg:w-auto ">
            <Link
              to="/"
              className="text-lg font-bold border-2 border-white lg:mb-10 lg:me-10
                         px-3 py-1 rounded-lg w-fit hover:scale-105 transition duration-300"
            >
              E-Bharat
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center px-10 text-sm text-gray-200 italic font-semibold">
            © {new Date().getFullYear()} E-Bharat{" "}
            {/* <br className="hidden lg:block" /> */}
            All rights reserved.
          </div>

          {/* Follow Text + Icons */}
          <div className="flex flex-col items-center">
            <p className="text-base font-semibold mb-3">
              Follow Us
            </p>

            <div className="flex justify-center space-x-4">
              <SocialIcon
                href="https://www.facebook.com/yourpage"
                label="Facebook"
                hoverColor="hover:bg-blue-700"
              >
                <FaFacebookF />
              </SocialIcon>

              <SocialIcon
                href="https://www.instagram.com/yourpage"
                label="Instagram"
                hoverColor="hover:bg-gradient-to-tr hover:from-[#833AB4] hover:via-[#E4405F] hover:to-[#F77737]"
              >
                <FaInstagram />
              </SocialIcon>

              <SocialIcon
                href="https://www.twitter.com/yourpage"
                label="Twitter"
                hoverColor="hover:bg-black"
              >
                <FaXTwitter />
              </SocialIcon>

              <SocialIcon
                href="https://www.linkedin.com/company/yourpage"
                label="LinkedIn"
                hoverColor="hover:bg-cyan-600"
              >
                <FaLinkedinIn />
              </SocialIcon>

              <SocialIcon
                href="https://www.youtube.com/@yourpage"
                label="YouTube"
                hoverColor="hover:bg-red-500"

              >
                <FaYoutube />
              </SocialIcon>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
