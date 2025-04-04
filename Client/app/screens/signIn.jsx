import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { authService } from '../services/api';

export default function SignIn() {
    const router = useRouter();
    const [form, setForm] = useState({
        idNumber: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        
        if (!form.idNumber) newErrors.idNumber = 'ID Number is required';
        if (!form.password) newErrors.password = 'Password is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
        if (!validate()) return;
        
        setLoading(true);
        try {
            console.log('Attempting login with:', form);
            
            // Make API call to login
            const response = await authService.login({
                idNumber: form.idNumber,
                password: form.password
            });
            
            // Successfully logged in, navigate to home
            router.push('/screens/home');
        } catch (error) {
            console.error('Login error:', error);
            const message = error.response?.data?.message || 'Failed to login. Please try again.';
            Alert.alert('Login Failed', message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Half-Circle Header */}
            <View style={styles.halfCircle}>
                {/* Back Button */}
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => router.push('/')}
                >
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Login to your account</Text>
            </View>

            {/* Input Fields */}
            <View style={styles.form}>
                <TextInput 
                    style={[styles.input, errors.idNumber && styles.inputError]}
                    placeholder="ID Number"
                    placeholderTextColor="#999"
                    value={form.idNumber}
                    onChangeText={(text) => {
                        setForm({ ...form, idNumber: text });
                        if (errors.idNumber) {
                            setErrors({ ...errors, idNumber: null });
                        }
                    }}
                />
                {errors.idNumber && <Text style={styles.errorText}>{errors.idNumber}</Text>}
                
                <TextInput 
                    style={[styles.input, errors.password && styles.inputError]}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    secureTextEntry={true}
                    value={form.password}
                    onChangeText={(text) => {
                        setForm({ ...form, password: text });
                        if (errors.password) {
                            setErrors({ ...errors, password: null });
                        }
                    }}
                />
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                {/* Login Button */}
                <TouchableOpacity 
                    style={styles.createButton}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.createButtonText}>Login</Text>
                    )}
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => router.push('/screens/already')}>
                    <Text style={styles.footerText}>
                        <Text style={styles.text}>Don't have an account? </Text>
                        <Text style={styles.link}>Create a new account</Text>
                    </Text>
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
        padding: 20
    },
    halfCircle: {
        width: '109%',
        height: 250, 
        backgroundColor: '#D3D3D3', 
        borderBottomLeftRadius: 300,
        borderBottomRightRadius: 300,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0
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
    },
    title: {
        fontSize: 38,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 5
    },
    form: {
        width: '100%',
        marginTop: 200, // Adjusted so inputs are not hidden under the half-circle
        paddingHorizontal: 20
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#0A66C2',
        fontSize: 16,
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginLeft: 5,
        marginTop: -8,
    },
    createButton: {
        backgroundColor: '#0A0A50',
        padding: 20,
        borderRadius: 10,
        marginTop: 30,
        alignItems: 'center'
    },
    createButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20
    },
    footerText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#666'
    },
    link: {
        color: '#FFA500',
        fontWeight: 'bold'
    },
    text: {
        color: '#0A66C2',
        fontWeight: 'bold',
    }
});