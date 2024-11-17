
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  watchlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
    },
  ],
  watchHistory: [
    {
      movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
      },
      watchedAt: {
        type: Date,
        default: Date.now, // Corrected to use function reference
      },
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', userSchema);
