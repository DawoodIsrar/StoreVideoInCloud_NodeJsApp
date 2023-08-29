const multer = require("multer");
const path = require("path"); // Add this import statement for the 'path' module

const storage = multer.diskStorage({
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (
      ext !== ".mp4" &&
      ext !== ".mkv" &&
      ext !== ".jpeg" &&
      ext !== ".jpg" &&
      ext !== ".png"
    ) {
      cb(new Error("File Type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

module.exports = multer({ storage: storage });
