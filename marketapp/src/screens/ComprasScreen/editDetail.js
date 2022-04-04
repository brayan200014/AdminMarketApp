import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import {
    SafeAreaView, StyleSheet, Text, View, TextInput, KeyboardAvoidingView,
    Modal, Keyboard, TouchableWithoutFeedback, Pressable, FlatList, Image, ScrollView
} from 'react-native';
import Button from '../../componentes/Button';
import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign } from '@expo/vector-icons';

const myTheme = require("../TemaDrop/EstiloDropDown");

DropDownPicker.addTheme("Sucursal", myTheme);
DropDownPicker.setTheme("Sucursal");
DropDownPicker.setLanguage("ES");

export default function EditDetail({ route, navigation }) {

    const { id, productoId, precio, cantidad } = route.params;
    const [open, setOpen] = useState(false);
    const [valueProducto, setValueProducto] = useState(productoId);
    const [itemsProductos, setItemsProductos] = useState([]);
    const [nombreProducto, setNombreProducto] = useState([]);
    const [price, setPrice] = useState(precio);
    const [cant, setCant] = useState(cantidad);

    useEffect(async () => {
        var p = await getProductos();
        var g = await getnombreProducto();
    }, []);

    const getProductos = async () => {

        const solicitud = await fetch(
            'http://192.168.0.10:6001/api/productos/listarproductos',
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

    const modificarDetalle = async () => {
        console.log(id + " " + valueProducto + " " + cant + " " + price);

        const solicitud = await fetch(
            'http://192.168.0.10:6001/api/compras/modificarDetalle?Compras_IdCompra=' + id + '&Productos_IdProducto=' + valueProducto,
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Cantidad: cant,
                    PrecioCompra: price
                })
            }
        )

        const respuesta = await solicitud.json();
        console.log(respuesta);
    }

    const getnombreProducto = async () => {
        const solicitud = await fetch(
            'http://192.168.0.10:6001/api/productos/listarproducto?id=' + productoId,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )

        const respuesta = await solicitud.json();
        const data = respuesta.data;
        console.log(data.NombreProducto);
        setNombreProducto(data.NombreProducto);
    }

    return (

        <SafeAreaView style={styles.safeView}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboarStyle}  >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.containerInput}>
                        <View style={styles.containerPri}>
                            <Text style={styles.textTittle}>Editar Detalle de Compra</Text>
                            <Text style={styles.textInpu}>Numero Factura</Text>
                            <TextInput style={styles.inputs} editable={false} placeholder='Numero Factura' defaultValue={'' + id} value={id}></TextInput>
                            <Text style={styles.textInpu}>Producto</Text>
                            <DropDownPicker
                                schema={{
                                    label: 'NombreProducto',
                                    value: 'IdProducto'
                                }}
                                disabled={true}
                                zIndex={1000}
                                zIndexInverse={3000}
                                theme='Sucursal'
                                open={open}
                                value={valueProducto}
                                items={itemsProductos}
                                setOpen={setOpen}
                                setValue={setValueProducto}
                                setItems={setItemsProductos}
                                placeholder={nombreProducto}
                                searchable={true}
                                searchPlaceholder='BuscarProducto'
                                onSelect={console.log(valueProducto)}
                            />
                            <Text style={styles.textInpu}>Cantidad</Text>
                            <TextInput style={styles.inputs} editable={true} placeholder='Cantidad' defaultValue={'' + cantidad} value={cantidad} onChangeText={text => setCant(text)}></TextInput>
                            <Text style={styles.textInpu}>Precio de Compra</Text>
                            <TextInput style={styles.inputs} editable={true} placeholder='Precio de Compra' defaultValue={'' + precio} value={precio} onChangeText={text => setPrice(text)}></TextInput>
                            <View style={styles.containerBotones}>
                                <Pressable style={styles.buttonModificar} onPress={async () => {
                                    await modificarDetalle();
                                    navigation.navigate('Modulos');
                                }}>
                                    <Text style={styles.textButton}>Modificar</Text>
                                </Pressable>
                            </View>

                        </View>
                    </View>

                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

        </SafeAreaView>


    );

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