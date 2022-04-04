import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, SafeAreaView, Pressable, Alert, TextInput, Modal, ScrollView, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { AntDesign, MaterialIcons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import Listavacia from './ListaVacia';
import AsyncStorage from '@react-native-async-storage/async-storage';

const myTheme = require("../TemaDrop/EstiloDropDown");

DropDownPicker.addTheme("Sucursal", myTheme);
DropDownPicker.setTheme("Sucursal");
DropDownPicker.setLanguage("ES");

export default function AddingCompraDetail({ navigation }) {

    var bandera = false;
    //Arreglo a pasar
    var Precio = [];
    var Cantidad = [];
    var Id = [];
    //Combo
    const [open, setOpen] = useState(false);
    const [valueProducto, setValueProducto] = useState();
    const [itemsProductos, setItemsProductos] = useState([]);
    //Valores Para ir llenando el arreglo
    const [cant, setCant] = useState();
    const [price, setPrice] = useState();
    var ide;

    const agregarDetalle = async () => {
        ide = valueProducto;
        console.log(ide + " " + cant + " " + price);
        
        if(!ide || !cant || !price){
            Alert.alert("ERROR!", "Por favor, llene los datos completos.");
        }
        else
        {
            if (await AsyncStorage.getItem('Id') == null) {
                Id.push(ide);
                Cantidad.push(parseInt(cant));
                Precio.push(parseInt(price));
    
                await AsyncStorage.setItem('Id', JSON.stringify(Id));
                await AsyncStorage.setItem('Cantidad', JSON.stringify(Cantidad));
                await AsyncStorage.setItem('Precio', JSON.stringify(Precio));
            }
            else {
                //Obteniendo los arreglos desde el AsyncStorage
                Id = JSON.parse(await AsyncStorage.getItem('Id'));
                Cantidad = JSON.parse(await AsyncStorage.getItem('Cantidad'));
                Precio = JSON.parse(await AsyncStorage.getItem('Precio'));
    
                for (var i = 0; i < Id.length; i++) {
                    if (Id[i] == ide) {
                        console.log(i);
                        Cantidad[i] += parseInt(cant);
    
                        bandera = true;
                    }
                }
                console.log(Id.length);
    
                console.log(Id);
                if (bandera == false) {
                    Id.push(ide);
                    Cantidad.push(parseInt(cant));
                    Precio.push(parseInt(price));
                }
    
                await AsyncStorage.setItem('Id', JSON.stringify(Id));
                await AsyncStorage.setItem('Cantidad', JSON.stringify(Cantidad));
                await AsyncStorage.setItem('Precio', JSON.stringify(Precio));
            }

            Alert.alert("Agregado", "Detalle Agregado a la Compra con Exito.");
        }

        console.log(await AsyncStorage.getItem('Id'));
        console.log(await AsyncStorage.getItem('Cantidad'));
        console.log(await AsyncStorage.getItem('Precio'));
    }

    const getProductos = async () => {

        const solicitud = await fetch(
            'http://192.168.0.11:6001/api/productos/listarproductos',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )

        const json = await solicitud.json();
        const data = json.data;
        console.log(json);
        setItemsProductos(data);

    }

    useEffect(async () => {
        var p = await getProductos();
    }, []);

    return (
        <SafeAreaView style={styles.safeView}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboarStyle}  >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.containerInput}>
                        <View style={styles.containerPri}>
                            <Text style={styles.textTittle}>Agregar Detalle de Compra</Text>
                            <Text style={styles.textInpu}>Producto</Text>
                            <DropDownPicker
                                schema={{
                                    label: 'NombreProducto',
                                    value: 'IdProducto'
                                }}
                                zIndex={1000}
                                zIndexInverse={3000}
                                theme='Sucursal'
                                open={open}
                                value={valueProducto}
                                items={itemsProductos}
                                setOpen={setOpen}
                                setValue={setValueProducto}
                                setItems={setItemsProductos}
                                placeholder={"Seleccionar"}
                                searchable={true}
                                searchPlaceholder='BuscarProducto'
                                onSelect={console.log(valueProducto)}
                            />
                            <Text style={styles.textInpu}>Cantidad</Text>
                            <TextInput style={styles.inputs} editable={true} placeholder='Cantidad' defaultValue={''} value={cant} onChangeText={text => setCant(text)}></TextInput>
                            <Text style={styles.textInpu}>Precio de Compra</Text>
                            <TextInput style={styles.inputs} editable={true} placeholder='Precio de Compra' defaultValue={''} value={price} onChangeText={text => setPrice(text)}></TextInput>
                            <View style={styles.containerBotones}>
                                <Pressable style={styles.buttonModificar} onPress={async () => {
                                    agregarDetalle();
                                    navigation.navigate('AddCompra');
                                }}>
                                    <Text style={styles.textButton}>Agregar Detalle</Text>
                                </Pressable>
                                <Pressable style={styles.buttonDetalle} onPress={() => { navigation.navigate('ListarCompras'); }}>
                                    <Text style={styles.textButton}>Cancelar</Text>
                                </Pressable>
                            </View>

                        </View>
                    </View>

                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    keyboarStyle: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    containerPri: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    containerInput: {
        flex: 1,
        flexDirection: 'column'
    },
    safeView: {
        flex: 1,
        height: StatusBar.currentHeight || 0,
        marginBottom: '15%'
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
        marginTop: '3%'
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
    buttonModificar: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#2A67CA',
        margin: '5%',
        height: '20%',
        justifyContent: 'center',
        borderRadius: 5
    },
    buttonDetalle: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#2A67CA',
        margin: '5%',
        height: '20%',
        justifyContent: 'center',
        borderRadius: 5
    },
    textButton: {
        color: 'white'
    },
    containerBotones: {
        flex: 1,
        flexDirection: 'row',
        marginTop: '10%'
    },
    containerPmodal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    conatinerInfoModal: {

        backgroundColor: '#fff',
        borderRadius: 20,
        padding: '5%',
        width: '90%',
        height: '80%',
        borderColor: 'green',
        borderWidth: 1,

    },
    containerDetalleModal: {
        flex: 1,

    },
    item: {
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',


    },
    pressabelStyleModal: {
        marginTop: '8%',
        paddingLeft: '20%',
        paddingRight: '20%',
        backgroundColor: '#3EA5DB',
        paddingBottom: '4%',
        borderRadius: 10,
        alignItems: 'center',
        marginLeft: '10%',
        marginRight: '10%',

    },
    containerFlat: {
        flex: 1,
        height: '80%'
    },
    containerProducto: {
        flex: 2 / 8,
        marginLeft: '4%',
        marginRight: '4%',
        backgroundColor: '#3EA5DB',
        borderRadius: 30,
        marginBottom: '5%',
        flexDirection: 'column',

    },
    containerFilaPro: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: '0%',
        marginBottom: '2%',
        borderRadius: 30,

    },
    containerImagen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f7d35c',
        justifyContent: 'center',
        borderRadius: 30,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        height: '100%',
        marginTop: '0%'
    },
    imagen: {
        margin: 3,
        width: 90,
        height: 90
    },
    containerInfo: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        height: '100%',
        paddingLeft: '1%',
        borderRadius: 30,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        borderRightWidth: 2,
        borderTopWidth: 2,
        borderColor: '#3EA5DB',
        alignItems: 'center',
        justifyContent: 'space-evenly'


    },
    textModal: {
        color: 'white',
        alignItems: 'center',
        marginTop: '5%',
        fontSize: 15
    },


    containerPmodalModificar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
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
        paddingRight: '20%',
        backgroundColor: '#3EA5DB',
        paddingBottom: '4%',
        borderRadius: 10
    },
    textbotonModalModificar: {
        color: '#fff',
        marginTop: '6%'
    },
    textmessagemodalModificar: {
        color: 'green',
        marginTop: '1%',
    }

});