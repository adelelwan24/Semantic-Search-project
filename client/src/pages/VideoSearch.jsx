import Link from "next/link";
import { useState,useEffect } from "react";
import ReactPlayer from "react-player";
import Header from "../components/Header";
import Layout from "@/Layout";
import { styles } from "@/styles/style";

const VideoSearch = ({ id, start, text }) => {
  console.log(start);

  const [videoUrl, setVideoUrl] = useState("");

  const handleVideoUrlChange = (event) => {
    setVideoUrl(event.target.value);
  };

  const handleUploadButtonClick = (event) => {
    event.preventDefault();
    document.getElementById("fileInput").click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const videoUrl = URL.createObjectURL(file);
    setVideoUrl(videoUrl);
  };

  const handlePlayPauseButtonClick = () => {
    const player = document.getElementById("reactPlayer");
    if (player) {
      player.paused ? player.play() : player.pause();
    }
  };

  return (
    <>
      <Header />
      <h2 className={`${styles.sectionHeadText} px-20 text-[60px] py-20` }>
            Search in your videos
          </h2>
      < section className ="container relative w-full h-screen  mx-auto flex flex-col md:flex-row ">
        {/* leftSection */}
        <div className="md:w-1/2 md:pr-16 ">
          {/* searchBar */}
          <div className="flex items-center relative mb-4 animate-slideBottom">
            <input
              className="w-full h-10 px-10 rounded-2xl border-none bg-gray-200 shadow-inner text-lg outline-none"
              type="text"
              placeholder="Paste video URL here.."
              value={videoUrl}
              onChange={handleVideoUrlChange}
            />

            <label className="absolute top-0 right-0 w-24 h-10 text-white bg-blue-900 cursor-pointer border border-white rounded-full flex items-center justify-center">
              Upload
              <input type="file" id="fileInput" className="hidden" onChange={handleFileInputChange} />
            </label>

            {/* upload button  */}
            <button
              className="relative border-none bg-transparent outline-none cursor-pointer ml-[-40px] "
              onClick={handleUploadButtonClick}
            >
              <span className="absolute top-[-10px] left-[-20px] text-white font-bold text-sm opacity-0 transition-opacity duration-200">
                Upload
              </span>
              {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v8m0 0v8m0-8h8m-8 0H4" />
                </svg> */}
            </button>
          </div>

          {/* videoBox */}
          <div className="bg-tertiary rounded-[20px]  px-12 min-h-[450px]  flex justify-evenly items-center flex-col relative animate-slideTop">
            <div className="embed-responsive embed-responsive-16by9">
              <iframe className="embed-responsive-item" src={"https://www.youtube.com/embed/" + id + "?start=" + Math.floor(start)} allowFullScreen />

            </div>
            <button
              className="absolute top-0 left-0 h-full w-full bg-transparent"
              onClick={handlePlayPauseButtonClick}
            ></button>
          </div>
        </div>

        {/* rightSection */}
        <div className="ml-80 md:w-1/2 absolute top-0 left-40 animate-slideLeft">
              <div className=" flex items-center justify-center ">
                 <img className="h-400 object-cover " src="/video.png" />
              </div>
        </div>
      </section>    
    </>
          )
          }

export default VideoSearch;