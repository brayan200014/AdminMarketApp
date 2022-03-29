import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const Button= ({
    text, onPress, ...params
}) => (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        width:315,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 6,
        backgroundColor: '#2A67CA'
    },
    text: {
        fontFamily:'CircularStdBold',
        color:'#FFFFFF',
        fontSize: 16,
        textAlign: 'center'
    }
});

export default Button;