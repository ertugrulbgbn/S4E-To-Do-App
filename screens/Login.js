import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Alert, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const hiddenPasswordImage = require('../assets/images/hidden.png'); 
const showPasswordImage = require('../assets/images/show.png'); 
const googleImage = require('../assets/images/google.png');
const linkedinImage = require('../assets/images/linkedins.png');
const topLeftImage = require('../assets/images/s4el.png'); 

const users = [
  { email: 'ertugrulbagbancii@gmail.com', username: 'Ertugrul', password: 'ertu1234' }, 
  { email: 'alieren@gmail.com', username: 'Ali Eren', password: 'ali1234' },  
  { email: 's210444022@stu.thk.edu.tr', username: '210444022', password: '1234' }
];

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  const handleSignup = () => {
    navigation.navigate('SignUp');
  };

  const handleForgetPassword = () => {
    navigation.navigate('Forget');
  };

  const handleLogin = () => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      navigation.navigate('Dashboard', { username: user.username });
    } else {
      Alert.alert('Login Failed', 'Invalid Login');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const keyboardDidShow = (event) => {
    const keyboardHeight = event.endCoordinates.height;
    const windowHeight = Dimensions.get('window').height;
    const offset = windowHeight - keyboardHeight;
    setKeyboardOffset(offset);
  };

  const keyboardDidHide = () => {
    setKeyboardOffset(0);
  };

  useFocusEffect(
    useCallback(() => {
      setEmail('');
      setPassword('');
    }, [])
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={[styles.scrollView, { paddingBottom: keyboardOffset }]}
        keyboardShouldPersistTaps="handled"
      > 
        <Image source={topLeftImage} style={styles.topLeftImage} />

        <Text style={styles.signInText}>Sign In</Text> 
        <Text style={styles.signUpText}>
          Don't have an account? <Text style={styles.signUpLink} onPress={handleSignup}>Sign Up</Text>
        </Text>

        <View style={styles.emailContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Email Address"
            value={email}
            onChangeText={(text) => setEmail(text)}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  signInText: {
    fontSize: 25,
    marginBottom: -5,
    marginTop: 40,
    fontFamily: 'CustomFont-SemiBold',
    alignSelf: 'flex-start',
    marginLeft: 24, 
  },
  textInput: {
    backgroundColor: '#fff',
    height: 50,
    width: '100%', 
    borderColor: '#d3dade',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    fontFamily: 'CustomFont-Light',
  },
  emailContainer: {
    width: '88%', 
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '88%',
    borderColor: '#d3dade',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
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
    width: '88%',
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    fontFamily: 'CustomFont-Light',
    marginTop: 14,
    marginBottom: 20,
    color: '#121e2a',
    textDecorationLine: 'underline',
  },
  loginButton: {
    color: '#ffffff',
    fontFamily: 'CustomFont-Bold',
    fontSize: 16,
    paddingVertical: 15,
    textAlign: 'center',
  },
  loginButtonContainer: {
    marginTop: 4,
    width: '88%',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 1,
    backgroundColor: '#121e2a',
  },
  socialImage: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  loginGoogleButton: {
    color: '#121e2a',
    fontFamily: 'CustomFont-Bold',
    fontSize: 16,
    paddingVertical: 15,
    textAlign: 'center',
  },
  loginGoogleButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    width: '88%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    borderColor: '#d3dade',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  loginLinkedinButton: {
    color: '#121e2a',
    fontFamily: 'CustomFont-Bold',
    fontSize: 16,
    paddingVertical: 15,
    textAlign: 'center',
  },
  loginLinkedinButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    width: '88%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    borderColor: '#d3dade',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  signUpText: {
    fontFamily: 'CustomFont-Light',
    marginTop: 20,
    fontSize: 14,
    alignSelf: 'flex-start',
    marginLeft: 24, 
  },
  signUpLink: {
    fontFamily: 'CustomFont-SemiBold', 
  },
  topLeftImage: {
    position: 'absolute',
    top: 30,
    left: 50,
    width: 125,
    height: 125,
    resizeMode: 'contain',
  },
});
