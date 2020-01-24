import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor() {
        super();

        this.state = {
            movies: null,
            selectedMovie: null,
            user: null
        };
    }

    componentDidMount() {
        axios.get('https://thawing-sands-21801.herokuapp.com/movies').then(resp => {
            this.setState({ movies: resp.data })
        })
    }

    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }


    getMovies(token) {
        axios.get("https://thawing-sands-21801.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const { movies, selectedMovie, user } = this.state;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        // Before the movies have been loaded
        if (!movies)
            return <div className="main-view">There are no movies.</div>;

        return (
            <div className="main-view">
                <div className="row">
                    {selectedMovie ? (
                        <MovieView
                            movie={selectedMovie}
                            onClick={() => this.onMovieClick()}
                        />
                    ) : (
                            movies.map(movie => (
                                <MovieCard
                                    key={movie._id}
                                    movie={movie}
                                    onClick={movie => this.onMovieClick(movie)}
                                />
                            ))
                        )}
                </div>
            </div>
        );
    }
}
