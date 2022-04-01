import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keboard, TextInput, Alert,  KeyboardAvoidingView, Keyboard} from 'react-native';
import {useState} from 'react';

export default function Opciones({ navigation }) {
  
    const[NombreProveedor, setNombreProveedor]= useState(null);
    const[Numero, setNumero]= useState(null);
    const[Email, setEmail]=useState(null);

    const presGuardarProveedor = async () => {
        if(!NombreProveedor||!Numero||!Email){
            Alert.alert("Ingrese los datos completos");
        }else{
            try {
                let respuesta = await fetch(
                    'http://192.168.0.146:6001/api/proveedor/guardar',
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',  
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            NombreProveedor:NombreProveedor, 
                            Email: Email,
                            Contacto: Contacto,
                        })
                    }
                )
                respuesta=respuesta;
                console.log(respuesta);
                if(respuesta[0]==200){
                    Alert.alert("Registro Completado, Elusuario fue creado con Exito");
                    navigation.navigate('ListarProductos');
                }
                else{
                    Alert.alert("Error!", respuesta[1].msj);
                }
            }catch(error){
                console.log(error);
            }
        }
    }
  
  
  
    return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardStyle}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.conteiner}>
                <View style={styles.input}>
                    <TextInput style={styles.inputNombre} 
                    onChangeText={newText => setNombreProveedor(newText)}
                    placeholder="Escriba nombre del Proveedor">
                    </TextInput>
                
                    <TextInput style={styles.inputCorreo}
                    onChangeText={newText => setEmail(newText)}
                    placeholder="Escriba su correo electrónico">
                    </TextInput>

                    <TextInput style={styles.inputNumero}
                    onChangeText={newText => setNumero(newText)}
                    placeholder="Escriba el numero celular">
                    </TextInput>
                </View>

                <View style={{marginTop:200, justifyContent:'center', alignItems:'center'}}>
                    <Button text="Guardar"
                        onPress={presGuardarUsuario}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: -60,
        height: 45,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
  },
  keyboardStyle: {
    flex: 1
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
inputCorreo: {
    backgroundColor: '#fff', 
    height: 40, 
    paddingLeft:60, 
    paddingRight:60, 
    marginTop: 190, 
    borderRadius: 15,
    textAlign: 'center'
},
inputNumero: {
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