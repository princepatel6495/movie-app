import React, { useEffect, useState } from "react";
import { Movie } from "../types/types";
import MovieItem from "../components/Movie/MovieItem";
import { deleteMovie, fetchMovies } from "../services/api";
import AddMovieForm from "../components/AddMovieForm";

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId: any = localStorage.getItem("userData");
    if (!userId) {
      return;
    }

    const userData = JSON.parse(userId);
    const token = localStorage.getItem("token");

    if (userData && userData._id && token) {
      const getMovies = async () => {
        try {
          const data = await fetchMovies();
          setMovies(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching movies:", error);
          setLoading(false);
        }
      };

      getMovies();
    }
  }, []);

  const handleAddMovie = (movie: Movie) => {
    setMovies([...movies, movie]);
    setShowAddForm(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMovie(id);
      setMovies(movies.filter((movie) => movie._id !== id));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  const handleUpdate = async (data: any) => {
    setMovies(movies.map((movie) => (movie._id === data._id ? data : movie)));
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold mb-4">List of Movies</h1>
        {movies && movies.length > 0 && (
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
          >
            Add Movie
          </button>
        )}
      </div>
      {showAddForm && (
        <AddMovieForm
          onAddMovie={handleAddMovie}
          onClose={() => setShowAddForm(false)}
        />
      )}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center text-gray-600">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
            <p className="text-xl mt-4">Loading...</p>
          </div>
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center text-gray-600 mt-32">
          <p className="text-xl mb-4">No records found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {movies.map((movie, index) => (
            <MovieItem
              key={index}
              movie={movie}
              onDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
