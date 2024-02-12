// const express = require('express');
// const bodyParser = require('body-parser');
// const routesHandler = require('./routes/handler.js');
// const mongoose = require('mongoose');
// require('dotenv/config');

// const app = express();
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());
// app.use('/', routesHandler);

// // DB Connection
// mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, useUnifiedTopology:true})
// .then( () => {
//     console.log('DB Connected!');
// })
// .catch( (err) => {
//     console.log(err);
// });

// /*
// if (process.env.NODE_ENV === 'production') {
//     // Serve any static files
//     app.use(express.static(path.join(__dirname, 'frontend/build')));

//     // Handle React routing, return all requests to React app
//     app.get('*', function(req, res) {
//         res.sendFile(path.join(__dirname, 'frontend/build', routesHandler));
//     });
// }
// */

// const PORT = process.env.PORT || 4000; // backend routing port
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}.`);
// });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const routesHandler = require("./routes/handler.js");
const { Users, Tweets } = require("./models/Schemas.js");
require("dotenv/config");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/", routesHandler);

// Database Connection
try {
  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("DB Connected!");
} catch (err) {
  console.error(err);
}

// Tweet Submission Route
app.post("/addTweet", async (req, res) => {
  const { tweetInput } = req.body;

  try {
    const userId = await Users.findOne({
      username: "eaglefang",
    }).exec();

    if (!userId) {
      return res.status(404).json({ error: "User not found" });
    }

    const newTweet = new Tweets({
      tweet: tweetInput,
      user: userId._id,
    });
     console.log(tweetInput);
    await newTweet.save();
    res.status(201).json(newTweet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});