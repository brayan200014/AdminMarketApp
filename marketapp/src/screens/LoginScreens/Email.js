import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, TextInput, ImageBackground, Dimensions, Alert } from 'react-native';
const {width, height} = Dimensions.get('window');

import Button from '../../componentes/Button';

const title = '¡Paso 1- Recuperando Contraseña!';
const tip = 'Por favor, ingresa tu correo electronico';

export default function Email({navigation}) {

const [correo, setCorreo]= useState(null);
    const presEnviarPin= async () => {
              if(!correo) {
                  Alert.alert("¡Estimado Usuario!","Por favor, escriba los datos completos");
              }
              else 
              { 
                try {
                      let respuesta= await fetch(
                        'http://192.168.0.10:6001/api/autenticacion/recuperarcontrasena',
                        {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                correo: correo,
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
                            Alert.alert("Pin enviado, Verifique su correo electrónico");
                            navigation.navigate('Cambio')
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
    <View style={styles.container}>
        <ImageBackground source={require('../../../assets/image/background4.png')} style={{width: width, height: height}}>
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
            </View>
            <View style={{marginTop:37, justifyContent:'center', alignItems:'center'}}>
                <Button text="Enviar"
                onPress={presEnviarPin}  
                />
            </View>
        </ImageBackground>
    </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
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
        marginTop: 59,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText:{
        color: '#FFFFFF',
        fontFamily: 'Nunito-ExtraBold',
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
        borderRadius:15,
    }
});
