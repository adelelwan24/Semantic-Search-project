import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/motion';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { AiFillGithub, AiFillLinkedin, AiFillMail } from 'react-icons/ai';

const Card = ({ name, job, image, linkedin, github, gmail }) => {
  return (
    <div className="xs:w-[250px]">
      <motion.div
        variants={fadeIn('right', 'spring', 0.5, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div
          className="bg-tertiary rounded-[20px] px-12 min-h-[450px] flex justify-evenly items-center flex-col"
        >
          <img src={image} className="object-cover overflow-hidden rounded-2xl" alt={name} />
          <h2 className="text-white text-[20px] font-bold text-center">{name}</h2>
          <hr className="w-20 h-1 mx-auto my-1 border-1 bg-yellow-400" />
          <h3 className="text-secondary text-[16px] font-bold text-center">{job}</h3>

          <div className="flex space-x-4">
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              <AiFillLinkedin className="w-6 h-6" />
            </a>
            <a href={github} target="_blank" rel="noopener noreferrer">
              <AiFillGithub className="w-6 h-6" />
            </a>
            <a href={gmail} target="_blank" rel="noopener noreferrer">
              <AiFillMail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
