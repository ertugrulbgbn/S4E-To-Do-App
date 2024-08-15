import React, { useState, useContext, useRef } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text, Modal, Animated, Dimensions } from 'react-native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { BlurView } from '@react-native-community/blur';
import { user_logout } from './api/user_api';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { G, Path } from 'react-native-svg';
import { Dashboard } from './screens/Dashboard';
import { Settings } from './screens/Settings';
import s4elImage from './assets/images/s4es.png';
import s4elImageWhite from './assets/images/s4eb.png';

export const ThemeContext = React.createContext();

const Drawer = createDrawerNavigator()

const TickIcon = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
    <G fill="none">
    <Path fill="#00a66e" d="M4.565 12.407a.75.75 0 1 0-1.13.986zM7.143 16.5l-.565.493a.75.75 0 0 0 1.13 0zm8.422-8.507a.75.75 0 1 0-1.13-.986zm-5.059 3.514a.75.75 0 0 0 1.13.986zm-.834 3.236a.75.75 0 1 0-1.13-.986zm-6.237-1.35l3.143 3.6l1.13-.986l-3.143-3.6zm4.273 3.6l1.964-2.25l-1.13-.986l-1.964 2.25zm3.928-4.5l1.965-2.25l-1.13-.986l-1.965 2.25zm1.965-2.25l1.964-2.25l-1.13-.986l-1.964 2.25z"/>
    <Path stroke="#00a66e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="m20 7.563l-4.286 4.5M11 16l.429.563l2.143-2.25"/>
    </G>
  </Svg>
);
 
const MenuIcon = ({ isDarkMode }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
    <Path 
      fill="none" 
      stroke={isDarkMode ? "#b0bec5" : "#212b36"}
      strokeLinecap="round" 
      strokeWidth="2" 
      d="M4 7h3m13 0h-9m9 10h-3M4 17h9m-9-5h16"
    />
  </Svg>
);

const OnIcon = ({ isDarkMode }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
    <Path fill={isDarkMode ? "#545e68" : "#adb6bd"} 
    d="M12.04 8.04h-.09l-1.6 4.55h3.29z" opacity="0.3"/>
    <Path fill={isDarkMode ? "#545e68" : "#adb6bd"} 
    d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8s8-3.59 8-8s-3.59-8-8-8m3.21 13l-.98-2.81H9.78l-1 2.81h-1.9l4.13-11h1.97l4.13 11z" opacity="0.3"/>
    <Path fill={isDarkMode ? "#545e68" : "#adb6bd"} 
    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8"/>
    <Path fill={isDarkMode ? "#545e68" : "#adb6bd"} 
    d="M11.01 6L6.88 17h1.9l1-2.81h4.44l.99 2.81h1.9L12.98 6zm-.66 6.59l1.6-4.55h.09l1.6 4.55z"/>
  </Svg>
);

const NotificationIcon = ({ isDarkMode }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
    <Path 
      fill={isDarkMode ? "#545e68" : "#adb6bd"} 
      d="M18.75 9v.704c0 .845.24 1.671.692 2.374l1.108 1.723c1.011 1.574.239 3.713-1.52 4.21a25.794 25.794 0 0 1-14.06 0c-1.759-.497-2.531-2.636-1.52-4.21l1.108-1.723a4.393 4.393 0 0 0 .693-2.374V9c0-3.866 3.022-7 6.749-7s6.75 3.134 6.75 7"
      opacity="0.7"
    />
    <Path 
      fill={isDarkMode ? "#b0bec5" : "#637381"} 
      d="M12.75 6a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0zM7.243 18.545a5.002 5.002 0 0 0 9.513 0c-3.145.59-6.367.59-9.513 0"
    />
  </Svg>
);

