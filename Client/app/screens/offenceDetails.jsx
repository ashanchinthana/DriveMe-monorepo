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

export default function OffenceDetailsScreen() {
  const router = useRouter();
  
  // Complete list of offences
  const offences = [
    { id: 1, description: "Holting or parking of motor vehicles on a road", fine: 1000.00 },
    { id: 2, description: "Driving while using a mobile phone", fine: 1000.00 },
    { id: 3, description: "Driving in the opposite direction", fine: 1000.00 },
    { id: 4, description: "Driving against the red light", fine: 1000.00 },
    { id: 5, description: "Driving against the prohibited sign", fine: 1000.00 },
    { id: 6, description: "Vehicle running with headlights off", fine: 2000.00 },
    { id: 7, description: "Obstructing traffic", fine: 1000.00 },
    { id: 8, description: "Driving without side mirrors", fine: 1000.00 },
    { id: 9, description: "Drunk driving", fine: 25000.00 },
    { id: 10, description: "Excessive carriage of persons", fine: 500.00 },
    { id: 11, description: "Failing to carry the emission certificate", fine: 500.00 },
    { id: 12, description: "Illegal U-turn", fine: 1000.00 },
    { id: 13, description: "Illegal parking", fine: 1000.00 },
    { id: 14, description: "Tinted side windows on driver's seat", fine: 500.00 },
    { id: 15, description: "The image is displayed", fine: 1000.00 },
    { id: 16, description: "Additional lights installed", fine: 500.00 },
    { id: 17, description: "Not carrying the R.L", fine: 1000.00 },
    { id: 18, description: "Installing unapproved lights", fine: 1000.00 },
    { id: 19, description: "Driving without side door", fine: 1000.00 },
    { id: 20, description: "Failing to carry the emission certificate", fine: 500.00 },
    { id: 21, description: "Installing dangerous mechanical parts", fine: 1000.00 },
    { id: 22, description: "Left side lights off", fine: 1000.00 },
    { id: 23, description: "Three-way parking and blocking", fine: 1000.00 },
    { id: 24, description: "Disobeying directions & signals of police officers or traffic wardens", fine: 2000.00 },
    { id: 25, description: "Turning right against a prohibited sign", fine: 1000.00 },
    { id: 26, description: "Not carrying the insurance certificate", fine: 2000.00 },
    { id: 27, description: "Changing lanes while driving", fine: 2000.00 },
    { id: 28, description: "Not driving on the left side", fine: 1000.00 },
    { id: 29, description: "Not wearing protective helmets", fine: 1000.00 },
    { id: 30, description: "Turning right against a prohibited sign", fine: 1000.00 },
    { id: 31, description: "Right side lights off", fine: 1000.00 },
    { id: 32, description: "Driving without side mirrors", fine: 1000.00 },
    { id: 33, description: "Not carrying D.L", fine: 1000.00 },
    { id: 34, description: "Incorrect overtaking", fine: 1000.00 },
    { id: 35, description: "Riding on running boards", fine: 500.00 },
    { id: 36, description: "Blocking on the main road", fine: 500.00 },
    { id: 37, description: "Blocking by turning on the sidewalk", fine: 500.00 },
    { id: 38, description: "Driving with brake lights off", fine: 1000.00 },
    { id: 39, description: "Reversing for a long distance", fine: 1000.00 },
    { id: 40, description: "Vehicle ignoring pedestrian crossing", fine: 1000.00 },
    { id: 41, description: "Overtaking across the single white line", fine: 1000.00 },
    { id: 42, description: "Driving recklessly", fine: 1000.00 },
    { id: 43, description: "Blocking by turning", fine: 1000.00 },
    { id: 44, description: "Non use of seat belts", fine: 1000.00 },
    { id: 45, description: "Parking on the sidewalk", fine: 1000.00 },
    { id: 46, description: "Picking up passengers outside the bus stop", fine: 1000.00 },
    { id: 47, description: "Parking in bus stand", fine: 1000.00 },
    { id: 48, description: "Excessive use of noise", fine: 1000.00 },
    { id: 49, description: "Not wearing protective helmets", fine: 1000.00 },
    { id: 50, description: "Parking lights off", fine: 1000.00 },
    { id: 51, description: "Two-way parking and blocking", fine: 1000.00 }
  ];

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
          <Text style={styles.title}>Offence Details</Text>
        </View>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Offences List Card */}
        <View style={styles.offencesCard}>
          {offences.map((offence, index) => (
            <View key={index} style={[
              styles.offenceRow,
              index === offences.length - 1 ? styles.lastOffenceRow : null
            ]}>
              <View style={styles.offenceInfo}>
                <Text style={styles.offenceText}>
                  {offence.id}. {offence.description}
                </Text>
              </View>
              <View style={styles.fineBadge}>
                <Text style={styles.fineText}>Rs {offence.fine.toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>
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
  offencesCard: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
    padding: 15,
  },
  offenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  lastOffenceRow: {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  offenceInfo: {
    flex: 1,
    paddingRight: 10,
  },
  offenceText: {
    fontSize: 14,
    color: '#333',
  },
  fineBadge: {
    backgroundColor: '#0A235C',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fineText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
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