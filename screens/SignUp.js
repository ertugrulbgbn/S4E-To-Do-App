import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Alert, Dimensions } from 'react-native';

const hiddenPasswordImage = require('../assets/images/hidden.png');
const showPasswordImage = require('../assets/images/show.png');
const topLeftImage = require('../assets/images/s4el.png'); 

const users = [
  { email: 'ertugrulbagbancii@gmail.com', username: 'Ertugrul', password: 'ertu1234' },
  { email: 'alieren@gmail.com', username: 'Ali Eren', password: 'ali1234' },
  { email: 's210444022@stu.thk.edu.tr', username: '210444022', password: '1234' }
];

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  const handleSignup = () => {
    navigation.navigate('Login');
  };

  const handleLogin = () => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      navigation.navigate('Dashboard', { username: user.username });
    } else {
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  };

  const toggleShowPassword = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'passwordAgain') {
      setShowPasswordAgain(!showPasswordAgain);
    }
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

        <Text style={styles.signInText}>Sign Up</Text>
        <Text style={styles.signUpText}>Already have an account? <Text style={styles.signUpLink} onPress={handleSignup}>Sign In</Text></Text>

        <View style={styles.emailContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Email Address *"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password *"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={() => toggleShowPassword('password')} style={styles.showPasswordButton}>
            <Image source={showPassword ? showPasswordImage : hiddenPasswordImage} style={styles.passwordImage} />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordAgainContainer}>
          <TextInput
            style={styles.passwordAgainInput}
            placeholder="Password Again *"
            secureTextEntry={!showPasswordAgain}
            value={passwordAgain}
            onChangeText={(text) => setPasswordAgain(text)}
          />
          <TouchableOpacity onPress={() => toggleShowPassword('passwordAgain')} style={styles.showPasswordButton}>
            <Image source={showPasswordAgain ? showPasswordImage : hiddenPasswordImage} style={styles.passwordImage} />
          </TouchableOpacity>
        </View>

        <Text style={styles.IndustryText}>Industry and position</Text>
        <Text style={styles.IndustryBottomText}>It is not mandatory to fill in industry and position information.</Text>

        <TouchableOpacity onPress={handleLogin} style={styles.loginButtonContainer}>
          <Text style={styles.loginButton}>Create Account</Text>
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
    marginTop: 0,
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
  passwordAgainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '88%',
    borderColor: '#d3dade',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  passwordAgainInput: {
    fontFamily: 'CustomFont-Light',
    flex: 1,
    height: 50,
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
  signUpText: {
    fontFamily: 'CustomFont-Light',
    marginTop: 20,
    fontSize: 14,
    alignSelf: 'flex-start', 
    marginLeft: 24, 
  },
  signUpLink: {
    fontFamily: 'CustomFont-SemiBold', 
    color: '#121e2a',
  },
  IndustryText: {
    fontSize: 20,
    marginBottom: -5,
    marginTop: 0,
    fontFamily: 'CustomFont-SemiBold',
    alignSelf: 'flex-start',
    marginLeft: 24,
  },

  IndustryBottomText: {
    fontSize: 14,
    marginBottom: 5,
    marginTop: 5,
    fontFamily: 'CustomFont-Regular',
    alignSelf: 'flex-start',
    marginLeft: 24,
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
