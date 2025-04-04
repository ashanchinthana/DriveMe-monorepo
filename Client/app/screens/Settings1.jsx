import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

export default function PaymentSettingsScreen() {
  const router = useRouter();

  const handleAddCard = () => {
    // Navigate to add card screen
    router.push('/screens/add-card');
  };

  const handleRemoveCard = () => {
    // Show confirmation dialog before removing card
    alert('Are you sure you want to remove this card?');
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

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Payment Settings</Text>
        </View>

        {/* Payment Card */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardType}>VISA</Text>
            </View>
            <View style={styles.cardNumberContainer}>
              <Text style={styles.cardNumber}>• • • •  • • • •  • • • •  5678</Text>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.cardHolderName}>Alexander</Text>
              <Text style={styles.cardExpiry}>12/26</Text>
            </View>
          </View>
        </View>

        {/* Add Card Button */}
        <TouchableOpacity style={styles.actionButton}onPress={() => router.push('/screens/addCard')}>
          <Text style={styles.actionButtonText}>Add Card</Text>
        </TouchableOpacity>

        {/* Remove Card Button */}
        <TouchableOpacity style={styles.actionButton} onPress={()=>router.push('/screens/removeCard')}>
          <Text style={styles.actionButtonText}>Remove Card</Text>
        </TouchableOpacity>
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
          <Ionicons name="settings-outline" size={24} color="#1E88E5" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => router.push('/screens/help-support')}
        >
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
    borderColor: '#1E88E5',
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
  cardContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  card: {
    width: '90%',
    height: 180,
    backgroundColor: '#1E88E5', // VISA blue
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
  },
  cardHeader: {
    alignItems: 'flex-end',
  },
  cardType: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardNumberContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  cardNumber: {
    color: 'white',
    fontSize: 18,
    letterSpacing: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cardHolderName: {
    color: 'white',
    fontSize: 16,
  },
  cardExpiry: {
    color: 'white',
    fontSize: 16,
  },
  actionButton: {
    backgroundColor: '#E5E5E5',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
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
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
});