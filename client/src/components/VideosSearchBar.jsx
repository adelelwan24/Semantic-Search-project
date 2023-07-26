import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { styles } from "@/styles/style";

const VideosSearchBar = () => {
  const router = useRouter();
  const SearchParams = useSearchParams();
  const query = SearchParams ? SearchParams.get("query") : "";
  const [searchQuery, setSearchQuery] = useState(query);

  const handleSearch = (event) => {
    event.preventDefault();
    const encodedquery = encodeURI(searchQuery);
    router.push(`/search/videos?query=${encodedquery}`);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          className="px-5 py-1 w-[700px] h-16 sm:px-5 sm:py-3 flex-1 text-zinc-200 bg-tertiary focus:outline-none  focus:ring-[#0e9c7d] placeholder:text-zinc-400 rounded-r-none"
          type="text"
          placeholder="What are you looking for...?"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button
          type="submit"
          className="m-2 px-4 py-2 bg-[#0e9c7d] h-16 text-gray-200  font-semibold  shadow-md hover:bg-[#0a5344] focus:outline-none  focus:ring-opacity-75 "
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default VideosSearchBar;
