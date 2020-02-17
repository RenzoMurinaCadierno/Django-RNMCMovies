import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, 
  Button, AsyncStorage } from 'react-native'

export default function MovieList( props ) {

  const [movies, setMovies] = useState( [] )

  let token = null    // no token to begin with

  const getToken = async () => {

    token = await AsyncStorage.getItem('rnmc_token') // get it

    if (token) {      // if you got it, then load fetch()
      getMovies()

    } else {
      props.navigation.navigate('Auth')   // no token, go to login
    }
  }

  // useEffect takes an => as the first arg, and an [] as the second arg.
  // The array is Hooks. It tells useEffect on which ocassions it should
  // trigger. If we leave it empty, it does so at componentDidMount only.

  useEffect( () => {

    getToken()        // get the token on componentDidMount

  }, [])

  const getMovies = () => {

    fetch('http://192.168.0.21:8000/api/movies/', {

      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`
      }

    }).then( res => res.json() )
      .then( res => setMovies( res ))
      .catch( err => console.log( err ))
  }

  // go to Details page and pass movie as a props
  const movieClicked = movie => {

    props.navigation.navigate(
      'Detail', { movie: movie, title: movie.title, token: token })
  }

  return (
    <View style={ styles.container }>

      <Image 
        source={ require('../assets/rmmlogo.png') }
        style={{ width: '100%', height: 45, paddingTop: 10 }}
        resizeMode='contain'
      />

      <Text style={ styles.descText }>
        Click on a movie below for its details and/or 
        to rate it, or add a new movie with the button above.
      </Text>

      <FlatList 
        
        data={ movies }

        renderItem={ ({ item }) => (

          <TouchableOpacity onPress={ () => movieClicked(item) }>
            <View style={ styles.item }> 

              <Text style={ styles.itemText }> 
                { item.title } 
              </Text>

            </View>
          </TouchableOpacity>
        )}

        // set a unique key to each array for each item
        keyExtractor={ (item, index) => index.toString()}
      />
    </View>
  )
}

MovieList.navigationOptions = screenProps => ({
  title: 'Movie Rater',
  headerStyle: {
    backgroundColor: '#282C35',
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  // reuse the component 'Edit' by passing an empty title and description
  headerRight: () =>
    <Button title='Add new movie' color='#000000' 
      
      onPress={ () => screenProps.navigation.navigate(
        'Edit', 
        { movie: { title: '', description: ''}}
      )}
    />
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C35',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  descText: {
    color: 'gray',
    fontStyle: 'italic',
    fontSize: 14,
    marginTop: 15,
    marginBottom: 10
  },
  item: {
    flex: 1,
    padding: 10,
    height: 50,
    backgroundColor: '#282C35',
    alignItems: 'center',
  },
  itemText: {
    color: '#fff',
    fontSize: 18,
  },
})