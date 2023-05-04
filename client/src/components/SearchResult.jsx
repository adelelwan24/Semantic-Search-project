import { useRouter } from 'next/router';
import { useSearchParams } from 'next/dist/client/search';
import useSWR from 'swr';
import Spinner from '../components/Spinner';
import Posts from '../components/Posts';

const fetchPosts = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  return response.json();
};

const SearchPage = () => {
  const router = useRouter();
  const search = useSearchParams();
  const searchQuery = search ? search.get('q') : null;

  const encodedSearchQuery = encodeURI(searchQuery || '');

  const { data, error } = useSWR(
    `/api/search?q=${encodedSearchQuery}`,
    fetchPosts,
    { revalidateOnFocus: false }
  );

  if (!encodedSearchQuery) {
    router.push('/');
    return null;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <Spinner />;
  }

  return (
    <div className="text-xl">
      Showing results for:{' '}
      <span className="font-semibold">{searchQuery}</span>
      <Posts posts={data.posts} />
    </div>
  );
};

export default SearchPage;
