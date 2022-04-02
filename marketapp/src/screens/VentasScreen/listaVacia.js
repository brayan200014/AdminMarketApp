import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image} from 'react-native';

export default function Listavacia({ navigation }) {
  return (
    <View style={styles.container}>
     
      <Image 
                style={styles.imagen}
                source={require('../../img/empty2.png')}
             ></Image>
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
    
    
},
});