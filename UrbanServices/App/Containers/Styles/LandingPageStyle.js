import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  homeBgImage : {
    flex : 1,
    width : null,
    height : null,
  },
  topNavBar : {
    height : 50,
    backgroundColor : '#00bcd4',
    elevation : 10,
    justifyContent : 'center'

  },
  topNavBarTitle : {
    alignItems : 'center',
    textAlign : 'center',
    fontSize : 22,
    fontWeight : "bold",
    color : 'white'

  },
  homeButton : {

  width: 400, 
  //backgroundColor : 'green', 
  height : 80,
  borderColor : 'white',
  borderWidth : 3,
  borderRadius : 5,
  justifyContent : 'center',
  marginBottom : 10

  },
  homeButtonText : {
  fontSize : 28,
  textAlign : 'center',
  color : 'white'
  },


  SignInButton : {

  width: 400, 
  //backgroundColor : 'green', 
  height : 50,
  borderColor : 'white',
  borderWidth : 3,
  borderRadius : 3,
  justifyContent : 'center',
  //alignSelf : 'flexEnd'

  },

  SignInButtonText : {
  fontSize : 18,
  textAlign : 'center',
  color : 'white'
  },

  landingpageWrapper:{
    
    //justifyContent: 'center',
    alignItems: 'center',
    marginTop : 65,
    flex : 1
  }
})
