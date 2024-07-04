import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Linking, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Alert } from 'react-native';

const hiddenPasswordImage = require('../assets/images/hidden.png'); 
const showPasswordImage = require('../assets/images/show.png'); 
const log19Image = require('../assets/images/log19.png'); 
const linkedinImage = require('../assets/images/linkedin.png');
const twitterImage = require('../assets/images/twitter.png'); 
const webpageImage = require('../assets/images/webpage.png');
const rafikiImage = require('../assets/images/rafiki.png');

const users = [
  { email: 'ertugrulbagbancii@gmail.com', username: 'Ertugrul', password: 'ertu1234' }, 
  { email: 'alieren@gmail.com', username: 'Ali Eren', password: 'ali1234' },  
  { email: 's210444022@stu.thk.edu.tr', username: '210444022', password: '1234' }
];

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const openLink = (url) => {
    Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}> 
        <Image source={log19Image} style={styles.logoImage} /> 
        <Text style={styles.welcomeText}>Welcome</Text> 
        <Image source={rafikiImage} style={styles.rafikiImage} /> 

        <TextInput
          style={styles.textInput}
          placeholder="Enter your Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.showPasswordButton}>
            <Image source={showPassword ? showPasswordImage : hiddenPasswordImage} style={styles.passwordImage} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleForgetPassword}>
          <Text style={styles.forgetPasswordText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.loginButton}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.signUpText}>
          Don’t have an account? <Text style={styles.signUpLink} onPress={handleSignup}>Sign Up</Text>
        </Text>

        <View style={styles.socialMediaContainer}>
          <TouchableOpacity onPress={() => openLink('https://securityforeveryone.com/')}>
            <Image source={webpageImage} style={styles.socialMediaIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('https://www.linkedin.com/company/secforeveryone/')}>
            <Image source={linkedinImage} style={styles.socialMediaIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('https://twitter.com/secforeveryone')}>
            <Image source={twitterImage} style={styles.socialMediaIcon} />
          </TouchableOpacity>
        </View>
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
    backgroundColor: '#f0f4f3',
  },
  logoImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 157,
    height: 157,
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: 28,
    marginBottom: -30,
    marginTop: 25,
    fontFamily: 'CustomFont-Regular',
  },
  rafikiImage: {
    width: 350,
    height: 350,
    marginBottom: -10,
    alignSelf: 'center',
  },
  textInput: {
    backgroundColor: '#fff',
    height: 50,
    width: '100%',
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderRadius: 30,
    elevation: 1,
    fontFamily: 'CustomFont-Light',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 30,
    backgroundColor: '#fff',
    elevation: 2,
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
    tintColor: '#50c2c9',
  },
  forgetPasswordText: {
    fontFamily: 'CustomFont-Light',
    marginTop: 20,
    marginBottom: 20,
    color: '#50c2c9',
  },
  loginButton: {
    marginTop: 10,
    color: 'white',
    fontFamily: 'CustomFont-Regular',
    fontSize: 17,
    paddingVertical: 15,
    paddingHorizontal: 150,
    borderRadius: 15,
    overflow: 'hidden',
    textAlign: 'center', 
    elevation: 2,
    backgroundColor: '#50c2c9',
  },
  signUpText: {
    fontFamily: 'CustomFont-Light',
    marginTop: 20,
    fontSize: 14,
  },
  signUpLink: {
    color: '#50c2c9',
  },
  socialMediaContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  socialMediaIcon: {
    width: 26,
    height: 26,
    marginHorizontal: 15,
  },
});
