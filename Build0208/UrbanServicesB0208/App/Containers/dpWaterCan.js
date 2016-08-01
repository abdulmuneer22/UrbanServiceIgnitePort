import React, { PropTypes } from 'react'
import { View, ScrollView, Text, LayoutAnimation, Keyboard , ListView , Image ,TouchableHighlight,Dimensions} from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
import { Metrics } from '../Themes'
// external libs
import Icon from 'react-native-vector-icons/FontAwesome'
import Animatable from 'react-native-animatable'
//window for dimensions

const window = Dimensions.get('window');


// Styles
import styles from './Styles/dpWaterCanStyle'

// I18n
import I18n from '../I18n/I18n.js'

class dpWaterCan extends React.Component {

  constructor (props) {
    super(props);
    
    this.state = {
      visibleHeight: Metrics.screenHeight,
        dataSource : new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,

      })
    }
  }

  static propTypes = {
    navigator: PropTypes.object.isRequired
  }

  componentWillMount () {
    // intitiate get products
    this.getProducts()
    

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


// function to get products from DB

getProducts(){

var CanRef = firebase.database().ref('urbanservices/products/watercan/')
CanRef.on('value',(can)=>{
  //alert(can.val())
  var items = []
  
  can.forEach((child)=>{
    items.push({
      title : child.val().productTitle,
      imageurl : child.val().imageurl,
      price : child.val().price,
      sku : child.val().sku,
      description : child.val().description


    })
  })

  //console.log(items)
   this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
  
})

}

// EOL getProducts

// Function to handle Add To Cart

addToCartButtonPressd(productSKU,productPrice,productTitle){
let title = productTitle
let sku = productSKU
let price = productPrice
//alert(title)

//this.redirect('myCart',sku,price,title)
}

  render () {
    return (
      <View style={styles.dpWaterCanWrapper}>
        <ScrollView showsVerticalScrollIndicator = {false} style={{marginTop : 40}}>

         <ListView
          dataSource = {this.state.dataSource}
          renderRow = {
          (rowData)=>
          
          <View style={{borderColor:'#E0E0E0',borderWidth:1,marginBottom:20,borderRadius:1,width : window.width*0.9,backgroundColor : 'white'}}>
          
          <View style={styles.productTitleWrapper}>
          <Text style={styles.productTitle}>
          {rowData.title}
          </Text>
          
          <Text style={{flex : 2}}></Text>
          <Text style={styles.productPrice}>
            {rowData.price}
          </Text>
          

          
          </View>

          <Image
              style = {styles.dpImage}
              source = {{uri: rowData.imageurl}}
              resizeMode = {Image.resizeMode.contain}
          
          />
          

          <TouchableHighlight 
          style={styles.addToCartButton}
           onPress = {this.addToCartButtonPressd.bind(this,rowData.sku,rowData.price,rowData.name)}
          
          >
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableHighlight>
          
          
          </View>
        
      }
      
     
      />

      </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(dpWaterCan)
