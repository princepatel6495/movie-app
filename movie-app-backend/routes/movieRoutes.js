const express = require("express");
const movieController = require("../controllers/movieController");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");
const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/../uploads/");
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const fileFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error("Only JPEG images are allowed"));
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.get("/", authMiddleware, movieController.getMovies);
router.get("/get-all", movieController.getAllMovies);
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  movieController.createMovie
);
// router.post("/", authMiddleware, movieController.createMovie);
router.get("/:id", authMiddleware, movieController.getMovieById);
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  movieController.updateMovie
);
router.delete("/:id", authMiddleware, movieController.deleteMovie);

module.exports = router;
