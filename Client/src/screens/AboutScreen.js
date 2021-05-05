import React from 'react'
import {Text,View,StyleSheet, Image, ImageBackground} from 'react-native';
import imageAVT from '../assets/avatar.jpg';
import gradientBackground from '../assets/gradientbackground.png'
import info from '../assets/info.png';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AboutScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Info Developer</Text> 
            <ImageBackground source={gradientBackground} style={{width:365, height:150,marginTop:100,position:'absolute'}}>
            <View style={{width:365,height:100,position:'absolute',marginTop:115}}>
                <MaterialCommunityIcons name="gmail" color={'#2AB7CA'} style={{marginLeft:145}}>
                    <Text style={{marginLeft:170,color:'#FFFFFF'}}>Gmail : jungleologyphong@gmail.com</Text>
                </MaterialCommunityIcons>
                <MaterialCommunityIcons name="facebook" color={'#2AB7CA'} style={{marginLeft:145,marginTop:5}}>
                    <Text style={{marginLeft:170,color:'#FFFFFF'}}>Facebook : fb.com/nhatphong.faker/</Text>
                </MaterialCommunityIcons>
            </View>
                <View style={{flexDirection: 'row'}}>
                <Image source={imageAVT} style={{height:150,width:150, borderRadius:100, marginLeft:1,borderWidth:3,borderColor:"red",position:'relative',top:0}}/>
                    <View style={{flexDirection:'column'}}>
                        <Text style={styles.textfullname}>Duong Tan Nhat Phong</Text>
                        <Text style={styles.textStudentCode}>Student Code : PS11601</Text>
                        <Text style={{marginTop:10,marginLeft:65,fontSize:20,color:'#FFFFFF'}}>Contact :</Text>
                    </View>
                </View>
            </ImageBackground>
            <View>
                <ImageBackground source={info} style={{width:365, height:450,marginTop:162.5}}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    textTitle:{
        marginTop:50,
        fontSize: 35,
    },
    textfullname: {
        fontSize: 20,
        marginLeft:10,
        marginTop:25,
        color:'#FFFFFF'
    },
    textStudentCode: {
        fontSize: 20,
        marginLeft:10,
        marginTop:10,
        color:'#FFFFFF'
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
})

export default AboutScreen;