import React, { Component } from 'react';
import { View, StyleSheet, Button, ScrollView, Linking, Dimensions} from 'react-native'
import NewTodo from './NewTodo'
import NewText from './NewText'
import Details from './Details'
import Header2 from './Header2'
import io from 'socket.io-client'



class Videocreater extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: true
    }
    this.newWebRTCref = React.createRef()  
    this.reWebRTCref = React.createRef() 
    this.Details = Details
    this.NewTodo = NewTodo
    this.NewText = NewText 
    this.socket = null
    this.candidates = []
  }

  componentDidMount = () => {
    this.socket = io.connect(
      'https://8aa7a006.ngrok.io/webrtcPeer',
      {
        path: '/io/webrtc',
        query: {
          
        }
      }
    )

    this.socket.on('connection-success', created => {
      console.log(created)
    })

    this.socket.on('offerOrAnswer', (sdp) => {
      this.textref.value = JSON.stringify(sdp)
      this.pc.setRemoteDescription(new RTCSessionDescription(sdp))
    })

    this.socket.on('candidate', (candidate) => {
      this.pc.addIceCandidate(new RTCIceCandidate(candidate))
    })

    const newserve = { 
      "iceServers": [
        {
          urls : 'stun:stun.rixtelecom.se'
        }
      ]
    }
    this.rtcpcon = new RTCPeerConnection(newserve) 
    this.rtcpcon.onicecandidate = (e) => {
      if (e.candidate) {
        this.sendToPeer('candidate', e.candidate)
      }
    }
    this.rtcpcon.oniceconnectionstatechange = (e) => {
      console.log(e)
    }
    this.rtcpcon.ontrack = (e) => {
      debugger
      this.reWebRTCref.current.srcObject = e.streams[0]
    }
    const created = (stream) => { 
      window.localStream = stream
      this.newWebRTCref.current.srcObject = stream
      this.rtcpcon.addStream(stream)
    }
    const noconnect = (e) => { 
      console.log('getUserMedia Error: ', e)
    }
    const settings = { 
      audio: true,
      video: true,
      options: {
        mirror: true,
      }
    }
    navigator.mediaDevices.getUserMedia(settings)
      .then(created)
      .catch(noconnect)
  }

  sendToPeer = (messageType, payload) => {
    this.socket.emit(messageType, {
      socketID: this.socket.id,
      payload
    })
  }
//Real-Time Communication with WebRTC: Peer-to-Peer in the Browser
//By Salvatore Loreto, Simon Pietro Romano pg 102
  createOffer = () => {  //createOffer = method of webRTC
    console.log('Offer')
    this.rtcpcon.createOffer({ offerToReceiveVideo: 1 })
      .then(sdp => {
        this.rtcpcon.setLocalDescription(sdp)
        this.sendToPeer('offerOrAnswer', sdp)
    })
  }
  //createanswer method is  called and sets local description of parameter sdp 
  createAnswer = () => { 
    console.log('Answer')
    this.rtcpcon.createAnswer({ offerToReceiveVideo: 1 })
      .then(sdp => {
        this.rtcpcon.setLocalDescription(sdp)
        this.sendToPeer('offerOrAnswer', sdp)
    })
  }
  //https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/setRemoteDescription
  setRemoteDescription = () => {
    const newparse = JSON.parse(this.textref.value) 
    this.rtcpcon.setRemoteDescription(new RTCSessionDescription(newparse))
  }
  
  stopStream = () => {
    this.newWebRTCref.current.srcObject.getTracks().forEach(track => track.stop())
  }

  render() {
    const returnscroll = Dimensions.get('window').height

    return (
     <div style={{backgroundColor: 'pink'}}>
        <video
          style={{
            width: 350,
            height: 240,
            margin: 5,
            backgroundColor: 'DodgerBlue',
            position: 'center'
          }}
          ref={ this.newWebRTCref } autoPlay> </video>
        <video
          style={{
            width: 350,
            height: 240,
            margin: 5,
            backgroundColor: 'DodgerBlue'
          }}
          ref={ this.reWebRTCref }
          autoPlay>
        </video>
        <br />
      
      
        <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
        <Button style={styles.smallbtn} 
        onPress={() => Linking.openURL('https://www.fc.lnu.se/~ra222tq/DestroyCorona/index.htm')} title='PlayGame'></Button>
        <Button style={styles.smallbtn}
         onPress={this.stopStream}title='Stop Cam'></Button>
        <Button style={styles.smallbtn}
         onPress={this.createOffer}title='Send Cam'></Button>
        <Button style={styles.smallbtn}
         onPress={this.createAnswer}title='Answer Cam'></Button>
          <Button style={styles.smallbtn} 
        onPress={() => Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLSfzTxmGI8XOiNbX7xjGLFoBguQAToEBoM30ZcGZxM1b7bVX0Q/viewform?usp=sf_link')} title='Done(MakeReport)'></Button>
         <Button style={styles.smallbtn}
        onPress={() => Linking.openURL('Login')} title='Logout'>>
        </Button>
         </View>
         <View style={{height: returnscroll}}>
      <ScrollView
            style={{flex: 1}}>
      <Header2 title='Todays Duties' />
      <Details></Details>
      </ScrollView>
        </View>
        </div>
     
  )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  input: {
    height: 50,
    padding: 6,
    margin: 6
  },
  smallbtn:{
    borderWidth: 2,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 4
  },
  btn: {
    borderWidth: 2,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 4
  },
  btnText: {
    color: 'black',
    fontSize: 17,
    textAlign: 'center'
  },
  video: {
    marginTop: 20,
    maxHeight: 20,
    width: 20,
    flex: 1

  }
})

export default Videocreater