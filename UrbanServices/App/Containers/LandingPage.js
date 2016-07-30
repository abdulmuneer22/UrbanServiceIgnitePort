import React, { PropTypes } from 'react'
import { View, ScrollView, Text, LayoutAnimation, Keyboard ,Image , TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
import { Metrics } from '../Themes'
import { Images } from '../Themes'

// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'

// Styles
import styles from './Styles/LandingPageStyle'
import Dimensions from 'Dimensions'
// I18n
import I18n from '../I18n/I18n.js'

//Firebase

import firebase from 'firebase';

var ConditionalView = null
var useridlength = 0

const window  = Dimensions.get('window')
const windowWidth = window.width
const UID = 'uid'
const EMAIL = 'email'
const uidLength = '0'

class LandingPage extends React.Component {
  constructor(){
  super();
  this.state = {
    currentUser : "",
    isLoggedIn : false
  }
}
  

  static propTypes = {
    navigator: PropTypes.object.isRequired
  }

  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this))
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this))

    // Configure nav button
    this.props.navigator.state.tapHamburger = () => {
      this.props.navigator.drawer.toggle()
    }



    var _currentUser = firebase.auth().currentUser;
     this.setState({
          currentUser : _currentUser
          
        })
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow (e) {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize
    })
  }

  keyboardDidHide (e) {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight
    })
  }

  render () {
    return (
    <View>
    <Image source={Images.landingpgBg} style={styles.backgroundImage} resizeMode='stretch' />

      

    <View style={{flex : 1}}>

    <View style={{flex : 1,justifyContent:'center'}} >
    <Text style={styles.homeButtonText}>Services</Text>
    </View>

    <View style={{flex : 1,alignItems:'center'}} >

    <TouchableHighlight 
    style={styles.homeButton}
    //onPress={this.redirect.bind(this,'watercan',this.props.authData)}
    >
    <Text style={styles.homeButtonText}>Water Can</Text>
    </TouchableHighlight> 



    </View>

    <View style={{flex : 1,alignItems:'center'}} >
    <TouchableHighlight style={styles.homeButton}>
    <Text style={styles.homeButtonText}>Laundry</Text>
    </TouchableHighlight>
    </View>




    {
    !this.state.currentUser ? 


    <View style={{
    flex : 2,
    //borderColor:'red',
    //borderWidth:1
    }} >

    <View style={{
    flex : 1,
    //borderColor:'green',
    //borderWidth:1
    }}>
    </View>



    <View style={{
    flex : 1,
    flexDirection: 'row',
    //borderColor:'green',
    //borderWidth:1,
    marginLeft:30,
    marginRight:30
    }}>



    <View style={{flex:1}}>
    <TouchableHighlight 
    style={styles.SignInButton}
    //onPress={this.redirect.bind(this,'login')}
    >
    <Text style={styles.SignInButtonText}>Sign In</Text>
    </TouchableHighlight>
    </View>

    <View style={{flex:1}}>
    <TouchableHighlight 
    style={styles.SignInButton}
    //onPress={this.redirect.bind(this,'register')}
    >
    <Text style={styles.SignInButtonText}>Register</Text>
    </TouchableHighlight>
    </View>


    </View>

    <Text 
    style={{
    textAlign:'center',
    marginLeft:10,
    marginRight:10,
    //marginTop:20,
    marginBottom : 20,
    color:'#80CBC4'}}>
    By continuing using this application, you agree to our Terms & Conditions
    </Text>
    </View>


    :null}



    </View>

    <View>
    <Text>Debugger : {this.state.currentUser ? <Text>{this.state.currentUser.email}</Text> : null}</Text>
    </View>



    </View>


          );
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(LandingPage)
