import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Switch, ScrollView, Animated, TextInput } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { ThemeContext } from '../DrawerNavigator';
import Icon from 'react-native-vector-icons/Ionicons';

const TwoFactorAuthScreen = ({ onClose, themeStyles }) => {
  const [manualCode, setManualCode] = useState('');
  const [authCode, setAuthCode] = useState(['', '', '', '', '', '']);

  const handleAuthCodeChange = (text, index) => {
    const newAuthCode = [...authCode];
    newAuthCode[index] = text;
    setAuthCode(newAuthCode);
    
    if (text.length === 1 && index < 5) {
      this[`input${index + 1}`].focus();
    }
  };

  return (
    <View style={[styles.twoFactorContainer, { backgroundColor: themeStyles.backgroundColor }]}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Icon name="close" size={24} color={themeStyles.textColor} />
      </TouchableOpacity>
      
      <Text style={[styles.title, { color: themeStyles.textColor }]}>
        1. Use your phone to scan the QR code with Google Authenticator, Microsoft Authenticator, Authy, or other authenticator app.
      </Text>
      
      <View style={styles.qrContainer}>
      </View>
      
      <Text style={[styles.orText, { color: themeStyles.textColor1 }]}>or use your manual code</Text>
      
      <View style={styles.manualCodeContainer}>
        <TextInput
          style={[styles.manualCodeInput, { backgroundColor: themeStyles.greyContainerBackground, color: themeStyles.textColor }]}
          value={manualCode}
          onChangeText={setManualCode}
          placeholder="4ROGJN2UD4PDMHO6PVKR56ROD3L5ZWDP"
          placeholderTextColor={themeStyles.textColor1}
        />
        <TouchableOpacity style={[styles.copyButton, { backgroundColor: themeStyles.greyContainerBackground }]}>
          <Icon name="copy-outline" size={24} color={themeStyles.textColor} />
        </TouchableOpacity>
      </View>
      
      <Text style={[styles.subtitle, { color: themeStyles.textColor }]}>
        2. Enter the 6-digital code from the authenticator app.
      </Text>
      
      <View style={styles.authCodeContainer}>
        {authCode.map((code, index) => (
          <TextInput
            key={index}
            style={[styles.authCodeInput, { backgroundColor: themeStyles.greyContainerBackground, color: themeStyles.textColor }]}
            value={code}
            onChangeText={(text) => handleAuthCodeChange(text, index)}
            keyboardType="number-pad"
            maxLength={1}
            ref={(input) => { this[`input${index}`] = input; }}
          />
        ))}
      </View>
      
      <TouchableOpacity style={[styles.verifyButton, { backgroundColor: themeStyles.saveButtonBackground }]}>
        <Text style={[styles.verifyButtonText, { color: themeStyles.saveButtonTextColor }]}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};


const CustomSwitch = ({ value, onValueChange, trackColor }) => {
  const [animation] = useState(new Animated.Value(value ? 1 : 0));

  const toggleSwitch = () => {
    const newValue = !value;
    onValueChange(newValue);
    Animated.timing(animation, {
      toValue: newValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColorInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [trackColor.false, trackColor.true]
  });

  const translateXInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20]
  });

  return (
    <TouchableOpacity onPress={toggleSwitch} activeOpacity={0.8}>
      <Animated.View style={[
        styles.switchContainer,
        { backgroundColor: backgroundColorInterpolation }
      ]}>
        <Animated.View style={[
          styles.switchThumb,
          { transform: [{ translateX: translateXInterpolation }] }
        ]} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const Menu = ({ selectedSection, setSelectedSection, themeStyles }) => {
  const menuItems = [
    { 
      name: 'Security', 
      id: 'security',
      icon: (color) => (
        <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <Path fill={color} d="M12 12h7c-.53 4.11-3.28 7.78-7 8.92zH5V6.3l7-3.11M12 1L3 5v6c0 5.55 3.84 10.73 9 12c5.16-1.27 9-6.45 9-12V5z"/>
        </Svg>
      )
    },
    { 
      name: 'Alerts & Mails', 
      id: 'alerts', 
      icon: (color) => (
        <Svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 28 28">
          <Path fill={color} d="M20.498 1a4.5 4.5 0 0 0-4.5 4.5V8l-1.62 1.876c-.216.25-.325.376-.355.476a.5.5 0 0 0 .277.606c.096.042.262.042.593.042h11.21c.331 0 .497 0 .593-.042a.5.5 0 0 0 .277-.606c-.03-.1-.139-.225-.356-.476L24.998 8V5.5a4.5 4.5 0 0 0-4.5-4.5m0 13a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2M14 14.155l3.52-1.83c.056.522.246 1.004.535 1.411l-3.709 1.93a.75.75 0 0 1-.58.046l-.112-.047l-9.154-4.76v8.845a1.75 1.75 0 0 0 1.606 1.744l.144.006h15.5a1.75 1.75 0 0 0 1.744-1.607l.006-.143v-7.633q.003-.058.002-.117H25v7.75a3.25 3.25 0 0 1-3.066 3.245L21.75 23H6.25a3.25 3.25 0 0 1-3.245-3.066L3 19.75V8.25a3.25 3.25 0 0 1 3.066-3.245L6.25 5h8.775a6 6 0 0 0-.023.5v1H6.25a1.75 1.75 0 0 0-1.744 1.606L4.5 8.25v.964z"/>
        </Svg>
      ) 
    },
  ];

  return (
    <View style={[styles.menuContainer, { backgroundColor: themeStyles.menuBackground }]}>
      <View style={[styles.menuItemsContainer, { backgroundColor: themeStyles.menuItemsContainerBackground }]}>
        {menuItems.map((item) => {
          const isSelected = selectedSection === item.id;
          const iconColor = isSelected ? themeStyles.menuSelectedTextColor : themeStyles.menuTextColor;
          const textColor = isSelected ? themeStyles.menuSelectedTextColor : themeStyles.menuTextColor;

          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                isSelected && [styles.menuItemSelected, { borderBottomColor: themeStyles.menuSelectedBorderColor }],
              ]}
              onPress={() => setSelectedSection(item.id)}
            >
              {item.icon && <View style={styles.iconContainer}>{item.icon(iconColor)}</View>}
              <Text style={[styles.menuText, { color: textColor }]}>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export const Settings = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedSection, setSelectedSection] = useState('security');
  const [showTwoFactor, setShowTwoFactor] = useState(false); // Yeni state

  const handleButtonPress = () => {
    if (!isEnabled) {
      setShowTwoFactor(true);
      setIsEnabled(false); 
    }
  };

  const themeStyles = {
    backgroundColor: isDarkMode ? '#161c24' : '#f4f6f8',
    textColor: isDarkMode ? '#ffffff' : '#121e2a',
    textColor1: isDarkMode ? '#909daa' : '#637381',
    cardBackground: isDarkMode ? '#212b36' : '#ffffff',
    buttonBackground: isDarkMode ? '#253c50' : '#dfeef9',
    buttonTextColor: isDarkMode ? '#48b4ea' : '#2c76af',
    buttonTextColor1: isDarkMode ? '#48b4ea' : '#2c76af',
    menuBackground: isDarkMode ? '#161c24' : '#f4f6f8', 
    menuItemsContainerBackground: isDarkMode ? '#161c24' : '#f4f6f8',
    menuTextColor: isDarkMode ? '#919eab' : '#637381',
    menuSelectedTextColor: isDarkMode ? '#ffffff' : '#212b36',
    menuSelectedBorderColor: isDarkMode ? '#1a4466' : '#212b36',
    switchTrackColorFalse: isDarkMode ? '#637381' : '#c4ccd3',
    switchTrackColorTrue: isDarkMode ? '#1a4466' : '#1a4466',
    switchThumbColor: '#ffffff',
    greyContainerBackground: isDarkMode ? '#4a5968' : '#f4f6f8',
    saveButtonBackground: isDarkMode ? '#1a4466' : '#1a4466',
    saveButtonTextColor: '#ffffff',
  };

  const renderContent = () => {
    if (showTwoFactor) {
      return (
        <TwoFactorAuthScreen 
          onClose={() => setShowTwoFactor(false)} 
          themeStyles={themeStyles} 
        />
      );
    }
    switch (selectedSection) {
      case 'security':
        return (
         <View style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}>
            <View style={[styles.innerContainer, { backgroundColor: themeStyles.cardBackground }]}>
                <View style={styles.textContainer}>
                    <Text style={[styles.twoFactorText, { color: themeStyles.textColor }]}>Two-factor Authentication</Text>
                    <Text style={[styles.descriptionText, { color: themeStyles.textColor1 }]}>Enable 2FA to get an extra layer of security.</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: themeStyles.buttonBackground }]}
                        onPress={handleButtonPress}
                    >
                        {isEnabled ? (
                            <Svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" style={styles.icon}>
                                <Path fill={themeStyles.buttonTextColor} d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5zm0 6c1.4 0 2.8 1.1 2.8 2.5V11c.6 0 1.2.6 1.2 1.3v3.5c0 .6-.6 1.2-1.3 1.2H9.2c-.6 0-1.2-.6-1.2-1.3v-3.5c0-.6.6-1.2 1.2-1.2V9.5C9.2 8.1 10.6 7 12 7m0 1.2c-.8 0-1.5.5-1.5 1.3V11h3V9.5c0-.8-.7-1.3-1.5-1.3"/>
                            </Svg>
                        ) : (
                            <Svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" style={styles.icon}>
                                <Path fill={themeStyles.buttonTextColor1} d="M1 4.27L2.28 3L20.5 21.22l-1.27 1.28L17 20.25c-1.43 1.32-3.13 2.29-5 2.75c-5.16-1.26-9-6.45-9-12V6.27zM12 1l9 4v6c0 2.28-.65 4.5-1.77 6.41L5.65 3.82z"/>
                            </Svg>
                        )}
                        <Text style={[styles.buttonText, { color: themeStyles.buttonTextColor }]}>{isEnabled ? "DISABLE" : "ENABLE"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        );
        case 'alerts':
          return (
            <ScrollView style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}>
              <View style={[styles.innerContainer, { backgroundColor: themeStyles.cardBackground }]}>
                <View style={styles.scanOutputContainer}>
                  <Text style={[styles.scanOutputTitle, { color: themeStyles.textColor }]}>Scan Output Alert</Text>
                  <Text style={[styles.scanOutputDescription, { color: themeStyles.textColor1 }]}>
                    Send messages according to the scan output level.
                  </Text>
                </View>
                <View style={[styles.greyContainer, { backgroundColor: themeStyles.greyContainerBackground }]}>
                  <View style={styles.settingItem}>
                    <View style={styles.settingTextContainer}>
                      <Text style={[styles.settingTitle, { color: themeStyles.textColor }]}>Informational</Text>
                      <Text style={[styles.settingDescription, { color: themeStyles.textColor1 }]}>
                        Informational: Typically have very little or no impact.
                      </Text>
                    </View>
                    <View style={styles.switchWrapper}>
                      <CustomSwitch
                        value={isEnabled}
                        onValueChange={() => setIsEnabled(previousState => !previousState)}
                        trackColor={{ 
                          false: themeStyles.switchTrackColorFalse, 
                          true: themeStyles.switchTrackColorTrue 
                        }}
                      />
                    </View>
                  </View>

                
                  <View style={styles.settingItem}>
                    <View style={styles.settingTextContainer}>
                      <Text style={[styles.settingTitle, { color: themeStyles.textColor }]}>Low Level Vulnerabilities</Text>
                      <Text style={[styles.settingDescription, { color: themeStyles.textColor1 }]}>
                        Low: Typically have very little or no impact.
                      </Text>
                    </View>
                    <View style={styles.switchWrapper}>
                      <CustomSwitch
                        value={isEnabled}
                        onValueChange={() => setIsEnabled(previousState => !previousState)}
                        trackColor={{ 
                          false: themeStyles.switchTrackColorFalse, 
                          true: themeStyles.switchTrackColorTrue 
                        }}
                      />
                    </View>
                  </View>
        
                  <View style={styles.settingItem}>
                    <View style={styles.settingTextContainer}>
                      <Text style={[styles.settingTitle, { color: themeStyles.textColor }]}>Medium Level Vulnerabilities</Text>
                      <Text style={[styles.settingDescription, { color: themeStyles.textColor1 }]}>
                        Medium: Vulnerabilities that can not be exploited directly. However, it can help attackers or can be triggered by manipulating other systems or victims.
                      </Text>
                    </View>
                    <View style={styles.switchWrapper}>
                      <CustomSwitch
                        value={isEnabled}
                        onValueChange={() => setIsEnabled(previousState => !previousState)}
                        trackColor={{ 
                          false: themeStyles.switchTrackColorFalse, 
                          true: themeStyles.switchTrackColorTrue 
                        }}
                      />
                    </View>
                  </View>
        
                  <View style={styles.settingItem}>
                    <View style={styles.settingTextContainer}>
                      <Text style={[styles.settingTitle, { color: themeStyles.textColor }]}>High Level Vulnerabilities</Text>
                      <Text style={[styles.settingDescription, { color: themeStyles.textColor1 }]}>
                        High: These vulnerabilities are difficult to exploit or need elevated privilege. Exploitation could result in unauthorized access to systems, significant data loss, or downtime.
                      </Text>
                    </View>
                    <View style={styles.switchWrapper}>
                      <CustomSwitch
                        value={isEnabled}
                        onValueChange={() => setIsEnabled(previousState => !previousState)}
                        trackColor={{ 
                          false: themeStyles.switchTrackColorFalse, 
                          true: themeStyles.switchTrackColorTrue 
                        }}
                      />
                    </View>
                  </View>
        
                  <View style={styles.settingItem}>
                    <View style={styles.settingTextContainer}>
                      <Text style={[styles.settingTitle, { color: themeStyles.textColor }]}>Critical Vulnerabilities</Text>
                      <Text style={[styles.settingDescription, { color: themeStyles.textColor1 }]}>
                        Critical: Exploitation could result in privileged unauthorized access to systems, significant data loss, or downtime.
                      </Text>
                    </View>
                    <View style={styles.switchWrapper}>
                      <CustomSwitch
                        value={isEnabled}
                        onValueChange={() => setIsEnabled(previousState => !previousState)}
                        trackColor={{ 
                          false: themeStyles.switchTrackColorFalse, 
                          true: themeStyles.switchTrackColorTrue 
                        }}
                      />
                    </View>
                  </View>
                </View>
                
                <View style={styles.securityReportingContainer}>
                  <Text style={[styles.securityReportingTitle, { color: themeStyles.textColor }]}>Security Reporting Service</Text>
                  <Text style={[styles.securityReportingDescription, { color: themeStyles.textColor1 }]}>
                    Security reporting service messages.
                  </Text>
                </View>
                <View style={[styles.greyContainer, { backgroundColor: themeStyles.greyContainerBackground, marginTop: 15 }]}>
                  <View style={styles.settingItem}>
                    <View style={styles.settingTextContainer}>
                      <Text style={[styles.settingTitle, { color: themeStyles.textColor }]}>SRS Alert</Text>
                      <Text style={[styles.settingDescription, { color: themeStyles.textColor1 }]}>
                        If a researcher submit a vulnerability report for yor asset.
                      </Text>
                    </View>
                    <View style={styles.switchWrapper}>
                      <CustomSwitch
                        value={isEnabled}
                        onValueChange={() => setIsEnabled(previousState => !previousState)}
                        trackColor={{ 
                          false: themeStyles.switchTrackColorFalse, 
                          true: themeStyles.switchTrackColorTrue 
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.saveButtonContainer}>
                  <TouchableOpacity 
                    style={[styles.saveButton, { backgroundColor: themeStyles.saveButtonBackground }]} 
                    onPress={() => console.log('Save Changes pressed')}
                  >
                    <Text style={[styles.saveButtonText, { color: themeStyles.saveButtonTextColor }]}>Save Changes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Menu 
        selectedSection={selectedSection} 
        setSelectedSection={setSelectedSection} 
        isDarkMode={isDarkMode}
        themeStyles={themeStyles} 
      />
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  menuContainer: {
    backgroundColor: '#f4f6f8',
    paddingVertical: 10,
    paddingHorizontal: 25, 
  },
  menuItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start', 
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
    paddingVertical: 5,
  },
  menuText: {
    color: '#637381',
    fontFamily: 'CustomFont-SemiBold',
    fontSize: 15,
  },
  menuItemSelected: {
    borderBottomWidth: 2,
    borderBottomColor: '#212b36',
  },
  title: {
    fontSize: 23,
    fontFamily: "CustomFont-SemiBold",
    marginBottom: 15,
    marginLeft: 4,
    alignSelf: 'flex-start',
  },
  innerContainer: {
    width: '100%',
    borderRadius: 10,
    justifyContent: 'flex-start', 
    alignItems: 'flex-start', 
    flexDirection: 'column', 
    paddingHorizontal: 20, 
    paddingVertical: 30,
    marginBottom: 35, 
    elevation: 1,
    overflow: 'hidden', 
  },
  twoFactorText: {
    fontSize: 16,
    fontFamily: 'CustomFont-Bold',
    marginBottom: 5,
    marginLeft: 5,
    alignSelf: 'flex-start',
    width: '100%', 
  },
  descriptionText: {
    fontSize: 11,
    marginLeft: 5,
    fontFamily: 'CustomFont-Regular',
    alignSelf: 'flex-start',
    width: '100%', 
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 7,
    width: 120,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'CustomFont-Bold',
    marginLeft: 10,
    flex: 1,
    textAlign: 'center',
  },
  icon: {
    marginRight: -4,
  },  
  iconContainer: {
    marginRight: 5,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    width: '100%',
    paddingVertical: 8,
  },
  settingTextContainer: {
    flex: 1,
    marginRight: 10,
    justifyContent: 'center', 
  },
  settingTitle: {
    marginLeft: 4,
    fontSize: 16,
    fontFamily: 'CustomFont-Bold',
    marginBottom: 2, 
  },
  settingDescription: {
    marginLeft: 4,
    fontSize: 12,
    fontFamily: 'CustomFont-Regular',
    marginTop: 2, 
  },
  greyContainer: {
    backgroundColor: '#f4f6f8', 
    padding: 10,
    borderRadius: 10,
    marginTop: 15, 
    width: '100%',
  },
  scanOutputContainer: {
    width: '100%',
  },
  scanOutputTitle: {
    marginLeft: 5,
    fontSize: 16,
    fontFamily: 'CustomFont-Bold',
    marginBottom: 5,
  },
  scanOutputDescription: {
    marginLeft: 5,
    fontSize: 12,
    fontFamily: 'CustomFont-Regular',
  },
  securityReportingContainer: {
    marginTop: 20,
    width: '100%',
  },
  securityReportingTitle: {
    fontSize: 16,
    fontFamily: 'CustomFont-Bold',
    marginBottom: 5,
    marginLeft: 5,
  },
  securityReportingDescription: {
    fontSize: 12,
    fontFamily: 'CustomFont-Regular',
    marginLeft: 5,
  },
  saveButtonContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: -10,
    marginTop: 18,
  },
  saveButton: {
    backgroundColor: '#1a4466',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  saveButtonText: {
    color: '#ffffff',
    fontFamily: 'CustomFont-Bold',
    fontSize: 14,
  },
  switchContainer: {
    width: 44, 
    height: 24, 
    borderRadius: 12, 
    justifyContent: 'center',
    padding: 4, 
  },
  switchThumb: {
    width: 16, 
    height: 16, 
    borderRadius: 8, 
    backgroundColor: 'white',
  },
  switchWrapper: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 10,
  },
  twoFactorContainer: {
    flex: 1,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
  },
  qrContainer: {
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginBottom: 20,
  },
  orText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  manualCodeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  manualCodeInput: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
  },
  copyButton: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  authCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  authCodeInput: {
    width: 40,
    height: 40,
    textAlign: 'center',
    borderRadius: 5,
  },
  verifyButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  verifyButtonText: {
    fontSize: 16,
  },
});
