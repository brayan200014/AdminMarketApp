import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import Button from '../../componentes/Button';
import { AntDesign } from '@expo/vector-icons'; 
import {useState} from 'react'


export default function Opciones({ route,navigation }) {
 
    const{IdProveedor}=route.params;
    const [visibleModificar, setVisibleModificar]= useState(false);

    const eliminarProveedor= async()=>{
        try{
          const solicitud=await fetch(
            'http://192.168.0.10:6001/api/proveedores/eliminar?IdProveedor='+IdProveedor,
            {
              method: 'DELETE',
              headers: {
                Accept: 'application/json', 
                'Content-Type': 'application/json'
              },
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
    <View style={styles.container}>
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
                                   navigation.navigate('ListarProveedores');
                                  }}>
                                    <Text style={styles.textbotonModalModificar}>Cerrar</Text>
                                  </Pressable>
                          </View> 
                        </View>
                      </Modal>
      <Text>¿Seguro desea eliminar el proveedor?</Text>
        <View style={{marginTop:60, justifyContent:'center', alignItems:'center'}}>
            <Button text = "ELIMINAR"  
            onPress={()=> {
              eliminarProveedor();
             setVisibleModificar(true);
            }}
            />
        </View>
      <StatusBar style="auto" />
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