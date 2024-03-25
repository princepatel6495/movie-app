const Movie = require("../models/Movie");

exports.getMovies = async (user) => {
  return await Movie.find({ userId: user.userId });
};
exports.getAllMovies = async () => {
  return await Movie.find({});
};

exports.createMovie = async (movieData, imageName) => {
  const movie = new Movie({
    ...movieData,
    image: imageName,
    userId: movieData.userId,
  });
  await movie.save();
  return movie;
};

exports.getMovieById = async (id, user) => {
  return await Movie.findOne({ _id: id, userId: user.id });
};

exports.updateMovie = async (id, newData, user) => {
  const updateFields = {
    title: newData.title,
    publishingYear: newData.publishingYear,
    userId: newData.userId,
  };

  if (newData.image) {
    updateFields.image = newData.image;
  }

  const movie = await Movie.findOneAndUpdate(
    { _id: id, userId: newData.userId },
    updateFields,
    { new: true }
  );
  if (!movie) {
    throw new Error("Movie not found");
  }
  return movie;
};

exports.deleteMovie = async (id) => {
  const result = await Movie.deleteOne({ _id: id });
  if (result.deletedCount === 0) {
    throw new Error("Movie not found");
  }
};
