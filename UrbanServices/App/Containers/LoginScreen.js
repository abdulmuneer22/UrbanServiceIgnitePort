import React, {PropTypes} from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  LayoutAnimation,
  Alert
} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/LoginScreenStyle'
import Actions from '../Actions/Creators'
import {Images, Metrics} from '../Themes'
import Routes from '../Navigation/Routes'

// I18n
import I18n from '../I18n/I18n.js'

//Firebase Ref
import firebase from 'firebase'



class LoginScreen extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      Email: "",
      password: "",
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth }
    }
    this.isAttempting = false
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    if (this.isAttempting && !newProps.attempting) {
      this.props.navigator.pop()
    }
  }

  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)

    // Configure the right nav button
    this.props.navigator.state.tapForgotPassword = this.tapForgotPassword
    
    //firebase.initializeApp(firebaseConfig)
      
    
  }

  // Method that runs when you tap the right nav bar button
  tapForgotPassword = () => {
    Alert.alert(I18n.t('forgotPassword'))
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
    
  }

  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize,
      topLogo: {width: 100, height: 70}
    })
  }

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
      topLogo: {width: Metrics.screenWidth}
    })
  }

  handlePressLogin = () => {
  
  
  
  
  //alert("Login With Firebase")
  let email = this.state.Email
  let password = this.state.password

  firebase.auth().signInWithEmailAndPassword(email,password)
  .then((result)=>{
  //alert(result.uid)
  this.props.navigator.push(Routes.WelcomeScreen)
  },
  (error)=>{
  alert(error)
  }

  )


  }

  handlePressCancel = () => {
    const { navigator } = this.props
    navigator.pop()
  }

  handleChangeUsername = (text) => {
    this.setState({ Email: text })
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  render () {
    const { Email, password } = this.state
    const { attempting } = this.props
    const editable = !attempting
    const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly
    return (
      <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={Styles.container}>
        
        <View style={Styles.form}>
          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>{I18n.t('Email')}</Text>
            <TextInput
              ref='Email'
              style={textInputStyle}
              value={this.state.username}
              editable={editable}
              keyboardType='default'
              returnKeyType='search'
              onChangeText={this.handleChangeUsername}
              underlineColorAndroid='transparent'
              placeholder={I18n.t('EnterYourEmail')} />
          </View>

          <View style={Styles.row}>
            <Text style={Styles.rowLabel}>{I18n.t('password')}</Text>
            <TextInput
              ref='password'
              style={textInputStyle}
              value={this.state.password}
              editable={editable}
              keyboardType='default'
              returnKeyType='search'
              secureTextEntry
              onChangeText={this.handleChangePassword}
              underlineColorAndroid='transparent'
              placeholder={I18n.t('password')} />
          </View>

          <View style={[Styles.loginRow]}>
            <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.handlePressLogin}>
              <View style={Styles.loginButton}>
                <Text style={Styles.loginText}>{I18n.t('signIn')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.loginButtonWrapper} onPress={this.handlePressCancel}>
              <View style={Styles.loginButton}>
                <Text style={Styles.loginText}>{I18n.t('cancel')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    )
  }

}

LoginScreen.propTypes = {
  dispatch: PropTypes.func,
  navigator: PropTypes.object,
  attempting: PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    attempting: state.login.attempting
  }
}

export default connect(mapStateToProps)(LoginScreen)