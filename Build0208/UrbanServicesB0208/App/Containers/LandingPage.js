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
    <View style={styles.landingpageWrapper}>
       <Image source={Images.landingpgBg} style={styles.backgroundImage} resizeMode='stretch'/>
       <View style={{marginTop : 100}}>
            
            <TouchableHighlight 
            style={styles.homeButton}
            onPress={() => this.props.navigator.push(Routes.dpWaterCan)}
            >
            <Text style={styles.homeButtonText}>Water Can</Text>
            </TouchableHighlight>

            <TouchableHighlight 
            style={styles.homeButton}
            onPress={() => this.props.navigator.push(Routes.dpLaundry)}
            
            >
            <Text style={styles.homeButtonText}>Laundry</Text>
            </TouchableHighlight>   

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
