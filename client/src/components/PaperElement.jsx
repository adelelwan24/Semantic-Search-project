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
    <div className=" m-4 p-[1px] rounded-[5px] w-[800px] items-left flex flex-wrap  green-pink-gradient  shadow-card">
      <motion.div variants={fadeIn("left", "spring", 0.5, 0.75)}>
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="bg-tertiary rounded-[5px] py-10 px-12 min-h-[px]"
        >
          <p className="text-[#0e9c7d] mb-4 text-xl text-left underline">
            <a target="_blank" href={`https://arxiv.org/abs/${paper_id} `}>
              {title.trim()}
            </a>
          </p>
          <div>
            <p>{abstract}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaperElement;
