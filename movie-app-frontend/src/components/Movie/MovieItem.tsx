import React, { useState } from "react";
import { Movie } from "../../types/types";
import DeleteConfirmation from "../DeleteConfirmation";
import EditForm from "../EditMovieForm";

interface MovieItemProps {
  movie: Movie;
  onDelete: (id: string) => void;
  handleUpdate: any;
}

const MovieItem: React.FC<MovieItemProps> = ({
  movie,
  onDelete,
  handleUpdate,
}) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      onDelete(id);
      setIsDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <>
      <div
        className="max-w-md bg-white shadow-md rounded-lg overflow-hidden m-4 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-start items-start p-2 z-20">
          {isHovered && (
            <>
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-50 z-10"></div>
              <div className="absolute top-1/4 left-1/4 right-0 bottom-0 flex justify-start items-start p-2 z-20 gap-2">
                <div className="flex items-center bg-white p-3 rounded-full shadow-lg cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    onClick={() => setIsEditOpen(true)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </div>
                <div className="flex items-center bg-white p-3 rounded-full shadow-lg cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    onClick={() => setIsDeleteOpen(true)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
              </div>
            </>
          )}
        </div>
        <img
          src={`${process.env.REACT_APP_BASE_URL_uploads}${movie.image}`}
          alt={movie.title}
          className="w-full h-72 object-contain rounded-t-lg"
        />
        <div className="p-4">
          <h2
            className="text-lg font-semibold mb-2 text-gray-600 overflow-hidden whitespace-nowrap overflow-ellipsis"
            title={movie.title}
          >
            {movie.title}
          </h2>
          <p className="text-gray-600 text-sm">{movie.publishingYear}</p>
        </div>
        <DeleteConfirmation
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onDelete={() => handleDelete(String(movie._id))}
        />
        {isEditOpen && (
          <EditForm
            movie={movie}
            onClose={() => setIsEditOpen(false)}
            onUpdate={handleUpdate}
          />
        )}
      </div>
    </>
  );
};

export default MovieItem;
