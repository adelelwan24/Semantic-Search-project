import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router'

import { motion } from "framer-motion";
import { styles } from "../styles/style";
import { heroimage } from "@/assets";

const Hero = () => {
  
  const router =useRouter()
  
  return (
    <section id="hero" className="relative w-full h-screen mx-auto top-20 ">
      <div className={`${styles.paddingX} absolute inset-0 top-[50px] max-w-8xl mx-auto flex flex-row items-start gap-12`}>

          {/* Left section */}
        <div className={"flex-1 p-10 flex flex-col justify-center "}>
          <h1 className="text-6xl  mb-8 font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2">Get to the heart of the matter !</h1>
          <h2 className="text-3xl font-medium mb-8">find much easier with your Search Mate in your
          <span className="text-[#88b4ae] text-3xl font-bold "> Videos</span>
          </h2>
            <br/>
            <br/>

          <button 
            onClick={() => window.location = '/#searchType'}
            className="bg-[#66B0A5] text-white py-3 px-8 rounded-full w-[165px] h-[50px] hover:bg-[#66B0A5]transition-colors duration-300 ease-in-out">
          <Link href="/#searchType"  legacyBehavior>
            <a > Search Now ! </a>
          </Link>
          </button>
        </div>

        {/* Right section */}
        <div className="flex-1 h-[80px] sm:bottom-10">
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