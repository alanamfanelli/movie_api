import React from 'react';

import images from '../../images/*.jpg';

export class MovieCard extends React.Component {
    render() {
        // This is given to the <MovieCard/> component by the outer world
        // which, in this case, is `MainView`, as `MainView` is what’s
        // connected to your database via the movies endpoint of your API
        const { movie, onClick } = this.props;

        const coverImage = images[movie.ImagePath]

        return (
            <div onClick={() => onClick(movie)} className="movie-card">
                <img src={coverImage} />
                {movie.Title}
            </div>
        );
    }
}
