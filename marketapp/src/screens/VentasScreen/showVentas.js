import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, SafeAreaView, Pressable, Alert } from 'react-native';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 

export default function Showventas({ route, navigation }) {
  const Item = ({ id, fecha, isv, subtotal }) => (
    <Pressable  >
        <View style={styles.item}>
          <View style={styles.containerInfo}>
                 <Text style={{fontWeight: 'bold'}}>Numero Factura: {id}</Text>
                 <Text style={styles.title}>Fecha Factura: {fecha}</Text>
                 <Text style={styles.title}>Impuesto: L.{isv}</Text>
                 <Text style={styles.title}>Subtotal: L.{subtotal}</Text>
                 <Text style={styles.title}>Total: L.{subtotal+isv}</Text>
          </View>
          <View style={styles.containerIconos}>
               <Pressable onPress={() => navigation.navigate('ES_Ventas', {id: id, subtotal: subtotal, isv:isv})}>
                      <FontAwesome name="edit" size={24} color="#2a67ca" />
                 </Pressable> 
                 <Pressable>
                       <AntDesign name="delete" size={24} color="red"/>
                 </Pressable> 
                
          </View>
        </View>
      </Pressable>
    );
  
    const [ventas, setVentas]= useState();

    useEffect(async()=>{
      var a = await  getVentas();
    }, []);

  const getVentas= async () => {
   
    const solicitud= await fetch(
      'http://192.168.0.10:6001/api/ventas/listar',
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
    setVentas(data);
     
    
}



    
    const renderItem = ({ item }) => (
      <Item id={item.IdVenta} isv={item.ISV} fecha={item.FechaVenta} subtotal={item.Subtotal} />
    );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerFlat}>
         <FlatList
            data={ventas}
            renderItem={renderItem}
            keyExtractor={item=>item.IdVenta}
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
    marginBottom: '15%'
  },
  containerFlat: {
    flex:1,
    height:'80%',
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
    flex:2, 
    flexDirection: 'column',
    
  },
  containerIconos: {
    flex:1/2,
    flexDirection:'row',
    width: '70%',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});