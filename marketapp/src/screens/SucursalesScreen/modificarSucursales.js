import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, KeyboardAvoidingView , Modal,Keyboard, TouchableWithoutFeedback, Pressable, FlatList,Image, ScrollView, Alert} from 'react-native';
import Button from '../../componentes/Button';
import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign } from '@expo/vector-icons'; 

const myTheme = require("../TemaDrop/EstiloDropDown");

DropDownPicker.addTheme("Ciudades", myTheme);
DropDownPicker.setTheme("Ciudades");
DropDownPicker.setLanguage("ES");

export default function modificarSucursales({ route, navigation }) {
    
    const{IdSucursal, NombreSucursal, Direccion, NombreCiudad}=route.params;
    const [nombreSucursal, setnombreSucursal]= useState(null);
    const [direccion, setdireccion]= useState(null);


    useEffect(async()=>{
        var ciu= await getCiudades();
        setnombreSucursal(NombreSucursal);
        setdireccion(Direccion);

        }, []);

        const getCiudades= async () => {
   
            const solicitud= await fetch(
              'http://192.168.1.4:6001/api/ciudades/listar',
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
            setItemsCiudades(json); 
             
            
        }

    const modificarSucursales = async () => {
            try {
                let solicitud= await fetch(
                    'http://192.168.1.4:6001/api/sucursales/modificar?IdSucursal='+IdSucursal,
                    {
                      method: 'PUT',
                      headers: {
                        Accept: 'application/json', 
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                          NombreSucursales:nombreSucursal, 
                          Direccion:direccion,
                          Ciudades_IdCiudad: valueCiudades,
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
            <Text style={styles.textTittle}>Modificando Registro Sucursales</Text>
                        
            <Text style={styles.textInpu}>Nombre Sucursal</Text>
            <TextInput style={styles.inputs} onChangeText={newText=>setnombreSucursal(newText)} value={''+nombreSucursal} ></TextInput>
                        
            <Text style={styles.textInpu}>Direccion</Text>
            <TextInput style={styles.inputs} onChangeText={newText=>setdireccion(newText)} value={''+direccion} ></TextInput>

            <Text style={styles.textInpu}>Ciudad</Text> 
                <DropDownPicker
                    schema={{
                        label: 'Nombre Ciudad',
                        value: 'ID'
                        }}
                        zIndex={1000}
                        zIndexInverse={3000}
                        theme='Ciudades'
                        open={open}
                        value={valueCiudades}
                        items={itemsCiudades}
                        setOpen={setOpen}
                        setValue={setValueCiudades}
                        setItems={setItemsCiudades}
                        placeholder={NombreCiudad}
                        
                      />
                        <View style={{marginTop:60, justifyContent:'center', alignItems:'center'}}>
                            <Button text = "Modificar"  
                                onPress={modificarSucursales}/>
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
