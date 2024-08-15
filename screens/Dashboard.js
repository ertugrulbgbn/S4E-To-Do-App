import React, { useState, useContext } from 'react';
import { View, FlatList, StyleSheet, Dimensions, ScrollView, Text, TouchableOpacity, Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { ThemeContext } from '../DrawerNavigator';

const LeftArrowIcon = ({ color }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 1024 1024">
    <Path fill={color} d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0"/>
  </Svg>
);

const RightArrowIcon = ({ color }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 1024 1024">
    <Path fill={color} d="M338.752 104.704a64 64 0 0 0 0 90.496L655.552 512l-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0"/>
  </Svg>
);

const data = [
  { asset: 'yusufgunes.s4e.link', severity: [4, 1, 0, 0, 0] },
  { asset: 'web.s4e.link', severity: [15, 2, 1, 0, 0] },
  { asset: 'vuln.s4e.link', severity: [19, 1, 17, 5, 4] },
  { asset: 'test.s4e.link', severity: [4, 1, 0, 0, 0] },
  { asset: 'siberkuvvet.com', severity: [10, 0, 2, 0, 0], test: 'test' },
  { asset: 'netsys.s4e.link', severity: [4, 1, 0, 0, 0] },
  { asset: 'may.s4e.link', severity: [4, 1, 0, 0, 0] },
  { asset: 'kubra.s4e.link', severity: [4, 1, 0, 0, 0] },
  { asset: 'domain.s4e.link', severity: [4, 1, 0, 0, 0] },
  { asset: 'deneme.s4e.link', severity: [4, 1, 0, 0, 0] },
  { asset: 'extra1.s4e.link', severity: [5, 2, 1, 1, 0] },
  { asset: 'extra2.s4e.link', severity: [3, 3, 3, 0, 0] },
  { asset: 'extra3.s4e.link', severity: [7, 0, 1, 2, 1] },
];

const severityColors = {
  light: ['#E6F3FF', '#E6FFE6', '#FFE6E6', '#FFE0E6', '#F2E6FF'],
  dark: ['#1f445a', '#374b2b', '#4c332b', '#402236', '#2f2440']
};

const bulletins = [
  {
    type: 'News',
    date: '07 Oct 2023',
    title: 'Chinese Hackers Target Semiconductor Firms in East Asia with Cobalt Strike',
    description: 'Threat actors have been observed targeting semiconductor companies in East Asia with lures masquerading as Taiwan Semiconductor Manufacturing Company (TSMC) that are designed to deliver Cobalt...',
  },
  {
    type: 'Alerts',
    date: '15 Oct 2023',
    title: 'FBI, CISA Warn of Rising AvosLocker Ransomware Attacks Against Critical I...',
    description: 'The AvosLocker ransomware gang has been linked to attacks against critical infrastructure sectors in the U.S., with some of them detected as recently as May 2023. That is according to a...',
  },
  {
    type: 'News',
    date: '15 Oct 2023',
    title: 'DarkGate Malware Spreading via Messaging Services Posing as PDF Files',
    description: 'A piece of malware known as DarkGate has been observed being spread via instant messaging platforms such as Skype and Microsoft Teams. In these attacks, the messaging apps are used to...',
  },
];

const { width } = Dimensions.get('window');

const ITEMS_PER_PAGE = 10;
const ITEM_HEIGHT = 46; 
const LIST_HEIGHT = ITEM_HEIGHT * ITEMS_PER_PAGE;

export const Dashboard = () => {
  const [activeBulletin, setActiveBulletin] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const { isDarkMode } = useContext(ThemeContext);
  const bulletinAnimation = React.useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = useState(false);

  const paginateData = (data, page) => {
    const startIndex = page * ITEMS_PER_PAGE;
    return data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(0, prevPage - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(totalPages - 1, prevPage + 1));
  };

  const getStyles = (baseStyles, darkModeStyles) => {
    return isDarkMode ? { ...baseStyles, ...darkModeStyles } : baseStyles;
  };

  const animateBulletin = (nextIndex) => {
    bulletinAnimation.setValue(1);
    Animated.timing(bulletinAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const bulletinTranslate = bulletinAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Dimensions.get('window').width],
  });

  const leftArrowColor = currentPage === 0 ? (isDarkMode ? '#555555' : '#a7b1bc') : (isDarkMode ? '#FFFFFF' : '#000000');
  const rightArrowColor = currentPage === totalPages - 1 ? (isDarkMode ? '#555555' : '#a7b1bc') : (isDarkMode ? '#FFFFFF' : '#000000');

  const currentSeverityColors = isDarkMode ? severityColors.dark : severityColors.light;

  return (
    <ScrollView
      contentContainerStyle={getStyles(styles.scrollContainer, darkStyles.scrollContainer)}
      showsVerticalScrollIndicator={true} 
      style={getStyles(styles.scrollView, darkStyles.scrollView)}
    >
      <View style={getStyles(styles.additionalContainer, darkStyles.additionalContainer)}>
        <Text style={getStyles(styles.infoTitle, darkStyles.infoTitle)}>Information</Text>
        <View style={[styles.infoValueContainer, isDarkMode && darkStyles.infoValueContainer]}>
          <Text style={getStyles(styles.infoValue, darkStyles.infoValue)}>7</Text>
        </View>
      </View>
      <View style={getStyles(styles.additionalContainer, darkStyles.additionalContainer)}>
        <Text style={getStyles(styles.infoTitle, darkStyles.infoTitle)}>Low</Text>
        <View style={[styles.lowValueContainer, isDarkMode && darkStyles.lowValueContainer]}>
          <Text style={getStyles(styles.infoValue, darkStyles.infoValue)}>11</Text>
        </View>
      </View>
      <View style={getStyles(styles.additionalContainer, darkStyles.additionalContainer)}>
        <Text style={getStyles(styles.infoTitle, darkStyles.infoTitle)}>Medium</Text>
        <View style={[styles.medValueContainer, isDarkMode && darkStyles.medValueContainer]}>
          <Text style={getStyles(styles.infoValue, darkStyles.infoValue)}>200</Text>
        </View>
      </View>
      <View style={getStyles(styles.additionalContainer, darkStyles.additionalContainer)}>
        <Text style={getStyles(styles.infoTitle, darkStyles.infoTitle)}>High</Text>
        <View style={[styles.highValueContainer, isDarkMode && darkStyles.highValueContainer]}>
          <Text style={getStyles(styles.infoValue, darkStyles.infoValue)}>5000</Text>
        </View>
      </View>
      <View style={getStyles(styles.additionalContainer, darkStyles.additionalContainer)}>
        <Text style={getStyles(styles.infoTitle, darkStyles.infoTitle)}>Critical</Text>
        <View style={[styles.criValueContainer, isDarkMode && darkStyles.criValueContainer]}>
          <Text style={getStyles(styles.infoValue, darkStyles.infoValue)}>3000000</Text>
        </View>
      </View>
  
      <View style={getStyles(styles.horizontalScrollContainer, darkStyles.horizontalScrollContainer)}>
        <View style={getStyles(styles.headerContainer, darkStyles.headerContainer)}>
          <Text style={getStyles(styles.headerTitle1, darkStyles.headerTitle1)}>Asset</Text>
          <Text style={getStyles(styles.headerTitle2, darkStyles.headerTitle2)}>Severity</Text>
        </View>
        <FlatList
          data={paginateData(data, currentPage)}
          keyExtractor={(item) => item.asset}
          renderItem={({ item }) => (
            <View style={[
              styles.row, 
              isDarkMode && darkStyles.row
            ]}>
              <View style={styles.assetColumn}>
                <Text style={getStyles(styles.assetText, darkStyles.assetText)}>{item.asset}</Text>
                {item.test && <Text style={getStyles(styles.testText, darkStyles.testText)}>{item.test}</Text>}
              </View>
              <View style={styles.severityColumn}>
                {item.severity.map((count, index) => (
                  <View key={index} style={[styles.severityBadge, { backgroundColor: currentSeverityColors[index] }]}>
                    <Text style={getStyles(styles.severityText, darkStyles.severityText)}>{count}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          style={{ height: LIST_HEIGHT }}
          contentContainerStyle={{ minHeight: LIST_HEIGHT }}
          scrollEnabled={false}
        />
        
        <View style={getStyles(styles.navigationContainer, darkStyles.navigationContainer)}>
          <TouchableOpacity 
            style={styles.navigationButton}
            onPress={goToPrevPage}
            disabled={currentPage === 0}
          >
            <LeftArrowIcon color={leftArrowColor} />
          </TouchableOpacity>

          <Text style={getStyles(styles.pageIndicator, darkStyles.pageIndicator)}>
            Page {currentPage + 1} of {totalPages}
          </Text>

          <TouchableOpacity 
            style={styles.navigationButton}
            onPress={goToNextPage}
            disabled={currentPage === totalPages - 1}
          >
            <RightArrowIcon color={rightArrowColor} />
          </TouchableOpacity>
        </View>
      </View>
  
      <View style={getStyles(styles.securityBulletinContainer, darkStyles.securityBulletinContainer)}>
        <Text style={getStyles(styles.securityBulletinHeader, darkStyles.securityBulletinHeader)}>Security Bulletins</Text>
        <Animated.View 
          style={[
            styles.bulletinContent, 
            darkStyles.bulletinContent,
            {
              transform: [{ translateX: bulletinTranslate }],
            },
          ]}
        >
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>{bulletins[activeBulletin].type}</Text>
          </View>
          <Text style={getStyles(styles.bulletinDate, darkStyles.bulletinDate)}>{bulletins[activeBulletin].date}</Text>
          <Text style={getStyles(styles.bulletinTitle, darkStyles.bulletinTitle)}>{bulletins[activeBulletin].title}</Text>
          <Text style={getStyles(styles.bulletinDescription, darkStyles.bulletinDescription)}>
            {bulletins[activeBulletin].description}
          </Text>
          <TouchableOpacity style={getStyles(styles.readMoreButton, darkStyles.readMoreButton)}>
            <Text style={getStyles(styles.readMoreText, darkStyles.readMoreText)}>Read More</Text>
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.bulletinPagination}>
          <TouchableOpacity 
            style={styles.paginationButton}
            onPress={() => {
              const newIndex = activeBulletin === 0 ? bulletins.length - 1 : activeBulletin - 1;
              setActiveBulletin(newIndex);
              animateBulletin(newIndex);
            }}
          >
            <LeftArrowIcon color={isDarkMode ? "#FFFFFF" : "#000000"} />
          </TouchableOpacity>
          
          <View style={styles.dotContainer1}>
            {bulletins.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === activeBulletin && styles.activeDot,
                  isDarkMode && styles.darkModeDot,
                  index === activeBulletin && isDarkMode && styles.darkModeActiveDot
                ]}
              />
            ))}
          </View>
          
          <TouchableOpacity 
            style={styles.paginationButton}
            onPress={() => {
              const newIndex = (activeBulletin + 1) % bulletins.length;
              setActiveBulletin(newIndex);
              animateBulletin(newIndex);
            }}
          >
            <RightArrowIcon color={isDarkMode ? "#FFFFFF" : "#000000"} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 20,
    position: 'relative',
  },
  row: {
  flexDirection: 'row',
  padding: 10,
  borderBottomWidth: 1,
  alignItems: 'center',
  },
  dotContainer1: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  additionalContainer: {
    width: width * 0.9,
    height: 120,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 2,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: 'CustomFont-Bold',
    marginBottom: 5,
    color: '#212b36',
  },
  infoValueContainer: {
    padding: 10,
    backgroundColor: '#d1eefb',
    borderRadius: 10,
  },
  infoValue: {
    fontSize: 35,
    fontFamily: 'CustomFont-Bold',
    color: '#121e2a',
  },
  lowValueContainer: {
    padding: 10,
    backgroundColor: '#e9f5cc',
    borderRadius: 10,
  },
  medValueContainer: {
    padding: 10,
    backgroundColor: '#feddcc',
    borderRadius: 10,
  },
  highValueContainer: {
    padding: 10,
    backgroundColor: '#f2ccd7',
    borderRadius: 10,
  },
  criValueContainer: {
    padding: 10,
    backgroundColor: '#e1cee1',
    borderRadius: 10,
  },
  horizontalScrollContainer: {
    width: width * 0.9,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 20,
    elevation: 2,
    overflow: 'hidden',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderTopWidth: 0.5,
    borderTopColor: '#eee',
  },
  navigationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  pageIndicator: {
    fontSize: 14,
    fontFamily: 'CustomFont-Regular',
    color: '#333333',
  },
  headerContainer: {
    backgroundColor: '#f4f6f8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderTopLeftRadius: 10,  
    borderTopRightRadius: 10, 
  },
  headerTitle1: {
    fontSize: 16,
    fontFamily: 'CustomFont-Bold',
    color: '#697886',
  },
  headerTitle2: {
    fontSize: 16,
    fontFamily: 'CustomFont-Bold',
    color: '#697886',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  assetColumn: {
    flex: 1,
  },
  assetText: {
    fontSize: 13,
    fontFamily: 'CustomFont-SemiBold',
  },
  testText: {
    fontSize: 12,
    fontFamily: 'CustomFont-Regular',
    color: 'gray',
  },
  severityColumn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  severityBadge: {
    width: 28,
    height: 24,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  severityText: {
    color: '#222c37',
    fontSize: 12,
    fontFamily: 'CustomFont-SemiBold',
  },
  securityBulletinContainer: {
    width: width * 0.9,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  securityBulletinHeader: {
    fontSize: 18,
    fontFamily: 'CustomFont-Bold',
    color: '#212b36',
    marginBottom: 16,
  },
  bulletinContent: {
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
  },
  tagContainer: {
    backgroundColor: '#00a86b',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  tagText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'CustomFont-Regular',
  },
  bulletinDate: {
    color: '#888888',
    fontSize: 12,
    fontFamily: 'CustomFont-Regular',
    marginTop: 8,
  },
  bulletinTitle: {
    fontSize: 16,
    fontFamily: 'CustomFont-Bold',
    color: '#212b36',
    marginTop: 8,
  },
  bulletinDescription: {
    fontSize: 14,
    fontFamily: 'CustomFont-Regular',
    color: '#697886',
    marginTop: 8,
  },
  readMoreButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  readMoreText: {
    color: '#333333',
    fontSize: 14,
    fontFamily: 'CustomFont-SemiBold',
  },
  bulletinPagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
  },
  paginationButton: {
    padding: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#b5c3ce',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#1a4466',
  },
  darkModeDot: {
    backgroundColor: '#555555',
  },
  darkModeActiveDot: {
    backgroundColor: '#FFFFFF',
  },
  expandedBulletinContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    padding: 20,
    zIndex: 1000,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  expandedBulletinType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00a86b',
    marginBottom: 5,
  },
  expandedBulletinDate: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 10,
  },
  expandedBulletinTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  expandedBulletinDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
});

