import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import {AsyncStorage,  useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import NavigatorCruds from '../Navigators/NavigatorCruds'
import SettingsInfo from "../screens/SettingsInfo";


const Tab= createBottomTabNavigator();


const Tabs= () =>{
    return (
        <Tab.Navigator
        screenOptions={{
            tabBarStyle:{
                position: 'absolute',
                    bottom: 0,
                    elevation: 0,
                    backgroundColor: '#3EA5DB',
                    borderTopRightRadius: 40,
                    borderTopLeftRadius: 40,
                    height: 60,
                    alignItems: "center",
                    paddingBottom: 5
            },
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#F7D35C',
            tabBarInactiveTintColor: '#fff',
            headerShown: false
         

        }}
           
                
        >
            <Tab.Screen name="Home" component={NavigatorCruds}
            options={
                {
                   tabBarIcon: ({color, size}) => (
                    <Ionicons name="home" size={size} color={color} />  
                   ),
                }
            
            }> 
            </Tab.Screen>

            <Tab.Screen name="Settings" component={SettingsInfo}  options={
                {
                   tabBarIcon: ({color, size}) => (
                    <Ionicons name="settings" size={24} color={color} />
                   ),
                }
            }
             />
        </Tab.Navigator>
    );
}

const styles= StyleSheet.create({
    badgeStyle: {
            backgroundColor: '#FF3A3A',
            position: 'absolute',
            top: 0,
            right: 0,
            
    }
})

export  default Tabs;