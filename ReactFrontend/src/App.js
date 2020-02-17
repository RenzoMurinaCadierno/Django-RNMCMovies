import React, { Component } from 'react'
import { withCookies } from 'react-cookie'
import './App.css';
import MovieList from './components/MovieList'
import MovieDetails from './components/MovieDetails'
import MovieForm from './components/MovieForm'

let FontAwesome = require('react-fontawesome')

class App extends Component {

  state = {
    movies : [],
    selectedMovie : null,
    editedMovie : null,
    token : this.props.cookies.get('rmm-token')
  }

  componentDidMount() {

    // check the token in the cookie. If it does not exist, 
    // redirect to '/', otherwise, fetch 'movies/' from the
    // backend and show it.
    // If the cookie disappears at any time, you will be kicked
    // out back to '/'
    if(this.state.token) {

      // fetch data from the website. It is a Promise!
      // > arguments[0] site, arguments[1] options (JS object)
      fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {

        method: 'GET',
        headers: {
          // our Django Auth token generated while logging in
          'Authorization': `Token ${this.state.token}`
        }

      }).then( res => res.json() )      
        .then( res => this.setState({ movies: res }) )
        .catch( err => console.log(err) )

    } else {

      window.location.href = '/'
    }
  }

  // reset editedMovie state so that the form disappears
  loadMovie = movie => {
    this.setState( { selectedMovie: movie, editedMovie : null } )
  }

  // filter and return an array containing the movies whose ids
  // do NOT match the one of the requested one to delete.
  // Set the state with the result, and if there was a movie
  // selected, unselect it.
  movieDelete = selMovie => {
    const movies = this.state.movies.filter( movie => movie.id !== selMovie.id)
    this.setState({ movies : movies, selectedMovie : null })
  }

  movieEdit = selMovie => {
    this.setState({ editedMovie : selMovie })
  }

  movieCreate = () => {
    this.setState({ editedMovie: { title: '', description: ''} })
  }

  formCancel = () => {
    this.setState({ editedMovie: null })
  }

  // when creating a movie, a movie object will come from the
  // child component. Spread the array here and add it.
  movieAdd = movie => {
    this.setState({ 
      movies: [...this.state.movies, movie],
      editedMovie : null 
    })
  }

  render() {
    return (
      <div className="App">
          
        <h2>
          <FontAwesome name='ticket-alt'/>
          <span> RNMC Movies </span>
        </h2>  

        <div className='layout'>

          <MovieList 
            movies={ this.state.movies } 
            movieClick={ this.loadMovie }
            movieEdit={ this.movieEdit }
            movieDelete={ this.movieDelete }
            newMovie={ this.movieCreate }
            token={ this.state.token }
          />

          <div className='movie-details'>

            { 
            this.state.editedMovie 
            ?
              <MovieForm 
                movie={ this.state.editedMovie }
                cancelForm={ this.formCancel }
                newMovie={ this.movieAdd }
                editMovie = { this.loadMovie }
                token={ this.state.token }
              />
            : 
              <MovieDetails 
                selectedMovie={ this.state.selectedMovie }
                updateMovie={ this.loadMovie } // update the state
                token={ this.state.token }
              />
            }

          </div>
        </div>
      </div>
    )
  }
}

export default withCookies(App)