const darkStyles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#3a4651',
  },
  scrollContainer: {
    backgroundColor: '#161c24',
  },
  row: {
    borderBottomColor: '#2e3236', // veya tercih ettiğiniz koyu renk
  },
  navigationContainer: {
    borderTopColor: '#2e3236',
  },
  sliderContainer: {
    backgroundColor: '#1E1E1E',
  },
  additionalContainer: {
    backgroundColor: '#212b36',
  },
  infoTitle: {
    color: '#dedfe1',
  },
  infoValue: {
    color: '#f7f9f9',
  },
  severityText: {
    color: '#f4f5f7',
    fontSize: 12,
    fontFamily: 'CustomFont-SemiBold',
  },
  infoValueContainer: {
    backgroundColor: '#1f445a',
  },
  lowValueContainer: {
    backgroundColor: '#374b2b',
  },
  medValueContainer: {
    backgroundColor: '#4c332b',
  },
  highValueContainer: {
    backgroundColor: '#402236',
  },
  criValueContainer: {
    backgroundColor: '#2f2440',
  },
  horizontalScrollContainer: {
    backgroundColor: '#212b36',
  },
  headerContainer: {
    backgroundColor: '#333d48',
    borderBottomColor: '#333',
  },
  headerTitle1: {
    color: '#8894a1',
  },
  headerTitle2: {
    color: '#8894a1',
  },
  assetText: {
    color: '#E0E0E0',
  },
  testText: {
    color: '#A0A0A0',
  },
  securityBulletinContainer: {
    backgroundColor: '#212b36',
  },
  securityBulletinHeader: {
    color: '#E0E0E0',
  },
  bulletinTitle: {
    color: '#E0E0E0',
  },
  bulletinContent: {
    borderColor: '#212b36',
  },
  bulletinDescription: {
    color: '#B0B0B0',
  },
  readMoreButton: {
    backgroundColor: '#29343f',
  },
  readMoreText: {
    color: '#ffffff',
  },
  pageIndicator: {
    color: '#E0E0E0',
  },
  bulletinDate: {
    color: '#A0A0A0',
  },
  expandedBulletinContainer: {
    backgroundColor: '#212b36',
  },
  expandedBulletinType: {
    color: '#00a86b',
  },
  expandedBulletinDate: {
    color: '#A0A0A0',
  },
  expandedBulletinTitle: {
    color: '#E0E0E0',
  },
  expandedBulletinDescription: {
    color: '#B0B0B0',
  },
});