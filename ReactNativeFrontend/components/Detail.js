import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function Detail( props ) {

  // get the parameter received from movieClicked @ MovieList
  // provide a default (null)
  const movie = props.navigation.getParam('movie', null)

  // same, but for the token
  const token = props.navigation.getParam('token', '')

  const [highLight, setHighLight] = useState(0)

  const rateClick = () => {

    if (highLight > 0 && highLight < 6) {

      fetch(`http://192.168.0.21:8000/api/movies/${movie.id}/rate_movie/`, {

      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( { stars: highLight } )

    }).then( res => res.json() )
      .then( res => {
        setHighLight(0)
        Alert.alert(res.message)
      })
      .catch( err => Alert.alert('Error', err.message))
    }
  }

  return (
    <View style={ styles.container }>

      <View style={ styles.starContainer }>

        <FontAwesomeIcon 
          style={ movie.average_rating > 0 ? {color:'#ffff00'} : {color:'#ffffff'} } 
          icon={ faStar } size={ 24 }/>
        <FontAwesomeIcon 
          style={ movie.average_rating > 1 ? {color:'#ffff00'} : {color:'#ffffff'} } 
          icon={ faStar } size={ 24 }/>
        <FontAwesomeIcon 
          style={ movie.average_rating > 2 ? {color:'#ffff00'} : {color:'#ffffff'} } 
          icon={ faStar } size={ 24 }/>
        <FontAwesomeIcon 
          style={ movie.average_rating > 3 ? {color:'#ffff00'} : {color:'#ffffff'} } 
          icon={ faStar } size={ 24 }/>
        <FontAwesomeIcon 
          style={ movie.average_rating > 4 ? {color:'#ffff00'} : {color:'#ffffff'} } 
          icon={ faStar } size={ 24 }/>

        <Text style={ { color: '#ffffff', marginLeft: 3 } }>( { movie.number_of_ratings } )</Text>
      </View>

      <Text style={ styles.description }> { movie.description } </Text>

      <View style={{marginTop: 15, borderBottomColor: 'white', borderBottomWidth: 2}} />

      <Text style={ styles.description }> Rate the movie </Text>

      <View style={ styles.starContainer }>

        <FontAwesomeIcon 
          style={ highLight > 0 ? {color:'#ffff00'} : {color:'gray'} } 
          icon={ faStar } size={ 30 } onPress={ () => setHighLight(1)} />
        <FontAwesomeIcon 
          style={ highLight > 1 ? {color:'#ffff00'} : {color:'gray'} } 
          icon={ faStar } size={ 30 } onPress={ () => setHighLight(2)}/>
        <FontAwesomeIcon 
          style={ highLight > 2 ? {color:'#ffff00'} : {color:'gray'} } 
          icon={ faStar } size={ 30 } onPress={ () => setHighLight(3)}/>
        <FontAwesomeIcon 
          style={ highLight > 3 ? {color:'#ffff00'} : {color:'gray'} } 
          icon={ faStar } size={ 30 } onPress={ () => setHighLight(4)}/>
        <FontAwesomeIcon 
          style={ highLight > 4 ? {color:'#ffff00'} : {color:'gray'} } 
          icon={ faStar } size={ 30 } onPress={ () => setHighLight(5)}/>

      </View>

      <View style={{marginTop: 15}}></View>

      <Button title='Rate' color='#000000' onPress={ () => rateClick() }/>

    </View>
  )
}

Detail.navigationOptions = screenProps => ({
  title: screenProps.navigation.getParam('title'),
  headerStyle: {
    backgroundColor: '#282C35'
  },
  headerTintColor: '#ffffff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 18
  },
  headerRight: () =>
    <Button title='Edit' color='#000000' 
      
      onPress={ () => screenProps.navigation.navigate(
        'Edit', 
        { movie: screenProps.navigation.getParam('movie')}
      )}
    />
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C35',
    alignItems: 'center',
    paddingTop: 20
  },
  starContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  description: {
    fontSize: 18,
    color: '#ffffff',
    padding: 10,
    marginTop: 10
  }
})