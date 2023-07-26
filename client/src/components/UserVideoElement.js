import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "@/utils/motion";
import Spinner from "@/components/Spinner";

const UserVideoElement = ({ video_id }) => {
  const [query, setQuery] = useState("");
  const [start, setStart] = useState(0);
  const [error, setError] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);
  const [resultsReturned, setResultsReturned] = useState(false);
  const [results, setResults] = useState([]);
  const [resultIndex, setResultindex] = useState(0);

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoadingResults(true);
    try {
      let response = await fetch("http://127.0.0.1:5000/uservideo/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query,
          token: localStorage.getItem("token"),
        }),
      });
      if (!response.ok) {
        setError(true);
        setLoadingVideo(false);
        return;
      }
      let resJson = await response.json();
      console.log(resJson);
      setLoadingResults(false);
      setError(false);
      setResults(resJson.results);
      setResultsReturned(true);
    } catch (error) {
      setError(true);
      setLoadingResults(false);
      setResultsReturned(false);
    }
  };

  return (
    <div className="w-full justify-center ">
      <motion.div variants={fadeIn("right", "spring", 0.5, 0.75)}>
        <form onSubmit={handleSearch}>
          <input
            className="px-5 w-[700px] h-16 sm:px-5 sm:py-3 flex-1 text-zinc-200 bg-tertiary focus:outline-none  focus:ring-[#0e9c7d] placeholder:text-zinc-400 rounded-r-none"
            type="text"
            placeholder="What are you looking for in this video...?"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button
            type="submit"
            className="ml-2 mb-2 mt-2 px-4 py-2 w-48 bg-[#0e9c7d] h-16 text-gray-200  font-semibold  shadow-md hover:bg-[#0a5344] focus:outline-none  focus:ring-opacity-75 "
          >
            Search
          </button>
        </form>

        <div className="w-full ">
          <iframe
            className="w-full h-96"
            src={`https://www.youtube.com/embed/${video_id}?start=${Math.floor(
              start
            )}`}
            allowFullScreen
          ></iframe>
        </div>
        <div>
          {loadingResults ? (
            <Spinner />
          ) : error ? (
            <>there was an error loading the result</>
          ) : resultsReturned ? (
            <div className="flex flex-col mt-2 ">
              <div className="flex flex-row ">
                {results.map((ele, index) => (
                  <div
                    className={
                      "w-1/5 cursor-pointer flex justify-center items-center h-10" +
                      (index == resultIndex ? " bg-[#0e9c7d]" : " bg-[#0a5344]")
                    }
                    onClick={() => {
                      console.log(results[index].text);
                      setResultindex(index);
                    }}
                  >
                    <p>{`Answer ${index + 1}`}</p>
                  </div>
                ))}
              </div>
              <div className="py-4 bg-[#0e9c7d] px-2">
                <p>{results[resultIndex].text} </p>
                <p
                  className="cursor-pointer underline pt-4"
                  onClick={() => setStart(results[resultIndex].start)}
                >
                  Go to The Answer in the video
                </p>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default UserVideoElement;
