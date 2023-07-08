import React, { useState } from 'react';
import Header from "../components/Header";
import { styles } from "@/styles/style";


const VideoSearchBar = () => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setUrl(event.target.value);
    setError('');
  };

  const handleSearch = () => {
    // Remove leading and trailing whitespace from the URL
    const trimmedUrl = url.trim();

    // Validate the URL format
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    const youtubePattern = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([\w-]{11})/;
    const youtubeQueryPattern = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?([\w-]+=[\w-]+&)*v=([\w-]{11})/;

    if (urlPattern.test(trimmedUrl)) {
      // Direct video URL
      playVideo(trimmedUrl);
    } else if (youtubePattern.test(trimmedUrl) || youtubeQueryPattern.test(trimmedUrl)) {
      // YouTube video URL
      const videoId = youtubePattern.exec(trimmedUrl)[3] || youtubeQueryPattern.exec(trimmedUrl)[5];
      const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}`;
      playVideo(youtubeEmbedUrl);
    } else {
      setError('Error, please enter a valid video URL');
    }

    // Clear the URL in the search bar
    setUrl('');
  };

  const playVideo = (videoUrl) => {
    // Clear the error
    setError('');

    // Update the video source with the provided URL
    const videoContainer = document.getElementById('content-video');
    videoContainer.innerHTML = `<iframe src="${videoUrl}" frameborder="0" allowfullscreen style="width: 640px; height: 360px; border: 1px solid #24BAB8;"></iframe>`;
  };

  return (
     <div className='bg-gradient-to-r from-[#050816] to-[#100D25] min-h-screen'>
      <Header/>
      {/* <h1 className=''> search in your videos</h1> */}
      <div className='w-[680px] pl-[40px] pt-32'>
        <div className="flex animate-slideBottom">
          <input
            type="text"
            className="border border-gray-400 rounded-l px-4 py-2 w-full"
            placeholder="Paste a video URL"
            value={url}
            onChange={handleInputChange}
          />
          <button
            className="bg-[#24BAB8] text-white px-4 py-2 rounded-r"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {error && (
          <div className="bg-red-200 text-red-800 px-4 py-2 rounded mt-4">
            {error}
          </div>
        )}
        <div className="mt-4 animate-slideTop">
          <div
            id="content-video"
            className="border border-[#24BAB8] rounded-lg h-[360px] w-[640px]"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoSearchBar;
