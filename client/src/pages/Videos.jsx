import Link from "next/link";
import { useState,useEffect } from "react";

import  Header  from "../components/Header";
import SearchBar from '../components/SearchBar';
import VideoBox from "@/components/VideoBox";

import React from "react";
import Head from "next/head";

const VideoSearch = ({ children }) => {
  return (
    <>
      <Header/>
      <Head>
        <title>Video Search</title>
      </Head>
      <div className="bg-zinc-900 text-zinc-200 h-screen py-32">
        <div className="flex flex-col gap-10 items-center p-6">
          <SearchBar />
          <div className="flex flex-col items-center w-full">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoSearch;
