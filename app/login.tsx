import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { User, Lock, Eye, EyeOff, GraduationCap, Users } from 'lucide-react-native';

interface LoginCredentials {
  email: string;
  password: string;
  role: 'student' | 'faculty';
}

// Mock user database - in a real app, this would be handled by your backend
const mockUsers = [
  {
    id: '1',
    email: 's.johnson@university.edu',
    password: 'faculty123',
    role: 'faculty' as const,
    name: 'Dr. Sarah Johnson',
    department: 'Computer Science',
  },
  {
    id: '2',
    email: 'john.doe@student.university.edu',
    password: 'student123',
    role: 'student' as const,
    name: 'John Doe',
    department: 'Computer Science',
  },
  {
    id: '3',
    email: 'admin@university.edu',
    password: 'admin123',
    role: 'admin' as const,
    name: 'System Administrator',
    department: 'IT',
  },
];

export default function LoginScreen() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
    role: 'student',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [adminTapCount, setAdminTapCount] = useState(0);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleLogin = async () => {
    if (!credentials.email || !credentials.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = mockUsers.find(
        u => u.email === credentials.email && 
        u.password === credentials.password &&
        (u.role === credentials.role || u.role === 'admin')
      );

      setIsLoading(false);

      if (user) {
        // Store user session (in a real app, use secure storage)
        global.currentUser = user;
        
        if (user.role === 'admin') {
          router.replace('/admin');
        } else {
          router.replace('/(tabs)');
        }
      } else {
        Alert.alert('Login Failed', 'Invalid email, password, or role selection');
      }
    }, 1000);
  };

  const handleAdminAccess = () => {
    setAdminTapCount(prev => prev + 1);
    
    if (adminTapCount >= 4) {
      Alert.alert(
        'Admin Access',
        'Enter admin credentials to access user management',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Continue',
            onPress: () => {
              setCredentials(prev => ({ ...prev, role: 'faculty' }));
              Alert.alert(
                'Admin Login',
                'Use: admin@university.edu / admin123'
              );
            },
          },
        ]
      );
      setAdminTapCount(0);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#111827' : '#f9fafb',
    },
    keyboardView: {
      flex: 1,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 24,
    },
    header: {
      alignItems: 'center',
      marginBottom: 48,
    },
    logo: {
      width: 80,
      height: 80,
      backgroundColor: '#2563eb',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
    },
    logoText: {
      fontSize: 32,
      fontWeight: '700',
      color: '#ffffff',
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: isDark ? '#ffffff' : '#111827',
      textAlign: 'center',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: isDark ? '#9ca3af' : '#6b7280',
      textAlign: 'center',
    },
    form: {
      gap: 20,
    },
    roleSelector: {
      flexDirection: 'row',
      backgroundColor: isDark ? '#374151' : '#f3f4f6',
      borderRadius: 12,
      padding: 4,
      marginBottom: 8,
    },
    roleOption: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      gap: 8,
    },
    roleOptionActive: {
      backgroundColor: '#2563eb',
    },
    roleOptionText: {
      fontSize: 14,
      fontWeight: '500',
      color: isDark ? '#d1d5db' : '#6b7280',
    },
    roleOptionTextActive: {
      color: '#ffffff',
    },
    inputContainer: {
      position: 'relative',
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#374151' : '#ffffff',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: isDark ? '#4b5563' : '#e5e7eb',
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    inputWrapperFocused: {
      borderColor: '#2563eb',
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: isDark ? '#ffffff' : '#111827',
      marginLeft: 12,
    },
    passwordToggle: {
      padding: 4,
    },
    loginButton: {
      backgroundColor: '#2563eb',
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 8,
    },
    loginButtonDisabled: {
      backgroundColor: isDark ? '#4b5563' : '#9ca3af',
    },
    loginButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#ffffff',
    },
    footer: {
      alignItems: 'center',
      marginTop: 32,
    },
    footerText: {
      fontSize: 14,
      color: isDark ? '#9ca3af' : '#6b7280',
      textAlign: 'center',
      lineHeight: 20,
    },
    adminHint: {
      marginTop: 16,
      padding: 12,
      backgroundColor: isDark ? '#1f2937' : '#f8fafc',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#e2e8f0',
    },
    adminHintText: {
      fontSize: 12,
      color: isDark ? '#9ca3af' : '#64748b',
      textAlign: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <TouchableOpacity 
            style={styles.header}
            onPress={handleAdminAccess}
            activeOpacity={0.9}
          >
            <View style={styles.logo}>
              <Text style={styles.logoText}>WMP</Text>
            </View>
            <Text style={styles.title}>Where's My Prof?</Text>
            <Text style={styles.subtitle}>
              Sign in to track faculty availability
            </Text>
          </TouchableOpacity>

          <View style={styles.form}>
            <View style={styles.roleSelector}>
              <TouchableOpacity
                style={[
                  styles.roleOption,
                  credentials.role === 'student' && styles.roleOptionActive,
                ]}
                onPress={() => setCredentials(prev => ({ ...prev, role: 'student' }))}
              >
                <GraduationCap 
                  size={18} 
                  color={credentials.role === 'student' ? '#ffffff' : (isDark ? '#d1d5db' : '#6b7280')} 
                />
                <Text style={[
                  styles.roleOptionText,
                  credentials.role === 'student' && styles.roleOptionTextActive,
                ]}>
                  Student
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.roleOption,
                  credentials.role === 'faculty' && styles.roleOptionActive,
                ]}
                onPress={() => setCredentials(prev => ({ ...prev, role: 'faculty' }))}
              >
                <Users 
                  size={18} 
                  color={credentials.role === 'faculty' ? '#ffffff' : (isDark ? '#d1d5db' : '#6b7280')} 
                />
                <Text style={[
                  styles.roleOptionText,
                  credentials.role === 'faculty' && styles.roleOptionTextActive,
                ]}>
                  Faculty
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <User size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
                <TextInput
                  style={styles.input}
                  placeholder="Email address"
                  placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
                  value={credentials.email}
                  onChangeText={(text) => setCredentials(prev => ({ ...prev, email: text }))}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Lock size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
                  value={credentials.password}
                  onChangeText={(text) => setCredentials(prev => ({ ...prev, password: text }))}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={styles.passwordToggle}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
                  ) : (
                    <Eye size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.loginButton,
                isLoading && styles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Contact IT support if you need help accessing your account
            </Text>
            
            {adminTapCount > 0 && (
              <View style={styles.adminHint}>
                <Text style={styles.adminHintText}>
                  Admin access: Tap logo {5 - adminTapCount} more times
                </Text>
              </View>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}