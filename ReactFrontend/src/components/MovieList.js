import React from 'react'
let FontAwesome = require('react-fontawesome')

function MovieList( props ) {

    const movieClick = movie => e => {
        
        props.movieClick(movie)
    }

    const editClick = movie => {
        
        // notify the parent of the edition
        props.movieEdit(movie)
    }

    const newMovie = () => {
        
        // notify the parent of the edition
        props.newMovie()
    }

    // the extra arrow function is removed and added to the onClick event
    const removeClick = movie => {
        
        // send the requiest to the DB to remove it.
        // use the token passed as props
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${movie.id}/`, {

            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`
            },

        }).then( res => props.movieDelete(movie))  // notify the parent the movie was removed
          .catch( err => console.log(err))
    }

    return ( 
        <div className='movie-list'>
            <FontAwesome name='plus-circle' className='plus' onClick={ () => newMovie() }/>
            <span onClick={ () => newMovie() }> Add movie </span>
        {
            
            // movie is now a JSON Movie object. bring id and title
            props.movies.map( (movie) => {
                return (
                    <div key={movie.id} className='movie-item'>
                        <h5 className='movie-title'onClick={ movieClick(movie) }> 
                            { movie.title } 
                        </h5>
                        <span className='movie-icons'>
                            <FontAwesome name='edit' onClick={ () => editClick(movie) }/>
                            <FontAwesome name='trash' onClick={ () => removeClick(movie) }/>
                        </span>
                    </div>
                )
            })
        }
        </div>
    )
}

export default MovieList