import React, { Component } from 'react'
let FontAwesome = require('react-fontawesome')

class MovieForm extends Component {

    state = {
      editedMovie : this.props.movie
    }

    cancelClick = () => {
      this.props.cancelForm()
    }

    // on save new movie, POST to server/api/movies/ passing
    // the editedMovie as a JSON string to the DB. Then with
    // the DB answer, call for props.newMovie passing the
    // response object, which will be included inside App.js
    // movie [] state
    saveClick = () => {
      fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${this.props.token}`
        },
        body: JSON.stringify(this.state.editedMovie) // this comes from form

    }).then( res => res.json()) 
      .then( res => this.props.newMovie(res)) // we have a new movie from
      .catch( err => console.log(err))        // the db, pass it to props
    }

    // if we were to update a movie, then we call for out api passing the id
    // of the movie, a PUT request, and the editedMovie in this.state as JSON.
    // we convert the response to json and call props.editMovie with it.
    updateClick = () => {
      fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/`, {

        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${this.props.token}`
        },
        body: JSON.stringify(this.state.editedMovie) // this comes from form

    }).then( res => res.json()) 
      .then( res => this.props.editMovie(res)) // we have a new movie from
      .catch( err => console.log(err))        // the db, pass it to props
    }

    inputChange = e => {

      // grab the movie from its state
      let movie = this.state.editedMovie

      // fetch the input/textarea by its name and change its value
      movie[e.target.name] = e.target.value

      // set the state to the selected movie being edited
      this.setState({ editedMovie : movie })
    }

    render() {

      // a simple validation for the fields
      const isDisabled = 
        this.state.editedMovie.title.length === 0 ||
        this.state.editedMovie.description.length === 0

      return (
      <div className='movie-edit'>
        <span>Title</span>
        <br/>
        <input 
          type='text' 
          name='title'
          value={ this.props.movie.title } 
          onChange={ this.inputChange }/>
        <br/>
        <span>Description</span>
        <br/>
        <textarea 
          name='description'
          value={ this.props.movie.description }
          onChange={ this.inputChange }/>
        <br/>

        {
          this.props.movie.id 
          ?
          <button disabled={ isDisabled } onClick={ this.updateClick }>
            <FontAwesome name='check' />
            </button>
          :
          <button disabled={ isDisabled } onClick={ this.saveClick }>
            <FontAwesome name='check' /> 
          </button>
        }

        <button onClick={ this.cancelClick }>
          <FontAwesome name='times'/>
        </button>

      </div>
      )  
    }
}

export default MovieForm