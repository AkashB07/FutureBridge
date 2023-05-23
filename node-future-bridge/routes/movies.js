const express = require('express');

const moviesController = require('../controller/movies');

const router = express.Router();

router.post('/addmovie', moviesController.addMovie);

router.get('/getmovies', moviesController.getMovies);

module.exports = router;