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


export default function ListarEmpleados({ navigation }) {
  const Item = ({ IdEmpleado, Nombre, Apellido, Telefono, Direccion, Email, FechaContratacion, Estado, NombreSucursal}) => (
    <Pressable >
        <View style={styles.item}>
          <View style={styles.containerInfo}>
                 <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>Empleado: {IdEmpleado}</Text>
                 <Text style={styles.title}>Nombre: {Nombre}</Text>
                 <Text style={styles.title}>Apellido: {Apellido}</Text>
                 <Text style={styles.title}>Telefono: {Telefono}</Text>
                 <Text style={styles.title}>Direccion: {Direccion}</Text>
                 <Text style={styles.title}>Email: {Email}</Text>
                 <Text style={styles.title}>Fecha Contrato: {FechaContratacion}</Text>
                 <Text style={styles.title}>Estado: {Estado}</Text>
                 <Text style={styles.title}>Sucursal: {NombreSucursal}</Text>
          </View>
          <View style={styles.containerIconos}>
               <Pressable onPress={() => navigation.navigate()}>
                      <FontAwesome name="edit" size={24} color="#2a67ca" />
                 </Pressable> 
                 <Pressable>
                       <AntDesign name="delete" size={24} color="red"/>
                 </Pressable> 
                
          </View>
        </View>
      </Pressable>
    );
  
    const [empleados, setEmpleados]= useState([]);
    const [filtro, setFiltro]= useState(empleados); 
    const [buscar, setBuscar]= useState(''); 
    const [visible, setVisible]= useState(false);
    const [open, setOpen]= useState(false);
    const [value, setValue]= useState(null);
    const [items, setItems]= useState([
     { label: 'Sucursal', value:'4'},
     { label: 'Apellido', value:'3'},
     { label: 'Nombre', value:'2'},
     {label: 'Empleado', value:'1'}
    ])

    const filtroFuncion = (text) => {
      if (text && value=='1') {
        const nuevaData = empleados.filter(item => item.IdEmpleado==text);
        console.log(nuevaData);
        setFiltro(nuevaData);
        setBuscar(text);
      } else if(text && value=='2') {
        const nuevaData = empleados.filter(item => item.Nombre==text);
        console.log(nuevaData);
        setFiltro(nuevaData);
        setBuscar(text);
      }
      else if(text && value=='3') {
        const nuevaData = empleados.filter(item => item.Apellido==text);
        console.log(nuevaData);
        setFiltro(nuevaData);
        setBuscar(text);
      }
      else if(text && value=='4') {
        const nuevaData = empleados.filter(item => item.NombreSucursal==text);
        console.log(nuevaData);
        setFiltro(nuevaData);
        setBuscar(text);
      }
      else if(text){
        const nuevaData = empleados.filter(item => item.IdEmpleado==text);
        console.log(nuevaData);
        setFiltro(nuevaData);
        setBuscar(text);
      }
      else {
        setFiltro(empleados);
        setBuscar(text);
      }
    };
  

    useEffect(async()=>{
      var a = await  getEmpleados();
    }, []);

  const getEmpleados= async () => {
   
    const solicitud= await fetch(
      'http://192.168.1.8:6001/api/empleados/listar',
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
    console.log(data)
    setFiltro(data); 
    setEmpleados(data);
    
}



    
    const renderItem = ({ item }) => (
      <Item IdEmpleado={item.IdEmpleado} Nombre={item.Nombre} Apellido={item.Apellido} Telefono={item.Telefono} Direccion={item.Direccion} Email={item.Email} FechaContratacion={item.FechaContratacion} Estado={item.Estado} NombreSucursal={item.NombreSucursal}/>
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
      placeholder='Buscar Empleado' 
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
           keyExtractor={ item=> item.IdEmpleado}
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