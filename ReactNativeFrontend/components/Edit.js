import React, { useState, useEffect } from 'react'

import { StyleSheet, Text, View, TextInput, Button } from 'react-native'

export default function Edit( props ) {

  const movie = props.navigation.getParam('movie', null)

  const [title, setTitle] = useState( movie.title )
  const [description, setDescription] = useState( movie.description )

  const saveMovie = () => {
    
    // are we editing an already existing movie? Same as previous 'edit'
    if (movie.id) {

      fetch(`http://192.168.0.21:8000/api/movies/${movie.id}/`, {

        method: 'PUT',
        headers: {
          'Authorization': `Token 0015510cae5e06e8fcfad35a6358c6afcd0840f5`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          description: description
        })
  
      }).then( res => res.json() )
        .then( jsonMovie => 
          props.navigation.navigate('Detail', { movie: jsonMovie, title: jsonMovie.title }))
        .catch( err => console.log( err ))
    
    // we do not have an id, we are creating a new movie
    } else {

      fetch(`http://192.168.0.21:8000/api/movies/`, {

      method: 'POST',
      headers: {
        'Authorization': `Token 0015510cae5e06e8fcfad35a6358c6afcd0840f5`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        description: description
      })

    }).then( res => res.json() )
      .then( jsonMovie => 
        props.navigation.navigate('MovieList')) // back to home
      .catch( err => console.log( err ))
    }

    props.navigation.goBack()
  }

  return (
    <View style={ styles.container }>

      <Text style={ styles.label }> Title </Text>

      <TextInput 
        style={ styles.input } 
        value={ title }
        placeholder='Movie title'
        onChangeText={ text => setTitle(text) }
      />

      <Text style={ styles.label }> Description </Text>

      <TextInput 
        style={ styles.input } 
        value={ description }
        placeholder='Movie description'
        onChangeText={ text => setDescription(text) }
      />

      <Button 
        style={ styles.save } 
        color='#000000'
        onPress={ () => saveMovie() } 
        title={ movie.id ? 'Save' : 'Create' }
      />

    </View>
  )
}

Edit.navigationOptions = screenProps => ({
  title: screenProps.navigation.getParam('title') || screenProps.navigation.getParam('movie')
    ? 
    screenProps.navigation.getParam('title') 
    :
    'Create movie',
  headerStyle: {
    backgroundColor: '#282C35'
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 18
  },
  headerRight: (
    <Button title='Delete' color='#ff0000' 
      onPress={ () => removeMovie(screenProps) }
    />
  )
})

const removeMovie = screenProps => {

  const movie = screenProps.navigation.getParam('movie')

  fetch(`http://192.168.0.21:8000/api/movies/${movie.id}/`, {

        method: 'DELETE',
        headers: {
          'Authorization': `Token 0015510cae5e06e8fcfad35a6358c6afcd0840f5`,
          'Content-Type': 'application/json'
        },
  
      }).then( movie => screenProps.navigation.navigate('MovieList') )
        .catch( err => console.log( err ))
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C35',
    alignItems: 'center',
    paddingTop: 20
  },
  label: {
    fontSize: 18,
    color: 'white',
    padding: 10,
  },
  input: {
    fontSize: 18,
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
  },
  save: {
    marginTop: 20,
    padding: 10
  }
})