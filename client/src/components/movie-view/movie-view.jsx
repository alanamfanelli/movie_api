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
            <div className="movie-view">
                <a href="/">Go back</a>

                <img className="movie-poster" width="300px" src={image} />
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>

                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movie.Genre.Name}</span>
                </div>
                <div className="movie-director">
                    <span className="label">Director: </span>
                    <span className="value">{movie.Director.Name}</span>
                </div>
            </div>


        );
    }
}