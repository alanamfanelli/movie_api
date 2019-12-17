const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true});

const app = express();

const Movies = [
  {
    title: 'LadyBird',
    director: 'Greta Gerwig',
  },
  {
    title: 'Get Out',
    director: 'Jordan Peele',
  },
  {
    title: 'Dunkirk',
    director: 'Christopher Nolan',
  },
  {
    title: 'CoCo',
    director: 'Lee Unkrich, Adrian Molina',
  },
];

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('common'));

// Error handling middleware functions

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
  next();
});

// Gets list of all movies
app.get('/movies', (req, res) => {
  res.send('Successful GET request returning data about all movies.');
});

// Gets the data about a single movie by title
app.get('/movies/:title', (req, res) => {
  res.send('Successful GET request returning data about a single movie.');
});

// Gets the data about a movie genre by name
app.get('/genre/:name', (req, res) => {
  res.send('Successful GET request returning data about a movie genre.');
});

// Gets the data about a director by name
app.get('/director/:name', (req, res) => {
  res.send('Successful GET request returning data about a director.');
});

//Add a user
/* We’ll expect JSON in this format
{
 ID : Integer,
 Username : String,
 Password : String,
 Email : String,
 Birthday : Date
}*/
app.post('/users', function(req, res) {
  Users.findOne({ Username : req.body.Username })
  .then(function(user) {
    if (user) {
      return res.status(400).send(req.body.Username + "already exists");
    } else {
      Users
      .create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
      .then(function(user) {res.status(201).json(user) })
      .catch(function(error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      })
    }
  }).catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});

// Update the a user's information
app.put('/users/:username/:password/:email/:dateofbirth', (req, res) => {
  res.send('User information updated.');
});
// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put('/users/:Username', function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username }, { $set :
  {
    Username : req.body.Username,
    Password : req.body.Password,
    Email : req.body.Email,
    Birthday : req.body.Birthday
  }},
  { new : true }, // This line makes sure that the updated document is returned
  function(err, updatedUser) {
    if(err) {
      console.error(err);
      res.status(500).send("Error: " +err);
    } else {
      res.json(updatedUser)
    }
  })
});
// Add a movie to a user's list of favorites
app.post('/users/:Username/Movies/:MovieID', function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username }, {
    $push : { FavoriteMovies : req.params.MovieID }
  },
  { new : true }, // This line makes sure that the updated document is returned
  function(err, updatedUser) {
    if (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    } else {
      res.json(updatedUser)
    }
  })
});
// Get all users
app.get('/users', function(req, res) {

  Users.find()
  .then(function(users) {
    res.status(201).json(users)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});
// Deletes a movie from a user's favorites list by username
app.delete('/favorites/:username/:title', (req, res) => {
  res.send('Movie successfully deleted from favorites.');
});

// Delete a user by username
app.delete('/users/:Username', function(req, res) {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then(function(user) {
    if (!user) {
      res.status(400).send(req.params.Username + " was not found");
    } else {
      res.status(200).send(req.params.Username + " was deleted.");
    }
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});// listen for requests
app.listen(8080, () => console.log('My movie app is listening on port 8080.'));
