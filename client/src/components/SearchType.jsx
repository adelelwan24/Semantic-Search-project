import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router'
import { styles } from "@/styles/style";
import { services } from '../constants/index'

import { motion } from "framer-motion";
import { fadeIn, textVariant  } from "@/utils/motion";
// import { Tilt } from 'react-tilt'

import { SectionWrapper } from "@/hoc";
const VideoCard = () => {
  return(
    <div className="xs:w-[250px]">
      <motion.div
        variants={fadeIn("right","spring", 0.5, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div
          options={{
            max:45,
            scale:1,
            speed: 450
          }}
          className='bg-tertiary rounded-[20px]  px-12 min-h-[450px] flex justify-evenly items-center flex-col '
        >
          <img src="/video.jpg" className="object-cover overflow-hidden rounded-2xl"/>
          <h2 className="text-white text-[20px] font-bold text-center"> Videos</h2>
          <hr className="w-20 h-1 mx-auto my-1 border-1 bg-yellow-400"/>
          <h3 className="text-secondary text-[16px] font-bold text-center"> find much easier in your Videos</h3>
            <Link legacyBehavior href='/VideoSearch'>
              <button className="bg-[#66B0A5] text-white py-3 px-8 rounded-full w-[165px] h-[50px] hover:bg-[#66B0A5]transition-colors duration-300 ease-in-out">
                <a className="text-white font-bold">search now !</a>
              </button>
            </Link>
        </div>
      </motion.div>
    </div>
  )
}
const ArticleCard = () => {
  return(
    <div className="xs:w-[250px]">
      <motion.div
        variants={fadeIn("right","spring", 0.5, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div
          options={{
            max:45,
            scale:1,
            speed: 450
          }}
          className='bg-tertiary rounded-[20px]  px-12 min-h-[450px] flex justify-evenly items-center flex-col '
        >
          <img src="/document.jpg" className="object-cover overflow-hidden rounded-2xl"/>
          <h2 className="text-white text-[20px] font-bold text-center"> Articles </h2>
          <hr className="w-20 h-1 mx-auto my-1 border-1 bg-yellow-400"/>
          <h3 className="text-secondary text-[16px] font-bold text-center"> find much easier in your playlists</h3>
            <Link legacyBehavior href='/ArticleSearch'>
              <button className="bg-[#66B0A5] text-white py-3 px-8 rounded-full w-[165px] h-[50px] hover:bg-[#66B0A5]transition-colors duration-300 ease-in-out">
                <a className="text-white font-bold">search now !</a>
              </button>
            </Link>
        </div>
      </motion.div>
    </div>
  )
}

const PlayListCard = () => {
  return(
    <div className="xs:w-[250px]">
      <motion.div
        variants={fadeIn("right","spring", 0.5, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div
          options={{
            max:45,
            scale:1,
            speed: 450
          }}
          className='bg-tertiary rounded-[20px]  px-12 min-h-[450px]  flex justify-evenly items-center flex-col relative'
        >
          <img src="/playlist.png" className="w-full h-full object-cover overflow-hidden rounded-2xl"/>
          <h2 className="text-white text-[20px] font-bold text-center"> Playlists </h2>
          <hr className="w-20 h-1 mx-auto my-1 border-1 bg-yellow-400"/>
          <h3 className="text-secondary text-[16px] font-bold text-center"> find much easier in your playlists</h3>
            <Link legacyBehavior href='/PlayListSearch'>
              <button className="bg-[#66B0A5] text-white py-3 px-8 rounded-full w-[165px] h-[50px] hover:bg-[#66B0A5]transition-colors duration-300 ease-in-out">
                <a className="text-white font-bold">search now !</a>
              </button>
            </Link>
        </div>
      </motion.div>
    </div>
  )
}

const SearchType = ({ index, title , image}) => {
  return (
    <section id="searchType">
      <motion.div variants={textVariant()}>
        
          <h2 className={`${styles.sectionHeadText}  text-[60px]`}>
            Search Type
          </h2>
        <div className="px-40 mt-20 flex flex-wrap gap-20">
          <div>

            <VideoCard/>
          </div>

          <div>

            <ArticleCard/>
          </div>
          
          <div>

            <PlayListCard/>
          </div>
        </div>
      </motion.div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>

    </section>
  )
}

export default SectionWrapper(SearchType,"searchType")