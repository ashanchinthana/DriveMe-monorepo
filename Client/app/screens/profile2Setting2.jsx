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
  const [newMobile, setNewMobile] = useState('');
  const [otp, setOtp] = useState('');

  const handleChange = () => {
    if (!password) {
      alert('Please enter your password');
      return;
    }
    if (!newMobile) {
      alert('Please enter your new mobile number');
      return;
    }
    if (!otp) {
      alert('Please enter the OTP');
      return;
    }
    alert('Mobile number successfully changed');
    router.push('/screens/profile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/images/z.png')} //DRIVE ME LOGO
                style={styles.image}
              />
            </View>
          </View>

          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Change Mobile number</Text>
          </View>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            
            <TextInput
              style={styles.input}
              placeholder="New mobile number"
              keyboardType="phone-pad"
              value={newMobile}
              onChangeText={setNewMobile}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
            />

            <TouchableOpacity 
              style={styles.changeButton}
              onPress={handleChange}
            >
              <Text style={styles.changeButtonText}>Change</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    borderColor: '#1E88E5',
  },
  image: {
    width: 250, // Adjust width as needed
    height: 250, // Adjust height as needed
    resizeMode: 'contain', // Ensures the image maintains aspect ratio
  },
  changeButton: {
    backgroundColor: '#0A235C', // Dark blue button
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  changeButtonText: { 
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  }
});