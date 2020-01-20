import React from 'react';

export class MovieCard extends React.Component {
    render() {
        // This is given to the <MovieCard/> component by the outer world
        // which, in this case, is `MainView`, as `MainView` is what’s
        // connected to your database via the movies endpoint of your API
        const { movie, onClick } = this.props;

        let image = `https://thawing-sands-21801.herokuapp.com/images/${movie.ImagePath}`;


        return (
            <div onClick={() => onClick(movie)} className="movie-card">
                <img width="300px" src={image} />
                {movie.Title}
            </div>
        );
    }
}
