import React, { useState, useEffect } from "react";
import { Movie } from "../types/types";
import { updateMovie } from "../services/api";
import { toast } from "react-toastify";

interface EditFormProps {
  movie: Movie;
  onUpdate: (movie: Movie) => void;
  onClose: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ movie, onUpdate, onClose }) => {
  const [title, setTitle] = useState(movie.title);
  const [publishingYear, setPublishingYear] = useState(
    movie.publishingYear.toString()
  );
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState({
    title: "",
    publishingYear: "",
  });

  useEffect(() => {
    setTitle(movie.title);
    setPublishingYear(movie.publishingYear.toString());
  }, [movie]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setErrors({ ...errors, title: "" });
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPublishingYear(e.target.value);
    setErrors({ ...errors, publishingYear: "" });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (allowedTypes.includes(selectedFile.type)) {
        setImage(selectedFile);
      } else {
        toast.error("Please select a valid image file (PNG, JPG, JPEG).");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title) {
      setErrors({ ...errors, title: "Title is required" });
      return;
    }

    if (!publishingYear) {
      setErrors({ ...errors, publishingYear: "Publishing Year is required" });
      return;
    }

    try {
      const userDataString = localStorage.getItem("userData");
      const token = localStorage.getItem("token");

      if (!userDataString || !token) {
        return;
      }
      const userData = JSON.parse(userDataString);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("publishingYear", publishingYear);
      formData.append("userId", userData._id);
      if (image) {
        formData.append("image", image);
      }

      const response = await updateMovie(movie._id, formData);
      toast.success("Movie updated successfully");
      const updatedMovie: Movie = response;
      onUpdate(updatedMovie);
      onClose();
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Edit Movie</h2>
          <div>
            <button onClick={onClose} className="text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title:
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            className={`mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.title ? "border-red-500" : ""
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic">{errors.title}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="publishingYear"
            className="block text-sm font-medium text-gray-700"
          >
            Publishing Year:
          </label>
          <input
            id="publishingYear"
            type="number"
            value={publishingYear}
            onChange={handleYearChange}
            className={`mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.publishingYear ? "border-red-500" : ""
            }`}
          />
          {errors.publishingYear && (
            <p className="text-red-500 text-xs italic">
              {errors.publishingYear}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Movie Image:
          </label>
          <input
            id="image"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default EditForm;
