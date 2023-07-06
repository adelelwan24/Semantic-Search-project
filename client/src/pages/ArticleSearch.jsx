import React, { useState } from 'react';
import Header from "../components/Header";
import { styles } from "@/styles/style";

const SearchBar = () => {
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
    if (!urlPattern.test(trimmedUrl)) {
      setError('Error, please enter a valid URL of a PDF or an article');
      return;
    }

    // Clear the error
    setError('');

    // Update the iframe source with the provided URL
    const iframe = document.getElementById('content-iframe');
    iframe.src = trimmedUrl;

    // Clear the URL in the search bar
    setUrl('');
  };

  const iframeStyle = {
    backgroundColor: '#F0F0F0',
  };

  return (
   <div className='bg-gradient-to-r from-[#050816] to-[#100D25] min-h-screen'>
    <Header/>
    <div className='w-[680px] pl-[40px] pt-32'>
      <div className="flex animate-slideBottom">
        <input
          type="text"
          className="border border-gray-400 rounded-l px-4 py-2 w-full"
          placeholder="Paste a URL"
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
        <iframe
          id="content-iframe"
          title="Content"
          className="border border-[#24BAB8] rounded-lg w-[640px] h-[640px]"
          allowtransparency="true"
          style={iframeStyle}
        />
      </div>
    </div>
  </div>
  );
};

export default SearchBar;
