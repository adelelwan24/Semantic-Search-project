import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "@/utils/motion";
import Spinner from "@/components/Spinner";

const UserVideoElement = ({ video_id }) => {
  const [query, setQuery] = useState("");
  const [start, setStart] = useState(0);
  const [error, setError] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);
  const [results, setResults] = useState([]);
  // const [autoplay, setAutoplay] = useState(0);

  const handleSearch = async () => {
    setLoadingResults(true);
    try {
      let response = await fetch("http://127.0.0.1:5001/search", {
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
    } catch (error) {
      setError(true);
      setLoadingResults(false);
    }
  };

  return (
    <div className="w-full justify-center ">
      <motion.div variants={fadeIn("right", "spring", 0.5, 0.75)}>
        <div className="px-28">
          <input
            className="px-5 py-1 w-5/6 h-10 sm:px-5 sm:py-3 flex-1 text-zinc-200 bg-tertiary focus:bg-black rounded-full focus:outline-none focus:ring-[1px] focus:ring-[#0e9c7d] placeholder:text-zinc-400 rounded-r-none"
            type="text"
            placeholder="What are you looking for in this video...?"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button
            className="m-2 px-4 py-2 bg-gradient-to-r from-[#100D25] to-[#66B0A5] text-gray-200 font-semibold rounded-lg shadow-md hover:bg-[#0a5344] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 rounded-l-none"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="w-full mb-5 mt-5">
          <iframe
            className="w-full h-96"
            src={`https://www.youtube.com/embed/${video_id}?start=${Math.floor(
              start
            )}`}
            allowFullScreen
          ></iframe>
        </div>
        <div className="flex">
          {loadingResults ? (
            <Spinner />
          ) : error ? (
            <>there was an error loading the result</>
          ) : (
            results.map((ele) => (
              <div className="bg-black border w-1/5 p-2">
                <a
                  className="cursor-pointer bg-blue"
                  onClick={() => {
                    setStart(ele.start);
                  }}
                >
                  Go To
                </a>
                <p>{ele.text}</p>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default UserVideoElement;
