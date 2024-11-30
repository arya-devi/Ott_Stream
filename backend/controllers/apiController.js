const User = require("../models/User");
const Movie = require("../models/Movie");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex");
};


  // 1 signup

  exports.signup = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
  
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and Confirm Password do not match" });
    }
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already taken" });
      }
  
      const user = new User({ name, email, password });
      const validationError = user.validateSync();
  
      if (validationError) {
        const errorMessages = Object.values(validationError.errors).map(
          (err) => err.message
        );
        console.error({ errors: errorMessages });
  
        return res.status(400).json({ errors: errorMessages });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
  
      return res.status(201).json({ message: "Account created successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // Login

  exports.login = (req, res) => {
    const { email, password } = req.body;
  
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ message: "User not Found" });
        }
        if (user.isBlocked) {
          return res
            .status(401)
            .json({ message: "You cannot log in because your account is temporarily blocked." });
        }
        return bcrypt.compare(password, user.password).then((isPasswordValid) => {
          if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect password" });
          }
  
          const token = jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET || generateSecretKey(),
            { expiresIn: "922h" }
          );
  
          return res
            .status(200)
            .json({ userId:user._id, token, message: "Successfully logged in" });
        });
      })
      .catch((err) => {
        console.error("Error during user login:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      });
  };

  // 3 View Movies

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({ movies });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
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
        res.status(200).json(movie);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // 5 Add to watchlist

  exports.manageWatchlist = async (req, res) => {
    const { movieId } = req.body;
    const userId = req.userId;
    console.log(userId);
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      let message;
  
      if (user.watchlist.includes(movieId)) {
        user.watchlist.pull(movieId); // Remove movie
        message = "Removed movie from Watchlist";
      } else {
        user.watchlist.push(movieId); // Add movie
        message = "Added movie to Watchlist";
      }
  
      await user.save(); // Save the updated user
      res.status(200).json({ message, watchlist: user.watchlist }); // Single response
    } catch (err) {
      res.status(500).json({ message: "Internal server error", error: err.message });
    }
  };
  
  // 6 get user watchlist

  exports.getWatchlist = async (req, res) => {
    try {
      // Find the user and populate the watchlist with movie details
      const user = await User.findById(req.userId).populate("watchlist", "title description thumbnail");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ watchlist: user.watchlist });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // 7 User: Add to Watch History
  
  exports.addToWatchHistory = async (req, res) => {
    const { movieId } = req.body;
  
    try {
      // Fetch user and movie
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const movie = await Movie.findById(movieId);
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }
  
      // Check if the movie already exists in watchHistory
      const existingHistory = user.watchHistory.find(
        (history) => history.movie.toString() === movieId
      );
  
      if (existingHistory) {
        // Update the watchedAt time for the existing movie
        existingHistory.watchedAt = Date.now();
      } else {
        // Add a new entry if the movie is not already in the watch history
        user.watchHistory.push({ movie: movieId });
      }
  
      await user.save();
  
      // Increment movie view count
      movie.viewCount += 1;
      await movie.save();
  
      res.status(200).json({ message: "Watch history updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // 8 get watchhistory

  exports.getWatchHistory = async (req, res) => {
    try {
      const user = await User.findById(req.userId)
        .populate("watchHistory.movie", "title description thumbnail") // Populate movie details
        // .select("watchHistory"); // Select only the watch history
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user.watchHistory);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // 9 changePassword

  exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword,confirmPassword} = req.body;
  
    try {
      const user = await User.findById(req.userId);
  
      const isValidPassword = await bcrypt.compare(oldPassword, user.password);
      if (!isValidPassword) return res.status(401).json({ message: "Old password is incorrect" });
      if(newPassword !== confirmPassword) return res.status(401).json({ message: "New password and confirm new password is incorrect" });
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
  try {
    const movie = new Movie({ title, description, videoUrl, thumbnail });
    await movie.save();
    res.status(201).json({ message: "Movie created successfully", movie });
  } catch (err) {
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
  
      res.status(200).json({ message: "Movie updated successfully", movie });
    } catch (err) {
      res.status(500).json({ message: "Internal server error", error: err.message });
    }
  };

  // 13 deleteMovie

  exports.deleteMovie = async (req, res) => {
    const { id } = req.params;
    try {
      const movie = await Movie.findByIdAndDelete(id);
      if (!movie) return res.status(404).json({ message: "Movie not found" });
  
      res.status(200).json({ message: "Movie deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Internal server error", error: err.message });
    }
  };

  // 14 Admin: List All Users

exports.listAllUsers = async (req, res) => {
  try {
    const users = await User.find({isAdmin:false}, "name email isBlocked");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

  // 15 Admin: View User History

exports.getUserWatchHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("watchHistory.movie", "title description");
    res.status(200).json(user.watchHistory);
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

    res.status(200).json({ message: `User ${user.isBlocked ? "blocked" : "unblocked"} successfully` });
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
  
      res.status(200).json(movies);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };



  