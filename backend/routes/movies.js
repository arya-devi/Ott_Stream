var express = require("express");
const Movie = require("../models/Movie");
var router = express.Router();

/* GET home page. */
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    // res.status(200).json({ movies });
    res.render("movieListing", { movies });
  } catch (err) {
    console.log(err);
  }
});
router.get("/form/:id", async function (req, res) {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    res.render("form", {isUpdate:true, movie });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});
router.get("/form", async function (req, res) {
  res.render("form",{isUpdate:false , movie: {}});
});

router.get("/view", function (req, res) {
  res.render("movie");
});
router.get("/watchHistory", function (req, res) {
  res.render("watchHistory");
});
router.get("/report", function (req, res) {
  res.render("report");
});
router.post("/api/login", (req, res) => {});
module.exports = router;