const DashboardIcon = () => (
  <Svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <Path fill="#637381" d="M10.995 4.68v3.88A2.44 2.44 0 0 1 8.545 11h-3.86a2.38 2.38 0 0 1-1.72-.72a2.41 2.41 0 0 1-.71-1.72V4.69a2.44 2.44 0 0 1 2.43-2.44h3.87a2.42 2.42 0 0 1 1.72.72a2.39 2.39 0 0 1 .72 1.71zm10.75.01v3.87a2.46 2.46 0 0 1-2.43 2.44h-3.88a2.5 2.5 0 0 1-1.73-.71a2.44 2.44 0 0 1-.71-1.73V4.69a2.39 2.39 0 0 1 .72-1.72a2.42 2.42 0 0 1 1.72-.72h3.87a2.46 2.46 0 0 1 2.44 2.44zm0 10.75v3.87a2.46 2.46 0 0 1-2.43 2.44h-3.88a2.5 2.5 0 0 1-1.75-.69a2.42 2.42 0 0 1-.71-1.73v-3.87a2.391 2.391 0 0 1 .72-1.72a2.421 2.421 0 0 1 1.72-.72h3.87a2.46 2.46 0 0 1 2.44 2.44zm-10.75.01v3.87a2.46 2.46 0 0 1-2.45 2.43h-3.86a2.42 2.42 0 0 1-2.43-2.43v-3.87A2.46 2.46 0 0 1 4.685 13h3.87a2.49 2.49 0 0 1 1.73.72a2.45 2.45 0 0 1 .71 1.73"/>
  </Svg>
);

const LogoutIcon = () => (
  <Svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <Path fill="#637381" d="M15 2h-1c-2.828 0-4.243 0-5.121.879C8 3.757 8 5.172 8 8v8c0 2.828 0 4.243.879 5.121C9.757 22 11.172 22 14 22h1c2.828 0 4.243 0 5.121-.879C21 20.243 21 18.828 21 16V8c0-2.828 0-4.243-.879-5.121C19.243 2 17.828 2 15 2" opacity="0.7"/>
    <Path fill="#637381" d="M8 8c0-1.538 0-2.657.141-3.5H8c-2.357 0-3.536 0-4.268.732C3 5.964 3 7.143 3 9.5v5c0 2.357 0 3.535.732 4.268c.732.732 1.911.732 4.268.732h.141C8 18.657 8 17.538 8 16v-4.75z" opacity="0.4"/>
    <Path fill="#637381" fill-rule="evenodd" d="M4.47 11.47a.75.75 0 0 0 0 1.06l2 2a.75.75 0 0 0 1.06-1.06l-.72-.72H14a.75.75 0 0 0 0-1.5H6.81l.72-.72a.75.75 0 1 0-1.06-1.06z" clip-rule="evenodd"/>
  </Svg>
);

const SettingsIcon = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
    <Path fill="#637381" fill-rule="evenodd" d="M14.279 2.152C13.909 2 13.439 2 12.5 2s-1.408 0-1.779.152a2.008 2.008 0 0 0-1.09 1.083c-.094.223-.13.484-.145.863a1.615 1.615 0 0 1-.796 1.353a1.64 1.64 0 0 1-1.579.008c-.338-.178-.583-.276-.825-.308a2.026 2.026 0 0 0-1.49.396c-.318.242-.553.646-1.022 1.453c-.47.807-.704 1.21-.757 1.605c-.07.526.074 1.058.4 1.479c.148.192.357.353.68.555c.477.297.783.803.783 1.361c0 .558-.306 1.064-.782 1.36c-.324.203-.533.364-.682.556a1.99 1.99 0 0 0-.399 1.479c.053.394.287.798.757 1.605c.47.807.704 1.21 1.022 1.453c.424.323.96.465 1.49.396c.242-.032.487-.13.825-.308a1.64 1.64 0 0 1 1.58.008c.486.28.774.795.795 1.353c.015.38.051.64.145.863c.204.49.596.88 1.09 1.083c.37.152.84.152 1.779.152s1.409 0 1.779-.152a2.008 2.008 0 0 0 1.09-1.083c.094-.223.13-.483.145-.863c.02-.558.309-1.074.796-1.353a1.64 1.64 0 0 1 1.579-.008c.338.178.583.276.825.308c.53.07 1.066-.073 1.49-.396c.318-.242.553-.646 1.022-1.453c.47-.807.704-1.21.757-1.605a1.99 1.99 0 0 0-.4-1.479c-.148-.192-.357-.353-.68-.555c-.477-.297-.783-.803-.783-1.361c0-.558.306-1.064.782-1.36c.324-.203.533-.364.682-.556a1.99 1.99 0 0 0 .399-1.479c-.053-.394-.287-.798-.757-1.605c-.47-.807-.704-1.21-1.022-1.453a2.026 2.026 0 0 0-1.49-.396c-.242.032-.487.13-.825.308a1.64 1.64 0 0 1-1.58-.008a1.615 1.615 0 0 1-.795-1.353c-.015-.38-.051-.64-.145-.863a2.007 2.007 0 0 0-1.09-1.083" clip-rule="evenodd" opacity="0.7"/>
    <Path fill="#637381" d="M15.523 12c0 1.657-1.354 3-3.023 3c-1.67 0-3.023-1.343-3.023-3S10.83 9 12.5 9c1.67 0 3.023 1.343 3.023 3"/>
  </Svg>
);

