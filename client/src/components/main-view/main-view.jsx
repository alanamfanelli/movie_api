import React from "react";
import axios from 'axios';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { LoginView } from '../login-view/login-view';
import { Button } from "react-bootstrap";
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {

    constructor() {
        super();

        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }



    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        this.setState({
            user: null
        });

        localStorage.removeItem("token");
        localStorage.removeItem("user");
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


        // Before the movies have been loaded
        if (!movies)
            return <div className="main-view">There are no movies.</div>;

        return (
            <Router>
                <div>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={() => this.onLoggedOut()}
                    >
                        Logout
          </Button>
                    <div className="main-view row">
                        <Route
                            exact
                            path="/"
                            render={() => {
                                if (!user)
                                    return (
                                        <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                    );
                                return movies.map((m) => <MovieCard key={m._id} movie={m} />);
                            }}
                        />
                        <Route path="/register" render={() => <RegistrationView />} />
                        <Route
                            exact
                            path="/movies/:movieId"
                            render={({ match }) => (
                                <MovieView
                                    movie={movies.find((m) => m._id === match.params.movieId)}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/genres/:name"
                            render={({ match }) => {
                                if (!movies) return <div className="main-view" />;
                                return (
                                    <GenreView
                                        genre={
                                            movies.find((m) => m.Genre.Name === match.params.name)
                                                .Genre
                                        }
                                    />
                                );
                            }}
                        />
                        <Route
                            exact
                            path="/directors/:name"
                            render={({ match }) => {
                                if (!movies) return <div className="main-view" />;
                                return (
                                    <DirectorView
                                        director={
                                            movies.find((m) => m.Director.Name === match.params.name)
                                                .Director
                                        }
                                    />
                                );
                            }}
                        />
                    </div>
                </div>
            </Router>
        );
    }
}