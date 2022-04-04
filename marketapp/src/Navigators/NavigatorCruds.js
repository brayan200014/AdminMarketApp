import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import modulos from '../screens/InicioModulos'
import opciones from '../screens/opcionesModulos';
import ModuloCategorias from '../screens/ScreenAgregar/ModuloCategorias';
import ModuloCiudades from '../screens/ScreenAgregar/ModuloCiudades';
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

      <HomeStack.Screen  name="Ciudades" component={ModuloCiudades} 
      options={{headerTransparent: true, 
      headerTintColor:'#fff', 
      headerBackTitle: 'Regresar',
       headerTitle:'Opciones', 
       headerStyle:{
         backgroundColor: '#3EA5DB',
         
         }}} />

         <HomeStack.Screen  name="Categorias" component={ModuloCategorias} 
      options={{headerTransparent: true, 
      headerTintColor:'#fff', 
      headerBackTitle: 'Regresar',
       headerTitle:'Opciones', 
       headerStyle:{
         backgroundColor: '#3EA5DB',
         
         }}} />

    </HomeStack.Navigator>  
   )
}

export default Navigation;