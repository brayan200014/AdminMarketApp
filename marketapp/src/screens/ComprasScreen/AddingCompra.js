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

export default function AddCompra({ navigation }) {

    var subtotal = 0;
    var isv = 0;
    const [fechahoy, setFechaHoy] = useState(null);
    const [itemsSucursales, setItemsSucursales] = useState([]);
    const [open, setOpen] = useState(false);
    const [valueSucursales, setValueSucursales] = useState();
    const [itemsEmpleados, setItemsEmpleados] = useState([]);
    const [openEmpleados, setOpenEmpleados] = useState(false);
    const [valueEmpleados, setValueEmpleados] = useState();
    const [valueProveedores, setValueProveedores] = useState();
    const [openProveedores, setOpenProveedores] = useState(false);
    const [itemsProveedores, setItemsProveedores] = useState([]);

    const getProveedores = async () => {
        const solicitud = await fetch(
            'http://192.168.0.11:6001/api/proveedores/listar',
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
        setItemsProveedores(json);
    }

    const getEmpleados = async () => {
        const solicitud = await fetch(
            'http://192.168.0.11:6001/api/empleados/listarCombo/',
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
        setItemsEmpleados(json);
    }

    const getSucursales = async () => {

        const solicitud = await fetch(
            'http://192.168.0.11:6001/api/sucursales/listar',
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
        setItemsSucursales(json);
    }

    const getDate = async () => {
        const date = new Date();
        var day;
        var month;
        var year;

        if (date.getDate() < 10) {
            day = '0' + date.getDate();
        }
        else {
            day = date.getDate();
        }

        if (month = date.getMonth() + 1 < 10) {
            month = '0' + (date.getMonth() + 1);
        }
        else {
            month = date.getMonth() + 1;
        }

        year = date.getFullYear();


        setFechaHoy(year + "-" + month + "-" + day);

    }

    useEffect(async () => {
        var date = await getDate();
        var sucu = await getSucursales();
        var emp = await getEmpleados();
        var prov = await getProveedores();
    }, []);

    const InsertarCompra = async () => {
        //Obteniendo los arreglos desde el AsyncStorage
        var Id = JSON.parse(await AsyncStorage.getItem('Id'));
        var Cantidad = JSON.parse(await AsyncStorage.getItem('Cantidad'));
        var Precio = JSON.parse(await AsyncStorage.getItem('Precio'));

        console.log(subtotal + " " + isv + " " + fechahoy + " " + valueEmpleados + " " + valueProveedores + " " + valueSucursales);

        if (!valueEmpleados || !valueProveedores || !valueSucursales) {
            Alert.alert("ERROR!", "Por favor, llene los datos completos.");
        }
        else {
            if (Id == null) {
                Alert.alert("ERROR!", "Debe Agregar al menos un Detalle para Agregar la Compra");
            }
            else {
                for (var i = 0; i < Id.length; i++) {
                    subtotal += (Cantidad[i] * Precio[i]);
                }
                isv = subtotal * 0.15;

                const compra = await fetch(
                    'http://192.168.0.11:6001/api/compras/guardar',
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            FechaCompra: fechahoy,
                            Subtotal: subtotal,
                            ISV: isv,
                            Empleados_IdEmpleado: valueEmpleados,
                            Sucursales_IdSucursal: valueSucursales,
                            Proveedores_IdProveedor: valueProveedores
                        })
                    }
                )

                const respuestaCompra = await compra.json();
                console.log(respuestaCompra);

                for (var i = 0; i < Id.length; i++) {

                    const Detalle = await fetch(
                        'http://192.168.0.11:6001/api/compras/guardarDetalle',
                        {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                Cantidad: Cantidad[i],
                                PrecioCompra: Precio[i],
                                Productos_IdProducto: Id[i]
                            })
                        }
                    )

                    const respuestaDetalle = await Detalle.json();
                    console.log(respuestaDetalle);

                }

                Alert.alert("Registro Exitoso", "Compra Ingresada exitosamente");
                navigation.navigate('ListarCompras');
            }
        }

    }



    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.keyboarStyle}  >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.containerInput}>
                            <View style={styles.containerPri}>
                                <Text style={styles.textInpu}>Fecha de Compra</Text>
                                <TextInput style={styles.inputs} editable={false} placeholder='Numero Factura' defaultValue={'' + fechahoy} value={fechahoy}></TextInput>
                                <Text style={styles.textInpu}>Sucursal</Text>
                                <DropDownPicker
                                    schema={{
                                        label: 'NombreSucursal',
                                        value: 'IdSucursal'
                                    }}
                                    zIndex={3000}
                                    zIndexInverse={1000}
                                    theme='Sucursal'
                                    open={open}
                                    value={valueSucursales}
                                    items={itemsSucursales}
                                    setOpen={setOpen}
                                    setValue={setValueSucursales}
                                    setItems={setItemsSucursales}
                                    placeholder={'Seleccionar'}
                                    searchable={true}
                                    searchPlaceholder='Buscar Sucursal'
                                    onSelect={console.log(valueSucursales)}
                                />
                                <Text style={styles.textInpu}>Empleado</Text>
                                <DropDownPicker
                                    schema={{
                                        label: 'Nombre',
                                        value: 'IdEmpleado'
                                    }}
                                    zIndex={2000}
                                    zIndexInverse={2000}
                                    theme='Sucursal'
                                    open={openEmpleados}
                                    value={valueEmpleados}
                                    items={itemsEmpleados}
                                    setOpen={setOpenEmpleados}
                                    setValue={setValueEmpleados}
                                    setItems={setItemsEmpleados}
                                    placeholder={'Seleccionar'}
                                    searchable={true}
                                    searchPlaceholder='Buscar Empleado'
                                    onSelect={console.log(valueEmpleados)}
                                />
                                <Text style={styles.textInpu}>Proveedor</Text>
                                <DropDownPicker
                                    schema={{
                                        label: 'NombreProveedor',
                                        value: 'IdProveedor'
                                    }}
                                    zIndex={1000}
                                    zIndexInverse={3000}
                                    theme='Sucursal'
                                    open={openProveedores}
                                    value={valueProveedores}
                                    items={itemsProveedores}
                                    setOpen={setOpenProveedores}
                                    setValue={setValueProveedores}
                                    setItems={setItemsProveedores}
                                    placeholder={'Seleccionar'}
                                    searchable={true}
                                    searchPlaceholder='Buscar Proveedor'
                                    onSelect={console.log(valueProveedores)}
                                />
                                <View style={styles.containerBotones}>
                                    <Pressable style={styles.buttonModificar} onPress={async () => {
                                        navigation.navigate('AddCompraDetail');
                                    }}>
                                        <Text style={styles.textButton}>Agregar Detalle</Text>
                                    </Pressable>
                                    <Pressable style={styles.buttonDetalle} onPress={async () => { await AsyncStorage.removeItem('Id'); navigation.navigate('ListarCompras') }}>
                                        <Text style={styles.textButton}>Cancelar Compra</Text>
                                    </Pressable>
                                </View>
                                <View style={styles.containerBotones}>
                                    <Pressable style={styles.buttonDetalle} onPress={async () => {
                                        await InsertarCompra();
                                        await AsyncStorage.removeItem('Id');
                                    }}>
                                        <Text style={styles.textButton}>Agregar Compra</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ScrollView>
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
        height: '100%',
        justifyContent: 'center',
        borderRadius: 5
    },
    buttonDetalle: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#2A67CA',
        margin: '5%',
        height: '100%',
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