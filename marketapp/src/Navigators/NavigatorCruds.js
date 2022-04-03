import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import modulos from '../screens/InicioModulos'
import opciones from '../screens/opcionesModulos';
import Proveedores from '../screens/proveedores/listaproveedores';
import E_Proveedores from '../screens/proveedores/ModProveedores';
import O_Proveedores from '../screens/proveedores/opciones';
import C_Proveedores from '../screens/proveedores/RegistroProvedor';
import D_Proveedores from '../screens/proveedores/D_Proveedor';
import Productos from '../screens/productos/Productos';

const HomeStack= createNativeStackNavigator();


const Navigation= () => {
   
   return (
    <HomeStack.Navigator>
      <HomeStack.Screen  name="Modulos" component={modulos} 
      options={{headerTransparent: true, 
        headerTintColor:'#fff',
         headerTitle:'Carrito', 
         headerShown: false,
         headerBackTitle: 'Regresar',
         headerStyle:{
           backgroundColor: '#3EA5DB',
           
           }}} />
      <HomeStack.Screen  name="Opciones" component={opciones} 
      options={{headerTransparent: true, 
      headerTintColor:'#fff', 
      headerBackTitle: 'Regresar',
       headerTitle:'Opciones', 
       headerStyle:{
         backgroundColor: '#3EA5DB',
         
         }}} />
      <HomeStack.Screen  name="ListarProveedores" component={Proveedores} 
      options={{headerTransparent: true, 
        headerTintColor:'#fff', 
        headerBackTitle: 'Regresar',
         headerTitle:'Lista Provedores', 
         headerStyle:{
           backgroundColor: '#3EA5DB',
           }}} />
        <HomeStack.Screen  name="ModProveedores" component={E_Proveedores} 
      options={{headerTransparent: true, 
        headerTintColor:'#fff', 
        headerBackTitle: 'Regresar',
         headerTitle:'Modificar Provedores', 
         headerStyle:{
           backgroundColor: '#3EA5DB',
           }}} />
        <HomeStack.Screen  name="OpcionesProv" component={O_Proveedores} 
      options={{headerTransparent: true, 
        headerTintColor:'#fff', 
        headerBackTitle: 'Regresar',
         headerTitle:'Modificar Provedores', 
         headerStyle:{
           backgroundColor: '#3EA5DB',
           }}} />
        <HomeStack.Screen  name="CreaProveedores" component={C_Proveedores} 
      options={{headerTransparent: true, 
        headerTintColor:'#fff', 
        headerBackTitle: 'Regresar',
         headerTitle:'Modificar Provedores', 
         headerStyle:{
           backgroundColor: '#3EA5DB',
           }}} />
        <HomeStack.Screen  name="DeleteProveedores" component={D_Proveedores} 
      options={{headerTransparent: true, 
        headerTintColor:'#fff', 
        headerBackTitle: 'Regresar',
         headerTitle:'Modificar Provedores', 
         headerStyle:{
           backgroundColor: '#3EA5DB',
           }}} />
        <HomeStack.Screen  name="ListarProductos" component={Productos}  
      options={{headerTransparent: true, 
        headerTintColor:'#fff', 
        headerBackTitle: 'Regresar',
         headerTitle:'Listar Productos', 
         headerStyle:{
           backgroundColor: '#3EA5DB',
           }}} />
    </HomeStack.Navigator>  
   )
}

export default Navigation;