const DarkIcon = () => (
  <Svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path opacity="0.4" d="M16.9462 11.0863C16.9759 11.0874 17.0055 11.0886 17.035 11.0898C20.1966 11.2176 22.5 13.3358 22.5 16.5C22.5 19.6642 20.1966 21.7824 17.035 21.9102C15.7057 21.9639 14.0498 22 12 22C9.9502 22 8.2943 21.9639 6.965 21.9102C3.80337 21.7824 1.5 19.6642 1.5 16.5C1.5 14.0317 2.90165 12.1999 5.019 11.4529C5.2406 8.2951 7.3872 6.02435 10.6413 6.00125C10.7585 6.00045 10.878 6 11 6C11.122 6 11.2415 6.00045 11.3587 6.00125C14.4855 6.02345 16.5897 8.1208 16.9462 11.0863Z" fill="#637381"/>
    <Path d="M19.2407 2.28853C19.5263 2.12002 19.5419 1.62921 19.2169 1.57222C18.1306 1.38179 16.9755 1.56344 15.9464 2.17059C14.4123 3.07575 13.5394 4.70186 13.501 6.38837C15.4283 7.12677 16.6785 8.86242 16.9459 11.0863L17.0347 11.0898C17.7391 11.1183 18.401 11.2456 19.0042 11.4612C19.6324 11.3806 20.2555 11.1732 20.8383 10.8294C21.8673 10.2222 22.5988 9.2907 22.9806 8.23415C23.0948 7.918 22.6711 7.6864 22.3855 7.8549C20.8813 8.74235 18.958 8.2157 18.0896 6.6786C17.2212 5.1415 17.7366 3.17599 19.2407 2.28853Z" fill="#637381"/>
  </Svg>
);

