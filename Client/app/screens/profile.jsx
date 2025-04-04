import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const router = useRouter();
  const user = {
    name: 'Your name',
    email: 'yourname@gmail.com'
  };

  const menuItems = [
    {
      title: 'My Profile',
      icon: <Ionicons name="person-outline" size={24} color="black" />, 
      onPress: () => router.push('/screens/profile1My')
    },
    {
      title: 'Setting',
      icon: <Ionicons name="settings-outline" size={24} color="black" />, 
      onPress: () => router.push('/screens/profile2Setting')
    },
    {
      title: 'Log Out',
      icon: <MaterialIcons name="logout" size={24} color="black" />, 
      onPress: () => {
        router.push('/');
      }
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Half Circle Header */}
      <View style={styles.halfCircle}>

        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>


        <Image
          source={require('../../assets/images/z.png')} //DRIVE ME LOGO
          style={styles.image}
        />
      </View>

      {/* Profile Information */}
      <View style={styles.profileContainer}>
        <Image 
          source={require('../../assets/images/5.png')} 
          style={styles.profileImage} 
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <View style={styles.menuIconContainer}>
              {item.icon}
            </View>
            <Text style={styles.menuText}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  halfCircle: {
    width: '100%',
    height: 250,
    backgroundColor: '#D3D3D3',
    borderBottomLeftRadius: 300,
    borderBottomRightRadius: 300,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
  },
  image: {
    width: 250, // Adjust width as needed
    height: 250, // Adjust height as needed
    resizeMode: 'contain', // Ensures the image maintains aspect ratio
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 300,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E0E0E0',
  },
  profileInfo: {
    marginLeft: 15,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuIconContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
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