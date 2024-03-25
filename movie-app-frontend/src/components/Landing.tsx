import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Movie } from "../types/types";

interface MovieItemProps {
  movie: Movie;
}

const Landing: React.FC<MovieItemProps> = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        className="max-w-xs bg-white shadow-md rounded-lg overflow-hidden m-4 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className=" w-full">
          <img
            src={`${process.env.REACT_APP_BASE_URL_uploads}${movie.image}`}
            alt={movie.title}
            className="w-full h-72 object-contain rounded-t-lg"
          />
        </div>
        <div className="p-4">
          <h2
            className="text-lg font-semibold mb-2 text-gray-600 overflow-hidden whitespace-nowrap overflow-ellipsis"
            title={movie.title}
          >
            {movie.title}
          </h2>
          <p className="text-gray-600 text-sm">{movie.publishingYear}</p>
        </div>
      </div>
    </>
  );
};

export default Landing;
