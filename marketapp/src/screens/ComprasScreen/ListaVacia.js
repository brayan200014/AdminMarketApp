import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image} from 'react-native';

export default function Listavacia({ navigation }) {
  return (
    <View style={styles.container}>
      <Image 
                style={styles.imagen}
                source={require('../../img/content.png')}
             ></Image>
       <Text style={styles.text}>No se encontaron resultados</Text>
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
  imagen: {
    flex:1,
    width: 200,
    height: 200
    
},
text: {
  fontStyle: 'italic', 
  fontSize: 24
}
});
