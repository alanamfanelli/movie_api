import React from 'react';
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export class MovieView extends React.Component {

    constructor() {
        super();

        this.state = {};
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