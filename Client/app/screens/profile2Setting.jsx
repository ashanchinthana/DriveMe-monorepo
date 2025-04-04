import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

export default function ProfileSettingsScreen() {
  const router = useRouter();

  const settingsOptions = [
    
    {
      title: 'Change Mobile number',
      onPress: () => router.push('/screens/profile2Setting1')
    },
    {
      title: 'Change Password',
      onPress: () => router.push('/screens/profile2Setting3')
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Half Circle Header with Logo */}

       {/* Back Button */}
              <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#333" />
              </TouchableOpacity>

      <View style={styles.header}>
        <Image
          source={require('../../assets/images/z.png')} //DRIVE ME LOGO
          style={styles.image}
        />
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profile Settings</Text>
      </View>

      {/* Settings Options */}
      <View style={styles.optionsContainer}>
        {settingsOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={option.onPress}
          >
            <Text style={styles.optionText}>{option.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]} onPress={() => router.push('/screens/profile')}>
          <FontAwesome name="user" size={24} color="#1E88E5" />
          <Text style={[styles.navText, styles.activeNavText]}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/screens/notifications')}>
          <Ionicons name="notifications-outline" size={24} color="#666" />
          <Text style={styles.navText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/screens/home')}>
          <Ionicons name="home-outline" size={24} color="#666" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/screens/settings')}>
          <Ionicons name="settings-outline" size={24} color="#666" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/screens/help-support')}>
          <MaterialIcons name="help-outline" size={24} color="#666" />
          <Text style={styles.navText}>Help/Support</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: 250, 
    backgroundColor: '#D3D3D3', 
    borderBottomLeftRadius: 300,
    borderBottomRightRadius: 300,
    alignItems: 'center',
    justifyContent: 'center',
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
   
  },
  optionsContainer: {
    paddingHorizontal: 20,
    marginTop: 100,
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: '#E5E5E5',
    borderRadius: 150,
    padding: 46,
    marginBottom: 45,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
    fontWeight: 'bold',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  navItem: {
    alignItems: 'center',
  },
  activeNavItem: {
    // Styling for the active navigation item
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  activeNavText: {
    color: '#1E88E5'
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