import React from 'react'
import { Image, StyleSheet } from 'react-native'

const LogoSignUp = () => (
  <Image source={require('../assets/logosignup.jpg')} style={styles.image} />
)

const styles = StyleSheet.create({
    image: {
    width: 300,
    height: 225,
    marginTop: 20,
    borderRadius: 10,
  },
})

export default LogoSignUp;
