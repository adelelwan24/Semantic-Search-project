import { useSearchParams } from "next/navigation";
import { useState } from "react";

import Header from "../../components/Header";
import Head from "next/head";
import SearchBar from "../../components/SearchBar";
import useSWR from "swr";
import Spinner from "@/components/Spinner";
import VideoElement from "@/components/VideoElement";

const fetchResults = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to search!");
  }
  return response.json();
};

export default function Search() {
  // types are : videos, papers, both ....
  // videos : 0
  // papers : 1
  // both : 2
  // set default to videos ( 0 )

  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const SearchParams = useSearchParams();
  const Query = SearchParams ? SearchParams.get("query") : "";
  const Type = SearchParams ? SearchParams.get("type") : 0;

  const { data, isLoading } = useSWR(
    `http://127.0.0.1:5030/videos/search?query=${Query}`,
    fetchResults
  );
  return (
    <div className="bg-gradient-to-r from-[#050816] to-[#100D25] min-h-screen">
      <Header />
      <Head>
        <title>Video Search</title>
      </Head>

      <div className="bg-zinc-900 text-zinc-200 h-screen py-32 ">
        <div className="flex flex-col gap-10 items-center p-6 ">
          <SearchBar />

          <div className="px-80 flex flex-wrap items-center w-full">
            {data.map((ele) => (
             <div key={ele.id} className="items-center">
             {isLoading ? (
               <Spinner />
             ) : (
               data.map((ele) => (
                 <div key={ele.id}>
                   <VideoElement
                     video_id={ele.video_id}
                     start={ele.start_time}
                     text={ele.text}
                   />
                 </div>
               ))
             )}
           </div>
            ))}
          </div>
          <button
            className={`hover:bg-[#0e9c7d] text-white font-bold py-2 px-4 rounded-full mt-8 flex items-center ${
              showMore ? "display" : ""
            }`}
            onClick={handleShowMore}
          >
            Show More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline-block ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 14a.75.75 0 01-.53-.22L5.47 9.53a.75.75 0 111.06-1.06L10 11.94l3.47-3.47a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-.53.22z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
