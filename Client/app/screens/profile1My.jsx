import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  Image,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    mobile: '',
    location: ''
  });

  const clearEmail = () => {
    setUserData({...userData, email: ''});
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button - keep outside ScrollView for fixed position */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      {/* Half-Circle Header with Logo - keep outside ScrollView for fixed position */}
      <View style={styles.halfCircle}>
        <Image
          source={require('../../assets/images/z.png')} //DRIVE ME LOGO
          style={styles.image}
        />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Profile</Text>
        </View>

        {/* Profile Information */}
        <View style={styles.profileContainer}>
          <View style={styles.userInfoContainer}>
            <Image 
              source={require('../../assets/images/5.png')} 
              style={styles.profileImage}
            />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{userData.name || 'Your name'}</Text>
              <View style={styles.emailContainer}>
                <Text style={styles.userEmail}>{userData.email || 'yourname@gmail.com'}</Text>
                <TouchableOpacity onPress={clearEmail} style={styles.clearButton}>
                  <Text style={styles.clearButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Name</Text>
              <TextInput
                style={styles.fieldInput}
                value={userData.name}
                onChangeText={(text) => setUserData({...userData, name: text})}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                style={styles.fieldInput}
                value={userData.email}
                onChangeText={(text) => setUserData({...userData, email: text})}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Mobile number</Text>
              <TextInput
                style={styles.fieldInput}
                value={userData.mobile}
                onChangeText={(text) => setUserData({...userData, mobile: text})}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Postal code</Text>
              <TextInput
                style={styles.fieldInput}
                value={userData.location}
                onChangeText={(text) => setUserData({...userData, location: text})}
              />
            </View>

            <TouchableOpacity 
              style={styles.saveButton}
              onPress={() => alert('Profile changes saved!')}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Add bottom padding to ensure content doesn't get hidden behind navigation bar */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Bottom Navigation Bar - keep outside ScrollView for fixed position */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <View style={styles.activeIconCircle}>
            <FontAwesome5 name="user" size={20} color="white" />
          </View>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => router.push('/screens/Notifications')}
        >
          <Ionicons name="notifications-outline" size={24} color="#777" />
          <Text style={styles.navText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => router.push('/screens/home')}
        >
          <Ionicons name="home" size={24} color="#777" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/screens/Settings')}
        >
          <Ionicons name="menu" size={24} color="#777" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => router.push('/screens/HelpSupport')}
        >
          <MaterialIcons name="support-agent" size={24} color="#777" />
          <Text style={styles.navText}>Help/Support</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingTop: 250, // Start content below the header
  },
  halfCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 250, 
    backgroundColor: '#D3D3D3', 
    borderBottomLeftRadius: 300,
    borderBottomRightRadius: 300,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1, // Ensure the half circle is below the back button
  },
  image: {
    width: 250, // Adjust width as needed
    height: 250, // Adjust height as needed
    resizeMode: 'contain', // Ensures the image maintains aspect ratio
  },
  titleContainer: {
    width: '90%',
    backgroundColor: '#E5E5E5',
    alignSelf: 'center',
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  profileContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  clearButton: {
    padding: 5,
  },
  clearButtonText: {
    fontSize: 14,
    color: '#666',
  },
  formContainer: {
    marginTop: 15,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 20,
    fontWeight : 'bold',
    color: '#333',
    marginBottom: 5,
  },
  fieldInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    paddingVertical: 8,
    fontSize: 15,
  },
  saveButton: {
    backgroundColor: '#0A66C2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
    alignSelf: 'flex-start',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  bottomPadding: {
    height: 80, // Add padding at the bottom to prevent content from being hidden by the nav bar
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  activeNavItem: {
    alignItems: 'center',
  },
  activeIconCircle: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#0A66C2',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 2,
    color: '#777',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  }
});