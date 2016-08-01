import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logo: {
    height: Metrics.images.logo*0.3,
    width: Metrics.images.logo*0.3,
    resizeMode: 'contain',
    marginTop : 50
    
  },
  logoText:{
    fontSize : 40,
    color : 'blue',
    marginTop : 30,
    fontWeight : 'bold',
    
  },
  bannerText:{
    color : '#38393c',
    fontSize : 15,
    textAlign : 'center'
  },
  MainScreensubtitle:{
    color :  '#455A64',
    marginTop : 20
  },
  centered: {
    alignItems: 'center'
  }
})
