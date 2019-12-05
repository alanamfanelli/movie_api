const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const morgan = require('morgan');

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

// Adds data for a new user
app.post('/users', (req, res) => {
  const newUser = req.body;

  if (!newUser.username) {
    const message = 'Missing username in request body';
    res.status(400).send(message);
  } else {
    res.send('User successfully added.');
  }
});

// Update the a user's information
app.put('/users/:username/:password/:email/:dateofbirth', (req, res) => {
  res.send('User information updated.');
});

// Adds movie to favorites for a user
app.post('/favorites/:username/:title', (req, res) => {
  res.send('add favorite movie by user.');
});

// Deletes a movie from a user's favorites list by username
app.delete('/favorites/:username/:title', (req, res) => {
  res.send('Movie successfully deleted from favorites.');
});

// Deletes a user from the user registry
app.delete('/users/:username', (req, res) => {
  res.send('User successfully deleted from registry.');
});
