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

  const data = [
    {
      id: 1244,
      start_time: 34.83,
      text: "JOHN GUTTAG: Hello, everybody.The last reading assignment of the semester, at least from us. Course evaluations are still available through this Friday. But only till noon. Again, I urge you all to do it. ",
      video_id: "K2SC-WPdT6k",
    },
    {
      id: 1410,
      start_time: 1396.1779999999992,
      text: 'Ken Olsen, an MIT graduate-- I should say, a course 6 graduate-- was the founder and president and chair of Digital Equipment Corporation, which in 1977 was the second largest computer manufacturer in the world based in Maynard, Massachusetts.They disappeared. And this is in part why, because Ken said, "there\'s no reason anyone would want a computer in their home," and totally missed that part of computation. Finally, since this is the end of some famous last words, Douglas Fairbanks, Sr., a famous actor-- this is true-- the last thing he said before he died was, "never felt better." Amazing. This was from the movie The Mark of Zorro. ',
      video_id: "iOZVbILaIZc",
    },
    {
      id: 116,
      start_time: 1034.1079999999995,
      text: "AUDIENCE: [INAUDIBLE] JOHN GUTTAG: Exactly.You store the answer and then look it up when you need it. Because we know that we can look things up very quickly. Dictionary, despite what Eric said in his lecture, almost all the time works in constant time if you make it big enough, and it usually is in Python. We'll see later in the term how to do that trick. ",
      video_id: "uK5yvoXnkSk",
    },
    {
      id: 1409,
      start_time: 1383.9119999999994,
      text: "This is, having written a book recently, the editor in charge of books for Prentice Hall.And I can assure you that data processing is a fad that won't last out the year.\" MIT had that attitude for a while. For about 35 years, computer science was in a building off campus, because they weren't sure we were here to stay. Maybe that's not why, but that's why I interpret it. Ken Olsen, an MIT graduate-- I should say, a course 6 graduate-- was the founder and president and chair of Digital Equipment Corporation, which in 1977 was the second largest computer manufacturer in the world based in Maynard, Massachusetts. ",
      video_id: "iOZVbILaIZc",
    },
    {
      id: 1182,
      start_time: 340.58400000000006,
      text: "Now if we look at this, and we use K nearest neighbors, those are the three nearest to the first numeral, and they are all fours.And so we vote and we decide it's a zero. Is it infallible? No. But it's typically much more reliable than just nearest neighbors, hence used much more often. And that was our problem, by the way, with the alligator. ",
      video_id: "eg8DJYwdMyg",
    },
  ];
  return (
    <>
      <Header />
      <Head>
        <title>Video Search</title>
      </Head>
      <div className="bg-zinc-900 text-zinc-200 h-screen py-32">
        <div className="flex flex-col gap-10 items-center p-6 ">
          <SearchBar />

          <div className="px-24 flex flex-wrap items-center w-full">
            {data.map((ele) => (
              <div key={ele.id} className="">
                <VideoElement
                  video_id={ele.video_id}
                  start={ele.start_time}
                  text={ele.text}
                />
              </div>
            ))}
          </div>
            <button
              className=" hover:bg-[#0e9c7d] text-white font-bold py-2 px-4 rounded-full mt-8 flex items-center "
              onClick={handleShowMore}
            >
              {showMore ? "Show less" : "Show more"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 inline-block ml-2 ${
                  showMore ? "transform rotate-180" : ""
                }`}
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
    </>
  );
}
