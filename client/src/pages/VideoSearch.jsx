import React, { useState } from "react";
import Header from "../components/Header";
import Spinner from "@/components/Spinner";
import UserVideoElement from "@/components/UserVideoElement";

const VideoSearchBar = () => {
  const [url, setUrl] = useState("");
  const [videoID, setVideoID] = useState("");
  const [error, setError] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [videoExist, setVideoExist] = useState(false);

  const delete_token = async (token) => {
    try {
      let response = await fetch("http://127.0.0.1:5001/removeindex", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      });
      if (!response.ok) {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  };

  const sendVideoURL = async (event) => {
    event.preventDefault();
    var token = localStorage.getItem("token");
    if (token) {
      delete_token(token);
    }
    setLoadingVideo(true);
    try {
      let response = await fetch("http://127.0.0.1:5001/storevideo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }),
      });
      if (!response.ok) {
        setError(true);
        setLoadingVideo(false);
        return;
      }
      let resJson = await response.json();
      console.log(resJson);
      setLoadingVideo(false);
      setError(false);
      setVideoID(resJson.video_id);
      setVideoExist(true);
      localStorage.setItem("token", resJson.token);
    } catch (error) {
      setError(true);
      setLoadingVideo(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#050816] to-[#100D25] min-h-screen flex justify-center">
      <Header />
      {/* <h1 className=""> search in your videos</h1> */}
      <div className=" pt-24 w-[900px]">
        <div>
          {videoExist ? (
            <button
              onClick={() => {
                setVideoExist(false);
                setVideoID("");
              }}
              className="px-4 pt-2 bg-[#0e9c7d] h-16 w-46 text-gray-200  font-semibold  shadow-md hover:bg-[#0a5344] focus:outline-none  focus:ring-opacity-75 "
            >
              Search in another video
            </button>
          ) : (
            <form onSubmit={sendVideoURL}>
              <input
                className="px-5 py-1 w-[700px] h-16 sm:px-5 sm:py-3 flex-1 text-zinc-200 bg-tertiary focus:outline-none  focus:ring-[#0e9c7d] placeholder:text-zinc-400 rounded-r-none"
                type="text"
                placeholder="Paste the video URL"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
              />
              <button
                type="submit"
                className="ml-2 mb-2 mt-2 px-4 py-2 w-48 bg-[#0e9c7d] h-16 text-gray-200  font-semibold  shadow-md hover:bg-[#0a5344] focus:outline-none  focus:ring-opacity-75 "
              >
                Get the video
              </button>
            </form>
          )}
        </div>
        {/* the video elemnt */}
        <div className="h-5/6 rounded flex justify-center ">
          {loadingVideo ? (
            <div className="mt-10">
              <Spinner />
            </div>
          ) : error ? (
            <>there was an error loading the video</>
          ) : videoID ? (
            <UserVideoElement video_id={videoID} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoSearchBar;