const LightIcon = () => (
  <Svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M11.9998 18.1111C15.3749 18.1111 18.1109 15.3751 18.1109 12C18.1109 8.62495 15.3749 5.88892 11.9998 5.88892C8.62471 5.88892 5.88867 8.62495 5.88867 12C5.88867 15.3751 8.62471 18.1111 11.9998 18.1111Z" fill="#637381"/>
    <G opacity="0.4">
    <Path d="M10.1667 2.83333C10.1667 1.78189 10.8396 1.00805 11.891 1.00039C11.9266 1.00013 11.9629 1 12 1C12.0371 1 12.0734 1.00013 12.109 1.00039C13.1604 1.00805 13.8333 1.78189 13.8333 2.83333C13.8333 3.88481 13.1604 4.6586 12.109 4.6663C12.0734 4.66654 12.0371 4.66667 12 4.66667C11.9629 4.66667 11.9266 4.66654 11.891 4.6663C10.8396 4.6586 10.1667 3.88475 10.1667 2.83333Z" fill="#637381"/>
    <Path d="M10.1667 21.1667C10.1667 22.2181 10.8396 22.9919 11.891 22.9996C11.9266 22.9999 11.9629 23 12 23C12.0371 23 12.0734 22.9999 12.109 22.9996C13.1604 22.9919 13.8333 22.2181 13.8333 21.1667C13.8333 20.1152 13.1604 19.3414 12.109 19.3337C12.0734 19.3335 12.0371 19.3333 12 19.3333C11.9629 19.3333 11.9266 19.3335 11.891 19.3337C10.8396 19.3414 10.1667 20.1152 10.1667 21.1667Z" fill="#637381"/>
    <Path d="M17.1855 4.22184C17.9289 3.47836 18.9519 3.40695 19.7008 4.14502C19.7262 4.17002 19.7519 4.19562 19.7782 4.22184C19.8044 4.24806 19.83 4.27384 19.855 4.29921C20.593 5.04806 20.5216 6.07106 19.7782 6.81454C19.0347 7.55802 18.0117 7.62939 17.2628 6.89136C17.2375 6.86636 17.2117 6.84076 17.1855 6.81454C17.1592 6.78832 17.1336 6.76253 17.1086 6.73717C16.3706 5.98832 16.442 4.96532 17.1855 4.22184Z" fill="#637381"/>
    <Path d="M4.22184 17.1855C3.47836 17.9289 3.40696 18.9519 4.14502 19.7008C4.17002 19.7262 4.19562 19.7519 4.22184 19.7782C4.24806 19.8044 4.27384 19.83 4.29921 19.855C5.04806 20.593 6.07106 20.5216 6.81454 19.7782C7.55802 19.0347 7.62939 18.0117 6.89136 17.2628C6.86636 17.2375 6.84076 17.2117 6.81454 17.1855C6.78832 17.1592 6.76253 17.1336 6.73717 17.1086C5.98832 16.3706 4.96532 16.442 4.22184 17.1855Z" fill="#637381"/>
    <Path d="M2.83333 13.8333C1.78189 13.8333 1.00805 13.1604 1.00039 12.109C1.00013 12.0734 1 12.0371 1 12C1 11.9629 1.00013 11.9266 1.00039 11.891C1.00805 10.8396 1.78189 10.1667 2.83333 10.1667C3.88475 10.1667 4.6586 10.8396 4.6663 11.891C4.66654 11.9266 4.66667 11.9629 4.66667 12C4.66667 12.0371 4.66654 12.0734 4.6663 12.109C4.6586 13.1604 3.88475 13.8333 2.83333 13.8333Z" fill="#637381"/>
    <Path d="M21.1667 13.8333C22.2181 13.8333 22.9919 13.1604 22.9996 12.109C22.9999 12.0734 23 12.0371 23 12C23 11.9629 22.9999 11.9266 22.9996 11.891C22.9919 10.8396 22.2181 10.1667 21.1667 10.1667C20.1152 10.1667 19.3414 10.8396 19.3337 11.891C19.3335 11.9266 19.3333 11.9629 19.3333 12C19.3333 12.0371 19.3335 12.0734 19.3337 12.109C19.3414 13.1604 20.1152 13.8333 21.1667 13.8333Z" fill="#637381"/>
    <Path d="M4.22184 6.81454C3.47836 6.07106 3.40695 5.04806 4.14502 4.29921C4.17002 4.27384 4.19562 4.24806 4.22184 4.22184C4.24806 4.19562 4.27384 4.17002 4.29921 4.14502C5.04806 3.40695 6.07106 3.47836 6.81454 4.22184C7.55802 4.96532 7.62939 5.98832 6.89136 6.73717C6.86636 6.76253 6.84076 6.78832 6.81454 6.81454C6.78832 6.84076 6.76253 6.86636 6.73717 6.89136C5.98832 7.62939 4.96532 7.55802 4.22184 6.81454Z" fill="#637381"/>
    <Path d="M17.1855 19.7782C17.9289 20.5216 18.9519 20.593 19.7008 19.855C19.7262 19.83 19.7519 19.8044 19.7782 19.7782C19.8044 19.7519 19.83 19.7262 19.855 19.7008C20.593 18.9519 20.5216 17.9289 19.7782 17.1855C19.0347 16.442 18.0117 16.3706 17.2628 17.1086C17.2375 17.1336 17.2117 17.1592 17.1855 17.1855C17.1592 17.2117 17.1336 17.2375 17.1086 17.2628C16.3706 18.0117 16.442 19.0347 17.1855 19.7782Z" fill="#637381"/>
    </G>
  </Svg>
);

