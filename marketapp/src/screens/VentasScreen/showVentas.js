import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, SafeAreaView, Pressable, Alert , TextInput, Modal} from 'react-native';
import { AntDesign, MaterialIcons, Feather, MaterialCommunityIcons} from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import DropDownPicker from 'react-native-dropdown-picker';
import Listavacia from '../../componentes/listaVacia';




const myTheme = require("../TemaDrop/EstiloDropDown");

DropDownPicker.addTheme("Sucursal", myTheme);
DropDownPicker.setTheme("Sucursal");
DropDownPicker.setLanguage("ES");


export default function Showventas({ route, navigation }) {
  const Item = ({ id, fecha, isv, subtotal, sucursal, user}) => (
    <Pressable  >
        <View style={styles.item}>
          <View style={styles.containerInfo}>
                 <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>Numero Factura: {id}</Text>
                 <Text style={styles.title}>Fecha Factura: {fecha}</Text>
                 <Text style={styles.title}>Impuesto: L.{isv}</Text>
                 <Text style={styles.title}>Subtotal: L.{subtotal}</Text>
                 <Text style={styles.title}>Total: L.{subtotal+isv}</Text>
          </View>
          <View style={styles.containerIconos}>
               <Pressable onPress={() => navigation.navigate('ES_Ventas', {id: id, subtotal: subtotal, isv:isv, nombreSucursal:sucursal, user:user })}>
                      <FontAwesome name="edit" size={24} color="#2a67ca" />
                 </Pressable> 
                 <Pressable>
                       <AntDesign name="delete" size={24} color="red"/>
                 </Pressable> 
                
          </View>
        </View>
      </Pressable>
    );
  
    const [ventas, setVentas]= useState();
    const [filtro, setFiltro]= useState(ventas); 
    const [buscar, setBuscar]= useState(''); 
    const [visible, setVisible]= useState(false);
    const [open, setOpen]= useState(false);
    const [value, setValue]= useState(null);
    const [items, setItems]= useState([
     { label: 'Sucursal', value:'4'},
     { label: 'Nombre Usuario', value:'3'},
     { label: 'Fecha de Venta', value:'2'},
     {label: 'Numero Factura', value:'1'}
    ])

    const filtroFuncion = (text) => {
      if (text && value=='1') {
        const nuevaData = ventas.filter(item => item.IdVenta==text);
        console.log(nuevaData);
        setFiltro(nuevaData);
        setBuscar(text);
      } else if(text && value=='2') {
        const nuevaData = ventas.filter(item => item.FechaVenta==text);
        console.log(nuevaData);
        setFiltro(nuevaData);
        setBuscar(text);
      }
      else if(text && value=='3') {
        const nuevaData = ventas.filter(item => item.NombreUsuario==text);
        console.log(nuevaData);
        setFiltro(nuevaData);
        setBuscar(text);
      }
      else if(text && value=='4') {
        const nuevaData = ventas.filter(item => item.NombreSucursal==text);
        console.log(nuevaData);
        setFiltro(nuevaData);
        setBuscar(text);
      }
      else if(text){
        const nuevaData = ventas.filter(item => item.IdVenta==text);
        console.log(nuevaData);
        setFiltro(nuevaData);
        setBuscar(text);
      }
      else {
        setFiltro(ventas);
        setBuscar(text);
      }
    };
  

    useEffect(async()=>{
      var a = await  getVentas();
    }, []);

  const getVentas= async () => {
   
    const solicitud= await fetch(
      'http://192.168.0.10:6001/api/ventas/listarVentasJoin',
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
    setFiltro(data); 
    setVentas(data);
    
     
    
}



    
    const renderItem = ({ item }) => (
      <Item id={item.IdVenta} isv={item.ISV} fecha={item.FechaVenta} subtotal={item.Subtotal} sucursal={item.NombreSucursal} user={item.NombreUsuario} />
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
                          
                              theme='Sucursal'
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
      placeholder='Buscar Venta' 
      onChangeText={(text) => filtroFuncion(text)}
      value={buscar}
      ></TextInput>
      <Pressable style={styles.pressableIconFilter} onPress={()=> setVisible(true)}>
      <MaterialCommunityIcons name="filter-plus-outline" size={30} color="black" />
      </Pressable>
      </View>
      <View style={styles.containerFlat}>
         <FlatList
            data={filtro}
            renderItem={renderItem}
           keyExtractor={ item=> item.IdVenta}
           ListEmptyComponent={Listavacia}
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
    marginBottom: '15%',
    backgroundColor: '#fff'
  },
  containerFiltro: {
    flex: 5/32,
    flexDirection: 'row'
  },
  pressableIconFilter: {
    flex: 5/32,
    marginTop: '6%'
  },
  containerFlat: {
    flex:1,
    height:'80%',
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
  inputFilter: {
    flex: 1,
    backgroundColor: '#fff',
    margin: '5%',
    borderRadius: 10,
    borderColor: '#2A67CA',
    borderWidth: 2,
    paddingLeft: 5
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
  textmessagemodalModificar: {
    color:'green',
    marginTop: '1%',
  },
  title: {
    
    fontStyle: 'italic',
    fontWeight: '300'
  },
  
});