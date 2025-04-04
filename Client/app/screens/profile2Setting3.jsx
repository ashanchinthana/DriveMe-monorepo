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
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

export default function ChangePasswordScreen() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    // Validate inputs
    if (!currentPassword) {
      alert('Please enter your current password');
      return;
    }
    if (!newPassword) {
      alert('Please enter your new password');
      return;
    }
    if (!confirmPassword) {
      alert('Please confirm your new password');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    // Change password logic would go here
    alert('Password changed successfully');
    router.push('/screens/profile');
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
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>
                <Text style={{ color: '#1E88E5', fontWeight: 'bold' }}>D</Text>
                <Text style={{ color: '#333', fontWeight: 'bold' }}>uthaya</Text>
              </Text>
            </View>
          </View>

          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Change Password</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Current Password"
                placeholderTextColor="#A0A0A0"
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />
            </View>
            
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="New Password"
                placeholderTextColor="#A0A0A0"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
            </View>
            
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#A0A0A0"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            <TouchableOpacity 
              style={styles.changeButton} 
              onPress={handleChangePassword}
            >
              <Text style={styles.changeButtonText}>Change</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navItem, styles.activeNavItem]} 
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
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
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
  inputWrapper: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
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
    // Styling for active item
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