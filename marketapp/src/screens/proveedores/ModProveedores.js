import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import {useEffect, useState} from 'react';

export default function Opciones({ route, navigation }) {
    
    const{NombreProveedor, Email, Contacto}=route.params;
    const [nombre, setnombre]= useState(NombreProveedor);
    const [email, setemail]= useState(Email);
    const [contacto, setcontacto]= useState(Contacto);

    const presModificar = async () => {
        if(!nombre||!email||!contacto){
            Alert.alert("Favor llenar todos los campos");
        }
        else{
            try {
                const solicitud= await fetch(
                    'http://192.168.0.146:6001/api/proveedores/actualizar',
                    {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json', 
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                          nombre:NombreProveedor, 
                          email:Email, 
                          contacto:Contacto,
                      })
                    }
                  );
                  const json = await solicitud.json();
                  const data=json.data;
                  setproveedores(data);
            }catch(error){
                console.log(error);
            }
        }
    }

  
    return (
    <View style={styles.container}>
        <View>
            <TextInput 
                placeholder="Nombre Proveedor"
                value={this.state.NombreProveedor}
            />
            <TextInput 
                placeholder="Email del Proveedor"
                value={this.state.Email}
            />
            <TextInput 
                placeholder="Contacto del Proveedor"
                value={this.state.Contacto}
            />
            <TouchableHighlight>
                <Text>Modificar</Text>
            </TouchableHighlight>
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
});