import React from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, Dimensions } from 'react-native';
import { RadioGroup,RadioButton} from 'react-native-flexi-radio-button';

const {width, height} = Dimensions.get('window');

import Input from '../../componentes/Input';
import Button from '../../componentes/Button';

const title = '¡Bienvenido(a) de Vuelta!';
const tip = 'Debe Iniciar Sesión para continuar';
const signup = 'Nuevo Usuario? Registrate';
const terms = 'Para registrarse, debe indicar que esta de acuerdo con los términos';

const Login = ({
    params,
}) => (
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
                <Text style={styles.forgotText}>¿Olvide mi contraseña?</Text>
            </View>
            </View>
            <View style={{marginTop:37, justifyContent:'center', alignItems:'center'}}>
                <Button text="Login"/>
            </View>
            <View style={styles.signup}>
                <Text style={styles.signupText}>{signup}</Text>
            </View>
            <View style={styles.terms}>
                <Text style={styles.termsText}>{terms}</Text>
            </View>
        </ImageBackground>
    </View>
);

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
        justifyContent: 'center',
        alignSelf: 'center'
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
        fontSize: 12
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
    }
});

export default Login;