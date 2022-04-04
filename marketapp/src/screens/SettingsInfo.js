import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity,Image} from 'react-native';

export default function Settings({ navigation }) {
  return (
    <View style={{backgroundColor:'#fff'}}>
      <Text style={styles.TitleInfo}>Información</Text>
      <View style={styles.contorno}>
      <Text style={styles.textStyle}>Super Mercado 1801</Text>
      <Image style={styles.logo}
      source={require('../../assets/prueba.jpg')} />
       <Text style={styles.principal}>La idea de creación del supermercado surgio ante las necesidades de los consumidores de realizar sus compras de manera rapida, comoda y economica y segura, utilizando las herramientas tecnológicas de la actualidad para dar satisfaccion a los consumidores. SUPERMERCADO 1801 su objetivo es mejorar y simplificar los procesos de pedidos, entregas, promociones, orden y servicio al usuario, cubrir una necesidad de forma inmediata y segura, proporcionando una buena experiencia al usuario durante su compra.</Text>
      </View>

      <TouchableOpacity style={styles.commandButton} onPress={()=> navigation.navigate('Inicio')}>
          <Text style={styles.Title}>Presione aqui para salir </Text>
        </TouchableOpacity>
      <StatusBar style="auto" />
    
      </View>
    
    );
  }
const styles = StyleSheet.create({
contorno:{
backgroundColor:'#F2D7EF',
marginTop:20,
marginLeft:15,
marginRight:15,
borderRadius:30,
borderWidth: 2,
shadowColor: '#480000',
shadowOffset: {width: 0, height: 1},
shadowOpacity: 0.5,
elevation: 4
},
commandButton: {
  justifyContent:'center',
  padding: 15,
  borderRadius: 30,
  backgroundColor: '#BF1517',
  alignItems: 'center',
  marginTop: 20,
  marginLeft:20,
  marginRight:20,
  borderWidth:2,
  borderColor:'#F3E100'
},
Title: {
  fontSize: 15,
  fontWeight: 'bold',
  color: '#FFFFFF',
},
TitleInfo: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#FFFFFF',
  marginTop:20,
  backgroundColor:'#3EA5DB',
  textAlign:'center'
},
  principal:{
    color:'#091114',
    padding: 20,
    fontSize: 17,
    margin: 10,
    textAlign:'justify'
  },
  textStyle:{
    color:'#091114',
    padding: 20,
    fontSize: 20,
    textAlign:'center',
    fontWeight: 'bold'
  },
  textTitulo:{
    color:'#f5ffed',
    fontSize: 17,
    textAlign:'center',
    padding:5,
  },
  logo: {
    width: 400,
    height: 170,
    resizeMode:'contain',
    alignContent:'center',
    marginLeft:-10
  }
});
/*
<Pressable onPress={()=> navigation.navigate('Login')}>
<Text>  presione aqui para salir
  Logout</Text>
</Pressable>
<StatusBar style="auto" />*/