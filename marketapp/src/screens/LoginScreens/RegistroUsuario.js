import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { ActivityIndicator ,Text, View, StyleSheet, Image, TextInput, ImageBackground, Dimensions, Alert, KeyboardAvoidingView,
    TouchableWithoutFeedback, Keyboard, Pressable } from 'react-native';
const {width, height} = Dimensions.get('window');

import Button from '../../componentes/Button';


const title = '¡REGISTRO DE USUARIO!';
const tip = 'Por favor, ingrese cada uno de los items solicitados';


export default function Usuario({navigation}) {

    const [NombreUsuario, setNombreUsuario]= useState(null);
    const [Correo, setCorreo]= useState(null);
    const [Contrasena, setContrasena]= useState(null);

        const presGuardarUsuario= async () => {
                  if(!NombreUsuario || !Correo || !Contrasena) {
                      Alert.alert("¡Estimado Usuario!","Por favor, escriba los datos completos");
                  }
                  else 
                  { 
                    try {
                          let respuesta= await fetch(
                            'http://192.168.0.10:6001/api/cliente/guardar',
                            {
                                method: 'POST',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    NombreUsuario: NombreUsuario,
                                    Correo: Correo,
                                    Contrasena: Contrasena,
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
                                Alert.alert("Registro Completado, Elusuario fue creado con Exito");
                                navigation.navigate('Login');
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
        <ImageBackground source={require('../../../assets/image/background8.png')} style={{width: width, height: height}}>
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

            <TextInput style={styles.inputNombre} 
             onChangeText={newText => setNombreUsuario(newText)}
              placeholder="Escriba nombre de usuario">
            </TextInput>
           
            <TextInput style={styles.inputCorreo}
            onChangeText={newText => setCorreo(newText)}
              placeholder="Escriba su correo electrónico">
            </TextInput>

            <TextInput style={styles.inputTelefono}
              placeholder="Escriba su número de telefono">
            </TextInput>

            <TextInput style={styles.inputDireccion}
              placeholder="Escriba su Dirección">
            </TextInput>

            <TextInput style={styles.inputContra} passwordRules=""
             secureTextEntry={true}
              onChangeText={newText => setContrasena(newText)}
              placeholder="Escriba una contraseña">
            </TextInput>

            <TextInput style={styles.inputConfirmContra} passwordRules=""
             secureTextEntry={true}
              placeholder="Escriba confirme su contraseña">
            </TextInput>

          </View>
            <View style={{marginTop:200, justifyContent:'center', alignItems:'center'}}>
                <Button text="Guardar"
                    onPress={presGuardarUsuario}
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
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        
    
    },
    title:{
        marginTop: 9,
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
        fontSize: 14,
        textAlign: 'center'
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
        paddingRight:60,
        marginTop: 190,  
        borderRadius:15,
        textAlign: 'center'
    },
    inputTelefono:{
        backgroundColor: '#fff', 
        height: 40, 
        paddingLeft:60, 
        paddingRight:60,
        marginTop: 190,  
        borderRadius:15,
        textAlign: 'center'
    },
    inputDireccion:{
        backgroundColor: '#fff', 
        height: 40, 
        paddingLeft:60, 
        paddingRight:60,
        marginTop: 190,  
        borderRadius:15,
        textAlign: 'center'
    },
    inputContra: {
        backgroundColor: '#fff', 
        height: 40, 
        paddingLeft:60, 
        paddingRight:60, 
        marginTop: 190, 
        borderRadius: 15,
        textAlign: 'center'
    },
    inputConfirmContra: {
        backgroundColor: '#fff', 
        height: 40, 
        paddingLeft:60, 
        paddingRight:60, 
        marginTop: 190, 
        borderRadius: 15,
        textAlign: 'center'
    },
    inputNombre: {
        backgroundColor: '#fff', 
        height: 40, 
        paddingLeft:60, 
        paddingRight:60, 
        marginTop: 165, 
        textAlign: 'center',
        borderRadius: 15
    }
});

