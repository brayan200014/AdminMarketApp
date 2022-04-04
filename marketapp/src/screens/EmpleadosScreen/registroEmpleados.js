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


export default function registroEmpleados({ navigation }) {
    const [Nombre, setNombre]= useState(null);
    const [Apellido, setApellido]= useState(null);
    const [Telefono, setTelefono]= useState(null);
    const [Direccion, setDireccion] = useState(null);
    const [Email, setEmail] = useState(null);
    const [Puestos_IdPuesto, setPuestos_IdPuesto] = useState(null);
    const [open, setOpen] = useState(false);
    const [valueSucursales, setValueSucursales] = useState(null);
    const [itemsSucursales, setItemsSucursales] = useState([]);

    useEffect(async()=>{
        var sucu= await getSucursales();

        }, []);

        const getSucursales= async () => {
   
            const solicitud= await fetch(
              'http://192.168.1.6:6001/api/sucursales/listar',
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
            //console.log(json);
            setItemsSucursales(json); 
            console.log(json);
             
            
        }


    const registroEmpleados = async () => {
        if(!Nombre || !Apellido ||!Telefono ||!Email ||!valueSucursales ||!Puestos_IdPuesto) {
            Alert.alert("¡ALTO!","Por favor, escriba los datos completos");
        }
        else 
        { 
            try {
                let solicitud= await fetch(
                    'http://192.168.1.6:6001/api/empleados/guardar',
                    {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json', 
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                          Nombre: Nombre,
                          Apellido: Apellido,
                          Telefono: Telefono,
                          Direccion:Direccion,
                          Email: Email,
                          Sucursales_IdSucursal: valueSucursales,
                          Puestos_IdPuesto: Puestos_IdPuesto,
                      })
                    }
                  );
                  const respuesta= await solicitud.json();
                  const response= respuesta.msg; 
                  console.log(respuesta); 
                  Alert.alert("Almacenado","Registro completado");
                  

            }catch(error){
                console.log(error);
            }
        }
    }

    return (
         <ScrollView style={styles.scrollView}>
        <View style={styles.containerPri}>
            <Text style={styles.textTittle}>Registro Empleados</Text>
                        
            <Text style={styles.textInpu}>Nombre</Text>
            <TextInput style={styles.inputs} onChangeText={newText=>setNombre(newText)} placeholder="Escriba el nombre del empleado"></TextInput>
                        
            <Text style={styles.textInpu}>Apellido</Text>
            <TextInput style={styles.inputs} onChangeText={newText=>setApellido(newText)} placeholder="Escriba el apellido del empleado"></TextInput>
                        
            <Text style={styles.textInpu}>Telefono</Text>
            <TextInput style={styles.inputs} onChangeText={newText=>setTelefono(newText)} placeholder="Escriba un número de telefono"></TextInput>
                        
            <Text style={styles.textInpu}>Direccion</Text>
            <TextInput style={styles.inputs} onChangeText={newText=>setDireccion(newText)} placeholder="Escriba un número de telefono"></TextInput>
                        
            <Text style={styles.textInpu}>Email</Text>
            <TextInput style={styles.inputs} onChangeText={newText=>setEmail(newText)} placeholder="Escriba el correo electronico"></TextInput>

            <Text style={styles.textInpu}>Sucursal</Text> 
                    <DropDownPicker
                        schema={{
                          label: 'NombreSucursal',
                          value: 'IdSucursal'
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
                    />

            <Text style={styles.textInpu}>Puesto ID</Text>
            <TextInput style={styles.inputs} onChangeText={newText=>setPuestos_IdPuesto(newText)} placeholder="Escriba el ID del puesto"></TextInput>

            <View style={{marginTop:60, justifyContent:'center', alignItems:'center'}}>
                <Button text = "Guardar"  
                    onPress={() => {registroEmpleados; navigation.navigate('Listar_Empleados');}}/>
                    
            </View>
        </View> 

    </ScrollView>   
  );
}


const styles = StyleSheet.create({
containerPri: {
    flex:1,
    backgroundColor: '#fff',
    flexDirection:'column',
    paddingTop:90,
    paddingBottom: 150
   
},

keyboarStyle: {
    flex: 1
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
    marginTop: '2%',
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
    marginTop: '50%'
},
buttonRegistro: {
    flex:1,
    alignItems:'center',
    backgroundColor: '#2A67CA',
    margin: '5%',
    height: '40%',
    justifyContent: 'center',
    borderRadius: 5
},
textButton: {
    color: 'white'
},
scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 0,
    
  },
});
