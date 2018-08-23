const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get('/', (req, res) => {
  res.send({ test: 'this'});
})

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
