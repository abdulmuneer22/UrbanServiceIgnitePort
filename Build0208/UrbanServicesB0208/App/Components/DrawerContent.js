import React, { PropTypes } from 'react'
import { ScrollView, Image , View } from 'react-native'
import { Images } from '../Themes'
import DrawerButton from '../Components/DrawerButton'
import styles from './Styles/DrawerContentStyle'
import Routes from '../Navigation/Routes'

class DrawerContent extends React.Component {
  constructor (props) {
    super(props)
    this.handlePressComponent = props.onPushRoute.bind(this, Routes.AllComponentsScreen)
    this.handlePressUsage = props.onPushRoute.bind(this, Routes.UsageExamplesScreen)
    this.handlePressApi = props.onPushRoute.bind(this, Routes.APITestingScreen)
    this.handlePressTheme = props.onPushRoute.bind(this, Routes.ThemeScreen)
    this.handlePressDeviceInfo = props.onPushRoute.bind(this, Routes.DeviceInfoScreen)
    this.handlePressLogin = props.onPushRoute.bind(this, Routes.LoginScreen)
    this.handlePressServices = props.onPushRoute.bind(this, Routes.LandingPage)
    
    
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Image source={Images.logo} style={styles.logo} />
        <DrawerButton text='Orders' onPress={this.handlePressLogin} />
        <DrawerButton text='Offers' onPress={this.handlePressLogin} />
        <DrawerButton text='Invite' onPress={this.handlePressLogin} />
        <DrawerButton text='Leave Feedback' onPress={this.handlePressLogin} />
        <DrawerButton text='Customer Care' onPress={this.handlePressLogin} />
        <DrawerButton text='Login' onPress={this.handlePressLogin} />
      </ScrollView>
    )
  }
}

DrawerContent.propTypes = {
  onPushRoute: PropTypes.func.isRequired
}

export default DrawerContent
