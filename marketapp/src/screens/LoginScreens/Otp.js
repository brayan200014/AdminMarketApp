import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { ActivityIndicator,Text, View, StyleSheet, Image, TextInput, ImageBackground, Dimensions, Alert, KeyboardAvoidingView,
    TouchableWithoutFeedback, Keyboard, Pressable } from 'react-native';
const {width, height} = Dimensions.get('window');

//import Input from '../componentes/Input';
import Button from '../../componentes/Button';

const title = '¡Paso 2- Recuperando Contraseña!';
const tip = 'Por tu seguridad, hemos enviado un PIN de recuperación a tu dirección de correo electrónico, favor de ingresar';


export default function CambioContra({navigation}) {
    const [Correo, setCorreo]= useState(null);
    const [pin, setpin]= useState(null);
    const [contraseniaNueva, setcontraseniaNueva]= useState(null);

    const presCambiarContra= async () => {
        if(!Correo || !pin || !contraseniaNueva) {
            Alert.alert("¡Estimado Usuario!","Por favor, escriba los datos completos");
        }
        else 
        { 
          try {
                let respuesta= await fetch(
                  'http://192.168.0.10:6001/api/autenticacion/cambiarContra',
                  {
                      method: 'PUT',
                      headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                          Correo: Correo,
                          pin: pin,
                          contraseniaNueva: contraseniaNueva,
                      })
                  }).then(response => {
                      const statusCode = response.status;
                      const data = response.json();
                      return Promise.all([statusCode, data]);
                  }).catch(error =>{
                      console.log(error);
                  });
                  respuesta=respuesta;
                  console.log(respuesta);
                  if(respuesta[0]==200){
                      Alert.alert("Contraseña Actualizada", "Inicie Sesión nuevamente");
                      navigation.navigate("Login");
                  }
                  else{
                      Alert.alert("Error!", respuesta[1].msj);
                  }

            } catch(error) {
                console.log(error);
            }
        }  
}


    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardStyle}>
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
        <ImageBackground source={require('../../../assets/image/background2.jpg')} style={{width: width, height: height}}>
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
            
        

            <TextInput style={styles.inputPin}
            onChangeText={newText => setpin(newText)} 
              placeholder="Ingrese el PIN">
            </TextInput> 

        

            <TextInput style={styles.inputContra} passwordRules=""
              secureTextEntry={true}
              onChangeText={newText => setcontraseniaNueva(newText)}
              placeholder="Escriba su nueva contraseña">
            </TextInput>

            </View>

            <View style={{marginTop:60, justifyContent:'center', alignItems:'center'}}>
                <Button text="Enviar"
                    onPress={presCambiarContra}
                />
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
        marginTop: 85,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title:{
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText:{
        color: '#FFFFFF',
        fontFamily: 'Nunito-Bold',
        fontSize:22
    },
    tip:{
        marginLeft: 50,
        marginRight: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tipText:{
        color: '#FFFFFF',
        fontFamily: 'Nunito-SemiBold',
        fontSize: 12,
        textAlign: 'center'
    },
    input: {
        marginTop: 50,
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
        fontFamily: 'Nunito-SemiBold',
        fontSize: 12
    },
    forgotText:{
        color: '#FFFFFF',
        fontFamily: 'Nunito-SemiBold',
        fontSize: 12
    },
    signup:{
        marginTop:113,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signupText: {
        color: '#2A67CA',
        fontFamily: 'Nunito-SemiBold',
        fontSize: 10
    },
    terms:{
        marginTop: 52,
        marginRight: 80,
        marginLeft: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    termsText:{
        color: '#FFFFFF',
        fontFamily: 'Nunito-SemiBold',
        fontSize: 10,
        textAlign: 'center'
    },
    inputCorreo: {
        backgroundColor: '#fff', 
        height: 40, 
        paddingLeft:60,
        marginTop: 10, 
        paddingRight:60, 
        borderRadius:15,
        textAlign: 'center'
    },
    inputPin: {
        backgroundColor: '#fff', 
        height: 40, 
        paddingLeft:60, 
        paddingRight:60, 
        marginTop: 50, 
        borderRadius: 15,
        textAlign: 'center'
    },
    inputContra:{
        backgroundColor: '#fff', 
        height: 40, 
        paddingLeft:30, 
        paddingRight:30, 
        marginTop: 50, 
        borderRadius: 15,
        textAlign: 'center'
    }
});
