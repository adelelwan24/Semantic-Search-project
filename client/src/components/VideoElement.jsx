import { useState } from 'react';
import { motion } from "framer-motion";
import { fadeIn, textVariant  } from "@/utils/motion";
import { styles } from "@/styles/style";


const VideoElement = ({ video_id, start, text }) => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className=" m-4 p-[1px] rounded-[20px] items-center flex flex-wrap max-w-2xl  green-pink-gradient  shadow-card xs:w-[px]">
      <motion.div
        variants={fadeIn("right","spring", 0.5, 0.75)}
        
      >
      <div 
        options={{
          max:45,
          scale:1,
          speed: 450
        }}
        className='bg-tertiary rounded-[20px] py-10 px-12 min-h-[px] flex justify-evenly items-center flex-col xs:w-[px]'>
        
        <div>  
          <p>{showMore ? text : `${text.slice(0, 100)}...`}</p>
          {text.length > 50 && (
            <button
              className="text-[#4c9c74] hover:text-[#245e41] font-bold py-2"
              onClick={handleShowMore}
            >
              {showMore ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>  
      <div className=" justify-center w-full  ">
        <iframe
          className="w-full max-h-60 rounded-lg"
          height="315"
          src={`https://www.youtube.com/embed/${video_id}?start=${Math.floor(
            start
          )}`}
          allowFullScreen
        ></iframe>
      </div>
      </div>
      
      </motion.div>
    </div>
  );
};

export default VideoElement;