const VideoElement = ({ video_id, start, text }) => {
  console.log(start);
  return (
    <div>
      <div>
        <h6>Match:</h6>
        <p>{text}</p>
      </div>
      <div>
        <iframe
          src={`https://www.youtube.com/embed/${video_id}?start=${Math.floor(
            start
          )}`}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoElement;
