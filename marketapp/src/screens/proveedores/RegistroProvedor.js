import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput, KeyboardAvoidingView,Modal,Keyboard,Pressable
        ,TouchableWithoutFeedback, Pressable,FlatList,Image,ScrollView} from 'react-native';
import {useState,useEffect} from 'react';

export default function Opciones({ navigation }) {
  
    return (
        <View style={styles.container}>
        <View>
            <TextInput
                style={styles.input} 
                placeholder="Nombre Proveedor"
                placeholderTextColor="black"
            />
            <TextInput 
                style={styles.input}
                placeholder="Email del Proveedor"
                placeholderTextColor="black"
            />
            <TextInput 
                style={styles.input}
                placeholder="Contacto del Proveedor"
                placeholderTextColor="black"
            />
            <TouchableOpacity style={styles.botonmod}>
                <Text style={styles.buttonText}>Modificar</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: -60,
    height: 45,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingTop:150,
  },
  input: {
      width: '200%',
      marginBottom: 7,
      //backgroundColor: 'Blue',
      //fontSize:14,
      borderWidth:1,
      borderColor:'#10ac84',
      height:35,
      color: '#FFFFFF',
      padding: 5,
      textAlign: 'center',
      borderRadius: 5,
      margin:10,
  },
  botonmod:{
      paddingBottom:10,
      paddingTop:10,
      borderRadius:5,
      marginBottom:3,
      backgroundColor: '#10ac84',
      width:'90%',
      textAlign: 'center',
  },
  buttonText:{
      color:'#FFFFFF',
      textAlign:'center',
  }
});