import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { styles } from "@/styles/style";

const Search = () => {
  const router = useRouter();
  const SearchParams = useSearchParams();
  const query = SearchParams ? SearchParams.get("query") : "";
  const [searchQuery, setSearchQuery] = useState(query);

  const handleSearch = (event) => {
    event.preventDefault();
    const encodedquery = encodeURI(searchQuery);
    router.push(`/search?query=${encodedquery}&type=${0}`);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          className="px-5 py-1 w-[480px] h-10 sm:px-5 sm:py-3 flex-1 text-zinc-200 bg-tertiary focus:bg-black rounded-full focus:outline-none focus:ring-[1px] focus:ring-[#0e9c7d] placeholder:text-zinc-400 rounded-r-none"
          type="text"
          placeholder="What are you looking for...?"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button
          type="submit"
          className="m-2 px-4 py-2 bg-gradient-to-r from-[#100D25] to-[#66B0A5] text-white font-semibold rounded-lg shadow-md hover:bg-[#0a5344] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 rounded-l-none"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
