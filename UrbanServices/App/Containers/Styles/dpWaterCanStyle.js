import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  dpWaterCanWrapper:{
    //justifyContent: 'center',
    alignItems: 'center',
    marginTop : 65,
    flex : 1,
    backgroundColor : '#E0E0E0'
  },
  dpImage:{
    width : 300,
    height : 420,
    alignSelf:'center',
    //backgroundColor : 'white'
    
    
  },
 productTitleWrapper:{
  flexDirection : 'row',
   width : window.width*0.9,
   height : 40,
   alignItems : 'center',
   borderBottomColor:"#BDBDBD",
   borderBottomWidth:1,
   backgroundColor : 'white',
   
  }, 
  productTitle:{
    fontSize : 14,
    color : '#37474F',
    marginLeft : 10,
    flex : 4
  },
  productPrice : {
    fontSize : 14,
    fontWeight : "300",
    flex : 2,
    marginLeft : 10,
    color : '#263238'
  },

  addToCartButton : {
  flexDirection : 'column',
  alignItems : 'center',
  width: window.width * 0.9, 
  backgroundColor : '#039BE5', 
  height : 45,
  borderColor : '#039BE5',
  borderWidth : 3,
  borderRadius : 0.5,
  justifyContent : 'center',
  
  },
  addToCartButtonText:{
    fontSize : 16,
    fontWeight : 'bold',
    color : 'white'
  }
})
