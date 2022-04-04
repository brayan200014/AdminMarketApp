import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Pressable,Image, TextInput, FlatList, ImageBackground } from 'react-native';
import { useEffect, useState } from 'react';
import Listavacia from '../componentes/listaVacia'
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
      <View style={styles.containerText}>
      <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.containerImage}>
        <Image  style={styles.image} source={require('../img/ventas.png')} >
        </Image>
      </View>
      </View>
    </Pressable>
     )
   }  
   else if(title=='Empleados')
   {
     return (
      <Pressable onPress={() => navigation.navigate('Listar_Empleados', {opcion:title})}>
      <View style={styles.item}>
      <View style={styles.containerText}>
      <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.containerImage}>
        <Image  style={styles.image} source={require('../img/empleados.png')} >
        </Image>
      </View>
      </View>
    </Pressable>
     )
   } 
   else if(title=='Productos')
   {
     return (
      <Pressable onPress={() => navigation.navigate('ListarProductos', {opcion:title})}>
      <View style={styles.item}>
      <View style={styles.containerText}>
      <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.containerImage}>
        <Image  style={styles.image} source={require('../img/productos.png')} >
        </Image>
      </View>
      </View>
    </Pressable>
     )
   } 
   else if(title=='Compras')
   {
     return (
      <Pressable onPress={() => navigation.navigate('Opciones', {opcion:title})}>
      <View style={styles.item}>
      <View style={styles.containerText}>
      <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.containerImage}>
        <Image  style={styles.image} source={require('../img/orden.png')} >
        </Image>
      </View>
      </View>
    </Pressable>
     )
   } 
   else if(title=='Categorias')
   {
     return (
      <Pressable onPress={() => navigation.navigate('Opciones', {opcion:title})}>
      <View style={styles.item}>
      <View style={styles.containerText}>
      <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.containerImage}>
        <Image  style={styles.image} source={require('../img/productos-lacteos.png')} >
        </Image>
      </View>
      </View>
    </Pressable>
     )
   } 
   else if(title=='Ciudades')
   {
     return (
      <Pressable onPress={() => navigation.navigate('Opciones', {opcion:title})}>
      <View style={styles.item}>
      <View style={styles.containerText}>
      <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.containerImage}>
        <Image  style={styles.image} source={require('../img/industria.png')} >
        </Image>
      </View>
      </View>
    </Pressable>
     )
   } 
   else if(title=='Sucursales')
   {
     return (
      <Pressable onPress={() => navigation.navigate('Listar_Sucursales', {opcion:title})}>
      <View style={styles.item}>
      <View style={styles.containerText}>
      <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.containerImage}>
        <Image  style={styles.image} source={require('../img/tienda.png')} >
        </Image>
      </View>
      </View>
    </Pressable>
     )
   } 
   else if(title=='Proveedores')
   {
     return (
      <Pressable onPress={() => navigation.navigate('ListarProveedores', {opcion:title})}>
      <View style={styles.item}>
      <View style={styles.containerText}>
      <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.containerImage}>
        <Image  style={styles.image} source={require('../img/proveedor.png')} >
        </Image>
      </View>
      </View>
    </Pressable>
     )
   } 

  } 




  const [filtro, setFiltro]= useState(DATA); 
  const [buscar, setBuscar]= useState('');

  const filtroFuncion = (text) => {
    if(text)
    {
      const nuevaData = DATA.filter(item => item.title==text);
      console.log(nuevaData);
      setFiltro(nuevaData);
      setBuscar(text);
    }
    else 
    {
      setFiltro(DATA);
      setBuscar(text)
    }

    
  };


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
                      source={require('../img/profile.png')}
                  ></Image></Pressable>
                <Text style={styles.textCarrito}>Hola Josue,</Text>
                <Text style={styles.textCarrito}>Bienvenido</Text>
              </View>
           </View>
           <View style={styles.contenedorbuscar}>
              <TextInput
                placeholder="Buscar Modulo"
                style={styles.entradas}
                onChangeText={(text) => filtroFuncion(text)}
                value={buscar}
                >
              </TextInput>
            </View>
              <View style={styles.containerLista}>
                <FlatList 
                 
                  data={filtro}
                  renderItem= {renderItem}
                  keyExtractor={item => item.id}
                  ListEmptyComponent={Listavacia}
                  
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
  width: 35,
  height: 35
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
  backgroundColor: 
  'rgba(70, 188, 223, 0.44)',
  padding: 15,
  marginVertical: 8,
  marginHorizontal: 16,
  borderRadius: 15,
  alignItems: 'center',
  borderColor: '#2A67CA',
  borderWidth: 2,
  flexDirection: 'row',
  

},
title: {
  fontSize: 24,
  fontStyle: 'italic',
  fontWeight: '300'
},
containerLista: {
  flex: 1,
  width:'85%'
},
image: {
    margin: 1,
    width: 50,
    height: 50,
    flex: 1,
    alignContent: 'flex-end'
  
},
containerImage: {
   flex: 1/2,
   alignItems: 'flex-end'
},
containerText: {
  flex: 1,
  
}
});