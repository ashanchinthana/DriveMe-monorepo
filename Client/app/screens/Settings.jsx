import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function SettingsScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            {/* Half-Circle Header with Logo */}
            <View style={styles.halfCircle}>

                
                 {/* Back Button */}
                        <TouchableOpacity 
                          style={styles.backButton} 
                          onPress={() => router.back()}
                        >
                          <Ionicons name="arrow-back" size={24} color="#333" />
                        </TouchableOpacity>
                        
                <Image 
                    source={require('../../assets/images/z.png')} //DRIVE ME LOGO
                    style={styles.image}
                />
            </View>
            

            {/* Settings Options */}
            <View style={styles.settingsContainer}>
                <TouchableOpacity 
                    style={styles.settingButton}
                    onPress={() => router.push('/screens/Settings1')}
                >
                    <Text style={styles.settingButtonText}>Payment Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.settingButton}
                    onPress={() => router.push('/screens/profile2Setting')}
                >
                    <Text style={styles.settingButtonText}>Profile Settings</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity 
                    style={styles.navItem} 
                    onPress={() => router.push('/screens/Profile')}
                >
                    <FontAwesome5 name="user" size={22} color="#777" />
                    <Text style={styles.navText}>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.navItem} 
                    onPress={() => router.push('/screens/Notifications')}
                >
                    <Ionicons name="notifications-outline" size={22} color="#777" />
                    <Text style={styles.navText}>Notifications</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.navItem} 
                    onPress={() => router.push('/screens/home')}
                >
                    <Ionicons name="home-outline" size={22} color="#777" />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.navItem, styles.navItemActive]}
                >
                    <Ionicons name="setting-outline" size={24} color="#1E88E5" />
                    <Text style={[styles.navText, styles.navTextActive]}>Setting</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.navItem} 
                    onPress={() => router.push('/screens/helpAndSupport')}
                >
                    <MaterialIcons name="support-agent" size={22} color="#777" />
                    <Text style={styles.navText}>Help/Support</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    halfCircle: {
        width: '100%',
        height: 250, 
        backgroundColor: '#D3D3D3', 
        borderBottomLeftRadius: 300,
        borderBottomRightRadius: 300,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    image: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
    },
    settingsContainer: {
        paddingHorizontal: 40,
        width: '100%',
    },
    settingButton: {
        backgroundColor: '#E5E5E5',
        borderRadius: 150,
        padding: 56,
        marginBottom: 55,
        width: '100%',
        alignItems: 'center',
    },
    settingButtonText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333',
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    },
    navItem: {
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    navItemActive: {
        backgroundColor: '#0A66C2',
        borderRadius: 30,
        paddingHorizontal: 16,
    },
    navText: {
        fontSize: 12,
        marginTop: 4,
        color: '#777',
    },
    navTextActive: {
        color: 'white',
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
        shadowRadius: 4
    }
});