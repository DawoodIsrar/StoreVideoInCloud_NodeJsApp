const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: 'dit9t3pne',
  api_key: '228614353839983',
  api_secret: 'FmBwLf-wAPscnngEfzJp6mRUXzc'
});

module.exports = cloudinary; // Correct the export statement
