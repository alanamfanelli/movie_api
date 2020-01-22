import React from 'react';

export class MovieView extends React.Component {

    constructor() {
        super();

        this.state = {};
    }



    render() {
        const { movie } = this.props;

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
                    <div className="value">Genre: {movie.Genre.Name}</div>
                </div>
                <div className="movie-director">
                    <div className="value">Director: {movie.Director.Name}</div>
                </div>
                <button
                    className="btn btn-outline-primary text-uppercase mt-2"
                    onClick={() => onClick()}
                >
                    Back to Movies
                </button>
            </div>


        );
    }
}