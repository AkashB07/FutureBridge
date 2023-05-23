const Movies = require('../models/movies');

function isValid(string) {
    if(string == undefined || string.length === 0){
        return true;
    }
    else {
        return false;
    }
}

const addMovie = async (req, res) => {
    try {
        const { name, imageUrl, rating, releasedDate } = req.body;
        if (isValid(name) || isValid(imageUrl) || isValid(rating) || isValid(releasedDate)) {
            return res.status(400).json({succese: false, message: "Parameter missing"});
        }
        console.log(name, imageUrl, rating, releasedDate)
        await Movies.create({name, imageUrl, rating, releasedDate});
        return res.status(200).json({succese: true, message: "Sucesfully added the movie"});
    }
    catch (error) {
        return res.status(500).json({succese: false, error: error});
    }

}

const getMovies = async (req, res) => {
    try {
        
        const respone = await Movies.find().sort({name: 1});
        return res.status(200).json({succese: true, movies:respone, message: "Sucesfully fetched the Movies list"});
    }
    catch (error) {
        return res.status(500).json({succese: false, error: error});
    }

}

module.exports = {
    addMovie,
    getMovies
}