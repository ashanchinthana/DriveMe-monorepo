import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function PaymentHistory() {
    const router = useRouter();

    const transactions = [
        {
            id: '1',
            title: 'fine payment',
            transactionId: '000085752257',
            amount: 'RS 3000.00',
            date: '16 Oct 2024',
            time: '11:30 AM',
            status: 'confirmed',
        },
        {
            id: '2',
            title: 'fine payment',
            transactionId: '000085752258',
            amount: 'RS 3000.00',
            date: '16 Oct 2024',
            time: '11:30 AM',
            status: 'confirmed',
        }
    ];

    return (
        <View style={styles.container}>
            {/* Half-Circle Header with Logo */}
            <View style={styles.halfCircle}>
                {/* Back Button */}
                                <TouchableOpacity 
                                    style={styles.backButton} 
                                    onPress={() => router.push('/screens/home')}
                                >
                                    <Ionicons name="arrow-back" size={24} color="#333" />
                                </TouchableOpacity>
                <Image
                    source={require('../../assets/images/z.png')} //DRIVE ME LOGO
                    style={styles.image}
                />
            </View>

            {/* Payment History List */}
            <FlatList
                data={transactions}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingTop: 300, paddingBottom: 100 }}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image
                            source={require('../../assets/images/3.png')}
                            style={styles.icon}
                        />
                        <View style={styles.cardContent}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.transactionId}>Transaction ID</Text>
                            <Text style={styles.idValue}>{item.transactionId}</Text>
                            <View style={styles.footer}>
                                <Text style={styles.dateTime}>{item.date} {item.time}</Text>
                                <View style={styles.statusContainer}>
                                    <Text style={styles.statusText}>{item.status}</Text>
                                </View>
                                <Text style={styles.amount}>{item.amount}</Text>
                            </View>
                        </View>
                    </View>
                )}
            />

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                            <TouchableOpacity style={styles.navItem} onPress={() => router.push('/screens/Profile')}>
                                <FontAwesome5 name="user" size={24} color="black" />
                                <Text style={styles.navText}>Profile</Text>
                            </TouchableOpacity>
            
                            <TouchableOpacity style={styles.homeButton} onPress={() => router.push('/screens/Notifications')}>
                                <Ionicons name="notifications-outline" size={24} color="white" />
                                <Text style={styles.navText}>Notifications</Text>
                            </TouchableOpacity>
            
                            {/* Home Button */}
                            <TouchableOpacity style={styles.navItem} onPress={() => router.push('/screens/home')}>
                                <Ionicons name="home" size={30} color="black" />
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
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
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        marginHorizontal: 15,
        marginTop: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        alignItems: 'center',
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    cardContent: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        
    },
    transactionId: {
        fontSize: 14,
        color: '#555',
    },
    idValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
    dateTime: {
        fontSize: 12,
        color: '#666',
    },
    statusContainer: {
        backgroundColor: '#DFF6DD',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 5,
        marginBottom: 75,
        
    },
    statusText: {
        fontSize: 12,
        color: 'green',
        fontWeight: 'bold',
        
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        width: 100,
        height: 100,
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
        marginTop: -30,
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