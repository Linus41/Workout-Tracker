//this file holds the express info and backend api routes

const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const workoutModel = require("./models/workoutModel.js");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useCreateIndex: true });

// Routes

//route to home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, './public', 'index.html'));
})

//this sends user to exercise.html when "new workout" button is clicked
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, './public', 'exercise.html'));
})
//need a post route for exercises?


//this route isn't getting hit? 
app.post("/api/workouts", (req, res) => {
  workoutModel.create(req.body).then((data) => {
    res.json(data);
  })
})

//this displays all objects from db in this path in browser
app.get("/api/workouts/range", (req, res) => {
  workoutModel.find(req.body).then((data) => {
    res.json(data);
  })
})
// api/workouts route
app.get("/api/workouts", (req, res) => {
  workoutModel.find()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
}); 
// route to stats page when "fitness tracker dashboard" is clicked 
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, './public', 'stats.html'));
})

//stats api route is the fitness tracker dashboard, which needs to be linked to /stats frontend route
app.get("/api/stats", (req, res) => {
  workoutModel.create(req.body).then((data) => {
    console.log(data);
    res.json(data);
  })

})

app.put("/api/workouts/:id", (req, res) => {
  workoutModel.findOneAndUpdate({
    _id: req.params.id
  }, {
    $push: {
      exercises: req.body
    }
  }).then((data) => {
    console.log(data);
    res.json(data);
  })
})

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
