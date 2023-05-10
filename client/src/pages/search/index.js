import { useSearchParams } from "next/navigation";
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
  const SearchParams = useSearchParams();
  const Query = SearchParams ? SearchParams.get("query") : null;
  const Type = SearchParams ? SearchParams.get("type") : 0;

  const { data, isLoading, error } = useSWR(
    `http://127.0.0.1:5030/videos/search?query=${Query}`,
    fetchResults
  );

  return (
    <>
      <Header />
      <Head>
        <title>Video Search</title>
      </Head>
      <div className="bg-zinc-900 text-zinc-200 h-screen py-32">
        <div className="flex flex-col gap-10 items-center p-6">
          <SearchBar />

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
                  <VideoElement
                    video_id={ele.video_id}
                    start={ele.start_time}
                    text={ele.text}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
