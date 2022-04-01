import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, SafeAreaView, Pressable } from 'react-native';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons'; 

export default function Productos({ route, navigation }) {
  const Item = ({ IdProducto, NombreProducto, DescripcionProducto}) => (
    <Pressable  >
        <View style={styles.item}>
          <View style={styles.containerInfo}>
                 <Text style={{fontWeight: 'bold'}}>Id del Producto: {IdProducto}</Text>
                 <Text style={styles.title}>Nombre del producto: {NombreProducto}</Text>
          </View>
          <View style={styles.containerIconos}>
          
          </View>
        </View>
      </Pressable>
    );
  
    const [productos, setproductos]= useState([]);

    useEffect(async()=>{
      var a = await  ListarProductos();
    }, []);

  const ListarProductos= async () => {
   try{
    const solicitud= await fetch(
      'http://192.168.0.10:6001/api/productos/listarproductos',
      {
        method: 'GET', 
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    const json = await solicitud.json();
    const data=json.data;
    setproductos(data);
   }catch(error){
       console.log(error);
   }
     
    
}

    const renderItem = ({ item }) => (
      <Item id={item.IdProducto} NombreProducto={item.NombreProducto}/>
    );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerFlat}>
         <FlatList
            data={productos}
            renderItem={renderItem}
            keyExtractor={item=>item.item.IdProducto}
          >
        </FlatList>
        </View>
        </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    marginBottom: '15%'
  },
  containerFlat: {
    flex:1,
    height:'80%'
  },
  item: {
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    
  },
  containerInfo: {
    flex:2, 
    flexDirection: 'column',
    
  },
  containerIconos: {
    flex:1/2,
    flexDirection:'row',
    width: '60%'
  }
});