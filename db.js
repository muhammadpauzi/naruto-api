const mongoose = require("mongoose");

const connectToMongoDB = (uri = "", callback) => {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("Database connected!");
        callback(false)
    }).catch(error => {
        callback(error);
    });
}

module.exports = { connectToMongoDB };