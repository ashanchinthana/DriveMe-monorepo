import React, { useEffect, useState } from 'react';
import { 
    Image, 
    View, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    ActivityIndicator,
    StatusBar
} from 'react-native';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    
    // Check if user is already logged in when the component mounts
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                console.log('Token on startup:', token ? 'exists' : 'not found');
                
                // If token exists, user is already logged in
                if (token) {
                    router.replace('/screens/home');
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            } finally {
                // Show landing page if user is not logged in
                setLoading(false);
            }
        };
        
        checkLoginStatus();
    }, []);

    // Handle login button press
    const handleLogin = () => {
        router.push('/screens/signIn');
    };

    // Show loading spinner while checking login status
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            
            <Image 
                source={require('../assets/images/1.png')}
                style={styles.image}
            />
            
            <View style={styles.textContainer}>
                <Text style={styles.title}>DriveME</Text>
                <Text style={styles.subtitle}>
                    Simplify your drive—pay fines, renew licenses, and stay road-ready, all in one place.
                </Text>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={handleLogin}
                >
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.registerButton}
                    onPress={() => router.push('/screens/already')}
                >
                    <Text style={styles.registerText}>Create a new account</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    © 2025 DriveME • All Rights Reserved
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 600,
        height: 500,
        resizeMode: 'contain',
        marginTop: 50,
    },
    textContainer: {
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 30, 
        fontWeight: 'bold', 
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 20,
        marginTop: 10,
        lineHeight: 22,
        color: '#555',
    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 60,
        marginTop: 30,
        borderRadius: 25,
        backgroundColor: '#007bff',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    registerButton: {
        marginTop: 15,
        padding: 10,
    },
    registerText: {
        color: '#007bff',
        fontSize: 16,
        fontWeight: '500',
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#888',
    }
});