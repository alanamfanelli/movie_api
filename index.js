const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true });

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('common'));

// Error handling middleware functions

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
  next();
});

// Get movies and details

app.get('/movies', (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Error: ${err}`);
    });
});

// Gets the data about a single movie by title
app.get('/movies/:Title', (req, res) => {
  Movies.find({ Title: req.params.Title })
    .then((movies) => {
      res.status(201).json(movies); /* Returns One By Title */
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(`Error${err}`);
    });
});

// Gets the data about a movie genre by name
app.get('/movies/genres/:Title', (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.status(201).send(`${movie.Genre.Name} : ${movie.Genre.Description}`); /* Returns Genre Info By Movie Title */
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(`Error${error}`);
    });
});

// Gets the data about a director by name
app.get('/movies/director/:Name', (req, res) => {
  Movies.findOne({ 'Director.Name': req.params.Name })
    .then((movies) => {
      res.status(201).json(movies.Director); /* Returns Director By Name */
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(`Error${err}`);
    });
});

// Add a user
/* We’ll expect JSON in this format
{
 ID : Integer,
 Username : String,
 Password : String,
 Email : String,
 Birthday : Date
} */
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(`${req.body.Username}already exists`);
      }
      Users
        .create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
        .then((user) => { res.status(201).json(user); })
        .catch((error) => {
          console.error(error);
          res.status(500).send(`Error: ${error}`);
        });
    }).catch((error) => {
      console.error(error);
      res.status(500).send(`Error: ${error}`);
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
} */
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $set:
  {
    Username: req.body.Username,
    Password: req.body.Password,
    Email: req.body.Email,
    Birthday: req.body.Birthday,
  },
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send(`Error: ${err}`);
    } else {
      res.json(updatedUser);
    }
  });
});
// Add a movie to a user's list of favorites
app.post('/users/:Username/Movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $push: { FavoriteMovies: req.params.MovieID },
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send(`Error: ${err}`);
    } else {
      res.json(updatedUser);
    }
  });
});
// Get all users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Error: ${err}`);
    });
});
// Deletes a movie from a user's favorites list by username
app.delete('/favorites/:username/:title', (req, res) => {
  res.send('Movie successfully deleted from favorites.');
});

// Delete a user by username
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(`${req.params.Username} was not found`);
      } else {
        res.status(200).send(`${req.params.Username} was deleted.`);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Error: ${err}`);
    });
});// listen for requests
app.listen(8080, () => console.log('My movie app is listening on port 8080.'));
