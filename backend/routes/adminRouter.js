const express = require("express");
const router = express.Router();
const {
  login,
  createMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
  getMoviesByViewCount,
  listAllUsers,
  getUserWatchHistory,
  changePassword,
  toggleBlockUser,
  getSingleMovie,
  logoutUser,
} = require("../controllers/adminController");
const { isAdmin, verifyAdmin } = require("../middlewares/authMiddleware");

router.post("/login", login);
router.get("/movies", verifyAdmin, isAdmin, getAllMovies);
router.get("/movies/view-count", verifyAdmin, getMoviesByViewCount);

router.get("/movies/:movieId", getSingleMovie);
router.post("/change-password", verifyAdmin, changePassword);
// logout

// Admin routes

router.post("/movies", verifyAdmin, isAdmin, createMovie);
router.post("/movies/:id", verifyAdmin, isAdmin, updateMovie);
router.post("/movie/:id", verifyAdmin, isAdmin, deleteMovie);
router.get("/users", verifyAdmin, isAdmin, listAllUsers);
router.get("/users/:userId/history", verifyAdmin, isAdmin, getUserWatchHistory);
router.put("/users/:userId/block", verifyAdmin, isAdmin, toggleBlockUser);
module.exports = router;
