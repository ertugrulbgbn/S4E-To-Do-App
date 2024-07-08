import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { SvgXml } from 'react-native-svg';

const Stack = createStackNavigator();

const Dashboard = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const openModal = () => {
    setModalVisible(true);
  };

  // SVG XML dizesi
  const svgXmlString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
      <path fill="#637381" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88a9.947 9.947 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20"/>
    </svg>
  `;

  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitle: '',
        headerTintColor: '#FFF',
        headerBackTitleVisible: false,
        headerLeft: null,
        headerRight: () => (
          <TouchableOpacity style={styles.headerRightButton} onPress={openModal}>
            <SvgXml
              xml={svgXmlString} 
              width="32"
              height="32"
              fill="#637381"
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="DashboardScreen">
        {(props) => <DashboardScreen {...props} modalVisible={modalVisible} setModalVisible={setModalVisible} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const DashboardScreen = ({ navigation, modalVisible, setModalVisible }) => {
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.titleText}>User Settings</Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 15,
    elevation: 3,
    marginBottom: 20,
  },
  logoutButtonText: {
    fontFamily: 'CustomFont-Regular',
    marginTop: 1,
    color: '#000',
  },
  headerRightButton: {
    marginRight: 15,
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#ffffff00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 4,
  },
  closeButton: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  closeButtonText: {
    fontFamily: 'CustomFont-Bold',
    color: '#000',
  },
  titleText: {
    fontFamily: 'CustomFont-Bold',
    marginBottom: 10,
  },
});

export default Dashboard;
