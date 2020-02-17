import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Button, 
  AsyncStorage, TouchableOpacity } from 'react-native'

export default function Auth( props ) {

  const [username, setUserName] = useState( '' )
  const [password, setPassword] = useState( '' )
  const [registration, setRegistration] = useState( '' )

  useEffect( () => {

    // trying to call for Auth while already logged in?
    // if so, back to MovieList
    getData()

  }, [])

  const auth = () => {

    if (registration) {

      fetch(`http://192.168.0.21:8000/api/users/`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
  
      }).then( res => res.json() )
        .then( res => { setRegistration(false) })   // back to login
        .catch( err => console.log( err ))

    } else {

      fetch(`http://192.168.0.21:8000/auth/`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }) // user:user, pass:pass
  
      }).then( res => res.json() )
        .then( res => {
          saveToken( res.token )                     // await for the token
          props.navigation.navigate('MovieList')     // go to MovieList
        })
        .catch( err => console.log( err ))
    }
  }

  /* set the token with the name 'rnmc_token'. AsyncStorage is async,
   * we need to await for it, since if we were to navigate to another
   * component, the function will not wait for the token to be gen'd.
   * To await for it, we mark the arrow function with 'async', and 
   * explicitly call 'await' in AsyncStorage
   */
  const saveToken = async token => {
    const value = await AsyncStorage.setItem('rnmc_token', token)
  }

  // same as above, but this time to check if we actually have a
  // when trying to call for Auth. If we do, then go to MovieList.
  const getData = async () => {
    const token = await AsyncStorage.getItem('rnmc_token')

    if (token) props.navigation.navigate('MovieList') 
  }

  const toggleView = () => {
    setRegistration(!registration)
  }

  return (

    <View style={ styles.container }>

      <Text style={ styles.label }> Username </Text>

      <TextInput 
        style={ styles.input } 
        value={ username }
        placeholder='Username'
        onChangeText={ text => setUserName(text) }
        autoCapitalize={ 'none' } // no auto capital letters
      />

      <Text style={ styles.label }> Password </Text>

      <TextInput 
        style={ styles.input } 
        value={ password }
        placeholder='Password'
        onChangeText={ text => setPassword(text) }
        autoCapitalize={ 'none' }
        secureTextEntry={ true }   // show * for password
      />

      <View style={{marginTop: 15}}></View>

      <Button 
        style={ styles.login } 
        color='#000000'
        onPress={ () => auth() } 
        title={ registration ? 'Signup' : 'Login' }
      />

      <View style={{marginTop: 15}}></View>

      <TouchableOpacity onPress = { () => toggleView() }>

        <Text style={ styles.registration }> 
          { registration ? 'Back to login' : 'Signup here'} 
        </Text>

      </TouchableOpacity>

    </View>
  )
}

Auth.navigationOptions = screenProps => ({
  title: 'Access',
  headerStyle: {
    backgroundColor: '#282C35'
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 18
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282C35',
    alignItems: 'center',
    paddingTop: 20
  },
  label: {
    fontSize: 18,
    color: '#fff',
    padding: 10,
  },
  input: {
    fontSize: 18,
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
  },
  login: {
    marginTop: 20,
    padding: 10
  },
  registration: {
    fontSize: 14,
    color: '#fff',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 2
  }
})