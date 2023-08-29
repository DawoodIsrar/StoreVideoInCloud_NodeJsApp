const Upload = require("../models/upload");
const cloudinary = require("../lib/cloundinary"); // Correct the import path

const uploadVideo = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      req.file.path,
      {
        resource_type: "video",
        folder: "video",
      }
    );

    const upload = new Upload({
      name: req.file.originalname,
      url: result.url,
      cloudinary_id: result.public_id,
      description: req.body.description,
    });

    const savedUpload = await upload.save(); // Use async/await here

    return res.status(200).send(savedUpload);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};
const getVideo = async (req, res) => {
    try {
        const description = req.body.description;
    
        if (!description) {
          return res.status(400).json({ message: 'Description is required in the request body.' });
        }
    
        // Find the video in the database based on the provided description
        const video = await Upload.findOne({ description });
    
        if (!video) {
          return res.status(404).json({ message: 'Video not found.' });
        }
    
        // Return the video URL in the response
        return res.status(200).json({ url: video.url });
      } catch (err) {
        // Handle errors
        console.error(err);
        return res.status(500).json({ message: 'Error retrieving video URL.' });
      }
  };
  
module.exports = { uploadVideo ,getVideo};
