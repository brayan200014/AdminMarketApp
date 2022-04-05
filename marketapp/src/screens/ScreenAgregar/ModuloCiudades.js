import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList,TextInput,TouchableOpacity,Button,ScrollView, Pressable, Alert } from 'react-native';
import axios from 'axios' //npm i axios
import ItemCiudad from '../../componentes/ItemsCiudad'
import InputCiudad  from '../../componentes/InputCiudad';
export default function Ciudades({navigation }) {
    const [listaCiudad, setListaCuidad] = useState([])
    const [NombreCiudad,setNombre]= useState('')
    const [IdCiudad,setId]= useState('')
    const [bandera, setBandera] = useState(false) 

    useEffect(() => {
        getCiudad()
    }, [])

    const getCiudad = async () => {
        const respuesta = await axios.get('http://192.168.0.10:6001/api/ciudades/listar')
        //console.log(respuesta.data)
        setListaCuidad(respuesta.data)
    }

    const agregarCiudad = async()=>{
        const obj = {NombreCiudad}
        if(!NombreCiudad) {
            alert("Por favor llene los datos");
        }
        else{
            try {
        const respuesta = await axios.post('http://192.168.0.10:6001/api/ciudades/guardar', obj)
        alert("Ciudad agregada")
        getCiudad()
        setNombre('')
        } catch (error) {
            console.log(error)
        }
        }}

    const eliminarCiudad = async (props) => {
        const Nombre = props.Nombre
        try {
        const respuesta = await axios.delete('http://192.168.0.10:6001/api/ciudades/eliminar?NombreCiudad='+Nombre)

        alert(respuesta.data)
        getCiudad()
      } catch (error) {
          console.log(error)
      }
      }

      const getCiudades = async(props) => {
        const ID = props.ID
        const Nombre = props.Nombre
        const respuesta = await axios.get('http://192.168.0.10:6001/api/ciudades/listar?IdCiudad='+ID)
        console.log(respuesta.data)
        setId(ID)
        setNombre(Nombre)
        setBandera(!bandera)
      } 

  const updateCiudad = async () => {
    const obj = { IdCiudad, NombreCiudad }
    if (!NombreCiudad) {
      alert("Por favor llene los datos");
    }
    else {
      try {
        const respuesta = await axios.put('http://192.168.0.10:6001/api/ciudades/modificar?IdCiudad=', obj)
        alert(respuesta.data)
        console.log(obj)
        setNombre('')
        setId('')
        setBandera(false)
        getCiudad()

      } catch (error) {
        console.log(error)

      }
    }
  } 

      const addOrUpdate = () => {
        {bandera? updateCiudad() : agregarCiudad() }
       }

    const renderItem = ({ item }) => (
        <ItemCiudad
            ID={item.ID}
            Nombre={item.Nombre}
            mypress={eliminarCiudad}
            getCiudades={getCiudades}
            
        />)
    return (
      <View style={styles.container}>
        <Text style={styles.Titulo}>Ciudades</Text>
        <View style={styles.contenedor2}>
          <InputCiudad texto={"Ingrese ciudad"} valor={NombreCiudad} campo={e => setNombre(e)} />
          <TouchableOpacity
            style={styles.guardarB}
            onPress={addOrUpdate}>
          <Text style={styles.textbotton}>{bandera? "Editar":"Guardar"}</Text>
          </TouchableOpacity>
        </View>

        
        <View style={{ marginTop: 10,  }} >
          <Text style={{ fontWeight: 'bold', color: '#0E69E5', fontSize: 20 }}>
            Ciudades ingresadas
          </Text>
        </View>
        <ScrollView horizontal={true}>
            <View>
              <FlatList
                style={{ marginTop: -5 }}
                data={listaCiudad}
                renderItem={renderItem}
                keyExtractor={item => item.Nombre}
              />
              <StatusBar style="auto" />
            </View>
            </ScrollView>
            </View>
         
     
);
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:50
  },
  contenedor2:{
    marginTop:10,
    justifyContent:'center',

  },
  Titulo:{
    marginLeft:0,
    marginTop:40,
    fontSize:20,
    fontWeight:'bold',
    color:'#000000',
    backgroundColor:'#FDEDEC',
    height:40,
    width:400,
    textAlign:'center',
    borderWidth:1,
    borderColor:'#000000',
    borderRadius:10
  },
  contenedor:{
    marginTop:100
  },
  input: {
    margin: 15,
    height: 60,
    borderColor: '#0F4B98',
    borderWidth:2
 },
 guardarB: {
    backgroundColor: '#3EA5DB',
    padding: 10,
    margin: 5,
    height: 50,
    width:300,
    borderRadius:10,
    borderColor:'#000000',
    borderWidth:2,
    justifyContent:'center'
 },
 textbotton:{
    color: 'white',
    fontWeight:'bold',
    textAlign:'center'
 },
});
