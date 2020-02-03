import React from 'react';
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from 'axios';

export class MovieView extends React.Component {

    constructor() {
        super();

        this.state = {};
    }

    addToFavorites(e) {
        const { movie } = this.props;
        e.preventDefault();
        axios.post(
            `https://thawing-sands-21801.herokuapp.com/users/${localStorage.getItem('user')}/Movies/${movie._id}`,
            { username: localStorage.getItem('user') },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            .then(res => {
                alert(`${movie.Title} successfully added to your favorites`);
            })
            .then(res => {
                window.open(`/users/${localStorage.getItem('user')}`)
            })
            .then(res => {
                document.location.reload(true);
            })
            .catch(error => {
                alert(`${movie.Title} not added to your favorites` + error)
            });
    }


    render() {
        const { movie, onClick } = this.props;

        let image = `https://thawing-sands-21801.herokuapp.com/images/${movie.ImagePath}`;

        if (!movie) return null;

        return (
            <div className="container-fluid align-items-center ml-3 mt-2">

                <img className="movie-poster" width="300px" src={image} />
                <div className="movie-title">
                    <h1 className="value">{movie.Title}</h1>
                </div>
                <div className="movie-description">
                    <span className="value">{movie.Description}</span>
                </div>

                <Button className="add-favorite-btn mt-4" onClick={e => this.addToFavorites(e)}>
                    <span className="d-flex align-items-center">
                        <i className="material-icons heart mr-3">favorite</i>
                        Add to my favorites
                    </span>

                </Button>

                <div className="movie-genre">
                    Genre:
                    <Link to={`/genres/${movie.Genre.Name}`}>
                        <Button variant="link">{movie.Genre.Name}</Button>
                    </Link>
                </div>

                <div className="movie-director">
                    Director:
                <Link to={`/directors/${movie.Director.Name}`}>
                        <Button variant="link">{movie.Director.Name}</Button>
                    </Link>
                </div>
                <Link to={`/`}>
                    <Button className="mt-3" variant="primary">
                        Back to Movies
                </Button>
                </Link>
            </div >


        );
    }
}