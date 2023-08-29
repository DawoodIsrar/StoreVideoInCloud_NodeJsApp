const router = require('express').Router();
const {uploadVideo} = require("../controllers/upload")
const cloudinary = require("../lib/cloundinary")
const storage = require("../lib/mutler")
const {getVideo} = require("../controllers/upload.js")
router.post("/uploadVideo",storage.single('file'),uploadVideo);
router.post("/getVideo",getVideo);
module.exports = router