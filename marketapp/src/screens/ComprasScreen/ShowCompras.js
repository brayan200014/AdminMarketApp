import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, SafeAreaView, Pressable, Alert, TextInput, Modal, RefreshControl } from 'react-native';
import { AntDesign, MaterialIcons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import Listavacia from '../../componentes/listaVacia';
import * as React from 'react';


const myTheme = require("../TemaDrop/EstiloDropDown");

DropDownPicker.addTheme("Sucursal", myTheme);
DropDownPicker.setTheme("Sucursal");
DropDownPicker.setLanguage("ES");

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }  

export default function Showcompras({ route, navigation }) {

    var IdEliminar = 0;

    const Item = ({ id, fecha, isv, subtotal, sucursal, user }) => (
        <Pressable  >
            <View style={styles.item}>
                <View style={styles.containerInfo}>
                    <Text style={{ fontWeight: 'bold' }}>Numero Factura: {id}</Text>
                    <Text style={styles.title}>Fecha Factura: {fecha}</Text>
                    <Text style={styles.title}>Impuesto: L.{isv}</Text>
                    <Text style={styles.title}>Subtotal: L.{subtotal}</Text>
                    <Text style={styles.title}>Total: L.{subtotal + isv}</Text>
                </View>
                <View style={styles.containerIconos}>
                    <Pressable onPress={() => navigation.navigate('ES_Compras', { id: id, subtotal: subtotal, isv: isv, nombreSucursal: sucursal, user: user })}>
                        <FontAwesome name="edit" size={24} color="#2a67ca" />
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            IdEliminar = id;
                            Alert.alert("Registro Eliminado","Compra Eliminada exitosamente");
                            console.log(IdEliminar);
                            eliminarCompra();
                            navigation.navigate('ListarCompras');
                        }}
                    >
                        <AntDesign name="delete" size={24} color="red" />
                    </Pressable>

                </View>
            </View>
        </Pressable>
    );

    const [refreshing, setRefreshing] = useState(false);
    const [compras, setcompras] = useState();
    const [filtro, setFiltro] = useState(compras);
    const [buscar, setBuscar] = useState('');
    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'ISV', value: '4' },
        { label: 'Subtotal', value: '3' },
        { label: 'Fecha de Compra', value: '2' },
        { label: 'Numero Factura', value: '1' }
    ])

    const filtroFuncion = (text) => {
        if (text && value == '1') {
            const nuevaData = compras.filter(item => item.IdCompra == text);
            console.log(nuevaData);
            setFiltro(nuevaData);
            setBuscar(text);
        } else if (text && value == '2') {
            const nuevaData = compras.filter(item => item.FechaCompra == text);
            console.log(nuevaData);
            setFiltro(nuevaData);
            setBuscar(text);
        }
        else if (text && value == '3') {
            const nuevaData = compras.filter(item => item.Subtotal== text);
            console.log(nuevaData);
            setFiltro(nuevaData);
            setBuscar(text);
        }
        else if (text && value == '4') {
            const nuevaData = compras.filter(item => item.ISV == text);
            console.log(nuevaData);
            setFiltro(nuevaData);
            setBuscar(text);
        }
        else if (text) {
            const nuevaData = compras.filter(item => item.IdCompra == text);
            console.log(nuevaData);
            setFiltro(nuevaData);
            setBuscar(text);
        }
        else {
            setFiltro(compras);
            setBuscar(text);
        }
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getcompras() //la de ustedes
        wait(500).then(() => setRefreshing(false));
      }, []);
     

    useEffect(async () => {
        var a = await getcompras();
    }, []);

    const getcompras = async () => {

        const solicitud = await fetch(
            'http://192.168.0.10:6001/api/compras/listarComprasJoin',
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
        setFiltro(data);
        setcompras(data);

    }

    const eliminarCompra = async () => {

        const solicitud = await fetch(
            'http://192.168.0.10:6001/api/compras/eliminar?IdCompra=' + IdEliminar,
            {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )

        const json = await solicitud.json();
        console.log(json);

    }

    const renderItem = ({ item }) => (
        <Item id={item.IdCompra} isv={item.ISV} fecha={item.FechaCompra} subtotal={item.Subtotal} sucursal={item.NombreSucursal} user={item.NombreUsuario} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <Modal transparent={true}
                animationType={'fade'}
                visible={visible}
            >
                <View style={styles.containerPmodalModificar}>
                    <View style={styles.conatinerInfoModalModificar}>

                        <DropDownPicker

                            theme='Sucursal'
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            placeholder={'Seleccione un filtro'}
                        />
                        <Pressable style={styles.pressabelStyleModalModificar} onPress={() => {
                            setVisible(false);

                        }}>
                            <Text style={styles.textbotonModalModificar}>Seleccionar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <View style={styles.containerFiltro}>
                <TextInput style={styles.inputFilter}
                    placeholder='Buscar Compra'
                    onChangeText={(text) => filtroFuncion(text)}
                    value={buscar}
                ></TextInput>
                <Pressable style={styles.pressableIconFilter} onPress={async () => {
                    navigation.navigate('AddCompra');
                    //Arreglos en AsyncStorage
                    await AsyncStorage.setItem('Id', []);
                    await AsyncStorage.setItem('Cantidad', []);
                    await AsyncStorage.setItem('Precio', []);
                }}>
                    <MaterialCommunityIcons name="checkerboard-plus" size={30} color="black" />
                </Pressable>
                <Pressable style={styles.pressableIconFilter} onPress={() => setVisible(true)}>
                    <MaterialCommunityIcons name="filter-plus-outline" size={30} color="black" />
                </Pressable>
            </View>
            <View style={styles.containerFlat}>
                <FlatList
                    data={filtro}
                    renderItem={renderItem}
                    keyExtractor={item => item.IdVenta}
                    ListEmptyComponent={Listavacia}
                    refreshControl={
                        <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                      />
                      }
      
                >
                </FlatList>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        marginBottom: '15%',
        backgroundColor: '#fff'
    },
    containerFiltro: {
        flex: 5 / 32,
        flexDirection: 'row'
    },
    pressableIconFilter: {
        flex: 5 / 32,
        marginTop: '6%'
    },
    containerFlat: {
        flex: 1,
        height: '80%',
        backgroundColor: '#fff'
    },
    item: {
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',

    },
    containerInfo: {
        flex: 2,
        flexDirection: 'column',

    },
    containerIconos: {
        flex: 1 / 2,
        flexDirection: 'row',
        width: '70%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputFilter: {
        flex: 1,
        backgroundColor: '#fff',
        margin: '5%',
        borderRadius: 10,
        borderColor: '#2A67CA',
        borderWidth: 2,
        paddingLeft: 5
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
        padding: '5%',
        width: '80%'
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