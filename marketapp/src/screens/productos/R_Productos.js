import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, FlatList , SafeAreaView, TextInput, Modal, RefreshControl} from 'react-native';
import {useEffect, useState} from 'react';
import * as React from 'react';
import { AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import Button from '../../componentes/Button';
import DropDownPicker from 'react-native-dropdown-picker';
import ListaVacia from '../../componentes/listaVacia'
const myTheme = require("../TemaDrop/EstiloDropDown");

DropDownPicker.addTheme("Sucursal", myTheme);
DropDownPicker.setTheme("Sucursal");
DropDownPicker.setLanguage("ES");



const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Opciones({ navigation }) {

    const Item = ({IdProducto, NombreProducto, DescripcionProducto, Estado, ISV, Categorias_IdCategoria})=>(
        <Pressable>
            <View style={styles.item}>
                <View style={styles.containerInfo}>
                    <Text style={{fontWeight:'bold', fontStyle:'italic'}}> Producto: {IdProducto}</Text>
                    <Text style={styles.title}>Nombre: {NombreProducto}</Text>
                    <Text style={styles.title}>Estado: {Estado}</Text>
                </View>
                <View style={styles.containerIconos}>
                    <Pressable onPress={() => navigation.navigate('UpdateProductos', {IdProducto:IdProducto, NombreProducto:NombreProducto, 
                                                                                      DescripcionProducto:DescripcionProducto, Estado:Estado, 
                                                                                      ISV:ISV, Categorias_IdCategoria:Categorias_IdCategoria})}>
                            <FontAwesome name="edit" size={24} color="#2a67ca" />
                        </Pressable> 
                        <Pressable onPress={() => navigation.navigate('DeleteProductos',{IdProducto:IdProducto})}>
                            <AntDesign name="delete" size={24} color="red"/>
                        </Pressable> 
                </View>
            </View> 
        </Pressable>
    );

    useEffect(async()=>{
      var a = await  consultarProductos();
      
    }, []);

const [productos, setproductos] = useState([]);
const [filtro, setFiltro]= useState(productos); 
const [buscar, setBuscar]= useState(''); 
const [visible, setVisible]= useState(false);
const [open, setOpen]= useState(false);
const [value, setValue]= useState(null);
const [items, setItems]= useState([
 { label: 'Estado Producto', value:'3'},
 { label: 'Nombre Producto', value:'2'},
 {label: 'Codigo Producto', value:'1'}
]);
const [refreshing, setRefreshing] = useState(false);

const filtroFuncion = (text) => {
  if (text && value=='1') {
    const nuevaData = productos.filter(item => item.IdProducto==text);
    console.log(nuevaData);
    setFiltro(nuevaData);
    setBuscar(text);
  } else if(text && value=='2') {
    const nuevaData = productos.filter(item => item.NombreProducto==text);
    console.log(nuevaData);
    setFiltro(nuevaData);
    setBuscar(text);
  }
  else if(text && value=='3') {
    const nuevaData = productos.filter(item => item.Estado==text);
    console.log(nuevaData);
    setFiltro(nuevaData);
    setBuscar(text);
  }
  else if(text) {
    const nuevaData = productos.filter(item => item.NombreProducto==text);
    console.log(nuevaData);
    setFiltro(nuevaData);
    setBuscar(text);
  }
  else {
    setFiltro(productos);
    console.log(filtro);
    setBuscar(text);
  }
};


const consultarProductos = async ()=>{
      try {
        const solicitud= await fetch(
          'http://192.168.0.10:6001/api/productos/listarproductos',
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
        setFiltro(data);
        setproductos(data);
      } catch (error) {
       console.log(error);
      }
 }



 const onRefresh = React.useCallback(() => {
   setRefreshing(true);
   consultarProductos(); 
   wait(500).then(() => setRefreshing(false));
 }, []);

    const renderItem= ({ item }) => (
        <Item 
        IdProducto={item.IdProducto}
        NombreProducto={item.NombreProducto}
        DescripcionProducto={item.DescripcionProducto}
        Estado={item.Estado}
        ISV={item.ISV}
        Categorias_IdCategoria={item.Categorias_IdCategoria}
        />
    );

  return (
    
    <SafeAreaView style={styles.container}>

      <Modal transparent={true}
        animationType={'fade'}
        visible={visible}
      >
      <View style={styles.containerPmodalModificar}>
      <View style={styles.conatinerInfoModalModificar}>
                          
      <DropDownPicker
                      
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder={'Seleccione un filtro'}               
      />
      <Pressable style={styles.pressabelStyleModalModificar} onPress={  () => {
      setVisible(false);
                                    
      }}>
      <Text style={styles.textbotonModalModificar}>Seleccionar</Text>
      </Pressable>
      </View> 
      </View>
      </Modal>

      <View style={styles.containerFiltro}>
        <TextInput style={styles.inputFilter} 
        placeholder='Buscar Producto'
        onChangeText={(text)=>filtroFuncion(text)}
        value={buscar} 
        ></TextInput>
        <Pressable style={styles.pressableIconFilter} onPress={()=> setVisible(true)}>
        <MaterialCommunityIcons name="filter-plus-outline" size={30} color="black" />
        </Pressable>
      </View> 

      <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff'}}>
        <Button text = "Crear"  
        onPress={()=>navigation.navigate('CrearProductos')}
          />
      </View>
        <View style={styles.containerFlat}>
            <FlatList
                data={filtro}
                renderItem={renderItem}
                keyExtractor={item=>item.IdProducto}
                ListEmptyComponent={ListaVacia}
                refreshControl={
                  <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
                }
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
        
      },
      containerFlat: {
        flex:1,
        height:'100%',
        backgroundColor: '#fff'
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
        flexDirection: 'row',
        backgroundColor: '#fff'
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
      containerPmodalModificar: {
        flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:'rgba(0, 0, 0, 0.5)'
      },
      conatinerInfoModalModificar: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: '5%',
        width: '80%'
      },
      pressabelStyleModalModificar: {
        marginTop: '8%',
        paddingLeft: '20%',
        paddingRight:'20%',
        backgroundColor: '#3EA5DB',
        paddingBottom:'4%',
        borderRadius: 10
      },
      textbotonModalModificar: {
        color: '#fff',
        marginTop: '6%'
      },
});