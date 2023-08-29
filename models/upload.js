const mongoose = require("mongoose")
const schema = mongoose.Schema;

const uploadSchema = new schema({
name: String,
url:String,
description:String,
cloudinary_id:String
})

module.exports = mongoose.model("upload",uploadSchema)