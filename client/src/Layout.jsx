import Link from "next/link"
import { Container } from "postcss"

import  Header  from "./components"
import Footer from "./components/Footer"
import SectionWrapper from './hoc/SectionWrapper'

import React from 'react'

// there is an error here : the layout functionality doesn't work
// the layout is for external pages to have the header and the footer of the app

const Contain = () => {
  return (
    <div className="max-w-[1280px] w-full m-auto">

    </div>
  )
}




export const Layout = ({children}) => {
  return (
    <Contain className="max-w-[1280px] w-full m-auto">
        <Header/>
            <main>{children}</main>
        <Footer/>
    </Contain>
  )
}

export default Layout