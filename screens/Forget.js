import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const log19Image = require('../assets/images/log19.png');

export default function Forget({ navigation }) {
  const [email, setEmail] = useState('');

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image source={log19Image} style={styles.logoImage} />  
      <Image source={require('../assets/images/resetrafiki.png')} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>Forgot your password?</Text>
      <Text style={styles.title2}>Fill the form to reset your password</Text>
      
      <TextInput 
        style={styles.textInput} 
        placeholder="Email" 
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TouchableOpacity onPress={handleBackToLogin}>
        <Text style={styles.backToLogin}>Return to Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  logoImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 157,
    height: 157,
    resizeMode: 'contain',
  },
  image: {
    width: '100%', 
    height: 260, 
    marginBottom: 20,
  },
  title: {
    fontFamily: 'CustomFont-Regular',
    fontSize: 24,
    marginBottom: 5,
  },
  title2: {
    fontFamily: 'CustomFont-Light',
    fontSize: 14,
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: '#fff' ,
    width: '80%',
    height: 45,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
    elevation: 1,
  },
  backToLogin: {
    fontFamily: 'CustomFont-Light',
    color: '#50c2c9',
    marginTop: 5,
  },
});