const Logout = () => {
  const navigation = useNavigation(); 
  const { isDarkMode } = useContext(ThemeContext);

  const handleLogout = async () => {
    try {
      await user_logout();
      await AsyncStorage.removeItem('userToken');
      navigation.navigate('Login'); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={styles.logoutContainer}>
      <LogoutIcon width={24} height={24} />
      <Text style={[styles.logoutText, isDarkMode && styles.darkText]}>Logout</Text>
    </TouchableOpacity>
  );
};

const NotificationIconWithBadge = ({ isDarkMode, count, onPress }) => (
  <View>
    <TouchableOpacity onPress={onPress}>
      <NotificationIcon isDarkMode={isDarkMode} />
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
        </View>
      )}
    </TouchableOpacity>
  </View>
);

const NotificationContent = ({ isDarkMode, closeNotification }) => {
  const [activeTab, setActiveTab] = useState('unread');
  const slideAnimation = useRef(new Animated.Value(0)).current;

  const switchTab = (tab) => {
    setActiveTab(tab);
    Animated.timing(slideAnimation, {
      toValue: tab === 'unread' ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const UnreadContent = () => (
    <View>
      <Text style={[styles.noNotificationsText, isDarkMode && styles.darkText]}>
        There is no new notifications.
      </Text>
    </View>
  );

  const AllContent = () => (
    <View>
      <Text style={[styles.noNotificationsText, isDarkMode && styles.darkText]}>
        All notifications will be displayed here.
      </Text>
    </View>
  );

  const lineWidth = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['100%', '0%']
  });

  return (
    <View style={[styles.notificationContent, isDarkMode && styles.darkNotificationContent]}>
      <View style={styles.header}>
        <Text style={[styles.notificationTitle, isDarkMode && styles.darkText]}>Notification</Text>
        <TouchableOpacity onPress={closeNotification} style={styles.closeButton}>
          <TickIcon />
        </TouchableOpacity>
      </View>
      <View style={[styles.divider1, isDarkMode && styles.darkDivider1]} />
      <View style={styles.notificationTabs}>
        <TouchableOpacity
          style={styles.tabContainer}
          onPress={() => switchTab('unread')}
        >
          <Text style={[
            styles.tabText,
            isDarkMode && styles.darkText,
            activeTab === 'unread', isDarkMode && styles.activeTabText
          ]}>
            Unread
          </Text>
          <View style={[styles.countBadge, isDarkMode && styles.darkCountBadge]}>
            <Text style={[styles.countText, isDarkMode && styles.darkCountText]}>0</Text>
          </View>
          <Animated.View style={[styles.tabLine, { width: lineWidth }]} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabContainer}
          onPress={() => switchTab('all')}
        >
          <Text style={[
            styles.tabText,
            isDarkMode && styles.darkText,
            activeTab === 'all' && styles.activeTabText
          ]}>
            All
          </Text>
          <View style={[styles.countBadge, styles.allCountBadge, isDarkMode && styles.darkAllCountBadge]}>
            <Text style={[styles.countText, styles.allCountText, isDarkMode && styles.darkAllCountText]}>0</Text>
          </View>
          <Animated.View style={[styles.tabLine, { width: slideAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%']
          }) }]} />
        </TouchableOpacity>
      </View>
      <View style={[styles.divider, isDarkMode && styles.darkDivider]} />
      {activeTab === 'unread' ? <UnreadContent /> : <AllContent />}
    </View>
  );
};

