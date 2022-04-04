import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import modulos from '../screens/InicioModulos'
import opciones from '../screens/opcionesModulos';
import Showventas from '../screens/VentasScreen/showVentas';
import E_Ventas from '../screens/VentasScreen/Edit&SaveVentas';
import ShowCompras from '../screens/ComprasScreen/ShowCompras';
import E_Compras from '../screens/ComprasScreen/Edit&SaveCompra';
import E_detalleCompra from '../screens/ComprasScreen/editDetail';
import addCompra from '../screens/ComprasScreen/AddingCompra';
import addDetailCompra from '../screens/ComprasScreen/AddingCompraDetail';

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
         <HomeStack.Screen  name="E_DetalleCompra" component={E_detalleCompra} 
            options={{headerTransparent: true, 
            headerTintColor:'#fff', 
            headerBackTitle: 'Regresar',
            headerTitle:'Editar Detalle', 
            headerStyle:{
              backgroundColor: '#3EA5DB',
         
         }}} />
         <HomeStack.Screen  name="AddCompra" component={addCompra} 
            options={{headerTransparent: true, 
            headerTintColor:'#fff', 
            headerBackTitle: 'Regresar',
            headerTitle:'Agregar Compra', 
            headerStyle:{
              backgroundColor: '#3EA5DB',
         
         }}} />
         <HomeStack.Screen  name="AddCompraDetail" component={addDetailCompra} 
            options={{headerTransparent: true, 
            headerTintColor:'#fff', 
            headerBackTitle: 'Regresar',
            headerTitle:'Agregar Detalle de Compra', 
            headerStyle:{
              backgroundColor: '#3EA5DB',
         
         }}} />

    </HomeStack.Navigator>  
   )
}

export default Navigation;