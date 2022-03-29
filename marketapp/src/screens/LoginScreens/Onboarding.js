import { Text, View, StyleSheet, Image, Dimensions, Alert} from 'react-native'
import React, { Component } from 'react'
import Swiper from 'react-native-swiper';
import Button from '../../componentes/Button';
import * as Font from 'expo-font';

const {width, height} = Dimensions.get('window');

export class Onboarding extends Component {
    constructor(props){
        super(props);
        this.state = {
            slides: [
                {id: 1, image: require('../../../assets/image/background5.png')},
                {id: 2, image: require('../../../assets/image/background6.png')},
                {id: 3, image: require('../../../assets/image/background4.png')},
                {id: 4, image: require('../../../assets/image/background7.png')},
                {id: 5, image: require('../../../assets/image/background3.png')},
                {id: 6, image: require('../../../assets/image/background2.jpg')}
            
            ]
        };
    }

_btnClick = () => {
    Alert.alert('Inicio de Sesión');
}    

  render() {
    return (
      <View style={styles.container}> 
        <Swiper autoplay={true}
            dot={<View style={styles.dot}/>}
            activeDot={<View style={styles.activeDot}/>}
        >
            {this.state.slides.map((slide)=>{
                return (
                    <View key={slide.id} style={styles.slide}>
                        <Image source={slide.image} style={styles.image} />
                    </View>
                )
            })}
        </Swiper>
        <View style={styles.darkLayer}/>
        <View style={styles.logoContainer}>
            <Image source={require('../../../assets/image/logoMarket.png')} style={styles.logo}/>
        </View>
        <View style={styles.textContainer}> 
            <Text style={styles.text}>¡1801-Market donde encuentras los mejores productos y al mejor precio!</Text>
        </View>
        <View style={styles.button}>
            <Button text={'Inicio de Sesión'} 
            onPress={ () => this.props.navigation.navigate('Login')}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    image: {
        width: width,
        height: height
    },
    dot: {
        backgroundColor:'rgba(255,255,255,0.3)',
        width:8,
        height:8,
        borderRadius:8,
        marginLeft: 3,
        marginRight:3
    },
    activeDot: {
        backgroundColor: '#FFFFFF',
        width:8,
        height:8,
        borderRadius:8,
        marginLeft: 3,
        marginRight:3
    },
    logoContainer: {
        width: width,
        position: 'absolute',
        top:70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textContainer: {
        width: 400,
        position: 'absolute',
        bottom: 200,
        left: 10,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    text: {
        fontFamily: 'Nunito-Bold',
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: '600'
    },
    button:{
        width: width,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 81
    },
    darkLayer:{
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: '#000000',
        opacity: 0.4

    
    }
});

export default Onboarding