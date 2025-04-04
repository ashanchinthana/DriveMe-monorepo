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

export default function ChangeMobileScreen() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [oldMobile, setOldMobile] = useState('');
  const [newMobile, setNewMobile] = useState('');
  const [confirmMobile, setConfirmMobile] = useState('');

  const handleSendOTP = () => {
    // Validate inputs
    if (!password) {
      alert('Please enter your password');
      return;
    }
    if (!oldMobile) {
      alert('Please enter your old mobile number');
      return;
    }
    if (!newMobile) {
      alert('Please enter your new mobile number');
      return;
    }
    if (!confirmMobile) {
      alert('Please confirm your new mobile number');
      return;
    }
    if (newMobile !== confirmMobile) {
      alert('New mobile numbers do not match');
      return;
    }

    // Navigate to profile2Setting2.jsx
    router.push('/screens/profile2Setting2');
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
            <Text style={styles.title}>Change Mobile Number</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#A0A0A0"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
            
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Old mobile number</Text>
              <TextInput
                style={styles.input}
                placeholder="Old mobile number"
                placeholderTextColor="#A0A0A0"
                keyboardType="phone-pad"
                value={oldMobile}
                onChangeText={setOldMobile}
              />
            </View>
            
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>New mobile number</Text>
              <TextInput
                style={styles.input}
                placeholder="New mobile number"
                placeholderTextColor="#A0A0A0"
                keyboardType="phone-pad"
                value={newMobile}
                onChangeText={setNewMobile}
              />
            </View>
            
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Confirm new mobile number</Text>
              <TextInput
                style={[styles.input, styles.confirmInput]}
                placeholder="Confirm new mobile number"
                placeholderTextColor="#A0A0A0"
                keyboardType="phone-pad"
                value={confirmMobile}
                onChangeText={setConfirmMobile}
              />
            </View>

            <TouchableOpacity 
              style={styles.sendOtpButton} 
              onPress={handleSendOTP}
            >
              <Text style={styles.sendOtpText}>Change</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/screens/profile')}>
          <FontAwesome name="user" size={24} color="#1E88E5" />
          <Text style={styles.navText}>Profile</Text>
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
  titleContainer: {
    width: '90%',
    backgroundColor: '#E5E5E5',
    alignSelf: 'center',
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 80, // To avoid bottom navigation
  },
  inputWrapper: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    marginLeft: 2,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
  },
  confirmInput: {
    borderColor: '#8A2BE2', // Purple border for the confirm field
  },
  sendOtpButton: {
    backgroundColor: '#0A235C', // Dark blue button
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  sendOtpText: {
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
  }
});