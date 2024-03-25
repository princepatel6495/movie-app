import React, { useEffect, useState } from "react";
import { Movie } from "../types/types";
import { fetchAllMovies, fetchMovies } from "../services/api";
import Landing from "../components/Landing";

const LandingPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchAllMovies();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    getMovies();
  }, []);

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold mb-4">List of Movies</h1>
      </div>
      {movies.length === 0 ? (
        <div className="text-center text-gray-600 mt-32">
          <p className="text-xl mb-4">No records found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {movies.map((movie, index) => (
            <Landing key={index} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
