import React, { useState } from "react";
import Header from "../components/Header";
import Spinner from "@/components/Spinner";
import UserVideoElement from "@/components/UserVideoElement";

const VideoSearchBar = () => {
  const [url, setUrl] = useState("");
  const [videoID, setVideoID] = useState("");
  const [error, setError] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);

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

  const sendVideoURL = async () => {
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
      localStorage.setItem("token", resJson.token);
    } catch (error) {
      setError(true);
      setLoadingVideo(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#050816] to-[#100D25] min-h-screen">
      <Header />
      {/* <h1 className=""> search in your videos</h1> */}
      <div className="w-6/12 pl-5 pt-32 h-full">
        <div className="flex animate-slideBottom ">
          <input
            type="text"
            className="border border-gray-400 rounded-l px-4 py-2 w-full mb-4"
            placeholder="Paste a video URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            className="bg-[#24BAB8] text-white w-32 px-4 py-2 rounded-r mb-4"
            onClick={sendVideoURL}
          >
            <span>get video</span>
          </button>
        </div>
        {/* the video elemnt */}
        <div className="h-5/6 rounded flex justify-center">
          {loadingVideo ? (
            <Spinner />
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
