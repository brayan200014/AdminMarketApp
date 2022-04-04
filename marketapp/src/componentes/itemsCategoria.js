import React from 'react'
import {StyleSheet,Text, View, TouchableOpacity} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
const ItemCategoria = (props) => (

    <View style={styles.vista}>
         <Text style={{color:'#01060E', fontWeight:'bold',fontSize:15}} >
            {props.ID}
       </Text> 
       <Text style={{color:'#0E5CBF',fontSize:15}} >
            {props.Nombre}
       </Text> 
       <View style={{flexDirection:'row-reverse'}}>
       <TouchableOpacity  style={{marginHorizontal:10}}
            onPress={props.getCategorias.bind(this, props)}>                                
         <Ionicons name="md-create" size={25} color="#07C71F" />
      </TouchableOpacity>
      
       <TouchableOpacity 
       onPress={props.mypress.bind(this, props)}>
         <Ionicons name="md-trash" size={25} color="#F1113D" />
      </TouchableOpacity>
      </View>
    </View>
);

const styles = StyleSheet.create({
  vista: {
        backgroundColor: "white",
        borderRadius: 35,
        marginVertical:5,
        padding: 25,
        height:80,
        width:350,
        borderWidth:2,
        justifyContent:'center'
      }

});

export default ItemCategoria;