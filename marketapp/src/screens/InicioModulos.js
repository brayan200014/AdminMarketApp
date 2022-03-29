import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Pressable,Image, TextInput } from 'react-native';

export default function Modulos({ navigation }) {
  return (
    <View style={styles.containerPrincipal} >


            <View style={styles.containerTitulo}>
              <View style={styles.containerBack}>
                <Pressable>
                  <Image 
                      style={styles.imagenusuario}
                      source={require('../img/usuario.png')}
                  ></Image></Pressable>
                <Text style={styles.textCarrito}>Hola Josue,</Text>
                <Text style={styles.textCarrito}>Bienvenido</Text>
              </View>
           </View>
           <View style={styles.contenedorbuscar}>
              <TextInput
                placeholder="Que desea comprar"
                style={styles.entradas}>
              </TextInput>
            </View>
            <Text>Aqui iran los modulos</Text>
            <Pressable onPress={() => navigation.navigate('Opciones')}>
              <Text>Prueba ir Opciones  Click</Text>
            </Pressable>
           </View>
  );
}

const styles = StyleSheet.create({
  containerPrincipal: {
    width: '100%',
    height: '25%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-0%'
},
containerTitulo : {

backgroundColor: '#3EA5DB',
alignItems: 'flex-start',
flexDirection: 'row',
height: 80,
width: '100%',
marginTop: '0%'
},
containerBack: {
backgroundColor: '#3EA5DB', 
alignItems: 'flex-start',
height: '100%',
alignItems: 'center',
justifyContent: 'center',
marginLeft: '6%',
flexDirection: 'row',
marginTop:'5%'

},
textCarrito:{
  fontSize: 20,
  color: '#fff',
  paddingHorizontal: '1%'
  
},
imagenusuario: {
  margin: 3,
  width: 50,
  height: 50
},
contenedorbuscar:{
backgroundColor: '#3EA5DB',
alignItems: 'flex-start',
flexDirection: 'row',
height: 80,
width: '100%',
borderBottomLeftRadius: 20,
borderBottomRightRadius: 20,
marginTop: '0%'
},
entradas:{
  flex:1,
  alignItems:"stretch",
  margin:10,
  padding:10,
  fontSize: 20,
  fontWeight:"400",
  color: "#495057",
  backgroundColor:"#fff",
  borderWidth:1,
  borderStyle:"solid",
  borderColor: "#ced4da",
  borderRadius: 15,
  textAlign:'center'
},
});