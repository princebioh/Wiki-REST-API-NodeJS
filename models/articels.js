const mongoose = require("mongoose");

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");

// Create Schema
const articleSchema = new mongoose.Schema({
    title : {
        type: String,
        required: [true, "Add a title"]
    },
    content : {
        type: String,
        required: [true, "Add a Content"]
    }
});

// Export Model
module.exports = mongoose.model("Article", articleSchema);
