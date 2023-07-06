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
      name: 'Ahmed Behairy',
      job: 'Job 1',
      image: '/person1.jpg',
      linkedin: 'https://www.linkedin.com/',
      github: 'https://github.com/',
      gmail: 'a.behairy@gmail.com',
    },
    {
      name: "Adel Ma'mon",
      job: 'Job 2',
      image: '/person1.jpg',
      linkedin: 'https://www.linkedin.com/',
      github: 'https://github.com/',
      gmail: 'a.behairy@gmail.com',
    },{
      name: 'Mohamed AbuElnasr',
      job: 'Job 3',
      image: '/person1.jpg',
      linkedin: 'https://www.linkedin.com/',
      github: 'https://github.com/',
      gmail: 'a.behairy@gmail.com',
    },{
      name: 'Ibrahim Rabee',
      job: 'Job 4',
      image: '/person1.jpg',
      linkedin: 'https://www.linkedin.com/',
      github: 'https://github.com/',
      gmail: 'a.behairy@gmail.com',
    },{
      name: 'Mahmoud Hassanen',
      job: 'Job 5',
      image: '/person1.jpg',
      linkedin: 'https://www.linkedin.com/',
      github: 'https://github.com/',
      gmail: 'a.behairy@gmail.com',
    },{
      name: 'Mohamed Ammar',
      job: 'Job 6',
      image: '/person1.jpg',
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
        className="mySwiper  animate-zoomIn ml-10 px-10"
      >
        {persons.map((person, index) => (
        <SwiperSlide key={index}>
          <Card {...person} />
        </SwiperSlide>
      ))}
      </Swiper>

    </div>
  );
}
