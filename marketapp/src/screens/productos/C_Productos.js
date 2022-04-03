import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View, TextInput, KeyboardAvoidingView , 
    Modal,Keyboard, TouchableWithoutFeedback, Pressable, FlatList,Image, ScrollView} from 'react-native';
import {useEffect, useState} from 'react';
import Button from '../../componentes/Button';
import * as ImagePicker from 'expo-image-picker';

export default function Opciones({ navigation }) {

    

    let openImagePicker = async () => {

        let perimissionsResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(perimissionsResult.granted = false) {
            Alert.alert("Necesitamos tu permiso para acceder a la cámara");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true
        });
        setSelectedImage(pickerResult.uri);
        setFilename(pickerResult.uri);
        //console.log('Hola');
        //console.log(pickerResult);
        //console.log(pickerResult.uri);

            
        if(pickerResult.cancelled = true)
        {
            return;
        }
        
        
        
        
         // este es para mostrarlo en un divi setFilename (pickerResult.uri); // este es el que se va a mandar a Nodejs,
    }
    
    const [nombre, setnombre]= useState(null);
    const [descripcion, setdescripcion]= useState(null);
    const [estado, setestado]= useState(null);
    const [impuesto, setimpuesto]= useState(null);
    const [categoria, setcategoria]= useState(null);
    const[SelectImage, setSelectedImage]= useState('');
    const[Filename, setFilename]=useState(null);


    const CrearProducto = async () => {
            try {
                let solicitud= await fetch(
                    'http://192.168.0.101:6001/api/productos/guardarproductos',
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
                          Imagen:Filename
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
        <ScrollView style={styles.contentContainer}>
                    <View style={styles.containerPri}>

                    <View style={{marginTop:50, justifyContent:'center', alignItems:'center'}}>
                            <Button text = "Seleccionar Imagen"  
                                onPress={async()=>{ await openImagePicker(setFilename)}}
                            />
                        </View>
                        
                        <View style={{marginTop:10,justifyContent:'center', alignItems:'center'}}>
                            <Button text = "Crear"  
                                onPress={CrearProducto}
                            />
                        </View>
                        
                        <View style={styles.selecImg}>
                            <Image style={styles.img} source={{uri:SelectImage}}></Image>
                        </View>
                        
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
                        
                    </View>
                    </ScrollView>
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
    paddingTop:40,
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
selecImg:{
},
img:{
    height: '100%',
    width: '100%',
}, 
contentContainer:{
    //paddingVertical: '20'
}
});