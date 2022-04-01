import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Pressable,Image, TextInput, FlatList, ImageBackground } from 'react-native';

const DATA = [
  {
    id: 1,
    title: 'Categorias',
    image:'undefined-1648585797246-25199002image.png'
  },
  {
    id: 2,
    title: 'Productos',
    image:'undefined-1648585797246-25199002image.png'
  },
  {
    id: 3,
    title: 'Compras',
    image:'undefined-1648585797246-25199002image.png'
  },
  {
    id: 4,
    title: 'Ventas',
    image:'undefined-1648585797246-25199002image.png'
  },
  {
    id: 5,
    title: 'Proveedores',
    image:'undefined-1648585797246-25199002image.png'
  },
  {
    id: 6,
    title: 'Sucursales',
    image:'undefined-1648585797246-25199002image.png'
  },
  {
    id: 7,
    title: 'Empleados',
    image:'undefined-1648585797246-25199002image.png'
  },
  {
    id: 8,
    title: 'Ciudades',
    image:'undefined-1648585797246-25199002image.png'
  },
];


export default function Modulos({ navigation }) {
  
  const Item = ({ title, image }) => {
    if(title=='Ventas')
     {
       return (
        <Pressable onPress={() => navigation.navigate('ListarVentas', {opcion:title})}>
        <View style={styles.item}>
          <ImageBackground  style={styles.image} source={{uri: 'http://192.168.0.10:6001/api/archivos/consultarPublic?nombre='+image}} resizeMode="contain">
                 <Text style={styles.title}>{title}</Text>
          </ImageBackground>
        </View>
      </Pressable>
       )
     }  
     else if(title=='Empleados')
     {
       return (
        <Pressable onPress={() => navigation.navigate('Opciones', {opcion:title})}>
        <View style={styles.item}>
          <ImageBackground  style={styles.image} source={{uri: 'http://192.168.0.10:6001/api/archivos/consultarPublic?nombre='+image}} resizeMode="contain">
                 <Text style={styles.title}>{title}</Text>
          </ImageBackground>
        </View>
      </Pressable>
       )
     } 
     else if(title=='Productos')
     {
       return (
        <Pressable onPress={() => navigation.navigate('Productos', {opcion:title})}>
        <View style={styles.item}>
          <ImageBackground  style={styles.image} source={{uri: 'http://192.168.0.10:6001/api/archivos/consultarPublic?nombre='+image}} resizeMode="contain">
                 <Text style={styles.title}>{title}</Text>
          </ImageBackground>
        </View>
      </Pressable>
       )
     } 
     else if(title=='Compras')
     {
       return (
        <Pressable onPress={() => navigation.navigate('Opciones', {opcion:title})}>
        <View style={styles.item}>
          <ImageBackground  style={styles.image} source={{uri: 'http://192.168.0.10:6001/api/archivos/consultarPublic?nombre='+image}} resizeMode="contain">
                 <Text style={styles.title}>{title}</Text>
          </ImageBackground>
        </View>
      </Pressable>
       )
     } 
     else if(title=='Categorias')
     {
       return (
        <Pressable onPress={() => navigation.navigate('Opciones', {opcion:title})}>
        <View style={styles.item}>
          <ImageBackground  style={styles.image} source={{uri: 'http://192.168.0.10:6001/api/archivos/consultarPublic?nombre='+image}} resizeMode="contain">
                 <Text style={styles.title}>{title}</Text>
          </ImageBackground>
        </View>
      </Pressable>
       )
     } 
     else if(title=='Ciudades')
     {
       return (
        <Pressable onPress={() => navigation.navigate('Opciones', {opcion:title})}>
        <View style={styles.item}>
          <ImageBackground  style={styles.image} source={{uri: 'http://192.168.0.10:6001/api/archivos/consultarPublic?nombre='+image}} resizeMode="contain">
                 <Text style={styles.title}>{title}</Text>
          </ImageBackground>
        </View>
      </Pressable>
       )
     } 
     else if(title=='Sucursales')
     {
       return (
        <Pressable onPress={() => navigation.navigate('Opciones', {opcion:title})}>
        <View style={styles.item}>
          <ImageBackground  style={styles.image} source={{uri: 'http://192.168.0.10:6001/api/archivos/consultarPublic?nombre='+image}} resizeMode="contain">
                 <Text style={styles.title}>{title}</Text>
          </ImageBackground>
        </View>
      </Pressable>
       )
     } 
     else if(title=='Proveedores')
     {
       return (
        <Pressable onPress={() => navigation.navigate('Opciones', {opcion:title})}>
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
              <View style={styles.containerBack}>
                <Pressable>
                  <Image 
                      style={styles.imagenusuario}
                      source={require('../img/usuario.png')}
                  ></Image></Pressable>
                <Text style={styles.textCarrito}>Hola Josue,</Text>
                <Text style={styles.textCarrito}>Bienvenido</Text>
              </View>
           </View>
           <View style={styles.contenedorbuscar}>
              <TextInput
                placeholder="Que desea comprar"
                style={styles.entradas}>
              </TextInput>
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