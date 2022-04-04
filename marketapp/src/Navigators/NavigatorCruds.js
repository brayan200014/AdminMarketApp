import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import modulos from '../screens/InicioModulos'
import opciones from '../screens/opcionesModulos';
import Showventas from '../screens/VentasScreen/showVentas';
import E_Ventas from '../screens/VentasScreen/Edit&SaveVentas'
import ListarEmpleados from '../screens/EmpleadosScreen/listarEmpleados';
import ModificarEmpleados from '../screens/EmpleadosScreen/modificarEmpleados';
import EliminarEmpleados from '../screens/EmpleadosScreen/eliminarEmpleados';
import RegistroEmpleados from '../screens/EmpleadosScreen/registroEmpleados';
import ListarSucursales from '../screens/SucursalesScreen/listarScursales';
import ModificarSucursales from '../screens/SucursalesScreen/modificarSucursales';
import EliminarSucursal from '../screens/SucursalesScreen/eliminarSucursales';
import RegistroSucursales from '../screens/SucursalesScreen/registroSucursales';




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
         <HomeStack.Screen  name="ListarVentas" component={Showventas} 
            options={{headerTransparent: true, 
            headerTintColor:'#fff', 
            headerBackTitle: 'Regresar',
            headerTitle:'Lista Ventas', 
            headerStyle:{
              backgroundColor: '#3EA5DB',
         
         }}} />
          <HomeStack.Screen  name="ES_Ventas" component={E_Ventas} 
            options={{headerTransparent: true, 
            headerTintColor:'#fff', 
            headerBackTitle: 'Regresar',
            headerTitle:'Editar Venta', 
            headerStyle:{
              backgroundColor: '#3EA5DB',
         
         }}} />

          <HomeStack.Screen  name="Listar_Empleados" component={ListarEmpleados} 
            options={{headerTransparent: true, 
            headerTintColor:'#fff', 
            headerBackTitle: 'Regresar',
            headerTitle:'Lista Empleados', 
            headerStyle:{
            backgroundColor: '#3EA5DB',
         
         }}} />

          <HomeStack.Screen  name="Modificar_Empleados" component={ModificarEmpleados} 
            options={{headerTransparent: true, 
            headerTintColor:'#fff', 
            headerBackTitle: 'Regresar',
            headerTitle:'Modificando Registro Empleados', 
            headerStyle:{
              backgroundColor: '#3EA5DB',
         
         }}} />

        <HomeStack.Screen  name="Eliminar_Empleados" component={EliminarEmpleados} 
            options={{headerTransparent: true, 
            headerTintColor:'#fff', 
            headerBackTitle: 'Regresar',
            headerTitle:'Eliminando Empleados', 
            headerStyle:{
              backgroundColor: '#3EA5DB',
         
         }}} />

        <HomeStack.Screen  name="Registrar_Empleados" component={RegistroEmpleados} 
            options={{headerTransparent: true, 
            headerTintColor:'#fff', 
            headerBackTitle: 'Regresar',
            headerTitle:'Registro Empleados', 
            headerStyle:{
              backgroundColor: '#3EA5DB',
         
         }}} />

        <HomeStack.Screen  name="Listar_Sucursales" component={ListarSucursales} 
            options={{headerTransparent: true, 
            headerTintColor:'#fff', 
            headerBackTitle: 'Regresar',
            headerTitle:'Lista Sucursales', 
            headerStyle:{
            backgroundColor: '#3EA5DB',
         
         }}} />

        <HomeStack.Screen  name="Registrar_Sucursal" component={RegistroSucursales} 
            options={{headerTransparent: true, 
            headerTintColor:'#fff', 
            headerBackTitle: 'Regresar',
            headerTitle:'Registro Sucursal', 
            headerStyle:{
              backgroundColor: '#3EA5DB',
         
         }}} />

        <HomeStack.Screen  name="Modificar_Sucursal" component={ModificarSucursales} 
            options={{headerTransparent: true, 
            headerTintColor:'#fff', 
            headerBackTitle: 'Regresar',
            headerTitle:'Modificando Registro Sucursales', 
            headerStyle:{
              backgroundColor: '#3EA5DB',
         
         }}} />

        <HomeStack.Screen  name="Eliminar_Sucursales" component={EliminarSucursal} 
            options={{headerTransparent: true, 
            headerTintColor:'#fff', 
            headerBackTitle: 'Regresar',
            headerTitle:'Eliminando Sucursales', 
            headerStyle:{
              backgroundColor: '#3EA5DB',
         
         }}} />
      

    </HomeStack.Navigator>  
   )
}

export default Navigation;