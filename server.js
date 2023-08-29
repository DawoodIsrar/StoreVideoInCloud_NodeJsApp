const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const routes = require('./routes')
const Upload = require("./models/upload")
mongoose.connect("mongodb://127.0.0.1:27017/video",{useNewUrlParser:true});
mongoose.connection.once("open",()=>{
    console.log("db is connected")
}).on('error',(error)=>{
    console.log(error)
})
app.use('/upload',routes)
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
const port = process.env.PORT || 3000;
app.post('/getVideoUrl', async (req, res) => {
    try {
      const description = req.body.description;
      console.log(description)
  
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
  });
  
app.listen(port,()=>{
    console.log("server is running on port:",port)
})
