import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player"; // Import YouTube-specific ReactPlayer



function VideoPlayer() {
  const location = useLocation(); // To access the movie details passed via state
  const navigate = useNavigate();

  const movie = location.state?.movie; // Extract the movie object
  if (!movie) {
    return (
      <div className="text-center mt-20">
        <h2>No movie selected!</h2>
        <button
          className="btn btn-primary mt-4"
          onClick={() => navigate("/movies")}
        >
          Go Back to Movies
        </button>
      </div>
    );
  }
   // Function to determine if the URL is an MP4 file
   const isMP4 = (url) => {
    return url.endsWith(".mp4");
  };

  return (
    <>
   
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 bg-white p-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold mt-20 ">{movie.name}</h2>
        <p className="my-8 text-gray-600">{movie.description}</p>
      </div>

      <div className="flex justify-center">
        {/* Check if the video is an MP4 file */}
        {isMP4(movie.videoUrl) ? (
          // Use the <video> element for MP4 files
          <video
            src={movie.videoUrl}
            controls
            width="100%"
            height="100%"
          />
        ) : (
          // Use ReactPlayer for non-MP4 videos (e.g., YouTube)
          <ReactPlayer
            url={movie.videoUrl}
            controls
          />
        )}
      </div>

      <div className="text-center mt-8">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/movies")}
        >
          Back to Movies
        </button>
      </div>
    </div>
    </>
  );

}

export default VideoPlayer;
