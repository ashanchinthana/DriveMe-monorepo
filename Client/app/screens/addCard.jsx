import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

export default function AddCardScreen() {
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleAddCard = () => {
    // Validate inputs
    if (!cardNumber.trim()) {
      alert('Please enter your card number');
      return;
    }
    if (!cardHolderName.trim()) {
      alert('Please enter the card holder name');
      return;
    }
    if (!expiry.trim()) {
      alert('Please enter the expiry date');
      return;
    }
    if (!cvv.trim()) {
      alert('Please enter the CVV');
      return;
    }

    // Add card logic would go here
    alert('Card added successfully');
    
    // Navigate back to payment settings
    router.push('/screens/Settings1');
  };

  const formatCardNumber = (text) => {
    // Remove all non-digit characters
    const cleaned = text.replace(/\D/g, '');
    
    // Limit to 16 digits
    const trimmed = cleaned.substring(0, 16);
    
    // Add spaces after every 4 digits
    const formatted = trimmed.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    return formatted;
  };

  const formatExpiry = (text) => {
    // Remove all non-digit characters
    const cleaned = text.replace(/\D/g, '');
    
    // Limit to 4 digits (MM/YY)
    const trimmed = cleaned.substring(0, 4);
    
    // Add slash after first 2 digits (MM/YY)
    if (trimmed.length > 2) {
      return trimmed.substring(0, 2) + '/' + trimmed.substring(2);
    }
    
    return trimmed;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
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
            <Text style={styles.title}>Add Card</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Card Number */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>CARD NUMBER</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your card number"
                placeholderTextColor="#A0A0A0"
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                maxLength={19} // 16 digits + 3 spaces
              />
            </View>

            {/* Card Holder Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>CARD HOLDER NAME</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter cardholder name"
                placeholderTextColor="#A0A0A0"
                value={cardHolderName}
                onChangeText={setCardHolderName}
                autoCapitalize="characters"
              />
            </View>

            {/* Expiry and CVV row */}
            <View style={styles.rowContainer}>
              {/* Expiry */}
              <View style={styles.halfInputContainer}>
                <Text style={styles.inputLabel}>EXPIRY</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/YY"
                  placeholderTextColor="#A0A0A0"
                  keyboardType="numeric"
                  value={expiry}
                  onChangeText={(text) => setExpiry(formatExpiry(text))}
                  maxLength={5} // MM/YY
                />
              </View>

              {/* CVV */}
              <View style={styles.halfInputContainer}>
                <Text style={styles.inputLabel}>CVV</Text>
                <TextInput
                  style={styles.input}
                  placeholder="123"
                  placeholderTextColor="#A0A0A0"
                  keyboardType="numeric"
                  value={cvv}
                  onChangeText={setCvv}
                  maxLength={3}
                  secureTextEntry
                />
              </View>
            </View>

            {/* Add Card Button */}
            <TouchableOpacity 
              style={styles.addCardButton}
               
              onPress={handleAddCard}
            >
              <Text style={styles.addCardButtonText}>Add Card</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => router.push('/screens/profile')}
        >
          <FontAwesome name="user" size={24} color="#1E88E5" />
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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
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
  formContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 80, // To avoid bottom navigation
  },
  inputContainer: {
    marginBottom: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  halfInputContainer: {
    width: '48%',
  },
  inputLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
  },
  addCardButton: {
    backgroundColor: '#0A235C', // Dark blue button
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  addCardButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
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