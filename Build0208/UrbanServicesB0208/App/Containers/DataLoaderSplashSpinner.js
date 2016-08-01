import React, { PropTypes } from 'react'
import { View, ScrollView, Text, LayoutAnimation, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
import { Metrics, Colors } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
// Importing spinner to show as overlay while creating firebase ref and initial dataloading
import ProgressBar from 'react-native-progress/Bar';
// Styles
import styles from './Styles/DataLoaderSplashSpinnerStyle'

// I18n
import I18n from '../I18n/I18n.js'


//Firebase  Ref
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDA2O-uRbNipOS3iKo5qRAg3Xd46u67Bg0",
  authDomain: "samplesserver.firebaseapp.com",
  databaseURL: "https://samplesserver.firebaseio.com",
  storageBucket: "samplesserver.appspot.com"
};

class DataLoaderSplashSpinner extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      visibleHeight: Metrics.screenHeight,
      progress : 0,
      intermediate : true
    }
  }

  static propTypes = {
    navigator: PropTypes.object.isRequired
  }

  componentDidMount(){
    firebase.initializeApp(firebaseConfig)
    setTimeout(()=>
    {this.props.navigator.push(Routes.LandingPage)},
    500
      
      );
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
      <View style={{ flex: 1,backgroundColor : Colors.background }}>
       <Text style={{marginTop : 150,color : 'white'}}>Loading !!!</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(DataLoaderSplashSpinner)
