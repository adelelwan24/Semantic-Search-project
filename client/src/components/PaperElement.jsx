import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "@/utils/motion";
import { styles } from "@/styles/style";

const PaperElement = ({ paper_id, title, abstract }) => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className=" m-4 p-[1px] rounded-[20px] items-left flex flex-wrap max-w-2xl  green-pink-gradient  shadow-card xs:w-[px]">
      <motion.div variants={fadeIn("left", "spring", 0.5, 0.75)}>
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="bg-tertiary rounded-[20px] py-10 px-12 min-h-[px] flex justify-evenly items-center flex-col xs:w-[px]"
        >
          <p className="text-[#1c4c78] mb-4 text-xl text-left">
            <a href={`https://arxiv.org/abs/${paper_id}`}>{title.trim()}</a>
          </p>
          <div>
            <p>{showMore ? abstract : `${abstract.slice(0, 100)}...`}</p>
            {abstract.length > 50 && (
              <button
                className="text-[#4c9c74] hover:text-[#245e41] font-bold py-2"
                onClick={handleShowMore}
              >
                {showMore ? "Show less" : "Show more"}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaperElement;
