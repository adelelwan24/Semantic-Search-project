import Image from "next/image";

const Posts = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <div className="flex p-3 gap-4 my-3 rounded-xl border-[1px] border-zinc-600 w-3/4">
          <div>
            <Image
              src={post.author.imageUrl || ""}
              alt="avatar"
              height={52}
              width={52}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xl font-semibold">{post.author.name}</span>
            <span className="text-lg font-light">{post.body}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default Posts;
