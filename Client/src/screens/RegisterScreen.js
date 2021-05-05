import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import { Text } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/LogoSignUp';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator } from '../validation/emailValidator';
import { passwordValidator } from '../validation/passwordValidator';
import { nameValidator } from '../validation/nameValidator';
import firebaseConfig from '../firebase/firebaseConfig.js';
import * as JounisDAO from '../firebase/DAO.js';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://10.82.141.162:3000";
const socket = socketIOClient(ENDPOINT);

const RegisterScreen = ({navigation}) =>{
    const[name,setName] = useState('');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const onSignUpPressed = async (name,email,password) => {
      // await firebaseConfig
      // .auth().createUserWithEmailAndPassword(email,password).then((user)=>{
      //   console.log('Register success !');
      //   ToastAndroid.show('Register success !',ToastAndroid.SHORT);
      // }).catch((error) => {
      //   const{code, message} = error;
      //   console.log('Error'+message);
      //   ToastAndroid.show('Register Failed',ToastAndroid.SHORT);
      // });
      await socket.emit("register",name,email,password);
      await socket.on("register",(result) =>{ 
        console.log("Register is "+result);
        if(result == true){
            navigation.navigate("LoginScreen");
        }
      });
    };
      return (
        <View style={styles.container}>
          <Logo />
          <TextInput label="Name" returnKeyType="next" value={name} 
                     onChangeText={(text) => setName(text)} 
                     errorText={nameValidator(name)}/>
          <TextInput label="Email" returnKeyType="next" value={email}
                     onChangeText={(text) => setEmail(text)}
            error={!!email.error}
            errorText={emailValidator(email)}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"/>
          <TextInput
            label="Password"
            returnKeyType="done"
            value={password}
            onChangeText={(text) => setPassword(text)}
            errorText={passwordValidator(password)}
            secureTextEntry/>
          <Button mode="contained" onPress={() => {onSignUpPressed(name,email,password);}} style={{ marginTop: 24 }}>Sign Up</Button>
          <View style={styles.row}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding:10,
      justifyContent:'center',
      alignItems:'center'
    },
    row: {
      flexDirection: 'row',
      marginTop: 4,
    },
    link: {
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
});

export default RegisterScreen;
