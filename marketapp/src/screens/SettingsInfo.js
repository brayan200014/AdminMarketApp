import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Pressable } from 'react-native';

export default function Settings({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Aqui 
          va info app y boton de logout
          mas que todo diseño
      </Text>

      <Pressable onPress={()=> navigation.navigate('Login')}>
        <Text>  presione aqui para salir
          Logout</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});