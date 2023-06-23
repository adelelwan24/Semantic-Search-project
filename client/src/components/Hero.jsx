import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';


import Typed from 'typed.js';


import { motion } from "framer-motion";
import { styles } from "../styles/style";
import { heroimage } from "@/assets";

const Hero = () => {
  
  const router =useRouter()
  useEffect(() => {
    const typed = new Typed('.multiple-text', {
    strings: ['Videos', 'Articles', 'Playlist'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true,

    });
    
  
    return () => {
      typed.destroy();
    };
    }, []);
  
  
  return (
    <section id="hero" className="relative w-full h-screen mx-auto top-20 ">
      <div className={`${styles.paddingX} absolute inset-0 top-[50px] max-w-8xl mx-auto flex flex-row items-start gap-12`}>

          {/* Left section */}
        <div className={"flex-1 p-10 flex flex-col justify-center "}>
          <h1 className="text-6xl  mb-8 font-black text-white animate-slideRight lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2 ">Get to the heart of the matter !</h1>
          <h2 className="text-3xl font-medium mb-8 animate-slideRight">find much easier with your Search Mate in your
          <span className="multiple-text text-[#1ebea6] ml-2"> </span>
          </h2>
            <br/>
            <br/>

          <button 
            onClick={() => window.location = '/#searchType'}
            className="bg-[#66B0A5] text-white py-3 px-8 rounded-full animate-slideTop w-[165px] h-[50px] hover:bg-[#66B0A5]transition-colors duration-300 ease-in-out">
          <Link href="/#searchType"  legacyBehavior>
            <a > Search Now ! </a>
          </Link>
          </button>
        </div>

        {/* Right section */}
        <div className="flex-1 h-[80px] sm:bottom-10  animate-zoomIn  delay-2000 ">
          <img 
            src="/heroimage.png"
            alt="heroImage"
            layout="responsive"
            width={500}
            height={200}
          />
        </div>
      </div>
    </section>
  )
}

export default Hero;