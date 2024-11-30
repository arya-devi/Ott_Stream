const User = require("../models/User");
const Movie = require("../models/Movie");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

exports.approveIt = (req, res) => {
  console.log("hai noob");
  res.status(200).json({ success: true });
};

// Login

exports.login = async(req, res) => {
  const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Check if the user is blocked
        if (!user.isAdmin) {
          // res.render('login',{error: 'Your are not an admin ,Please contact support.'})
            return res.status(403).json({ error: 'Your are not an admin ,Please contact support.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('authToken', token, { httpOnly: true });
        res.status(200).json({ message: 'Login successful', isAdmin: user.isAdmin, token: token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};

// 3 View Movies

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    // res.status(200).json({ movies });
    res.render("movieListing", { movies });
  } catch (err) {
    console.log(err);
  }
};

// 4 single movie

exports.getSingleMovie = async (req, res) => {
  const { movieId } = req.params;
  console.log(movieId);

  try {
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.render("movie", { movie });
    // res.status(200).json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 9 changePassword

exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const user = await User.findById(req.userId);

    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword)
      return res.status(401).json({ message: "Old password is incorrect" });
    if (newPassword !== confirmPassword)
      return res.status(401).json({
        message: "New password and confirm new password is incorrect",
      });
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 11 create movie

exports.createMovie = async (req, res) => {
  const { title, description, videoUrl, thumbnail } = req.body;
  console.log(title, description, videoUrl, thumbnail);
  
  try {
    const movie = new Movie({ title, description, videoUrl, thumbnail });
    await movie.save();
    res.redirect('/admin/movies');
    // res.status(201).json({ message: "Movie created successfully", movie });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

// 12 updateMovie

exports.updateMovie = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const movie = await Movie.findByIdAndUpdate(id, updates, { new: true });
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.redirect('/admin/movies');
    // res.status(200).json({ message: "Movie updated successfully", movie });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

// 13 deleteMovie

exports.deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    // res.status(200).json({ message: "Movie deleted successfully" });
    res.redirect('/admin/movies');

  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

// 14 Admin: List All Users

exports.listAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false }, "name email isBlocked");
    // res.status(200).json(users);
    res.render('userListing',{users});

  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 15 Admin: View User History

exports.getUserWatchHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const history = await User.findById(userId).populate(
      "watchHistory.movie",
      "title description"
    );
    // res.status(200).json(user.watchHistory);
    res.render("watchHistory",{history:history.watchHistory});

  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 16  Admin: Block/Unblock User

exports.toggleBlockUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    user.isBlocked = !user.isBlocked;
    await user.save();

    res.status(200).json({
      message: `User ${user.isBlocked ? "blocked" : "unblocked"} successfully`,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 17 getMoviesByViewCount

exports.getMoviesByViewCount = async (req, res) => {
  try {
    const movies = await Movie.find()
      .sort({ viewCount: -1 }) // Sort in descending order of view count
      .select("title viewCount "); // Select required fields

    // res.status(200).json(movies);
    res.render("report",{movies});


  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

