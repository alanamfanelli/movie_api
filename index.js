const express = require('express');
const app = express();

let topMovies = [ {
    title : 'LadyBird',
    director : 'Greta Gerwig'
},
{
    title : 'Get Out',
    director : 'Jordan Peele'
},
{
    title : 'Dunkirk',
    director : 'Christopher Nolan'
}
{
    title: 'CoCo',
    director: 'Lee Unkrich, Adrian Molina'
}
]


app.get('/movies', function(req, res) {
  res.json(topMovies)
});
app.get('/', function(req'res) {
  res.send('Welcome to myFlix!')
});

app.use(express.static('public'));
app.use(morgan("common"));

//Error handling middleware functions

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
  next();
});
