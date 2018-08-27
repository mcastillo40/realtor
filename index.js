const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const houses = require('./routes/houses');
const users = require('./routes/users');
const auth = require('./routes/auth');
const config = require('config');

const PORT = process.env.PORT || 5000;

const app = express();

// Validates if a key is provided in order to run application
if (!config.get('jwtPrivateKey')){
  console.log("Fatal error: jwtPrivateKey is not defined")
  process.exit(1);
}

app.use(cors());

if (process.env.NODE_ENV === "production") {
  // Will serve production assets
  if (!app.use(express.static("client/build"))) {
    // Will serve up index.html if route is not recognized
    const path = require("path");

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
  }
}

app.use(express.json());
app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

mongoose.connect('mongodb://localhost/realtor', { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("ERR: ", err))

app.use('/api/houses', houses);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
