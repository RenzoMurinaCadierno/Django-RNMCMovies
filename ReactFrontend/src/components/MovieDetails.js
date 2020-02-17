import React, { Component } from 'react'

// bring fontawesome up
let FontAwesome = require('react-fontawesome')

class MovieDetails extends Component {

    state = {
        highlight: -1
    }

    highLightStar = highlight => e => {
        this.setState({ highlight: highlight })
    }

    clickStar = stars => e => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.selectedMovie.id}/rate_movie/`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            },
            body: JSON.stringify( { stars: stars + 1 } )  // i starts as 0

        }).then( res => res.json()) 
          .then( res => this.getDetails())  // trigger getDetails on selectedMovie rate
          .catch( err => console.log(err))
    }

    // fetches the movie object itself by its id, not the rate
    getDetails = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.selectedMovie.id}/`, {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            },
        }).then( res => res.json()) 
          .then( res => this.props.updateMovie(res))  // trigger updateMovie on props
          .catch( err => console.log(err))
    }

    render() {
        const selMov = this.props.selectedMovie

        return (
            <>
            {
                selMov 
                ? 
                (
                    <div>
                        <h4> 
                            {selMov.title} 
                        </h4>
                        

                        <FontAwesome name='star' className={ 
                                selMov.average_rating > 0 
                                ? 'yellow' 
                                : ''
                                }
                        />
                        <FontAwesome name='star' className={ 
                                selMov.average_rating > 1 
                                ? 'yellow' 
                                : ''
                                }
                        />
                        <FontAwesome name='star' className={ 
                                selMov.average_rating > 2 
                                ? 'yellow' 
                                : ''
                                }
                        />
                        <FontAwesome name='star' className={ 
                                selMov.average_rating > 3 
                                ? 'yellow' 
                                : ''
                                }
                        />
                        <FontAwesome name='star' className={ 
                                selMov.average_rating > 4 
                                ? 'yellow' 
                                : ''
                                }
                        />

                        ({ selMov.number_of_ratings })

                        <p> 
                            {selMov.description} 
                        </p>

                        <div className='rate'>

                            <h4> Rate movie </h4>

                            { [...Array(5)].map((e, i) => {

                                return <FontAwesome
                                        key={i} 
                                        name='star'
                                        onMouseEnter={ this.highLightStar(i) } 
                                        onMouseLeave={ this.highLightStar(-1) } 
                                        onClick={ this.clickStar(i) }
                                        className={ 
                                            this.state.highlight > i - 1 
                                                ? 'yellow' 
                                                : ''
                                            }
                                        />
                            })}
                        </div>
                    </div>
                ) 
                : 
                null
            }
            </>
        )
    }
}

export default MovieDetails