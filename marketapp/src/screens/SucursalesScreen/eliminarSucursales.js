import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, KeyboardAvoidingView , Modal, Keyboard, TouchableWithoutFeedback, Pressable, FlatList,Image, ScrollView, Alert} from 'react-native';
import Button from '../../componentes/Button';

import { AntDesign } from '@expo/vector-icons'; 

export default function eliminarSucursal({ route, navigation }) {

    const{IdSucursal}=route.params;

    async function eliminarSucursal(){

        try {
            let solicitud= await fetch(
                'http://192.168.1.6:6001/api/sucursales/eliminar?IdSucursal='+IdSucursal,
                {
                  method: 'DELETE',
                  headers: {
                    Accept: 'application/json', 
                    'Content-Type': 'application/json'
                  }
                }
              );
              const respuesta= await solicitud.json();
              const response= respuesta.msg; 
              console.log(respuesta); 
              Alert.alert("Eliminado","Registro Eliminado");
              navigation.navigate('Listar_Empleados', {opcion:title})    

        }catch(error){
            console.log(error);
        }
    }

    return (
        <View style={styles.containerPri}>
            <View style={{marginTop:60, justifyContent:'center', alignItems:'center'}}>
                    <Button text = "Eliminar"  
                        onPress={()=> {Alert.alert(
                        "Eliminar",
                        "¿Estas seguro en eliminar este registro?",
                        [
                        {
                            text: "Si",
                            onPress: () => eliminarSucursal(),
                            style: "cancel",
                            
                        },
                        {
                            text: "Cancel",
                            onPress: () => console.log("Se arrepintio"),
                            style: "cancel",
                            
                        },
                        ],
                        {
                        cancelable: true,
                        onDismiss: () =>
                            Alert.alert(
                            "Cancelado"
                            ),
                        }
                    );
                    }}/>
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

    containerPri: {
        flex:1,
        backgroundColor: '#fff',
        flexDirection:'column',
        paddingTop:80,
    }
});