const DrawerNavigator = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const slideAnimation = useRef(new Animated.Value(Dimensions.get('window').width)).current;
  const [notificationCount, setNotificationCount] = useState(150);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const openNotification = () => {
    setIsNotificationVisible(true);
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  
  const closeNotification = () => {
    Animated.timing(slideAnimation, {
      toValue: Dimensions.get('window').width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsNotificationVisible(false));
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <Drawer.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: isDarkMode ? '#161c24' : '#f9fafb',
          },
          headerTintColor: isDarkMode ? '#fff' : '#333',
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginLeft: 10 }}>
              <MenuIcon isDarkMode={isDarkMode} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{ marginRight: 16, justifyContent: 'center' }}>
              <NotificationIconWithBadge 
                isDarkMode={isDarkMode}
                count={notificationCount}
                onPress={openNotification}
              />
            </View>
          ),
          drawerStyle: {
            backgroundColor: isDarkMode ? '#222' : '#ffffff',
            width: 290,
          },
          drawerLabelStyle: {
            fontFamily: 'CustomFont-Medium',
            fontSize: 18,
            color: isDarkMode ? '#fff' : '#333',
          },
        })}
        drawerContent={(props) => (
          <View style={[styles.drawerContent, isDarkMode && styles.darkDrawerContent]}>
            <Image 
              source={isDarkMode ? s4elImageWhite : s4elImage} 
              style={styles.drawerImage} 
              resizeMode="contain" 
            />
            <Text style={[styles.drawerHeader, isDarkMode && styles.darkText]}>GENERAL</Text>
            <DrawerItemList {...props} />
            <View style={styles.footerContainer}>
              <View style={styles.themeContainer}>
                <Text style={[styles.themeText, isDarkMode && styles.darkText]}>THEME</Text>
                <View style={styles.themeButtonsContainer}>
                <TouchableOpacity 
                  style={[
                    styles.themeButton, 
                    !isDarkMode ? styles.lightThemeButton : styles.darkThemeButton,
                    !isDarkMode && styles.activeThemeButton,
                    !isDarkMode && styles.activeLightThemeButton
                  ]} 
                  onPress={() => setIsDarkMode(false)}
                >
                  <LightIcon />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[
                    styles.themeButton, 
                    isDarkMode ? styles.darkThemeButton : styles.lightThemeButton,
                    isDarkMode && styles.activeThemeButton,
                    isDarkMode && styles.activeDarkThemeButton
                  ]} 
                  onPress={() => setIsDarkMode(true)}
                >
                  <DarkIcon />
                </TouchableOpacity>
                </View>
                </View>
              <View style={styles.dashedLine} />
              <Logout />
              <View style={styles.dashedLine} />
              <Text style={[styles.versionText, isDarkMode && styles.darkText]}>v1.0.0-beta.1</Text>
            </View>
          </View>
        )}
      >
        <Drawer.Screen 
          name="Dashboard" 
          component={Dashboard} 
          options={{
            drawerIcon: ({ focused, size }) => (
              <DashboardIcon />
            ),
            headerTitle: '',
          }}
        />
        <Drawer.Screen 
          name="Settings" 
          component={Settings} 
          options={{
            drawerIcon: ({ focused, size }) => (
              <SettingsIcon />
            ),
            headerTitle: '',
          }}
        />
      </Drawer.Navigator>
      <Modal
        visible={isNotificationVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeNotification}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeNotification}
        >
          <Animated.View
            style={[
              styles.notificationContainer,
              isDarkMode && styles.darkNotificationContainer,
              { transform: [{ translateX: slideAnimation }] }
            ]}
          >
            <NotificationContent isDarkMode={isDarkMode} />
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </ThemeContext.Provider>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 20,
  },
  darkDrawerContent: {
    backgroundColor: '#161c24',
  },
  drawerImage: {
    width: 125, 
    height: 125, 
    alignSelf: 'center',
    marginTop: 10,
    marginRight: 130,
  },
  drawerHeader: {
    fontFamily: 'CustomFont-Bold',
    fontSize: 14,
    color: '#333',
    marginLeft: 16,
    marginTop: 16,
  },
  themeContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 2,
  },
  themeText: {
    fontFamily: 'CustomFont-Bold',
    fontSize: 14,
    color: '#333',
    marginBottom: -85,
    textAlign: 'left',
  },
  themeButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingHorizontal: 20,
  },
  themeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
    height: 60,
    borderRadius: 8,
    borderWidth: 1, 
    marginTop: 85,
    shadowOffset: { width: 5, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    marginHorizontal: 10,
  },
  lightThemeButton: {
    backgroundColor: '#ffffff',
    borderColor: '#ccc', 
    shadowColor: '#ccc',
  },
  darkThemeButton: {
    backgroundColor: '#161c24',
    borderColor: '#3c4752',
    shadowColor: '#000',
  },
  activeThemeButton: {
    borderWidth: 2,
  },
  activeLightThemeButton: {
    borderColor: '#3c4752',
  },
  activeDarkThemeButton: {
    borderColor: '#ccc',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  logoutText: {
    fontFamily: 'CustomFont-SemiBold',
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  dashedLine: {
    borderBottomColor: 'rgba(99, 115, 129, 0.3)',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    width: '110%',
    marginVertical: 10,
  },
  versionText: {
    textAlign: 'center',
    color: '#2A333E',
    fontFamily: 'CustomFont-Regular',
    fontSize: 13,
    marginTop: 8,
  },
  darkText: {
    color: '#8c98a6',
  },
  activeThemeButton: {
    borderColor: '#3c4752',
    borderWidth: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  notificationContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '80%',
    backgroundColor: '#f4f6f8',
    padding: 20,
    borderLeftWidth: 1,
    borderLeftColor: '#E5E8EB',
  },
  darkNotificationContainer: {
    backgroundColor: '#161c24',
    borderLeftColor: '#2A333E',
  },
  notificationContent: {
    flex: 1,
  },
  darkNotificationContent: {
    backgroundColor: '#161c24',
  },
  notificationTitle: {
    fontFamily: 'CustomFont-Bold',
    fontSize: 24,
    color: '#333',
    marginBottom: -15,
  },
  notificationTabs: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  tabText: {
    fontFamily: 'CustomFont-Bold',
    fontSize: 16,
    color: '#667684',
    marginRight: 8,
  },
  countBadge: {
    backgroundColor: '#d7ecf4',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  darkCountBadge: {
    backgroundColor: '#d7ecf4',
  },
  countText: {
    fontFamily: 'CustomFont-SemiBold',
    fontSize: 14,
    color: '#036d9d',
  },
  darkCountText: {
    color: '#036d9d',
  },
  allCountBadge: {
    backgroundColor: '#161C24',
  },
  darkAllCountBadge: {
    backgroundColor: '#000000',
  },
  allCountText: {
    color: '#FFFFFF',
  },
  darkAllCountText: {
    color: '#ffffff',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E8EB',
    marginVertical: 16,
  },
  darkDivider: {
    backgroundColor: '#2A333E',
  },
  divider1: {
    height: 1,
    backgroundColor: '#E5E8EB',
    marginVertical: 16,
  },
  darkDivider1: {
    backgroundColor: '#2A333E',
  },
  noNotificationsText: {
    fontFamily: 'CustomFont-Regular',
    fontSize: 16,
    color: '#637381',
    textAlign: 'center',
  },
  darkText: {
    color: '#B0BEC5',
  },
  buttonText: {
    color: '#000', 
    fontSize: 18,
    fontFamily: 'CustomFont-Se',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  closeButton: {
    marginTop: 16,
    marginLeft: 'auto',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    width: '50%',
    height: 2,
    backgroundColor: '#00AB55',
  },
  activeTabText: {
    color: '#212b36',
  },
  tabLine: {
    height: 3,
    backgroundColor: '#1a4466', 
    position: 'absolute',
    bottom: 0,
    bottom: -25,
    left: 0,
  },
  badge: {
    position: 'absolute',
    right: -9,
    top: -4,
    backgroundColor: 'red',
    borderRadius: 12,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default DrawerNavigator;