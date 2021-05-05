import React, { Component, useState,useEffect, useRef } from 'react';
import {ActivityIndicator, View, StyleSheet, BackHandler, Text, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';

const Loading = () => <ActivityIndicator style={styles.loading,styles.container} color="blue" size="large"/>

const MyWeb = (name) => {
  const webviewref = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoFoward, setCanGoFoward] = useState(false);
  const [currentURL, setCurrentURL] = useState('https://en.wikipedia.org/wiki/Poland');

  const backAction = ({navigation}) =>{
    if(canGoBack){
      webviewref.current.goBack();
    }else{
      navigation.goBack();
    }
    return true;
  }

  useEffect(()=>{
    BackHandler.addEventListener('hardwareBackPress',backAction);

    () => BackHandler.removeEventListener('hardwareBackPress',backAction);
  },[canGoBack])

    return (
      <View style={styles.container}>
      <Text>Hello World</Text>
      <WebView
      ref={webviewref}
      startInLoadingState
      renderLoading={Loading}
      source={{uri: 'https://en.wikipedia.org/wiki/'+name}}
      onNavigationStateChange={navState =>{
        setCanGoBack(navState.canGoBack);
        setCanGoFoward(navState.canGoFoward)
        setCurrentURL(navState.currentURL)
      }}/>
      
      </View>
    );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    marginTop:20,
    width:'100%',
    height:'100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading:{
    position:'absolute',
    width:'100%',
    height:'100%',
  }
})

export default MyWeb;