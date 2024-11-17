const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  createMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
  manageWatchlist,
  addToWatchHistory,
  getMoviesByViewCount,
  getWatchHistory,
  listAllUsers,
  getUserWatchHistory,
  changePassword,
  toggleBlockUser,
  getSingleMovie,
  getWatchlist
} = require("../controllers/apiController");
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/movies", verifyToken, getAllMovies);
router.get("/movies/:movieId", verifyToken, getSingleMovie);
router.post("/watchlist", verifyToken, manageWatchlist);
router.get("/watchlist", verifyToken, getWatchlist);
router.post("/watch-history", verifyToken, addToWatchHistory);
router.get("/watch-history", verifyToken, getWatchHistory);
router.post("/change-password", verifyToken, changePassword);
// logout

// Admin routes

router.post("/admin/movies", verifyToken, isAdmin, createMovie);
router.put("/admin/movies/:id", verifyToken, isAdmin, updateMovie);
router.delete("/admin/movies/:id", verifyToken, isAdmin, deleteMovie);
router.get("/admin/users", verifyToken, isAdmin, listAllUsers);
router.get("/admin/users/:userId/history", verifyToken, isAdmin, getUserWatchHistory);
router.put("/admin/users/:userId/block", verifyToken, isAdmin, toggleBlockUser);
router.get("/movies/view-count", verifyToken, getMoviesByViewCount);

module.exports = router;
