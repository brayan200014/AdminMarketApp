import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View, TextInput, KeyboardAvoidingView , 
    Modal,Keyboard, TouchableWithoutFeedback, Pressable, FlatList,Image, ScrollView} from 'react-native';
import {useEffect, useState} from 'react';
import Button from '../../componentes/Button';

export default function Opciones({ navigation }) {
    
    const [nombre, setnombre]= useState(null);
    const [descripcion, setdescripcion]= useState(null);
    const [estado, setestado]= useState(null);
    const [impuesto, setimpuesto]= useState(null);
    const [categoria, setcategoria]= useState(null);


    const CrearProducto = async () => {
            try {
                let solicitud= await fetch(
                    'http://192.168.0.148:6001/api/productos/guardarproductos',
                    {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json', 
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                          NombreProducto:nombre,
                          DescripcionProducto: descripcion,
                          Estado: estado,
                          ISV: impuesto,
                          Categorias_IdCategoria:categoria,
                      })
                    }
                  );
                  const respuesta= await solicitud.json();
                  const response= respuesta.msg; 
                  console.log(respuesta); 
            }catch(error){
                console.log(error);
            }
    }
    return (
        <SafeAreaView style={styles.safeView}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboarStyle}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.containerPri}>
                        <Text style={styles.textTittle}>Editar Producto</Text>
                        
                        <Text style={styles.textInpu}>Nombre</Text>
                        <TextInput style={styles.inputs} onChangeText={newText=>setnombre(newText)}></TextInput>
                        
                        <Text style={styles.textInpu}>Descripcion</Text>
                        <TextInput style={styles.inputs} onChangeText={newText=>setdescripcion(newText)}></TextInput>
                        
                        <Text style={styles.textInpu}>ISV</Text>
                        <TextInput style={styles.inputs} onChangeText={newText=>setimpuesto(newText)}></TextInput>

                        <Text style={styles.textInpu}>Estado</Text>
                        <TextInput style={styles.inputs} onChangeText={newText=>setestado(newText)}></TextInput>
                    
                        <Text style={styles.textInpu}># categoria</Text>
                        <TextInput style={styles.inputs} onChangeText={newText=>setcategoria(newText)}></TextInput>

                        <View style={{marginTop:60, justifyContent:'center', alignItems:'center'}}>
                            <Button text = "Crear"  
                                onPress={CrearProducto}
                            />
                        </View>
                    </View>
                    </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeView:{
    flex: 1, 
    height: StatusBar.currentHeight || 0,
    marginBottom: '15%'
},
keyboarStyle: {
    flex: 1
},
containerPri: {
    flex:1,
    backgroundColor: '#fff',
    flexDirection:'column',
    paddingTop:80,
},
textTittle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: '40%',
    marginTop: '3%',
    marginBottom: '2%'
},
textInpu: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: '3%',
    marginTop: '3%',
    color: 'black',
},
  inputs: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: '#2A67CA',
    marginTop: '3%'
  },
  containerBotones: {
    flex: 1,
    flexDirection: 'row',
    marginTop: '10%'
},
buttonModificar: {
    flex:1,
    alignItems:'center',
    backgroundColor: '#2A67CA',
    margin: '5%',
    height: '20%',
    justifyContent: 'center',
    borderRadius: 5
},
textButton: {
    color: 'white'
},
});