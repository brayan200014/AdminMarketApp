import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import Nav from "../Navigators/Nav"

export default function Root({ navigation }) {

    return (
      <Nav></Nav>
    );
}