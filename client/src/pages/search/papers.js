import { useSearchParams } from "next/navigation";
import { useState } from "react";

import Header from "../../components/Header";
import Head from "next/head";
import PapersSearchBar from "../../components/PapersSearchBar";
import useSWR from "swr";
import Spinner from "@/components/Spinner";
import PaperElement from "@/components/PaperElement";

const fetchResults = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to search!");
  }
  return response.json();
};

export default function Search() {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const SearchParams = useSearchParams();
  const Query = SearchParams ? SearchParams.get("query") : null;

  const { data, isLoading, error } = useSWR(
    `http://127.0.0.1:5000/papers/search?query=${Query}`,
    fetchResults
  );

  return (
    <div className="bg-gradient-to-r from-[#050816] to-[#100D25] min-h-screen">
      <Header />
      <Head>
        <title>Paper Search</title>
      </Head>

      <div className=" text-zinc-200  py-32 ">
        <div className="flex flex-col gap-10 items-center p-6 ">
          <PapersSearchBar />

          <div className="flex flex-col items-center w-full">
            {Query === null || Query === "" ? (
              <></>
            ) : isLoading ? (
              <Spinner />
            ) : error ? (
              <>Server Not Working</>
            ) : (
              data.map((ele) => (
                <div key={ele.id}>
                  <PaperElement
                    paper_id={ele.id}
                    title={ele.title}
                    abstract={ele.abstract}
                  />
                </div>
              ))
            )}
          </div>
          <div className="border border-teal-500 h-96 w-2/5">

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
