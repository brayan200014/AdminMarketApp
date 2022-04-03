import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, FlatList , SafeAreaView, Image} from 'react-native';
import {useEffect, useState} from 'react';
import * as React from 'react';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';

export default function Opciones({ navigation }) {

    const Item = ({IdProducto, NombreProducto})=>(
        <Pressable>
            <View style={styles.item}>
                <View style={styles.conttainerInfo}>
                    <Text style={{fontWeight:'bold'}}> Producto: {IdProducto}</Text>
                    <Text style={styles.title}>Nombre: {NombreProducto}</Text>
                    <Text style={styles.title}>Cantidad en Existencia: 200</Text>
                </View>
                <View style={styles.containerIconos}>
                    <Pressable onPress={() => navigation.navigate('ModProveedores', {NombreProveedor: NombreProveedor, Email:Email, Contacto:Contacto})}>
                            <FontAwesome name="edit" size={24} color="#2a67ca" />
                        </Pressable> 
                        <Pressable>
                            <AntDesign name="delete" size={24} color="red"/>
                        </Pressable> 
                </View>
            </View> 
        </Pressable>
    );

const [productos, setproductos] = useState([]);
useEffect(async()=>{
  var a = await  consultarProductos();
}, []);
const consultarProductos = async ()=>{
      try {
        const solicitud= await fetch(
          'http://192.168.0.148:6001/api/productos/listarproductos',
          {
            method: 'GET',
            headers: {
              Accept: 'application/json', 
              'Content-Type': 'application/json'
            }
          }
        );
        const json = await solicitud.json();
        const data=json.data;
        setproductos(data);
      } catch (error) {
       console.log(error);
      }
 }

    const renderItem= ({ item }) => (
        <Item 
        IdProducto={item.IdProducto}
        NombreProducto={item.NombreProducto}
        Descripcion={item.Descripcion}
        Imagen={item.Imagen}
        />
    );

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.containerFlat}>
            <FlatList
                data={productos}
                renderItem={renderItem}
                keyExtractor={item=>item.IdProveedor}
            />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        marginBottom: '15%'
      },
      containerFlat: {
        flex:1,
        height:'80%',
        paddingTop:70,
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
        width: '70%',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
});