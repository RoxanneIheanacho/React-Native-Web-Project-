import React from 'react'
import { AppRegistry /*, View */ } from 'react-native'

import Login from './Login'
import Videocreater from './Videocreater' 

class App extends React.Component {
  
  state = {
    isLoggedIn: false
  }
  loginfunc = () => {
    if (this.state.isLoggedIn)
      return <Videocreater
          onLogoutPress={() => this.setState({isLoggedIn: false})}
        />;
    else
      return <Login 
          onLoginPress={() =>  this.setState({isLoggedIn: true})} 
      />
    
  } 

  render () {
    return (
     this.loginfunc() 
    )
  }
}
export default App
AppRegistry.registerComponent('App', () => App)
