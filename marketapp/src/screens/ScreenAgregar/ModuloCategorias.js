import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList,TextInput,TouchableOpacity,Button,ScrollView, Pressable, Alert } from 'react-native';
import axios from 'axios' //npm i axios
import ItemCiudad from '../../componentes/ItemsCiudad'
import ItemCategoria from '../../componentes/itemsCategoria';
import InputCiudad from '../../componentes/InputCiudad';

export default function Categorias({navigation }) {
    const [listaCategoria, setListaCategoria] = useState([])
    const [NombreCategoria,setNombreCategoria]= useState('')
    const [IdCategoria,setId]= useState('')
    const [bandera, setBandera] = useState(false) 
    
    useEffect(() => {
        getCategoria()
    }, [])

    const getCategoria = async () => {
        try {
        const respuesta = await axios.get('http://192.168.0.10:6001/api/categorias/listarCategorias')
        console.log(respuesta.data)
        setListaCategoria(respuesta.data)
    } catch (error) {
            console.log(error)
    }}

    const agregarCategoria = async()=>{
        const obj = {NombreCategoria}
        if(!NombreCategoria) {
            alert("Por favor llene los datos");
        }
        else{
            try {
        const respuesta = await axios.post('http://192.168.0.10:6001/api/categorias/guardar', obj)
        alert("Categoria agregada")
        getCategoria()
        setNombreCategoria('')
        } catch (error) {
            console.log(error)
        }
        }}

  const eliminarCategoria = async (props) => {
    const Nombre = props.Nombre
    try {
      const respuesta = await axios.delete('http://192.168.0.10:6001/api/categorias/eliminar?NombreCategoria=' + Nombre)
      alert(respuesta.data)
      getCategoria()
    } catch (error) {
      console.log(error)
    }
  }

  const getCategorias = async(props) => {
    const ID = props.ID
    const Nombre = props.Nombre
    const respuesta = await axios.get('http://192.168.0.10:6001/api/categorias/listarCategorias?IdCategoria='+ID)
    console.log(respuesta.data)
    setId(ID)
    setNombreCategoria(Nombre)
    setBandera(!bandera)
  } 

  const updateCategoria = async () => {
    const obj = { IdCategoria, NombreCategoria }
    if (!NombreCategoria) {
      alert("Por favor llene los datos");
    }
    else {
      try {
        const respuesta = await axios.put('http://192.168.0.10:6001/api/categorias/modificar?IdCategoria=', obj)
        alert(respuesta.data)
        console.log(obj)
        setNombreCategoria('')
        setId('')
        setBandera(false)
        getCategoria()

      } catch (error) {
        console.log(error)

      }
    }
  } 

  const addOrUpdate = () => {
    {bandera? updateCategoria() : agregarCategoria() }
   }


    const renderItem = ({ item }) => (
        <ItemCategoria
            ID={item.ID}
            Nombre={item.Nombre}
            mypress={eliminarCategoria}
            getCategorias={getCategorias}
            
        />)
    return (
      <View style={styles.container}>
        <Text style={styles.Titulo}>Categorias</Text>
        <View style={styles.contenedor2}>
          <InputCiudad texto={"Ingrese categoria"} valor={NombreCategoria} campo={e => setNombreCategoria(e)} />
          <TouchableOpacity
            style={styles.guardarB}
            onPress={addOrUpdate}>
          <Text style={styles.textbotton}>{bandera? "Editar":"Guardar"}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10 }} >
          <Text style={{ fontWeight: 'bold', color: '#0E69E5', fontSize: 20 }}>
            Categorias registradas
          </Text>
        </View>
        <ScrollView horizontal={true}>
          <View>
            <FlatList
              style={{ marginTop: -5 }}
              data={listaCategoria}
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
