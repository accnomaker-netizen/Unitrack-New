import React, { useState } from 'react';
import { router } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  useColorScheme,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Mail, Phone, MapPin, Bell, Shield, Settings, CreditCard as Edit3, Save, LogOut, Moon, Sun, Smartphone, Clock } from 'lucide-react-native';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  office: string;
  role: 'faculty' | 'student' | 'admin';
  bio: string;
  specializations: string[];
}

const mockProfile: UserProfile = {
  id: '1',
  name: 'Dr. Sarah Johnson',
  email: 's.johnson@university.edu',
  phone: '+1 (555) 123-4567',
  department: 'Computer Science',
  office: 'CS Building - Room 201',
  role: 'faculty',
  bio: 'Professor of Computer Science specializing in Machine Learning and Artificial Intelligence. Available for consultations on research topics and academic guidance.',
  specializations: ['Machine Learning', 'Data Structures', 'Artificial Intelligence', 'Python Programming'],
};

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [locationServices, setLocationServices] = useState(true);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleSave = () => {
    Alert.alert(
      'Profile Updated',
      'Your profile has been successfully updated.',
      [{ text: 'OK', onPress: () => setIsEditing(false) }]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => {
            global.currentUser = null;
            router.replace('/login');
          },
        },
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#111827' : '#f9fafb',
    },
    header: {
      paddingHorizontal: 20,
      paddingVertical: 24,
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#374151' : '#e5e7eb',
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: isDark ? '#ffffff' : '#111827',
    },
    editButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#374151' : '#f3f4f6',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      gap: 6,
    },
    editButtonText: {
      fontSize: 14,
      fontWeight: '500',
      color: isDark ? '#ffffff' : '#374151',
    },
    profileInfo: {
      alignItems: 'center',
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: '#2563eb',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    avatarText: {
      fontSize: 32,
      fontWeight: '700',
      color: '#ffffff',
    },
    profileName: {
      fontSize: 20,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#111827',
      marginBottom: 4,
    },
    profileRole: {
      fontSize: 14,
      color: isDark ? '#9ca3af' : '#6b7280',
      textTransform: 'capitalize',
    },
    content: {
      flex: 1,
    },
    scrollView: {
      padding: 20,
    },
    section: {
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#e5e7eb',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#111827',
      marginBottom: 16,
    },
    field: {
      marginBottom: 16,
    },
    fieldLabel: {
      fontSize: 14,
      fontWeight: '500',
      color: isDark ? '#d1d5db' : '#374151',
      marginBottom: 6,
    },
    fieldValue: {
      fontSize: 16,
      color: isDark ? '#ffffff' : '#111827',
      lineHeight: 24,
    },
    fieldInput: {
      fontSize: 16,
      color: isDark ? '#ffffff' : '#111827',
      backgroundColor: isDark ? '#374151' : '#f9fafb',
      borderWidth: 1,
      borderColor: isDark ? '#4b5563' : '#e5e7eb',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      minHeight: 44,
    },
    textArea: {
      minHeight: 80,
      textAlignVertical: 'top',
    },
    specializationsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 8,
    },
    specializationChip: {
      backgroundColor: isDark ? '#374151' : '#f3f4f6',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
    },
    specializationText: {
      fontSize: 12,
      color: isDark ? '#d1d5db' : '#6b7280',
    },
    settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#374151' : '#f3f4f6',
    },
    settingRowLast: {
      borderBottomWidth: 0,
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      gap: 12,
    },
    settingLabel: {
      fontSize: 16,
      color: isDark ? '#ffffff' : '#111827',
    },
    settingDescription: {
      fontSize: 12,
      color: isDark ? '#9ca3af' : '#6b7280',
      marginTop: 2,
    },
    switch: {
      transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#374151' : '#f3f4f6',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 8,
      gap: 8,
      marginBottom: 12,
    },
    actionButtonText: {
      fontSize: 16,
      fontWeight: '500',
      color: isDark ? '#ffffff' : '#374151',
    },
    saveButton: {
      backgroundColor: '#059669',
      marginTop: 20,
    },
    saveButtonText: {
      color: '#ffffff',
    },
    logoutButton: {
      backgroundColor: '#ef4444',
    },
    logoutButtonText: {
      color: '#ffffff',
    },
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Edit3 size={16} color={isDark ? '#ffffff' : '#374151'} />
            <Text style={styles.editButtonText}>
              {isEditing ? 'Cancel' : 'Edit'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(profile.name)}</Text>
          </View>
          <Text style={styles.profileName}>{profile.name}</Text>
          <Text style={styles.profileRole}>{profile.role}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollView}>
        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Full Name</Text>
            {isEditing ? (
              <TextInput
                style={styles.fieldInput}
                value={profile.name}
                onChangeText={(text) => setProfile(prev => ({ ...prev, name: text }))}
                placeholder="Enter your full name"
                placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
              />
            ) : (
              <Text style={styles.fieldValue}>{profile.name}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Email</Text>
            {isEditing ? (
              <TextInput
                style={styles.fieldInput}
                value={profile.email}
                onChangeText={(text) => setProfile(prev => ({ ...prev, email: text }))}
                placeholder="Enter your email"
                placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
                keyboardType="email-address"
              />
            ) : (
              <Text style={styles.fieldValue}>{profile.email}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Phone</Text>
            {isEditing ? (
              <TextInput
                style={styles.fieldInput}
                value={profile.phone}
                onChangeText={(text) => setProfile(prev => ({ ...prev, phone: text }))}
                placeholder="Enter your phone number"
                placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.fieldValue}>{profile.phone}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Department</Text>
            <Text style={styles.fieldValue}>{profile.department}</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Office</Text>
            <Text style={styles.fieldValue}>{profile.office}</Text>
          </View>
        </View>

        {/* Bio & Specializations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Bio</Text>
            {isEditing ? (
              <TextInput
                style={[styles.fieldInput, styles.textArea]}
                value={profile.bio}
                onChangeText={(text) => setProfile(prev => ({ ...prev, bio: text }))}
                placeholder="Tell students about yourself and your expertise"
                placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
                multiline
                numberOfLines={4}
              />
            ) : (
              <Text style={styles.fieldValue}>{profile.bio}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Specializations</Text>
            <View style={styles.specializationsContainer}>
              {profile.specializations.map((spec, index) => (
                <View key={index} style={styles.specializationChip}>
                  <Text style={styles.specializationText}>{spec}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Bell size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
              <View>
                <Text style={styles.settingLabel}>Push Notifications</Text>
                <Text style={styles.settingDescription}>
                  Receive alerts when students are looking for you
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <MapPin size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
              <View>
                <Text style={styles.settingLabel}>Location Services</Text>
                <Text style={styles.settingDescription}>
                  Allow the app to track your location on campus
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.settingRow, styles.settingRowLast]}>
            <View style={styles.settingLeft}>
              <Clock size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
              <View>
                <Text style={styles.settingLabel}>Auto Check-out</Text>
                <Text style={styles.settingDescription}>
                  Automatically check out after 8 hours
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Actions */}
        {isEditing && (
          <TouchableOpacity 
            style={[styles.actionButton, styles.saveButton]}
            onPress={handleSave}
          >
            <Save size={20} color="#ffffff" />
            <Text style={[styles.actionButtonText, styles.saveButtonText]}>
              Save Changes
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity 
          style={[styles.actionButton, styles.logoutButton]}
          onPress={handleLogout}
        >
          <LogOut size={20} color="#ffffff" />
          <Text style={[styles.actionButtonText, styles.logoutButtonText]}>
            Log Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}