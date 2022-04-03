import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View, Alert, ImageBackground, Dimensions,Image, KeyboardAvoidingView,
    TouchableWithoutFeedback, Keyboard, Pressable } from 'react-native';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';


const {width, height} = Dimensions.get('window');

import Button from '../../componentes/Button';

const title = '¡Bienvenido(a)!';
const tip = 'Debes Iniciar Sesión para continuar';
const signup = '¿Nuevo Usuario? Registrate';
const terms = 'Al registrarse usted esta de acuerdo con todas nuestros términos y condiciones';


export default function App({ navigation }) {

  const [Correo, setCorreo]= useState(null);
  const [Contrasena, setContrasena]= useState(null);
  const presIniciarSesion= async () => {
    console.log(Correo);
    console.log(Contrasena);
      if(!Correo || !Contrasena) {
          console.log("Escriba los datos completos");
          Alert.alert("¡Estimado Usuario!","Por favor, escriba los datos completos");
      }
      else 
      { 
        try {
              const respuesta= await fetch(
                'http://192.168.0.148:6001/api/autenticacion/iniciosesion',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Correo: Correo,
                        Contrasena: Contrasena
                    })
                }  
              );

              const json = await respuesta.json();
              console.log(json);
              const data= json.data;
              if(!data.token) {
                const token=data.token;
                console.log(token);
                await AsyncStorage.setItem('Token',token);
              }
              Alert.alert("Bienvenido(a)", "Escoge tus Productos");
              await AsyncStorage.removeItem('ProductosArray');
              navigation.navigate('Root');
          } catch(error) {
              console.log(error);
          }
      }
  }
  const presToken= async ()=> {
    try {
      const token= await AsyncStorage.getItem('Token');
      console.log( token);
      Alert.alert("Supermarket", token);
      
    } catch (error) {
      console.error(error);
      
    }
  }
  
  return (
     <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardStyle}>
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/image/background7.png')} style={{width: width, height: height}}>
                <View style={styles.darkLayer}></View>
                <View style={styles.logo}>
                    <Image source={require('../../../assets/image/logoMarket.png')}/>
                </View>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
                <View style={styles.tip}>
                    <Text style={styles.tipText}>{tip}</Text>
                </View>
                
                <View style={styles.input}>
            <TextInput style={styles.inputCorreo}
                onChangeText={newText => setCorreo(newText)}
              placeholder="Escriba su correo electrónico">
            </TextInput>

            <TextInput style={styles.inputContra} passwordRules=""
              secureTextEntry={true}
                onChangeText={newText => setContrasena(newText)}
              placeholder="Escriba su contraseña">
            </TextInput>

          </View>
                <View style={styles.remember}>
                <View style={{}}>
                <Pressable onPress={() => navigation.navigate('Email')}>
                    <Text style={styles.forgotText}>¿Olvide mi contraseña?</Text>
                    </Pressable>
                </View>
                </View>
                <View style={{marginTop:37, justifyContent:'center', alignItems:'center'}}>
                    <Button text="Login"
                      onPress={presIniciarSesion}
                    />
                </View>
                <Pressable style={styles.signup} onPress={() => navigation.navigate('Registro')}>
                <View>
                    <Text style={styles.signupText}>{signup}</Text>
                </View>
                </Pressable>
                <View style={styles.terms}>
                    <Text style={styles.termsText}>{terms}</Text>
                </View>
            </ImageBackground>
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView> 
    );
  } 
  const styles = StyleSheet.create({
      keyboardStyle: {
          flex: 1
      },
    container:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: width -60,
        height: 45,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
    },
    darkLayer:{
        position: 'absolute',
        top:0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: '#000000',
        opacity: 0.4
    },
    logo:{
        marginTop: 95,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title:{
        marginTop: 49,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText:{
        color: '#FFFFFF',
        fontFamily: 'Nunito-ExtraBold',
        fontSize:22
    },
    tip:{
        marginLeft: 70,
        marginRight: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tipText:{
        color: '#FFFFFF',
        fontFamily: 'Nunito-SemiBold',
        fontSize: 17
    },
    input: {
        marginTop: 24,
        marginLeft: 30,
        marginRight:30,
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        borderColor: '#FFFFFF',
        color: '#727C8E',
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '500',
        fontSize: 12,
        paddingLeft: 0,
        height: 80
    },
    remember:{
        marginTop: 10,
        marginLeft: 30,
        alignItems: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        opacity: 0.8
    },
    rememberText:{
        color: '#FFFFFF',
        fontFamily: 'Nunito-Bold',
        fontSize: 12,
        
    },
    forgotText:{
        color: '#FFFFFF',
        fontFamily: 'Nunito-Bold',
        fontSize: 12,
        marginLeft:20
    },
    signup:{
        marginTop:-600,
        marginLeft:180,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7D35C',
        borderRadius: 8
    },
    signupText: {
        color: '#000000',
        fontFamily: 'Nunito-Bold',
        fontSize: 14
    },
    terms:{
        marginTop: 600,
        marginRight: 90,
        marginLeft: 90,
        justifyContent: 'center',
        alignItems: 'center'
    },
    termsText:{
        color: '#FFFFFF',
        fontFamily: 'Nunito-SemiBold',
        fontSize: 11,
        textAlign: 'center'
    },
    inputCorreo: {
        backgroundColor: '#fff', 
        height: 40, 
        paddingLeft:60, 
        paddingRight:60, 
        borderRadius:15,
    },
    inputContra: {
        backgroundColor: '#fff', 
        height: 40, 
        paddingLeft:60, 
        paddingRight:60, 
        marginTop: 12, 
        borderRadius: 15
    }
});