import React, { Component } from  'react'
import firebase from '@firebase/app'
import '@firebase/auth'
import MainStack from './src/components/MainStack'
import { connect } from 'react-redux'
import { alreadyLogin, notLoginYet } from './src/actions'


class AppInit extends Component {
  componentDidMount () {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyA-mPdLZPXMsujWtMdZ2WnruvwjIx4ia2w",
      authDomain: "instagrinjc10app.firebaseapp.com",
      databaseURL: "https://instagrinjc10app.firebaseio.com",
      projectId: "instagrinjc10app",
      storageBucket: "instagrinjc10app.appspot.com",
      messagingSenderId: "805543164075",
      appId: "1:805543164075:web:06554e2daef002ac23dfee"
    };
    // Initialize Firebase
    // console.log('isi firebase', firebase.apps);
    if(!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.alreadyLogin(user)
      } else {
        this.props.notLoginYet()
      }
    })
  }


  render() {
    return (
      <MainStack/>
    )
  }
}

export default connect(null, { notLoginYet, alreadyLogin })(AppInit);