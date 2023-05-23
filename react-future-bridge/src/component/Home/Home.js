import { Button, Table, Image } from "react-bootstrap";
import { useState, useRef, Fragment, useEffect, useCallback } from "react";
import axios from "axios";

const Home = () => {

    const [movies, setMovies] = useState([
        { _id: 'm1', name: 'Raging Bull', imageUrl: 'https://images.unsplash.com/photo-1524836427911-b539152c9704?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJhZ2luZyUyMGJ1bGx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', rating: 3.6, releasedDate: '2000-05-06T00:00:00.000Z' },
        { _id: 'm2', name: 'Godfellas', imageUrl: 'https://images.unsplash.com/photo-1684827844157-5a9085408044?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60', rating: 3.6, releasedDate: '1995-05-06T00:00:00.000Z' },
        { _id: 'm3', name: 'The Aviator', imageUrl: 'https://images.unsplash.com/photo-1684827844157-5a9085408044?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60', rating: 5.6, releasedDate: '2002-05-06T00:00:00.000Z' },
        { _id: 'm4', name: 'Inception', imageUrl: 'https://images.unsplash.com/photo-1684695414418-b76c47bfb731?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60', rating: 6.6, releasedDate: '2010-05-06T00:00:00.000Z' },
        { _id: 'm5', name: 'John Wick', imageUrl: 'https://images.unsplash.com/photo-1684695414418-b76c47bfb731?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60', rating: 7.6, releasedDate: '2020-05-06T00:00:00.000Z' },
        { _id: 'm6', name: 'The Godfather', imageUrl: 'https://images.unsplash.com/photo-1684695414418-b76c47bfb731?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60', rating: 9.6, releasedDate: '2000-05-06T00:00:00.000Z' },
        { _id: 'm7', name: 'Lock', imageUrl: 'https://images.unsplash.com/photo-1684695414418-b76c47bfb731?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60', rating: 4.5, releasedDate: '2010-05-06T00:00:00.000Z' },
        { _id: 'm8', name: 'Interstellar', imageUrl: 'https://images.unsplash.com/photo-1684695414418-b76c47bfb731?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60', rating: 5.6, releasedDate: '2012-05-06T00:00:00.000Z' },
        { _id: 'm9', name: 'Mank', imageUrl: 'https://images.unsplash.com/photo-1684695414418-b76c47bfb731?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60', rating: 8.3, releasedDate: '2000-05-06T00:00:00.000Z' },
        { _id: 'm10', name: 'Moon', imageUrl: 'https://images.unsplash.com/photo-1684695414418-b76c47bfb731?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60', rating: 3.6, releasedDate: '2000-05-06T00:00:00.000Z' },
        { _id: 'm11', name: 'Hustler', imageUrl: 'https://images.unsplash.com/photo-1684695414418-b76c47bfb731?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60', rating: 8.6, releasedDate: '2013-05-06T00:00:00.000Z' },
        { _id: 'm12', name: 'Monster', imageUrl: 'https://images.unsplash.com/photo-1684695414418-b76c47bfb731?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60', rating: 7.6, releasedDate: '2000-05-06T00:00:00.000Z' },
        { _id: 'm13', name: 'Up', imageUrl: 'https://images.unsplash.com/photo-1684695414418-b76c47bfb731?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60', rating: 6.7, releasedDate: '2008-05-06T00:00:00.000Z' },
        { _id: 'm14', name: 'Crash', imageUrl: 'https://images.unsplash.com/photo-1684695414418-b76c47bfb731?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60', rating: 3.6, releasedDate: '2007-05-06T00:00:00.000Z' },
        { _id: 'm15', name: 'The Prestige', imageUrl: 'https://images.unsplash.com/photo-1684695414418-b76c47bfb731?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60', rating: 8.3, releasedDate: '2002-05-06T00:00:00.000Z' },
        { _id: 'm16', name: 'The King', imageUrl: 'https://images.unsplash.com/photo-1684695414418-b76c47bfb731?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60', rating: 3, releasedDate: '2005-05-06T00:00:00.000Z' },
        { _id: 'm17', name: 'The Dark Knight', imageUrl: 'https://images.unsplash.com/photo-1684695414418-b76c47bfb731?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60', rating: 3.1, releasedDate: '2000-05-06T00:00:00.000Z' },
        { _id: 'm18', name: 'Schindlers List', imageUrl: 'https://images.unsplash.com/photo-1684827844157-5a9085408044?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60', rating: 9, releasedDate: '2004-05-06T00:00:00.000Z' },
        { _id: 'm19', name: 'Pulp Fiction', imageUrl: 'https://images.unsplash.com/photo-1684827844157-5a9085408044?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60', rating: 5.6, releasedDate: '2002-05-06T00:00:00.000Z' },
        { _id: 'm20', name: 'Few Good Man', imageUrl: 'https://images.unsplash.com/photo-1684827844157-5a9085408044?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60', rating: 7.1, releasedDate: '2001-05-06T00:00:00.000Z' },

    ]);

    const movieInputRef = useRef();
    const imageInputRef = useRef();
    const ratingInputRef = useRef();
    const releaseInputRef = useRef();

    const movieHandler = async (event) => {
        try {
            event.preventDefault();
            const enteredMovie = movieInputRef.current.value;
            const enteredImage = imageInputRef.current.value;
            const enteredRating = ratingInputRef.current.value;
            const enteredRelease = releaseInputRef.current.value;

            const movieDetails = {
                name: enteredMovie,
                imageUrl: enteredImage,
                rating: enteredRating,
                releasedDate: enteredRelease
            };
            movieInputRef.current.value = '';
            imageInputRef.current.value = '';
            ratingInputRef.current.value = '';
            releaseInputRef.current.value = '';

            const response = await axios.post(`http://localhost:4000/movies/addmovie`, movieDetails);
            if (response.status === 200) {
                alert('Movie added sucessfully');
                getMovies();
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const getMovies = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:4000/movies/getmovies`);
            if (response.status === 200) {
                console.log(response.data.movies);
                let data = [];
                for (let key of response.data.movies) {
                    data.push(key);
                }
                setMovies([...movies, ...data]);
            }
        }
        catch (error) {
            console.log(error);
        }

    }, []);

    useEffect(() => {
        getMovies();
    }, [getMovies]);

    let i = 0;


    return (
        <Fragment><br />


            <div className="row justify-content-center">
                <h2 className="text-center">Add Movie</h2><br /><br /><br />
                <div className="col-md-4">
                    <form onSubmit={movieHandler}>
                        <div className="form-group">
                            <label>Movie Name</label>
                            <input type="text" className="form-control" ref={movieInputRef} required />
                        </div>
                        <div className="form-group">
                            <label>Image Url</label>
                            <input type="text" className="form-control" ref={imageInputRef} required />
                        </div>
                        <div className="form-group">
                            <label>Rating</label>
                            <input type="number" step="0.1" min="0" max="10" className="form-control" ref={ratingInputRef} required />
                        </div>
                        <div className="form-group">
                            <label>Release Date</label>
                            <input type="date" className="form-control" ref={releaseInputRef} required />
                        </div><br />
                        <div className="d-grid gap-2">
                            <Button type="submit" variant="primary" size="lg">Add</Button>
                        </div>
                    </form><br /><br /><br />

                </div>
                <h2 className="text-center"> Movies List</h2><br /><br /><br />
                <div className="col-md-11" >
                    <Table striped >
                        <thead>
                            <tr>
                                <th><h5 className="fw-bold">Sl No</h5></th>
                                <th><h5 className="fw-bold">Name</h5></th>
                                <th><h5 className="fw-bold">Image</h5></th>
                                <th><h5 className="fw-bold">Rating</h5></th>
                                <th><h5 className="fw-bold">Release Date</h5></th>
                            </tr>
                        </thead>
                        <tbody>
                            

                            {movies.map((movie) => {
                                return (
                                    <tr key={movie._id}>
                                        <td>{++i}</td>
                                        <td>{movie.name}</td>
                                        <td><Image src={movie.imageUrl} style={{
                                            height: 150, width: 150
                                        }} /></td>
                                        <td>{movie.rating}</td>
                                        <td>{new Date(movie.releasedDate).toDateString()}</td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </Table>
                </div>
            </div>


        </Fragment>

    )
}

export default Home;