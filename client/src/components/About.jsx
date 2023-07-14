import React, { useRef, useState } from 'react';
import { styles } from "@/styles/style";

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow'


import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules';

import Card from './Card';

export default function App() {

  const persons = [
    {
      name: 'Mohamed AbuElnasr',
      job: 'AI Enginner',
      image: '/AbuElnasr.jpg',
      linkedin: 'https://www.linkedin.com/',
      github: 'https://github.com/',
      gmail: 'a.behairy@gmail.com',
    },
    {
      name: "Adel Ma'mon",
      job: 'AI Engineer',
      image: '/Adel.png',
      linkedin: 'https://www.linkedin.com/',
      github: 'https://github.com/',
      gmail: 'a.behairy@gmail.com',
    },
    {
      name: 'Ahmed Behairy',
      job: 'Front-End developer',
      image: '/Behairy.jpg',
      linkedin: 'https://www.linkedin.com/',
      github: 'https://github.com/',
      gmail: 'a.behairy@gmail.com',
    },
    {
      name: 'Ibrahim REabea',
      job: 'AI Engineer',
      image: '/Rabee.jpg',
      linkedin: 'https://www.linkedin.com/',
      github: 'https://github.com/',
      gmail: 'a.behairy@gmail.com',
    },
    {
      name: 'Mahmoud Hassanen',
      job: 'Data Analyst',
      image: '/Hassanen.jpg',
      linkedin: 'https://www.linkedin.com/',
      github: 'https://github.com/',
      gmail: 'a.behairy@gmail.com',
    },
    {
      name: 'Mohamed Ammar',
      job: 'machine learning engineer',
      image: '/Ammar.jpg',
      linkedin: 'https://www.linkedin.com/',
      github: 'https://github.com/',
      gmail: 'a.behairy@gmail.com',
    },
  ];

  return (
    <div id='about' className='py-36 '>
      <h2 className={`${styles.sectionHeadText} font-serif font-abril-fatface text-4xl font-bold text-[60px] mb-20 ml-14 animate-slideRight`}>
          About Us
        </h2>
      <Swiper
        effect={'coverflow'}
        centeredSlides={true}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{
          clickable: false,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation,EffectCoverflow]}
        className="mySwiper  animate-zoomIn ml-10 "
      >
        {persons.map((person, index) => (
        <SwiperSlide key={index} className='ml-6'>
          <Card {...person} />
        </SwiperSlide>
      ))}
      </Swiper>

    </div>
  );
}
