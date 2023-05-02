import Link from "next/link";
import { motion } from "framer-motion";

import { styles } from "@/styles/style";
import { staggerContainer } from "@/utils/motion";

const SectionWrapper = (Component, idName) =>
function Hoc() {
    return (
        <motion.section
            variants={staggerContainer()}
            initial='hidden'
            whileInView='show'
            viewport={{once: true, amount:0.25}}
            className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
        >
            <Component/>
        </motion.section>
    )
}

export default SectionWrapper