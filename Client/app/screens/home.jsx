import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { authService, fineService, licenseService } from '../services/api';

export default function Home() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [outstandingFines, setOutstandingFines] = useState([]);
    const [licenseStatus, setLicenseStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    // Use a callback to make fetchData reusable
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            // Get current user
            const userData = await authService.getCurrentUser();
            setUser(userData.data);
            console.log('User data loaded:', userData.data.name);

            // Get outstanding fines
            try {
                const finesData = await fineService.getOutstandingFines();
                setOutstandingFines(finesData.data);
                console.log('Fines loaded:', finesData.data.length);
            } catch (fineError) {
                console.error('Error loading fines:', fineError);
                // Continue even if fines fail to load
            }

            // Get license status
            try {
                const licenseData = await licenseService.getLicenseStatus();
                setLicenseStatus(licenseData.data);
                console.log('License status loaded');
            } catch (licenseError) {
                console.error('Error loading license:', licenseError);
                // Continue even if license fails to load
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to load data. Please try again.');
            
            // If authentication error, redirect to login
            if (err.response && err.response.status === 401) {
                await authService.logout();
                Alert.alert('Session Expired', 'Please login again.');
                router.push('/screens/signIn');
            }
        } finally {
            setLoading(false);
        }
    }, [router]);

    // Replace router.reload() with this function
    const handleRetry = () => {
        setRefreshKey(prev => prev + 1);
        setError(null);
    };

    useEffect(() => {
        fetchData();
    }, [fetchData, refreshKey]);

    const handleLogout = async () => {
        try {
            await authService.logout();
            router.replace('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0A66C2" />
                <Text style={styles.loadingText}>Loading your data...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <MaterialIcons name="error" size={50} color="red" />
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity 
                    style={styles.retryButton}
                    onPress={handleRetry} // This replaces router.reload()
                >
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Half-Circle Header with Logo */}
            <View style={styles.halfCircle}>
                <Image 
                    source={require('../../assets/images/z.png')} //DRIVE ME LOGO
                    style={styles.image}
                />
                
                {user && (
                    <Text style={styles.welcomeText}>
                        Welcome, {user.name}
                    </Text>
                )}
            </View>

            {/* Logout Button */}
            <TouchableOpacity 
                style={styles.backButton} 
                onPress={handleLogout}
            >
                <Ionicons name="log-out-outline" size={24} color="#333" />
            </TouchableOpacity>

            {/* Dashboard Summary */}
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContentContainer}>
                {licenseStatus && (
                    <View style={styles.summaryCard}>
                        <Text style={styles.cardTitle}>License Status</Text>
                        <Text style={styles.statusText}>
                            Status: <Text style={[
                                styles.statusValue, 
                                licenseStatus.status === 'Active' ? styles.statusActive : 
                                licenseStatus.status === 'Expired' ? styles.statusExpired : 
                                styles.statusOther
                            ]}>
                                {licenseStatus.status}
                            </Text>
                        </Text>
                        <Text style={styles.statusDetail}>
                            {licenseStatus.message}
                        </Text>
                    </View>
                )}

                {outstandingFines.length > 0 && (
                    <View style={styles.summaryCard}>
                        <Text style={styles.cardTitle}>
                            Outstanding Fines ({outstandingFines.length})
                        </Text>
                        <Text style={styles.finesSummary}>
                            You have {outstandingFines.length} unpaid fines. 
                            View details to make payments.
                        </Text>
                    </View>
                )}
            </ScrollView>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => router.push('/screens/outstanding')}
                >
                    <Text style={styles.buttonText}>Outstanding Fines</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => router.push('/screens/licenDetails')}
                >
                    <Text style={styles.buttonText}>License Details</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => router.push('/screens/paymentHistory')}
                >
                    <Text style={styles.buttonText}>Payment History</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/screens/profile')}>
                    <FontAwesome5 name="user" size={24} color="black" />
                    <Text style={styles.navText}>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/screens/paymentHistory')}>
                    <Ionicons name="notifications-outline" size={24} color="black" />
                    <Text style={styles.navText}>Notifications</Text>
                </TouchableOpacity>

                {/* Home Button */}
                <TouchableOpacity style={styles.homeButton}>
                    <Ionicons name="home" size={30} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/screens/Settings')}>
                    <Ionicons name="settings-outline" size={24} color="black" />
                    <Text style={styles.navText}>Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/screens/helpAndSupport')}>
                    <MaterialIcons name="support-agent" size={24} color="black" />
                    <Text style={styles.navText}>Help/Support</Text>
                </TouchableOpacity>
            </View>
        </View>
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    loadingText: {
        marginTop: 20,
        fontSize: 16,
        color: '#0A66C2',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        padding: 20,
    },
    errorText: {
        marginTop: 20,
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
    retryButton: {
        backgroundColor: '#0A66C2',
        padding: 12,
        borderRadius: 8,
        marginTop: 20,
    },
    retryButtonText: {
        color: 'white',
        fontWeight: 'bold',
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
        width: 200, // Adjust width as needed
        height: 200, // Adjust height as needed
        resizeMode: 'contain', // Ensures the image maintains aspect ratio
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    logoText: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#333',
    },
    scrollView: {
        width: '100%',
        marginTop: 250, // Space for header
    },
    scrollContentContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
    },
    summaryCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    statusText: {
        fontSize: 16,
        marginBottom: 5,
    },
    statusValue: {
        fontWeight: 'bold',
    },
    statusActive: {
        color: 'green',
    },
    statusExpired: {
        color: 'red',
    },
    statusOther: {
        color: 'orange',
    },
    statusDetail: {
        fontSize: 14,
        color: '#666',
    },
    finesSummary: {
        fontSize: 14,
        color: '#666',
    },
    buttonContainer: {
        width: '80%',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#E0E0E0',
        padding: 25,
        borderRadius: 10,
        marginVertical: 8,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
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
    }
});