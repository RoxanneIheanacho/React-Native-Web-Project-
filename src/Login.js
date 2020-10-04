import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image
} from 'react-native'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      username: '',
      password: ''
    }
  }

  render () {
    return (
      <View style={styles.login}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Image style={{ width: 200, height: 200}} source={require('./Seehearapplogo.png')} />
        </View>
        <Text
          style={styles.text}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>                        
          </View>
        </Text>
        
        <View style={styles.submit} />
        <Button
          style={styles.submit}
          onPress={this.props.onLoginPress}
          title='Login'
        />
      </View>
    )
  }
}
export default Login

const styles = StyleSheet.create({
  login: {
    padding: 20,
    backgroundColor: 'deepskyblue',
    width: 900,
    borderRadius: 10,
    margin: 100
  },
  text: {
    backgroundColor: 'blue',
    color: 'white'
  },
  submit: {
    borderWidth: 2,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 4
  }
})
