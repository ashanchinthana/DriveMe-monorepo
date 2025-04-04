import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  SafeAreaView,
  ScrollView,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

export default function RemoveCardScreen() {
  const router = useRouter();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemoveCard = () => {
    setIsRemoving(true);
    
    // Show confirmation dialog
    Alert.alert(
      "Remove Card",
      "Are you sure you want to remove this card?",
      [
        {
          text: "Cancel",
          onPress: () => setIsRemoving(false),
          style: "cancel"
        },
        { 
          text: "Remove", 
          onPress: () => {
            // Card removal logic would go here
            
            // Show success message
            Alert.alert(
              "Success",
              "Card removed successfully",
              [
                { 
                  text: "OK", 
                  onPress: () => router.push('/screens/Settings1')
                }
              ]
            );
          },
          style: "destructive"
        }
      ]
    );
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
          <Text style={styles.title}>Remove Card</Text>
        </View>

        {/* Card Preview */}
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

        {/* Remove Button */}
        <TouchableOpacity 
          style={styles.removeButton} 
          onPress={handleRemoveCard}
          disabled={isRemoving}
        >
          <Text style={styles.removeButtonText}>
            {isRemoving ? 'Removing...' : 'Remove'}
          </Text>
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
  removeButton: {
    backgroundColor: '#0A235C', // Dark blue button
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 16,
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
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
});