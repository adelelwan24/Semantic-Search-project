import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '../components/Header'

import Hero from '../components/Hero'
import SearchType from '../components/SearchType'
import  Contact from '../components/Contact'
import  About from '../components/About'
import Footer from '@/components/Footer'


import { StarsCanvas } from '@/components'


export default function Home() {
  return (
    <div className='relative z-0 bg-primary'>
      <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
        <Header/>
        <Hero />
      </div>
      <section>
        <SearchType/>
        <Contact/>
        <About/>
      </section>
      <div className='relative z-0'>
        <StarsCanvas/>
      </div>
      <Footer/>
    </div>
  )
}
