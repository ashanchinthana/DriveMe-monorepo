import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function OutstandingFines() {
    const router = useRouter();
    const [form, setForm] = useState({
        offenceID: '',
        vehicleNo: '',
        dlID: '',
        identityNumber: ''
    });

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

            {/* Title */}
            <Text style={styles.title}>Outstanding Fines</Text>

            {/* Input Fields */}
            <View style={styles.form}>
                {["Offence ID", "Vehicle No", "D.L ID", "Identity number"].map((placeholder, index) => (
                    <TextInput
                        key={index}
                        style={styles.input}
                        placeholder={placeholder}
                        onChangeText={(text) => setForm({ ...form, [placeholder.toLowerCase().replace(/ /g, '')]: text })}
                    />
                ))}

                {/* Pay Button */}
                <TouchableOpacity style={styles.payButton} onPress={() => router.push('/screens/outstanding1')}>
                    <Text style={styles.payButtonText}>Pay</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/screens/Profile')}>
                    <FontAwesome5 name="user" size={24} color="black" />
                    <Text style={styles.navText}>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/screens/Notifications')}>
                    <Ionicons name="notifications-outline" size={24} color="black" />
                    <Text style={styles.navText}>Notifications</Text>
                </TouchableOpacity>

                {/* Home Button */}
                <TouchableOpacity style={styles.homeButton} onPress={() => router.push('/screens/home')}>
                    <Ionicons name="home" size={30} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/screens/Settings')}>
                    <Ionicons name="settings-outline" size={24} color="black" />
                    <Text style={styles.navText}>Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/screens/HelpSupport')}>
                    <MaterialIcons name="support-agent" size={24} color="black" />
                    <Text style={styles.navText}>Help/Support</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 80, // Space for bottom nav
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
        top: 0
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 140,
        marginBottom: 20,
    },
    form: {
        width: '90%',
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 15,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    payButton: {
        backgroundColor: '#0A0A50',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center'
    },
    payButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        marginTop: 3,
        color: '#333',
    },
    homeButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#0A66C2',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -30, // Lift it up
    },
});