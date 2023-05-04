const VideoBox = ({ video }) => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden  max-w-3xl mx-auto px-4 py-8 ">
        <img
          src='/video.png'
          alt='video'
          className="w-full h-80 object-cover"
        />
        <div className="px-2">
          <h2 className="text-lg font-medium mb-2">videos</h2>
          <p className="text-gray-500 text-sm">search in our videos</p>
        </div>
      </div>
    );
  };
  
  export default VideoBox;
  