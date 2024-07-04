import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';

import LeftArrowIcon from '../assets/images/leftbeyaz.png'; 
import ShowIcon from '../assets/images/show.png'; 
import HiddenIcon from '../assets/images/hidden.png'; 
import Log19Icon from '../assets/images/log19.png'; 
import RafikiIcon from '../assets/images/rafiki.png';

export default function SignUp({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleSignup = () => {
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('PasswordAgain:', passwordAgain);

    Alert.alert(
      'Sign Up',
      'Maybe later?',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
          style: 'cancel'
        }
      ],
      { cancelable: false }
    );
  };

  const togglePasswordVisibility = () => {     
    setShowPassword(!showPassword);
  };

  const togglePasswordAgainVisibility = () => {
    setShowPasswordAgain(!showPasswordAgain);
  };

  return (
    <View style={styles.container}>
      <Image source={Log19Icon} style={styles.topLeftIcon} />  

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={LeftArrowIcon} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={styles.title}>Sign Up</Text>

      <Image source={RafikiIcon} style={styles.rafikiIcon} />
      <TextInput     
        style={styles.input}
        placeholder="Enter Your Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput   
        style={styles.input}
        placeholder="Enter Your Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          validateEmail(text);
        }}
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <View style={styles.passwordContainer}>
        <TextInput    
          style={styles.passwordInput}
          placeholder="Enter Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.visibilityButton} onPress={togglePasswordVisibility}>
          <Image source={showPassword ? ShowIcon : HiddenIcon} style={styles.visibilityIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter Password Again"
          secureTextEntry={!showPasswordAgain}
          value={passwordAgain}
          onChangeText={setPasswordAgain}
        />
        <TouchableOpacity style={styles.visibilityButton} onPress={togglePasswordAgainVisibility}>
          <Image source={showPasswordAgain ? ShowIcon : HiddenIcon} style={styles.visibilityIcon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.loginPrompt}>
        Already have an account? <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>Login</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f0f4f3',
  },
  topLeftIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 157,
    height: 157,
  },
  backButton: {
    position: 'absolute',
    top: 35,
    left: 15, 
    padding: 10,
  },
  backIcon: {
    width: 23,
    height: 23,
  },
  title: {
    fontSize: 27,
    marginBottom: -40,
    fontFamily: 'CustomFont-Regular',
    alignSelf: 'center',
  },
  rafikiIcon: {
    alignSelf: 'center',
    width: 350,
    height: 350,
    marginBottom: -20,
  },
  input: {
    fontFamily: 'CustomFont-Light',
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 22,
    borderRadius: 30,
    elevation: 1,
  },
  errorText: {
    color: '#50c2c9',
    marginLeft: 16,
    marginBottom: 12,
    marginTop: -17,
    textAlign: 'left', 
    fontFamily: 'CustomFont-Light',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#fff',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: 22,
    elevation: 1,
  },
  passwordInput: {
    fontFamily: 'CustomFont-Light',
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
  },
  visibilityButton: {
    padding: 10,
    marginRight: 10,
  },
  visibilityIcon: {
    width: 20,
    height: 20,
    tintColor: '#50c2c9', 
  },
  signupButton: {
    backgroundColor: '#50c2c9',
    marginTop: 5,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 2,
  },
  signupText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'CustomFont-Regular',
  },
  loginPrompt: {
    marginTop: 20,
    fontSize: 14,
    fontFamily: 'CustomFont-Light',
    textAlign: 'center',
  },
  loginLink: {
    color: '#50c2c9',
  },
});
