import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Search = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(router.query);
    const query = searchParams.get("q");

    if (query) {
      setSearchQuery(query);
      // Perform search based on the query
      // and update the searchResults state
    }
  }, [router.query]);

  const handleSearch = (event) => {
    event.preventDefault();

    // Update the URL with the search query
    router.push(`/search?q=${searchQuery}`);
    // Perform search based on the searchQuery state
    // and update the searchResults state
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          className="px-5 py-1 w-[480px] sm:px-5 sm:py-3 flex-1 text-zinc-200 bg-zinc-800 focus:bg-black rounded-full focus:outline-none focus:ring-[1px] focus:ring-[#0e9c7d] placeholder:text-zinc-400"
          type="text"
          placeholder="What are you looking for...?"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button type="submit" class="px-4 py-2 bg-[#0e9c7d] text-white font-semibold rounded-lg shadow-md hover:bg-[#0a5344] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
  Search
</button>

      </form>
      {searchResults.map((result) => (
        <div key={result.id}>{result.title}</div>
      ))}
    </div>
  );
};

export default Search;
