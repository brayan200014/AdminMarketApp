import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import modulos from '../screens/InicioModulos'
import opciones from '../screens/opcionesModulos';
import Proveedores from '../screens/proveedores/listaproveedores';
import E_Proveedores from '../screens/proveedores/ModProveedores';
import C_Proveedores from '../screens/proveedores/RegistroProvedor';
import D_Proveedores from '../screens/proveedores/D_Proveedor';

import C_Productos from '../screens/productos/C_Productos';
import R_Productos from '../screens/productos/R_Productos';
import U_Productos from '../screens/productos/U_Productos';
import D_Productos from '../screens/productos/D_Productos';

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
        <HomeStack.Screen  name="CreaProveedores" component={C_Proveedores} 
      options={{headerTransparent: true, 
        headerTintColor:'#fff', 
        headerBackTitle: 'Regresar',
         headerTitle:'Provedores', 
         headerStyle:{
           backgroundColor: '#3EA5DB',
           }}} />
        <HomeStack.Screen  name="DeleteProveedores" component={D_Proveedores} 
      options={{headerTransparent: true, 
        headerTintColor:'#fff', 
        headerBackTitle: 'Regresar',
         headerTitle:'Provedores', 
         headerStyle:{
           backgroundColor: '#3EA5DB',
           }}} />


        





          <HomeStack.Screen  name="CrearProductos" component={C_Productos}  
            options={{headerTransparent: true, 
            headerTintColor:'#fff', 
            headerBackTitle: 'Regresar',
            headerTitle:'Productos', 
            headerStyle:{
              backgroundColor: '#3EA5DB',
           }}} />

        <HomeStack.Screen  name="ListarProductos" component={R_Productos}  
        options={{headerTransparent: true, 
        headerTintColor:'#fff', 
        headerBackTitle: 'Regresar',
         headerTitle:'Productos', 
         headerStyle:{
           backgroundColor: '#3EA5DB',
           }}} />

        <HomeStack.Screen  name="UpdateProductos" component={U_Productos}  
          options={{headerTransparent: true, 
          headerTintColor:'#fff', 
          headerBackTitle: 'Regresar',
           headerTitle:'Productos', 
          headerStyle:{
           backgroundColor: '#3EA5DB',
           }}} />
          
        <HomeStack.Screen  name="DeleteProductos" component={D_Productos}  
          options={{headerTransparent: true, 
          headerTintColor:'#fff', 
          headerBackTitle: 'Regresar',
           headerTitle:'Productos', 
          headerStyle:{
           backgroundColor: '#3EA5DB',
           }}} />
    </HomeStack.Navigator>  
   )
}

export default Navigation;