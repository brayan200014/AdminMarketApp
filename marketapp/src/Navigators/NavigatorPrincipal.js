import { StyleSheet, View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Root from "../screens/root";
import OnBoarding from "../screens/LoginScreens/Onboarding";
import Login from "../screens/LoginScreens/LoginIn";
import Email from "../screens/LoginScreens/Email";
import RegistroUsuario from "../screens/LoginScreens/RegistroUsuario";
import CambioContra from "../screens/LoginScreens/Otp";



const HomeStack= createNativeStackNavigator();


const Navigation= () => {
   
   return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Inicio" component={OnBoarding}  options={{headerShown:false}} />
      <HomeStack.Screen  name="Login" component={Login} options={{headerTransparent: true, headerTintColor:'#fff', headerBackTitle: 'Regresar'}} />
      <HomeStack.Screen  name="Root" component={Root} options={{headerShown:false}} />
      <HomeStack.Screen  name="Email" component={Email} options={{headerTransparent: true, headerTintColor:'#fff', headerBackTitle: 'Regresar' }} />
      <HomeStack.Screen  name="Cambio" component={CambioContra} options={{headerTransparent: true, headerTintColor:'#fff', headerBackTitle: 'Regresar'}} />
      <HomeStack.Screen  name="Registro" component={RegistroUsuario} options={{headerTransparent: true, headerTintColor:'#fff', headerBackTitle: 'Regresar'}} />
    </HomeStack.Navigator>  
   )
}

export default Navigation;