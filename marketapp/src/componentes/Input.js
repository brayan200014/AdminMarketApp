import React from 'react';
import { View, Image, StyleSheet, Dimensions, TextInput } from 'react-native';

const { width, height } = Dimensions.get('window');

const Input = ({ placeholder, icon, password, ...rest }) => (
    <View style={styles.container}>
    <View style={styles.icon}>
    <Image source={icon}/>
    </View>
        <TextInput 
        style={styles.input}
        secureTextEntry={password}
        placeholder={placeholder}
        ></TextInput>
    </View>
);

const styles = StyleSheet.create({
    container: {
        width: width -60,
        height: 45,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    icon: {
        paddingLeft:20 
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderColor: '#FFFFFF',
        color: '#727C8E',
        fontFamily: 'Nunito-SemiBold',
        fontWeight: '500',
        fontSize: 12,
        paddingLeft: 15
    }
});
export default Input;