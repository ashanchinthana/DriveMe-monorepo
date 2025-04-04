import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  Linking,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';

export default function ContactLawyerScreen() {
  const router = useRouter();

  const lawyers = [
    {
      name: 'Kasun silva',
      phone: '+94 234567890',
      email: 'kasun@gmail.com',
      address: '48/5 Pitipana, Homagama, Colombo'
    },
    {
      name: 'Dasun charuka',
      phone: '+94 234562699',
      email: 'dasun86@gmail.com',
      address: '54, Homagama, Maharagama'
    }
  ];

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmail = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleLocation = (address) => {
    // This would typically open maps with the location
    // For simplicity, we're just showing an alert
    alert(`Would navigate to: ${address}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/z.png')} //DRIVE ME LOGO
          style={styles.image}
        />
      </View>

     
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Contact lawyer</Text>
        </View>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Lawyers List */}
        {lawyers.map((lawyer, index) => (
          <View key={index} style={styles.lawyerCard}>
            <Text style={styles.lawyerName}>{lawyer.name}</Text>
            
            <TouchableOpacity 
              style={styles.contactRow}
              onPress={() => handleCall(lawyer.phone)}
            >
              <Feather name="phone" size={18} color="#333" />
              <Text style={styles.contactText}>{lawyer.phone}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.contactRow}
              onPress={() => handleEmail(lawyer.email)}
            >
              <Feather name="mail" size={18} color="#333" />
              <Text style={styles.contactText}>{lawyer.email}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.contactRow}
              onPress={() => handleLocation(lawyer.address)}
            >
              <Feather name="map-pin" size={18} color="#333" />
              <Text style={styles.contactText}>{lawyer.address}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => router.push('/screens/profile')}
        >
          <FontAwesome name="user" size={24} color="#666" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => router.push('/screens/notifications')}
        >
          <Ionicons name="notifications-outline" size={24} color="#666" />
          <Text style={styles.navText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => router.push('/screens/home')}
        >
          <Ionicons name="home-outline" size={24} color="#666" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => router.push('/screens/settings')}
        >
          <Ionicons name="settings-outline" size={24} color="#666" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navItem, styles.activeNavItem]} 
          onPress={() => router.push('/screens/help-support')}
        >
          <View style={styles.activeIconCircle}>
            <MaterialIcons name="help-outline" size={24} color="white" />
          </View>
          <Text style={[styles.navText, styles.activeNavText]}>Help/Support</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80, // Space for bottom navigation
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
  },
  titleContainer: {
    width: '80%',
    backgroundColor: '#E5E5E5',
    alignSelf: 'center',
    marginTop: 20,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  lawyerCard: {
    width: '90%',
    backgroundColor: '#E5E5E5',
    alignSelf: 'center',
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
  },
  lawyerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  contactText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
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
  activeIconCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#1E88E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  activeNavText: {
    color: '#1E88E5',
  },
});