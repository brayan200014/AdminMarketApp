import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../componentes/Button';

export default function Opciones({ route,navigation }) {
 
    const{IdProducto}=route.params;

    const eliminarProveedor= async()=>{
        try{
          const solicitud=await fetch(
            'http://192.168.0.101:6001/api/productos/eliminarproductos?IdProducto='+IdProducto,
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
      <Text>¿Seguro desea eliminar el producto?</Text>
        <View style={{marginTop:60, justifyContent:'center', alignItems:'center'}}>
            <Button text = "ELIMINAR"  
            onPress={eliminarProveedor}
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
});