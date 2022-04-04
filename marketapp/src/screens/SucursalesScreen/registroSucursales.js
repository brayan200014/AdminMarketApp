import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, KeyboardAvoidingView , Modal, Keyboard, TouchableWithoutFeedback, Pressable, FlatList,Image, ScrollView, Alert} from 'react-native';
import Button from '../../componentes/Button';
import { AntDesign } from '@expo/vector-icons'; 


export default function registroSucursales({ navigation }) {
    const [NombreSucursal, setNombreSucursal]= useState(null);
    const [Direccion, setDireccion] = useState(null);
    const [Ciudades_IdCiudad, setCiudades_IdCiudad] = useState(null);



    const registroSucursales = async () => {
        if(!NombreSucursal ||!Ciudades_IdCiudad) {
            Alert.alert("¡ALTO!","Por favor, escriba los datos completos");
        }
        else 
        { 
            try {
                let solicitud= await fetch(
                    'http://192.168.1.8:6001/api/sucursales/guardar',
                    {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json', 
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                          NombreSucursal: NombreSucursal,
                          Direccion:Direccion,
                          Ciudades_IdCiudad: Ciudades_IdCiudad,
                      })
                    }
                  );
                  const respuesta= await solicitud.json();
                  const response= respuesta.msg;  
                  
                  

            }catch(error){
                console.log(error);
            }
        }
    }

    return (
         <ScrollView style={styles.scrollView}>
        <View style={styles.containerPri}>
            <Text style={styles.textTittle}>Registro Sucursal</Text>
                        
            <Text style={styles.textInpu}>Nombre Sucursal: </Text>
            <TextInput style={styles.inputs} onChangeText={newText=>setNombreSucursal(newText)} placeholder="Escriba el nombre de la Sucursal"></TextInput>
                        
            <Text style={styles.textInpu}>Direccion: </Text>
            <TextInput style={styles.inputs} onChangeText={newText=>setDireccion(newText)} placeholder="Escriba un dirección"></TextInput>
                        
            <Text style={styles.textInpu}>Ciudad ID: </Text>
            <TextInput style={styles.inputs} onChangeText={newText=>setCiudades_IdCiudad(newText)} placeholder="Escriba el ID del ciudad"></TextInput>

            <View style={{marginTop:60, justifyContent:'center', alignItems:'center'}}>
                
                <Button text = "Guardar"  
                    onPress={() => {Alert.alert("Almacenado", "Registro Almacenado"); registroSucursales()}}/>

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