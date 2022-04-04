import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, KeyboardAvoidingView , Modal, Keyboard, TouchableWithoutFeedback, Pressable, FlatList,Image, ScrollView, Alert} from 'react-native';
import Button from '../../componentes/Button';

import { AntDesign } from '@expo/vector-icons'; 

export default function EliminarEmpleados({ route, navigation }) {

    const{IdEmpleado}=route.params;
    const [visibleModificar, setVisibleModificar]= useState(false);

    async function eliminarEmpleados(){

        try {
            let solicitud= await fetch(
                'http://192.168.0.10:6001/api/empleados/eliminar?IdEmpleado='+IdEmpleado,
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
            
              

        }catch(error){
            console.log(error);
        }

    }

    return (
        <View style={styles.containerPri}>
             <Modal transparent={true}
                            animationType={'fade'}
                            visible={visibleModificar}
                            >
                        <View style={styles.containerPmodalModificar}>
                          <View style={styles.conatinerInfoModalModificar}>
                          <AntDesign name="checkcircle" size={24} color="green" />
                          <Text style={styles.textmessagemodalModificar}>Registro Eliminado</Text>
                                  <Pressable style={styles.pressabelStyleModalModificar} onPress={  () => {
                                   setVisibleModificar(false);
                                    navigation.navigate('Listar_Empleados');
                                  }}>
                                    <Text style={styles.textbotonModalModificar}>Cerrar</Text>
                                  </Pressable>
                          </View> 
                        </View>
                      </Modal>
            <View style={{marginTop:60, justifyContent:'center', alignItems:'center'}}>
                    <Button text = "Eliminar"  
                        onPress={()=> {Alert.alert(
                        "Eliminar",
                        "¿Estas seguro en eliminar este registro?",
                        [
                        {
                            text: "Si",
                            onPress: async () => {await eliminarEmpleados(); setVisibleModificar(true);},
                            style: "cancel",
                            
                        },
                        {
                            text: "Cancel",
                            onPress: () => navigation.navigate('Listar_Empleados'),
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
        padding: '5%'
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
      }
      
      });
      
      
