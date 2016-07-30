import React, {PropTypes} from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Images } from '../Themes'
import { connect } from 'react-redux'
import Routes from '../Navigation/Routes'
import RoundedButton from '../Components/RoundedButton'

// Styles
import styles from './Styles/PresentationScreenStyle'

class PresentationScreen extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired
  }

  componentWillMount () {
    this.props.navigator.state.tapHamburger = () => {
      this.props.navigator.drawer.toggle()
    }
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.usBgPng} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.usBg} style={styles.logo} />
            <Text style={styles.logoText}>UrbanServices</Text> 
          </View>
          

          <View style={styles.section} >
            <Text style={styles.bannerText} >
              Find Best Solutions {"\n"}
              For Al your Requirements
            </Text>
            
          </View>

          <RoundedButton onPress={() => this.props.navigator.push(Routes.LoginScreen)}>
            Register
          </RoundedButton>

          <RoundedButton onPress={() => this.props.navigator.push(Routes.LoginScreen)}>
            Login
          </RoundedButton>

          
          <View style={styles.centered}>
            <Text style={styles.MainScreensubtitle}>SKIP</Text>
          </View>

          <View style={styles.centered}>
            <Text style={styles.MainScreensubtitle}>Made In India with ❤️ by Inframe</Text>
          </View>

        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(PresentationScreen)
