import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, FlatList , SafeAreaView, TextInput} from 'react-native';
import {useEffect, useState} from 'react';
import * as React from 'react';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons'; 
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '../../componentes/Button';
import Listavacia from '../../componentes/listaVacia';
export default function Opciones({ navigation }) {

    const Item = ({IdProveedor, NombreProveedor, Contacto, Email})=>(
        <Pressable>
            <View style={styles.item}>
                <View style={styles.containerInfo}>
                    <Text style={{fontWeight:'bold', fontStyle:'italic'}}> Proveedor: {IdProveedor}</Text>
                    <Text style={styles.title}>Nombre: {NombreProveedor}</Text>
                    <Text style={styles.title}>Numero: {Contacto}</Text>
                    <Text style={styles.title}>Email: {Email}</Text>
                </View>
                <View style={styles.containerIconos}>
                    <Pressable onPress={() => navigation.navigate('ModProveedores', {IdProveedor:IdProveedor,NombreProveedor: NombreProveedor, Email:Email, Contacto:Contacto})}>
                            <FontAwesome name="edit" size={24} color="#2a67ca" />
                        </Pressable> 
                        <Pressable onPress={() => navigation.navigate('DeleteProveedores', {IdProveedor:IdProveedor})}>
                            <AntDesign name="delete" size={24} color="red"/>
                        </Pressable> 
                </View>
            </View> 
        </Pressable>
    );

const [proveedores, setproveedores] = useState([]);

useEffect(async()=>{
  var a = await  consultarProveedores();
}, []);
const consultarProveedores = async ()=>{
  try {
    const solicitud= await fetch(
      'http://192.168.0.101:6001/api/proveedores/listar',
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
    setproveedores(data);
  } catch (error) {
   console.log(error);
  }
}

    const renderItem= ({ item }) => (
        <Item 
        IdProveedor={item.IdProveedor}
        NombreProveedor={item.NombreProveedor}
        Contacto={item.Contacto}
        Email={item.Email}
        />
    );

  return (
    
    <SafeAreaView style={styles.container}>
      <View style={styles.containerFiltro}>
        <TextInput style={styles.inputFilter} 
        placeholder='Buscar Proveedor' 
        ></TextInput>
        <Pressable style={styles.pressableIconFilter}>
        <MaterialCommunityIcons name="filter-plus-outline" size={30} color="black" />
        </Pressable>
      </View> 

      <View style={{ justifyContent:'center', alignItems:'center'}}>
        <Button text = "Crear"  
        onPress={()=>navigation.navigate('CreaProveedores')}
          />
      </View>
    
        <View style={styles.containerFlat}>
            <FlatList
                data={proveedores}
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
        marginBottom: '15%',
        paddingTop:80
      },
      containerFlat: {
        flex:1,
        height:'80%',
        //paddingTop:70,
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
      },
      title:{
        fontStyle:'italic'
      },
      containerFiltro: {
        flex: 5/32,
        flexDirection: 'row'
      },
      inputFilter: {
        flex: 1,
        backgroundColor: '#fff',
        margin: '5%',
        borderRadius: 10,
        borderColor: '#2A67CA',
        borderWidth: 2,
        paddingLeft: 5
      },
      pressableIconFilter: {
        flex: 5/32,
        marginTop: '6%'
      },
});