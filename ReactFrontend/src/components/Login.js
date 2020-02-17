import React, { Component } from 'react'
import { withCookies } from 'react-cookie'

let FontAwesome = require('react-fontawesome')

class Login extends Component {

  state = {

    credentials : {
      username : '',
      password : ''
    },
    
    isLoginView : true
  }

  inputChange = e => {

    let credentials = this.state.credentials
    credentials[e.target.name] = e.target.value
    this.setState({ credentials : credentials })
  }

  // get the credentials from the input, parse them in JSON and 
  // send them to the DB.
  // On a successful login, we get an auth token object in res.token
  // On a failure, we get a non_field_error array with the error.
  login = () =>  {

    if (this.state.isLoginView) {

      // fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
      fetch(`https://rnmcmovies.herokuapp.com/auth/`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.credentials) 
  
      }).then( res => res.json()) 
        .then( res => {
          this.props.cookies.set('rmm-token', res.token) //generate cookie with the token
          window.location.href = '/movies'
        }) 
        .catch( err => console.log(err))  

    } else {

      fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.credentials) 
  
    }).then( res => res.json()) 
      .then( res => {
        this.setState({ isLoginView : true }) // redirect to login
      }) 
      .catch( err => console.log(err))  
    }      
  }

  toggleView = () => {
    this.setState({ isLoginView : !this.state.isLoginView })
  }

  render() {
    return (

    <div className='Login'>

    <h2> { this.state.isLoginView ? 'Login' : 'Signup'} </h2>

      <span>Username</span>
      <br/>
      <input 
        type='text' name='username' className='login-input'
        value={ this.state.credentials.username } 
        onChange={ this.inputChange }/>
      <br/>

      <span>Password</span>
      <br/>
      <input 
        type='password' name='password' className='login-input'
        value={ this.state.credentials.password }
        onChange={ this.inputChange }/>
      <br/>

      <button className='login-button' onClick={ this.login }>
        <FontAwesome 
          name={ this.state.isLoginView ? 'sign-in-alt' : 'user-plus' }
        />
      </button>

      <p onClick={ this.toggleView } className='signup'> 
      { 
        this.state.isLoginView 
        ? 
        'Do not have an account? Click here to signup.' 
        : 
        'Have an account? Click here to login instead.' 
      } 
      </p>
    </div>
    )
  }
}

// wrap the export to enable bookies in login
export default withCookies(Login)