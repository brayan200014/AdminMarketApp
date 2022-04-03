import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, KeyboardAvoidingView , 
Modal,Keyboard, TouchableWithoutFeedback, Pressable, FlatList,Image, ScrollView} from 'react-native';
import Button from '../../componentes/Button';
import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign } from '@expo/vector-icons'; 

const myTheme = require("../TemaDrop/EstiloDropDown");

DropDownPicker.addTheme("Sucursal", myTheme);
DropDownPicker.setTheme("Sucursal");
DropDownPicker.setLanguage("ES");


  
export default function Edit( {route, navigation}) {




    const { id, subtotal, isv, nombreSucursal, user }= route.params; 
    const [visible, setVisible]= useState(false);
    const [visibleModificar, setVisibleModificar]= useState(false);
    const [detalleVenta, setDetalle]= useState([]);
    const [clientes, setClientes]= useState([]);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [valueClientes, setValueClientes] = useState(null);
    const [valueSucursales, setValueSucursales] = useState(null);
    const [itemsClientes, setItemsClientes] = useState([]);
    const [itemsSucursales, setItemsSucursales] = useState([]);
    const [IdUser, setIdUser]= useState(null); 

    
    
  
   
    useEffect(async()=>{
      var cli= await getClientes(); 
      var sucu= await getSucursales();
        var a = await  getDetalleVentas(); 
       
      }, []);

    const getDetalleVentas= async () => {
   
        const solicitud= await fetch(
          'http://192.168.1.8:6001/api/ventas/listarDetalle?id='+id,
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
        console.log(data);
        setDetalle(data);
         
        
    }

    const getClientes= async () => {
   
      const solicitud= await fetch(
        'http://192.168.0.10:6001/api/cliente/listar',
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
      console.log(json);
      setItemsClientes(json); 
       
      
  }

  const getSucursales= async () => {
   
    const solicitud= await fetch(
      'http://192.168.0.10:6001/api/sucursales/listar',
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
    console.log(json);
    setItemsSucursales(json); 
     
    
}


const modificarVenta= async()=> {

  

  const solicitud= await fetch(
    'http://192.168.1.8:6001/api/ventas/modificar?id='+id,
    {
      method: 'PUT', 
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
            Subtotal: subtotal,
            ISV: isv,
            IdUsuarioCliente: valueClientes,
            IdSucursal: valueSucursales
      })
    }
  )

  const respuesta= await solicitud.json();
  const response= respuesta.msg; 
  console.log(respuesta); 
  
   
}
 

   const flat=() =>{
   
    return detalleVenta.map((item)=> {
        return (
         
          
           <View style={styles.containerProducto}>
           <View style={styles.containerFilaPro}>
           <View style={styles.containerImagen}>
                <Image 
                style={styles.imagen}
                source={{uri: 'http://192.168.0.10:6001/api/archivos/consultar?id='+item.Productos_IdProducto}}
             ></Image>
           </View>
           <View style={styles.containerInfo}>
           <Text style={styles.textProducto}>{"Cantidad: "+item.Cantidad}</Text>
           <Text style={styles.textPrecio}>{"Precio: L "+item.PrecioVenta}</Text>
           <Text style={styles.textPrecio}>{"Total: L "+(item.PrecioVenta*item.Cantidad)}</Text>
           </View>
           </View>
       </View>
      
        )
    })

   }

  

  return (
     
    <SafeAreaView style={styles.safeView}>
       <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
           style={styles.keyboarStyle}  >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.containerInput}>
                <View >
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={visible}
                    >
                        <View style={styles.containerPmodal}>
                            <View style={styles.conatinerInfoModal}>
                                <Text style={styles.textTittle}>Detalle Venta </Text>
                                <View style={styles.containerDetalleModal}>
                                <ScrollView >
                                  {flat()}
                                </ScrollView>
                                <Pressable style={styles.pressabelStyleModal} onPress={()=> setVisible(false)}>
                                    <Text style={styles.textModal}>Cerrar</Text>
                                </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                      <Modal transparent={true}
                            animationType={'fade'}
                            visible={visibleModificar}
                            >
                        <View style={styles.containerPmodalModificar}>
                          <View style={styles.conatinerInfoModalModificar}>
                          <AntDesign name="checkcircle" size={24} color="green" />
                          <Text style={styles.textmessagemodalModificar}>Venta Modificada</Text>
                                  <Pressable style={styles.pressabelStyleModalModificar} onPress={  () => {
                                   setVisibleModificar(false);
                                    navigation.navigate('ListarVentas');
                                  }}>
                                    <Text style={styles.textbotonModalModificar}>Cerrar</Text>
                                  </Pressable>
                          </View> 
                        </View>
                      </Modal>
                </View>
                <View style={styles.containerPri}>
                  <Text style={styles.textTittle}>Editar Venta</Text>
                  <Text style={styles.textInpu}>Numero Factura</Text>
                    <TextInput style={styles.inputs} editable={false} placeholder='Numero Factura'defaultValue={''+id}  value={id}></TextInput>
                    <Text style={styles.textInpu}>Usuario Cliente</Text>  
                    <DropDownPicker
                         schema={{
                          label: 'NombreUsuario',
                          value: 'IdUsuarioCliente'
                        }}
                        zIndex={1000}
                        zIndexInverse={3000}
                        theme='Sucursal'
                        open={open2}
                        value={valueClientes}
                        items={itemsClientes}
                        setOpen={setOpen2}
                        setValue={setValueClientes}
                        setItems={setItemsClientes}
                        placeholder={user}
                        searchable={true}
                        searchPlaceholder='Buscar Cliente'
                      />
                    <Text style={styles.textInpu}>Sucursal</Text> 
                    <DropDownPicker
                        schema={{
                          label: 'Nombre Sucursal',
                          value: 'ID'
                        }}
                        zIndex={1000}
                        zIndexInverse={3000}
                        theme='Sucursal'
                        open={open}
                        value={valueSucursales}
                        items={itemsSucursales}
                        setOpen={setOpen}
                        setValue={setValueSucursales}
                        setItems={setItemsSucursales}
                        placeholder={nombreSucursal}
                        searchable={true}
                        searchPlaceholder='Buscar Sucursal'
                      />
                    <Text style={styles.textInpu}>Total</Text>
                    <TextInput style={styles.inputs} editable={false} placeholder='Total'defaultValue={'L.'+(isv+subtotal)} value={id}></TextInput>
                  <View style={styles.containerBotones}>
                        <Pressable style={styles.buttonModificar} onPress={async ()=> 
                        {
                          setVisibleModificar(true);
                            await modificarVenta();
                           
                        }}>
                                <Text style={styles.textButton}>Modificar</Text>
                            </Pressable>
                            <Pressable style={styles.buttonDetalle} onPress={() => setVisible(true)}>
                                <Text style={styles.textButton}>Ver Detalle</Text>
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
      flex:1,
      backgroundColor: '#fff',
      flexDirection:'column',
  },
  containerInput: {
    flex: 1, 
    flexDirection: 'column'
  },
  safeView:{
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
        flex:1,
        alignItems:'center',
        backgroundColor: '#2A67CA',
        margin: '5%',
        height: '20%',
        justifyContent: 'center',
        borderRadius: 5
  },
  buttonDetalle: {
    flex: 1,
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
  containerBotones: {
      flex: 1,
      flexDirection: 'row',
      marginTop: '10%'
  },
  containerPmodal: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor:'rgba(0, 0, 0, 0.5)'
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
      flex:1,

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
    paddingRight:'20%',
    backgroundColor: '#3EA5DB',
    paddingBottom:'4%',
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: '10%',
    marginRight: '10%',
    
  },
  containerFlat: {
    flex:1,
    height:'80%'
  },
  containerProducto: {
    flex: 2/8, 
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
    flex:1, 
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
    flex:1, 
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    height: '100%',
    paddingLeft: '1%',
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderRightWidth:2,
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
