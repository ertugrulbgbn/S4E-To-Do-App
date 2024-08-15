import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Linking, KeyboardAvoidingView, Platform } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const Twofactor = ({ navigation }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(null); 
  const inputRefs = useRef([]);

  const handleChange = (text, index) => {
    if (text.length <= 1 && /^[0-9]*$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      if (text && index < code.length - 1) {
        inputRefs.current[index + 1].focus();
      } 
      else if (!text && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  const openHelpPage = () => {
    Linking.openURL('https://help.securityforeveryone.com/');
  };

  const handleFocus = (index) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.innerContainer}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
          imageRendering="optimizeQuality"
          fillRule="evenodd"
          clipRule="evenodd"
          viewBox="0 0 444 512.36"
          width={95} 
          height={95}
          style={styles.svg}
        >
          <Path d="M75.33 320.47h294.33c29.56-56.91 43.93-129.92 39.5-219.58-53.23 4.86-119.13-19.6-187.78-63.12-54.92 42.67-118.12 63.87-187.08 60.26-2.43 92.68 12.43 166.09 41.03 222.44zm328.53.58c14.79 2.87 26.06 16 26.06 31.53v127.66c0 17.59-14.52 32.12-32.12 32.12H46.18c-17.59 0-32.11-14.46-32.11-32.12V352.58c0-15.96 11.87-29.43 27.32-31.75C12.17 255.78-2.41 172.49.33 67.99 75.67 71.94 149.6 55.65 221.23 0 304.03 52.48 378.81 77.3 443 71.44c5.01 101.3-8.95 184.06-39.14 249.61zM161.67 177.27h6.01v-13.91c0-15.4 6.07-29.44 15.84-39.64 9.87-10.28 23.48-16.66 38.48-16.66 14.99 0 28.62 6.38 38.47 16.66 9.78 10.2 15.85 24.23 15.85 39.64v13.91h6c4.88 0 8.87 3.99 8.87 8.86v93.66c0 4.88-3.99 8.87-8.87 8.87H161.67c-4.88 0-8.86-3.99-8.86-8.87v-93.66c-.01-4.87 3.98-8.86 8.86-8.86zm22.78 0h75.09v-13.91c0-10.96-4.27-20.88-11.14-28.04-6.79-7.09-16.14-11.48-26.41-11.48-10.26 0-19.62 4.39-26.4 11.48-6.88 7.16-11.14 17.08-11.14 28.04v13.91zm30.27 59.82-9.56 25.05h33.68l-8.86-25.4c5.62-2.89 9.47-8.75 9.47-15.51 0-9.64-7.81-17.45-17.46-17.45-9.63 0-17.44 7.81-17.44 17.45 0 7.03 4.17 13.1 10.17 15.86zM105.2 397.93l-3.62-20.7c11.68-3.52 23.3-5.28 34.89-5.28 4.63 0 8.49.13 11.6.41 3.1.28 6.32.97 9.66 2.08 3.33 1.12 5.97 2.64 7.91 4.59 4.46 4.44 6.68 11.26 6.68 20.43s-2.6 15.93-7.79 20.29c-5.18 4.35-16.12 9.35-32.79 15v3.9h39.18v22.23H99.64v-17.37c0-5.19.97-10.14 2.91-14.87 1.21-2.69 4.13-5.93 8.76-9.73 2.5-2.13 5.86-4.17 10.07-6.11 4.22-1.95 8.2-3.78 11.96-5.49 3.75-1.71 6.78-3.13 9.1-4.24v-7.5c-4.17-.46-8.02-.7-11.54-.7-8.52 0-17.09 1.02-25.7 3.06zm140.7 33.06h-23.62v29.89h-27.8v-86.86h56.98l-3.48 22.25h-25.7v14.01h23.62v20.71zm38.64 29.89h-28.15l22.52-86.86h42.94l22.51 86.86h-28.15l-3.2-13.75h-25.27l-3.2 13.75zm12.13-60.17-3.93 24.32h15.13l-3.8-24.32h-7.4z" />
        </Svg>
        <Text style={styles.title}>Two-Factor Authentication</Text>
        <Text style={styles.description}>Enter the 6-digit digital authenticator code</Text>
        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[
                styles.input,
                { borderColor: focusedIndex === index ? 'black' : '#ccc' } 
              ]}
              maxLength={1}
              placeholder='-'
              keyboardType="numeric"
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
              selectionColor="#657581"
            />
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={() => {/* Handle submission */}}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don't have a code?{' '}
          </Text>
          <TouchableOpacity onPress={openHelpPage}>
            <Text style={styles.helpText}>Need help?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleBackToLogin}>
          <Text style={styles.backToLogin}>{'< Return to Sign In'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  svg: {
    marginBottom: 20,
  },
  title: {
    fontSize: 23,
    fontFamily: 'CustomFont-Bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'CustomFont-Regular',
    marginBottom: 20,
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center', 
    marginBottom: 20,
  },
  input: {
    width: '11%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#fff',
    marginHorizontal: 5, 
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    backgroundColor: '#1a4466',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'CustomFont-Bold',
  },
  backToLogin: {
    fontFamily: 'CustomFont-Medium',
    color: '#121e2a',
    marginTop: 15,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center', 
    marginTop: 20,
  },
  footerText: {
    fontSize: 15,
    color: '#121e2a',
    marginRight: 2,
  },
  helpText: {
    fontSize: 17,
    color: '#36b4e9',
  },
});

export default Twofactor;
