const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

const moviesRoutes = require('./routes/movies');
app.use('/movies', moviesRoutes)

mongoose
.connect(
    process.env.DB_DETAILS
)
.then(()=>{
    app.listen(process.env.DB_PORT);
})
.catch((error)=>{
    console.log(error);
})