
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  viewCount: {
    type: Number, 
    default: 0,   
  },
  thumbnail: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model('Movie', movieSchema);
