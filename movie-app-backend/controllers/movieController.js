const movieService = require("../services/movieService");

exports.getMovies = async (req, res) => {
  try {
    const movies = await movieService.getMovies(req.user);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await movieService.getAllMovies(req.user);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMovie = async (req, res) => {
  try {
    const { title, publishingYear, userId } = req.body;
    const imageName = req.file ? req.file.filename : null;
    const movieData = { title, publishingYear, userId };
    const movie = await movieService.createMovie(movieData, imageName);
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movie = await movieService.getMovieById(req.params.id, req.user);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const { title, publishingYear, userId } = req.body;
    let image = null;
    if (req.file) {
      image = req.file.filename;
    }
    const movieData = { title, publishingYear, userId, image };
    const movie = await movieService.updateMovie(req.params.id, movieData);
    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    await movieService.deleteMovie(req.params.id);
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
