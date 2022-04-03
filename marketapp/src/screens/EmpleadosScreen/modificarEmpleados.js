import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, KeyboardAvoidingView , 
Modal,Keyboard, TouchableWithoutFeedback, Pressable, FlatList,Image, ScrollView, Alert} from 'react-native';
import Button from '../../componentes/Button';
import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign } from '@expo/vector-icons'; 

const myTheme = require("../TemaDrop/EstiloDropDown");

DropDownPicker.addTheme("Sucursal", myTheme);
DropDownPicker.setTheme("Sucursal");
DropDownPicker.setLanguage("ES");


export default function modificarEmpleados({ route, navigation }) {
    
    const{IdEmpleado, Telefono, Direccion, Estado, NombreSucursal}=route.params;
    const [telefono, settelefono]= useState(null);
    const [direccion, setdireccion]= useState(null);
    const [estado, setestado]= useState(null);
    const [open, setOpen] = useState(false);
    const [valueSucursales, setValueSucursales] = useState(null);
    const [itemsSucursales, setItemsSucursales] = useState([])


    useEffect(async()=>{
        var sucu= await getSucursales();
        settelefono(Telefono);
        setdireccion(Direccion);
        setestado(Estado);

        }, []);

        const getSucursales= async () => {
   
            const solicitud= await fetch(
              'http://192.168.1.8:6001/api/sucursales/listar',
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
            console.log(json);
            setItemsSucursales(json); 
             
            
        }

    const modificarEmpleados = async () => {
            try {
                let solicitud= await fetch(
                    'http://192.168.1.8:6001/api/empleados/modificar?IdEmpleado='+IdEmpleado,
                    {
                      method: 'PUT',
                      headers: {
                        Accept: 'application/json', 
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                          Telefono:telefono, 
                          Direccion:direccion,
                          Estado:estado,
                          Sucursales_IdSucursal: valueSucursales
                      })
                    }
                  );
                  const respuesta= await solicitud.json();
                  const response= respuesta.msg; 
                  console.log(respuesta); 
                  Alert.alert("Modificado","Registro Modificado");
                  

            }catch(error){
                console.log(error);
            }
    }
    return (
        <View style={styles.containerPri}>
                        <Text style={styles.textTittle}>Modificando Registro Empleados</Text>
                        
                        <Text style={styles.textInpu}>Telefono</Text>
                        <TextInput style={styles.inputs} onChangeText={newText=>settelefono(newText)} value={''+telefono} ></TextInput>
                        
                        <Text style={styles.textInpu}>Direccion</Text>
                        <TextInput style={styles.inputs} onChangeText={newText=>setdireccion(newText)} value={''+direccion} ></TextInput>
                        
                        <Text style={styles.textInpu}>Estado</Text>
                        <TextInput style={styles.inputs} onChangeText={newText=>setestado(newText)} value={''+estado}></TextInput>

                        <Text style={styles.textInpu}>Sucursal</Text> 
                        <DropDownPicker
                            schema={{
                            label: 'Nombre Sucursal',
                            value: 'ID'
                            }}
                            zIndex={1000}
                            zIndexInverse={3000}
                            theme='Sucursal'
                            open={open}
                            value={valueSucursales}
                            items={itemsSucursales}
                            setOpen={setOpen}
                            setValue={setValueSucursales}
                            setItems={setItemsSucursales}
                            placeholder={NombreSucursal}
                            searchable={true}
                            searchPlaceholder='Buscar Sucursal'
                        />
                        <View style={{marginTop:60, justifyContent:'center', alignItems:'center'}}>
                            <Button text = "Modificar"  
                                onPress={modificarEmpleados}/>
                        </View>

                    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeView:{
    flex: 1, 
    height: StatusBar.currentHeight || 0,
    marginBottom: '15%'
},
keyboarStyle: {
    flex: 1
},
containerPri: {
    flex:1,
    backgroundColor: '#fff',
    flexDirection:'column',
    paddingTop:80,
},
textTittle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: '40%',
    marginTop: '3%',
    marginBottom: '2%'
},
textInpu: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: '3%',
    marginTop: '3%',
    color: 'black',
},
  inputs: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: '#2A67CA',
    marginTop: '3%'
  },
  containerBotones: {
    flex: 1,
    flexDirection: 'row',
    marginTop: '10%'
},
buttonModificar: {
    flex:1,
    alignItems:'center',
    backgroundColor: '#2A67CA',
    margin: '5%',
    height: '20%',
    justifyContent: 'center',
    borderRadius: 5
},
textButton: {
    color: 'white'
},
});