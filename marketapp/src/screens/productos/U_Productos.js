import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View, TextInput, KeyboardAvoidingView , 
    Keyboard, TouchableWithoutFeedback, Image, ScrollView, Button, Pressable, Modal} from 'react-native';
import {useEffect, useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign } from '@expo/vector-icons';


const myTheme = require("../TemaDrop/EstiloDropDown");

DropDownPicker.addTheme("Sucursal", myTheme);
DropDownPicker.setTheme("Sucursal");
DropDownPicker.setLanguage("ES");

export default function Opciones({ route , navigation }) {

    const{IdProducto, NombreProducto, DescripcionProducto,ISV, Estado, Categorias_IdCategoria}=route.params;
    

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
        setfilename(pickerResult.uri);
        //console.log('Hola');
        //console.log(pickerResult);
        //console.log(pickerResult.uri);

            
        if(pickerResult.cancelled = true)
        {
            return;
        }
         // este es para mostrarlo en un divi setFilename (pickerResult.uri); // este es el que se va a mandar a Nodejs,
    }
    
    const[ArregloCategorias, setArregloCategorias]=useState([]);
    const [nombre, setnombre]= useState(NombreProducto);
    const [descripcion, setdescripcion]= useState(DescripcionProducto);
    const [estado, setestado]= useState(Estado);
    const [impuesto, setimpuesto]= useState(ISV);
    const [categoria, setcategoria]= useState(null);
    const[SelectImage, setSelectedImage]= useState('http://192.168.0.10:6001/api/archivos/consultar?id='+IdProducto);
    const[filename, setfilename]=useState('http://192.168.0.10:6001/api/archivos/consultar?id='+IdProducto);
    const [open, setOpen]= useState(false);
    const [value, setValue]= useState(Categorias_IdCategoria);
    const [items, setItems]= useState(ArregloCategorias)
    const [visibleModificar, setVisibleModificar]= useState(false);

    useEffect(async()=>{
        var a = await  getCategorias();
        
      }, []);

    const getCategorias= async () => {
   
        const solicitud= await fetch(
          'http://192.168.0.10:6001/api/categorias/listar',
          {
            method: 'GET', 
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
          }
        )
        const json = await solicitud.json();
        const data=json.data;
        setItems(data);
        setArregloCategorias(data);
        console.log(items);
    }

    const ModificarProducto = async () => {
            try {
                let solicitud= await fetch(
                    'http://192.168.0.10:6001/api/productos/modificarproductos?IdProducto='+IdProducto,
                    {
                      method: 'PUT',
                      headers: {
                        Accept: 'application/json', 
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                          NombreProducto:nombre,
                          DescripcionProducto: descripcion,
                          Estado: estado,
                          ISV: impuesto,
                          Categorias_IdCategoria:value,
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

    const changeImage =async () => {
        console.log(filename);
        const formData=new FormData();
        formData.append("img",{
            name: new Date()+"_img",
            uri: filename,
            type: 'image/jpg'
        });
        try{
            const respuesta= await fetch('http://192.168.0.10:6001/api/archivos?id='+IdProducto,
            {
               method: 'POST',
               headers: {
                   Accept: 'application/json',
                   'Content-Type': 'multipart/form-data'
               },
               body: formData
            });
            
        }catch(error){
            console.log(error);
        }
    }

    return (
        
    <SafeAreaView style={styles.safeView}>
        <Modal transparent={true}
                            animationType={'fade'}
                            visible={visibleModificar}
                            >
                        <View style={styles.containerPmodalModificar}>
                          <View style={styles.conatinerInfoModalModificar}>
                          <AntDesign name="checkcircle" size={24} color="green" />
                          <Text style={styles.textmessagemodalModificar}>Registro Modificado</Text>
                                  <Pressable style={styles.pressabelStyleModalModificar} onPress={  () => {
                                   setVisibleModificar(false);
                                   navigation.navigate('ListarProductos');
                                  }}>
                                    <Text style={styles.textbotonModalModificar}>Cerrar</Text>
                                  </Pressable>
                          </View> 
                        </View>
                      </Modal>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboarStyle}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.contentContainer}>
            
                        <View style={styles.containerPri}>

                            <Text style={styles.textInpu}>Nombre</Text>
                            <TextInput style={styles.inputs} onChangeText={newText=>setnombre(newText)}  defaultValue={''+NombreProducto} ></TextInput>
                            
                            <Text style={styles.textInpu}>Descripcion</Text>
                            <TextInput style={styles.inputs} onChangeText={newText=>setdescripcion(newText)} defaultValue={''+DescripcionProducto}></TextInput>

                            <Text style={styles.textInpu}>Categorias</Text>
                             
                                <DropDownPicker
                                    schema={{
                                    label: 'NombreCategoria',
                                    value: 'IdCategoria'
                                    }}
                                    zIndex={1000}
                                    zIndexInverse={3000}
                                    open={open}
                                    value={value}
                                    items={items}
                                    setOpen={setOpen}
                                    setValue={setValue}
                                    setItems={setItems}
                                    searchable={true}
                                    searchPlaceholder='Buscar Categoria'
                                />


                            <Text style={styles.textInpu}>Estado</Text>
                            <TextInput style={styles.inputs} onChangeText={newText=>setestado(newText)} defaultValue={''+Estado} ></TextInput>
                        
                            
                            <View style={styles.contenedorimagen}>
                                <View style={styles.selecImg}>
                                    <Image style={styles.img} source={{uri:SelectImage}}></Image>
                                </View>

                                <View style={styles.botonimagen}>
                                    <Button style={styles.botonesimg} title = "Seleccionar Imagen"  
                                        onPress={async()=>{ await openImagePicker()}}
                                    />
                                </View>
                            </View>
                        <Pressable style={styles.contenedorbotoncrear} onPress={ async () =>{ 
                                          await ModificarProducto(); 
                                          await changeImage();
                                          setVisibleModificar(true);
                                        }}>
                            
                                <Text style={styles.textButton}>Modificar Producto</Text>
                            
                            </Pressable>
                            
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
    marginBottom: '12%',
    marginTop: '5%',
    paddingBottom:'8%'
},
keyboarStyle: {
    flex: 1
},
containerPri: {
    flex:1,
    backgroundColor: '#fff',
    flexDirection:'column',
    paddingTop:12
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
    alignItems:'center',
    //height: '50%',
    //width: '50%',
    flex:1
},
img:{
    height: 90,
    width: 90,
}, 
contentContainer:{
    flex: 1,
    backgroundColor: '#fff'
},
contenedorimagen:{
    flex: 1,
    flexDirection: 'row',
    justifyContent:'space-between',
    marginTop: '5%',
    borderTopColor:'#9C9C9C',
    borderTopWidth: 1,
    paddingTop: 10,
    borderBottomColor:'#9C9C9C',
    borderBottomWidth: 1,
    paddingBottom: 10
    
},
botonimagen:{
    justifyContent:'center',
    alignItems:'center',
    flex:1,
    width: '50%',
},
botonesimg:{
    flex:1/2,
},
contenedorbotoncrear:{
    flex:1, 
    alignItems:'center',
    marginTop: 20,
    paddingBottom: 10,
    backgroundColor: '#2A67CA',
    borderRadius: 10,
    marginLeft: '20%',
    marginRight: '20%',
    justifyContent: 'center',
    paddingTop: '3%',
    marginBottom: '5%',
    height: '100%',
    paddingBottom: '3%'

},
botonescrear:{
    flex:1,
},
containerPmodalModificar: {
    flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'rgba(0, 0, 0, 0.5)'
  },
  conatinerInfoModalModificar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: '5%'
  },
  pressabelStyleModalModificar: {
    marginTop: '8%',
    paddingLeft: '20%',
    paddingRight:'20%',
    backgroundColor: '#3EA5DB',
    paddingBottom:'4%',
    borderRadius: 10
  },
  textbotonModalModificar: {
    color: '#fff',
    marginTop: '6%'
  },
  textmessagemodalModificar: {
    color:'green',
    marginTop: '1%',
  }
});