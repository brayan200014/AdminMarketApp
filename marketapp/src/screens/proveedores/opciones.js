import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Pressable,Image, TextInput, FlatList, ImageBackground } from 'react-native';

const DATA = [
  {
    id: 1,
    title: 'Guardar',
    image:'undefined-1648585797246-25199002image.png'
  },
  {
    id: 2,
    title: 'Listar',
    image:'undefined-1648585797246-25199002image.png'
  },
];


export default function Modulos({ navigation }) {
  
  const Item = ({ title, image }) => {
    if(title=='Guardar')
     {
       return (
        <Pressable onPress={() => navigation.navigate('RegistroProveedores', {opcion:title})}>
        <View style={styles.item}>
          <ImageBackground  style={styles.image} source={{uri: 'http://192.168.0.10:6001/api/archivos/consultarPublic?nombre='+image}} resizeMode="contain">
                 <Text style={styles.title}>{title}</Text>
          </ImageBackground>
        </View>
      </Pressable>
       )
     }  
     else if(title=='Listar')
     {
       return (
        <Pressable onPress={() => navigation.navigate('ListarProveedores', {opcion:title})}>
        <View style={styles.item}>
          <ImageBackground  style={styles.image} source={{uri: 'http://192.168.0.10:6001/api/archivos/consultarPublic?nombre='+image}} resizeMode="contain">
                 <Text style={styles.title}>{title}</Text>
          </ImageBackground>
        </View>
      </Pressable>
       )
     } 
  } 
    
  const renderItem = ({ item}) => (
    <Item title={item.title} image={item.image} />
  );
  return (
    <View style={styles.containerPrincipal} >


            <View style={styles.containerTitulo}>

           </View>
              <View style={styles.containerLista}>
                <FlatList 
                 
                  data={DATA}
                  renderItem= {renderItem}
                  keyExtractor={item => item.id}
                  />

              </View>

           </View>
  );
}

const styles = StyleSheet.create({
  containerPrincipal: {
    width: '100%',
    height: '92%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-0%'
},
containerTitulo : {

backgroundColor: '#3EA5DB',
alignItems: 'flex-start',
flexDirection: 'row',
height: 80,
width: '100%',
marginTop: '0%'
},
containerBack: {
backgroundColor: '#3EA5DB', 
alignItems: 'flex-start',
height: '100%',
alignItems: 'center',
justifyContent: 'center',
marginLeft: '6%',
flexDirection: 'row',
marginTop:'5%'

},
textCarrito:{
  fontSize: 20,
  color: '#fff',
  paddingHorizontal: '1%'
  
},
imagenusuario: {
  margin: 3,
  width: 50,
  height: 50
},
contenedorbuscar:{
backgroundColor: '#3EA5DB',
alignItems: 'flex-start',
flexDirection: 'row',
height: 80,
width: '100%',
borderBottomLeftRadius: 20,
borderBottomRightRadius: 20,
marginTop: '0%'
},
entradas:{
  flex:1,
  alignItems:"stretch",
  margin:10,
  padding:10,
  fontSize: 20,
  fontWeight:"400",
  color: "#495057",
  backgroundColor:"#fff",
  borderWidth:1,
  borderStyle:"solid",
  borderColor: "#ced4da",
  borderRadius: 15,
  textAlign:'center'
},

item: {
  flex: 1,
  backgroundColor: '#f9c2ff',
  padding: 20,
  marginVertical: 8,
  marginHorizontal: 16,
  borderRadius: 15,

},
title: {
  fontSize: 32,
},
containerLista: {
  flex: 1,
  flexDirection: 'row'
},
image: {
  flex: 1,
  justifyContent: "center",
},
});