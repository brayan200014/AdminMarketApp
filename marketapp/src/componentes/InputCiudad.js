import React from 'react'
import {StyleSheet, TextInput} from 'react-native'

 const InputCiudad =(props) =>
       <TextInput  
            placeholder={props.texto} 
            style={styles.input}
            onChangeText={props.campo}
            value={props.valor}>
       </TextInput>
                               
const styles = StyleSheet.create({
    input:{
        textAlign:'center',
        borderBottomWidth:1,
        width:300,
        height:50,
        fontSize:18,
        marginVertical:10
     },

});

export default InputCiudad;