import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function SignUp() {
    const router = useRouter();
    
    // Form state to track all input values
    const [form, setForm] = useState({
        name: '',
        idNumber: '',
        phone: '',
        dlNumber: '',
        dlExpireDate: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    
    // Track loading state for the submit button
    const [loading, setLoading] = useState(false);
    
    // Store validation errors for each field
    const [errors, setErrors] = useState({});

    // Comprehensive validation for all form fields
    const validate = () => {
        const newErrors = {};
        
        // Validate name (required)
        if (!form.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        // Validate ID Number (required, must be 12 characters)
        if (!form.idNumber) {
            newErrors.idNumber = 'ID Number is required';
        } else if (form.idNumber.length !== 12) {
            newErrors.idNumber = 'ID Number must be exactly 12 characters';
        } else if (!/^\d+$/.test(form.idNumber)) {
            newErrors.idNumber = 'ID Number must contain only digits';
        }
        
        // Validate phone (required, must be 10 digits)
        if (!form.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(form.phone)) {
            newErrors.phone = 'Phone number must be exactly 10 digits';
        }
        
        // Validate DL number (required)
        if (!form.dlNumber) {
            newErrors.dlNumber = 'DL number is required';
        }
        
        // Validate DL expire date (required, must be in YYYY-MM-DD format)
        if (!form.dlExpireDate) {
            newErrors.dlExpireDate = 'DL expire date is required';
        } else if (!/^\d{4}-\d{2}-\d{2}$/.test(form.dlExpireDate)) {
            newErrors.dlExpireDate = 'Date must be in YYYY-MM-DD format';
        } else {
            // Check if it's a valid date
            const date = new Date(form.dlExpireDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Reset time to start of day for fair comparison
            
            if (isNaN(date.getTime())) {
                newErrors.dlExpireDate = 'Please enter a valid date';
            } else if (date < today) {
                newErrors.dlExpireDate = 'Expiry date cannot be in the past';
            }
        }
        
        // Email validation (required, must be valid email format)
        if (!form.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        // Password validation (required, must be at least 6 characters with uppercase and lowercase)
        if (!form.password) {
            newErrors.password = 'Password is required';
        } else if (form.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        } else if (!/[A-Z]/.test(form.password)) {
            newErrors.password = 'Password must include an uppercase letter';
        } else if (!/[a-z]/.test(form.password)) {
            newErrors.password = 'Password must include a lowercase letter';
        }
        
        // Confirm password validation
        if (!form.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        
        // Update the errors state and return validation result
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };

    // Handle form submission and API call
    const handleRegister = async () => {
        // First validate all fields
        if (!validate()) {
            // If validation fails, scroll to top to show errors
            return;
        }
        
        setLoading(true);
        try {
            console.log('Registering with data:', form);
            
            // Format the date properly for API
            const formattedDate = new Date(form.dlExpireDate).toISOString();
            
            // Make the API call to register the user
            const response = await axios.post('http://192.168.8.104:5002/api/auth/register', {
                name: form.name,
                idNumber: form.idNumber,
                phone: form.phone,
                dlNumber: form.dlNumber,
                dlExpireDate: formattedDate,
                email: form.email,
                password: form.password
            });
            
            console.log('Registration successful:', response.data);
            
            // Show success message and navigate to sign in page
            Alert.alert(
                'Registration Successful', 
                'Your account has been created successfully!',
                [{ 
                    text: 'OK', 
                    onPress: () => {
                        // Navigate to the sign in page after successful registration
                        router.push('/screens/signIn');
                    } 
                }]
            );
        } catch (error) {
            console.error('Registration error:', error);
            
            // Handle different types of errors
            let errorMessage = 'Registration failed. Please try again.';
            let shouldRedirect = false;
            let alertTitle = 'Registration Failed';
            
            if (error.response) {
                // The server responded with an error
                errorMessage = error.response.data.message || errorMessage;
                console.log('Server error response:', error.response.data);
                
                // Check if this is the "user already exists" error
                if (errorMessage.includes('User already exists')) {
                    errorMessage = 'An account with this email, ID, or driver\'s license already exists. Please sign in instead.';
                    alertTitle = 'Account Already Exists';
                    shouldRedirect = true;
                }
            } else if (error.request) {
                // The request was made but no response was received
                errorMessage = 'No response from server. Please check your internet connection.';
            } else {
                // Something happened in setting up the request
                errorMessage = error.message || errorMessage;
            }
            
            Alert.alert(
                alertTitle, 
                errorMessage,
                [{ 
                    text: 'OK', 
                    onPress: () => {
                        // If it's a "user exists" error, redirect to sign in
                        if (shouldRedirect) {
                            router.push('/screens/signIn');
                        }
                    } 
                }]
            );
        } finally {
            setLoading(false);
        }
    };

    // Helper function to update form fields and clear errors
    const updateField = (field, value) => {
        setForm(prevForm => ({ ...prevForm, [field]: value }));
        
        // Clear error for this field if it exists
        if (errors[field]) {
            setErrors(prevErrors => ({ ...prevErrors, [field]: null }));
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                {/* Half-Circle Header */}
                <View style={styles.halfCircle}>
                    <Text style={styles.title}>Register</Text>
                    <Text style={styles.subtitle}>Create your new account</Text>
                </View>

                {/* Back Button */}
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>

                {/* Input Fields */}
                <View style={styles.form}>
                    {/* Name Field */}
                    <TextInput 
                        style={[styles.input, errors.name && styles.inputError]}
                        placeholder="Name"
                        placeholderTextColor="#999"
                        value={form.name}
                        onChangeText={(text) => updateField('name', text)}
                    />
                    {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                    
                    {/* ID Number Field */}
                    <TextInput 
                        style={[styles.input, errors.idNumber && styles.inputError]}
                        placeholder="ID Number (12 characters)"
                        placeholderTextColor="#999"
                        value={form.idNumber}
                        keyboardType="numeric"
                        maxLength={12}
                        onChangeText={(text) => updateField('idNumber', text)}
                    />
                    {errors.idNumber && <Text style={styles.errorText}>{errors.idNumber}</Text>}
                    
                    {/* Phone Number Field */}
                    <TextInput 
                        style={[styles.input, errors.phone && styles.inputError]}
                        placeholder="Phone number (10 digits)"
                        placeholderTextColor="#999"
                        keyboardType="phone-pad"
                        value={form.phone}
                        maxLength={10}
                        onChangeText={(text) => updateField('phone', text)}
                    />
                    {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
                    
                    {/* DL Number Field */}
                    <TextInput 
                        style={[styles.input, errors.dlNumber && styles.inputError]}
                        placeholder="DL number"
                        placeholderTextColor="#999"
                        value={form.dlNumber}
                        onChangeText={(text) => updateField('dlNumber', text)}
                    />
                    {errors.dlNumber && <Text style={styles.errorText}>{errors.dlNumber}</Text>}
                    
                    {/* DL Expire Date Field */}
                    <TextInput 
                        style={[styles.input, errors.dlExpireDate && styles.inputError]}
                        placeholder="DL expire date (YYYY-MM-DD)"
                        placeholderTextColor="#999"
                        value={form.dlExpireDate}
                        onChangeText={(text) => updateField('dlExpireDate', text)}
                    />
                    {errors.dlExpireDate && <Text style={styles.errorText}>{errors.dlExpireDate}</Text>}
                    
                    {/* Email Field */}
                    <TextInput 
                        style={[styles.input, errors.email && styles.inputError]}
                        placeholder="E-mail"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        value={form.email}
                        onChangeText={(text) => updateField('email', text)}
                        autoCapitalize="none"
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    
                    {/* Password Field */}
                    <TextInput 
                        style={[styles.input, errors.password && styles.inputError]}
                        placeholder="Password (include uppercase & lowercase letters)"
                        placeholderTextColor="#999"
                        secureTextEntry={true}
                        value={form.password}
                        onChangeText={(text) => updateField('password', text)}
                    />
                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                    
                    {/* Confirm Password Field */}
                    <TextInput 
                        style={[styles.input, errors.confirmPassword && styles.inputError]}
                        placeholder="Confirm password"
                        placeholderTextColor="#999"
                        secureTextEntry={true}
                        value={form.confirmPassword}
                        onChangeText={(text) => updateField('confirmPassword', text)}
                    />
                    {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

                    {/* Create Account Button */}
                    <TouchableOpacity 
                        style={styles.createButton} 
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.createButtonText}>Create Account</Text>
                        )}
                    </TouchableOpacity>

                    {/* Already have an account */}
                    <TouchableOpacity onPress={() => router.push('/screens/signIn')}>
                        <Text style={styles.footerText}>
                            <Text style={styles.text}>Already have an account? </Text>
                            <Text style={styles.link}>Sign In</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
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
        backgroundColor: 'white',
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
        fontSize: 28,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 5
    },
    form: {
        width: '100%',
        marginTop: 250 // Adjusted to place form below the half-circle
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 15,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginLeft: 5,
        marginTop: -5,
        marginBottom: 5,
    },
    createButton: {
        backgroundColor: '#0A0A50',
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center'
    },
    createButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
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
        color: '#666',
    }
});