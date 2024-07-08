import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const loginLightSvg = (
  <Svg width={374} height={125} viewBox="0 0 1274 1025" fill="none">
    <Path
      d="M5 914.366C5 914.366 160.829 915.427 472.496 917.553C472.496 917.553 591.578 850.333 829.739 715.894C846.83 710.053 849.533 713.173 837.849 725.257C837.849 725.257 718.9 793.91 481.003 931.217C481.003 931.217 417.787 829.692 291.349 626.641C291.349 626.641 405.817 557.514 634.758 419.255C633.706 413.993 627.373 402.399 615.756 384.479C615.756 384.479 608.686 384.894 594.545 385.729V344.538C594.545 344.538 569.177 302.098 518.437 217.214C505.793 168.082 527.167 116.51 570.858 90.7454C614.545 64.9845 670 71.2529 706.843 106.116C706.843 106.116 732.42 148.976 783.575 234.686C801.659 237.625 817.464 243.449 830.988 252.161C830.988 252.161 821.839 258.4 803.537 270.887C803.537 270.887 807.694 277.126 816.014 289.612C828.658 293.201 842.241 290.832 852.928 283.176C863.615 275.524 870.232 263.419 870.915 250.291C870.915 250.291 830.988 190.376 751.133 70.5401C698.046 2.36443 602.278 -15.1197 528.542 29.9072C454.805 74.9342 426.571 168.141 462.911 246.543C462.911 246.543 499.926 315.197 573.955 452.508C573.955 452.508 605.149 435.447 667.536 401.326C667.536 401.326 728.259 502.851 849.701 705.902C855.3 714.938 859.918 722.611 859.918 722.611C710.853 808.304 645.03 846.119 645.03 846.119C649.414 863.725 649.451 876.836 645.147 885.453C630.902 927.653 645.696 974.219 681.676 1000.45C717.66 1026.68 766.497 1026.5 802.284 1000.01C838.075 973.511 852.521 926.836 837.966 884.744C823.411 842.648 783.223 814.887 738.723 816.178C776.099 818.799 809.061 841.633 824.664 875.713C840.263 909.792 836.017 949.678 813.587 979.699C749.872 971.544 729.076 952.609 751.2 922.903C759.859 918.291 770.407 919.121 778.232 925.037C786.061 930.953 789.745 940.874 787.674 950.467C785.604 960.06 778.156 967.578 768.588 969.737C778.131 978.995 790.419 984.898 803.608 986.563C769.091 1012.29 721.725 1012.06 687.451 986.022C653.177 959.98 640.252 914.391 655.755 874.22C672.389 875.884 680.708 876.719 680.708 876.719C723.963 851.335 745.588 838.644 745.588 838.644C734.361 816.178 728.745 804.942 728.745 804.942C820.661 754.594 866.615 729.42 866.615 729.42H1269"
      stroke="#121e2a"
      strokeWidth={9}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default function Forget({ navigation }) {
  const [email, setEmail] = useState('');

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  const handleResetPassword = () => {
    // Implement your password reset logic here
    alert(`Reset password functionality for ${email}`);
  };

  return (
    <View style={styles.container}>
      {loginLightSvg}
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
      
      <TouchableOpacity onPress={handleResetPassword} style={styles.resetButton}>
        <Text style={styles.resetText}>Send Reset Link</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={handleBackToLogin}>
        <Text style={styles.backToLogin}>{'< Return to Sign In'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontFamily: 'CustomFont-Bold',
    fontSize: 24,
    marginTop: 7,
  },
  title2: {
    color: '#667683',
    fontFamily: 'CustomFont-Regular',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 30,
  },
  textInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '78%',
    height: 50,
    borderColor: '#d3dade',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  resetButton: {
    backgroundColor: '#121e2a',
    borderRadius: 10,
    width: '78%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  resetText: {
    fontFamily: 'CustomFont-Bold',
    color: '#ffffff',
  },
  backToLogin: {
    fontFamily: 'CustomFont-Medium',
    color: '#121e2a',
    marginTop: 5,
  },
});
