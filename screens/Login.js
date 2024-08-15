import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const hiddenPasswordImage = require('../assets/images/hidden.png');
const showPasswordImage = require('../assets/images/show.png');
const googleImage = require('../assets/images/google.png');
const linkedinImage = require('../assets/images/linkedins.png');
const topLeftImage = require('../assets/images/s4es.png');

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleForgetPassword = () => {
    navigation.navigate('Forget');
  };

  const checkPasswordValidity = (password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    return null;
  };

  const handleLogin = () => {
    const checkPassword = checkPasswordValidity(password);
    if (!checkPassword) {
      // Mocking a successful login response
      Alert.alert('Login Successful', 'You have logged in successfully!');
      navigation.replace('Main');
    } else {
      Alert.alert('Invalid Password', checkPassword);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useFocusEffect(
    useCallback(() => {
      setEmail('');
      setPassword('');
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.scrollView}>
        <Image source={topLeftImage} style={styles.topLeftImage} />

        <Text style={styles.signInText}>Sign In</Text>

        <View style={styles.emailContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            selectionColor="#637381"
          />
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            selectionColor="#637381"
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.showPasswordButton}>
            <Image source={showPassword ? showPasswordImage : hiddenPasswordImage} style={styles.passwordImage} />
          </TouchableOpacity>
        </View>

        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity onPress={handleForgetPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleLogin} style={styles.loginButtonContainer}>
          <Text style={styles.loginButton}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogin} style={styles.loginGoogleButtonContainer}>
          <Image source={googleImage} style={styles.socialImage} />
          <Text style={styles.loginGoogleButton}>Login With Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogin} style={styles.loginLinkedinButtonContainer}>
          <Image source={linkedinImage} style={styles.socialImage} />
          <Text style={styles.loginLinkedinButton}>Login With LinkedIn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  signInText: {
    position: 'absolute',
    top: 255,
    left: 45,
    fontSize: 25,
    marginBottom: 0,
    fontFamily: 'CustomFont-SemiBold',
    alignSelf: 'flex-start',
  },
  emailContainer: {
    position: 'absolute',
    top: 305,
    width: '88%',
    marginLeft: 20, 
  },
  textInput: {
    backgroundColor: '#fff',
    height: 50,
    width: '100%',
    borderColor: '#d3dade',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 10,
    fontFamily: 'CustomFont-Light',
  },
  passwordContainer: {
    position: 'absolute',
    top: 375,
    flexDirection: 'row',
    alignItems: 'center',
    width: '88%',
    borderColor: '#d3dade',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginLeft: 20, 
  },
  passwordInput: {
    fontFamily: 'CustomFont-Light',
    flex: 1,
    height: 50,
  },
  showPasswordButton: {
    padding: 10,
  },
  passwordImage: {
    width: 20,
    height: 20,
    tintColor: '#637381',
  },
  forgotPasswordContainer: {
    position: 'absolute',
    top: 430,
    width: '88%',
    alignItems: 'flex-end',
    marginLeft: 20, 
  },
  forgotPasswordText: {
    fontFamily: 'CustomFont-Light',
    marginTop: 14,
    marginBottom: 20,
    color: '#121e2a',
    textDecorationLine: 'underline',
  },
  loginButtonContainer: {
    position: 'absolute',
    top: 480,
    width: '88%',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 1,
    backgroundColor: '#121e2a',
    marginLeft: 20,
  },
  loginButton: {
    color: '#ffffff',
    fontFamily: 'CustomFont-Bold',
    fontSize: 16,
    paddingVertical: 15,
    textAlign: 'center',
  },
  loginGoogleButtonContainer: {
    position: 'absolute',
    top: 550,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '88%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    borderColor: '#d3dade',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginLeft: 20,
  },
  loginGoogleButton: {
    color: '#121e2a',
    fontFamily: 'CustomFont-Bold',
    fontSize: 16,
    paddingVertical: 15,
    textAlign: 'center',
  },
  loginLinkedinButtonContainer: {
    position: 'absolute',
    top: 620,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '88%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    borderColor: '#d3dade',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginLeft: 20,
  },
  loginLinkedinButton: {
    color: '#121e2a',
    fontFamily: 'CustomFont-Bold',
    fontSize: 16,
    paddingVertical: 15,
    textAlign: 'center',
  },
  socialImage: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  topLeftImage: {
    position: 'absolute',
    top: 30,
    left: 50,
    width: 128,
    height: 128,
    resizeMode: 'contain',
    alignSelf: 'flex-start',
  },
});
