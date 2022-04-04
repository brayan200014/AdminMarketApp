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
import ShowCompras from '../screens/ComprasScreen/ShowCompras';
import E_Compras from '../screens/ComprasScreen/Edit&SaveCompra';
import EditDetail from '../screens/ComprasScreen/editDetail';
import AddCompra from '../screens/ComprasScreen/AddingCompra'
import CompradetailAñadir from '../screens/ComprasScreen/AddingCompraDetail';

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
         <HomeStack.Screen  name="ListarCompras" component={ShowCompras} 
            options={{headerTransparent: true, 
            headerTintColor:'#fff', 
            headerBackTitle: 'Regresar',
            headerTitle:'Lista Compra', 
            headerStyle:{
              backgroundColor: '#3EA5DB',
         
         }}} />
         <HomeStack.Screen  name="ES_Compras" component={E_Compras} 
            options={{headerTransparent: true, 
            headerTintColor:'#fff', 
            headerBackTitle: 'Regresar',
            headerTitle:'Editar Compra', 
            headerStyle:{
              backgroundColor: '#3EA5DB',
         
         }}} />
         <HomeStack.Screen  name="E_DetalleCompra" component={EditDetail} 
            options={{headerTransparent: true, 
            headerTintColor:'#fff', 
            headerBackTitle: 'Regresar',
            headerTitle:'Editar Detalle', 
            headerStyle:{
              backgroundColor: '#3EA5DB',
         
         }}} />
         <HomeStack.Screen  name="AddCompra" component={AddCompra} 
            options={{headerTransparent: true, 
            headerTintColor:'#fff', 
            headerBackTitle: 'Regresar',
            headerTitle:'Agregar Compra', 
            headerStyle:{
              backgroundColor: '#3EA5DB',
         
         }}} />
         <HomeStack.Screen  name="AddCompraDetail" component={CompradetailAñadir} 
            options={{headerTransparent: true, 
            headerTintColor:'#fff', 
            headerBackTitle: 'Regresar',
            headerTitle:'Agregar Detalle de Compra', 
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