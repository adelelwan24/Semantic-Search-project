import React, { useEffect, useState } from "react";
import Link from "next/link";
import { styles } from "../styles/style";
import { navLinks } from "../constants";
import { logo, menu, close } from "@/assets";

const Header = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } fixed  w-full flex items-center py-5  z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto ">
      <Link href="/" legacyBehavior >
        <div className="flex items-center gap-2 cursor-pointer">
          <img src="/logo-white.svg" alt="Logo" className="w-8 h-8 mr-2" />
          <p className="text-xl font-bold">
            <span className="">Search Mate</span>
          </p>
        </div>
      </Link>
        <ul className="list-none hidden sm:flex flex-row justify-center gap-10 " >
          <li
            className={`${
              active === "home" ? "text-white" : "text-secondary"
            } hover:text-white text-[18px] font-medium cursor-pointer`}
            onClick={() => setActive("home")}
          >
            <Link href="/" legacyBehavior>
              <a>Home</a>
            </Link>
          </li>
          {navLinks.map((link) => (
              <li
                key={link.id}
                className={`${
                  active === link.title ? "text-white" : "text-secondary"
                }  hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={() => setActive(link.title)}
              >
                <Link href={`/#${link.id}`} legacyBehavior>
                  <a>{link.title}</a>
                </Link>
              </li>
              ))}
        </ul>

        <div className="hidden sm:flex  items-center gap-6">
          <button
            className={`${
              active === "login" ? "text-white" : "text-secondary"
            } hover:text-white text-[18px] font-medium cursor-pointer`}
            onClick={() => setActive("login")}
          >
            <Link href="/LogIn" legacyBehavior>
              <a>Log In</a>
            </Link>
          </button>
          
            <Link href="/SignUp" legacyBehavior>
              <button
                className="bg-[#486d68] hover:bg-[#88b4ae] transition-colors duration-300 ease-in-out text-white text-[18px] font-medium py-2 px-6 rounded-full"
                onClick={() => setActive("signup")}
              > Sign Up
              </button>
            </Link>
        </div>

        {/* navbar for small devices  */}
        
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src="{toggle ? /close.svg:/menu.svg}"
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
          <div className="{`${!toggle ? 'hidden' : 'flex'} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl `}"
            
          >
              <ul className="list-none flex   justify-end items-start flex-col gap-4 " >
              <li
                className={`${
                  active === "home" ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={() => setActive("home")}
              >
                <Link href="/" legacyBehavior>
                  <a>Home</a>
                </Link>
              </li>
              {navLinks.map((link) => (
              <li
                key={link.id}
                className={`${
                  active === link.title ? "text-white" : "text-secondary"
                } font-poppins text-[16px] font-medium cursor-pointer`}
                onClick={() => {
                  setToggle(!toggle);
                  setActive(link.title);}
                }
              >
                <Link href={`/#${link.id}`} legacyBehavior>
                  <a>{link.title}</a>
                </Link>
              </li>
              ))}
            </ul>

            <div className="flex   justify-end items-start flex-col gap-4">
              <button
                className={`${
                  active === "login" ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer mt-4`}
                onClick={() => setActive("LogIn")}
              >
                <Link href="/LogIn" legacyBehavior>
                  <a>Log In</a>
                </Link>
              </button>
              <button
                className={`${
                  active === "SignUp" ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={() => setActive("SignUp")}
              >
                <Link legacyBehavior href="/SignUp" >
                  <a>Sign Up </a>
                </Link>
              </button>
            </div>
              </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
