import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import modulos from '../screens/InicioModulos'
import opciones from '../screens/opcionesModulos';
import Showventas from '../screens/VentasScreen/showVentas';
import E_Ventas from '../screens/VentasScreen/Edit&SaveVentas'


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

    </HomeStack.Navigator>  
   )
}

export default Navigation;