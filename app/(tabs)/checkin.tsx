import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  useColorScheme,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Clock, CircleCheck as CheckCircle, Circle as XCircle, Users, Calendar, Navigation, Settings } from 'lucide-react-native';

interface CheckInData {
  isCheckedIn: boolean;
  location: string;
  checkedInAt: Date | null;
  status: 'available' | 'teaching' | 'meeting' | 'offline';
  autoLocation: boolean;
}

export default function CheckInScreen() {
  const [checkInData, setCheckInData] = useState<CheckInData>({
    isCheckedIn: false,
    location: '',
    checkedInAt: null,
    status: 'offline',
    autoLocation: true,
  });
  const [currentTime, setCurrentTime] = useState(new Date());
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Redirect students away from check-in page
  useEffect(() => {
    if (!global.currentUser || global.currentUser.role === 'student') {
      router.replace('/(tabs)');
    }
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Mock location detection
  useEffect(() => {
    if (checkInData.autoLocation && checkInData.isCheckedIn) {
      // Simulate location detection
      setCheckInData(prev => ({
        ...prev,
        location: 'Computer Science Building - Room 201'
      }));
    }
  }, [checkInData.autoLocation, checkInData.isCheckedIn]);

  const handleCheckIn = () => {
    Alert.alert(
      'Check In',
      'This will mark you as present and available for consultations. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Check In',
          onPress: () => {
            setCheckInData(prev => ({
              ...prev,
              isCheckedIn: true,
              checkedInAt: new Date(),
              status: 'available',
              location: prev.autoLocation 
                ? 'Computer Science Building - Room 201'
                : 'Manual location required'
            }));
          },
        },
      ]
    );
  };

  const handleCheckOut = () => {
    Alert.alert(
      'Check Out',
      'This will mark you as offline and unavailable. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Check Out',
          style: 'destructive',
          onPress: () => {
            setCheckInData(prev => ({
              ...prev,
              isCheckedIn: false,
              checkedInAt: null,
              status: 'offline',
              location: ''
            }));
          },
        },
      ]
    );
  };

  const handleStatusChange = (newStatus: CheckInData['status']) => {
    if (!checkInData.isCheckedIn) {
      Alert.alert('Not Checked In', 'Please check in first to change your status.');
      return;
    }

    setCheckInData(prev => ({
      ...prev,
      status: newStatus
    }));
  };

  const getStatusColor = (status: CheckInData['status']) => {
    switch (status) {
      case 'available':
        return '#059669';
      case 'teaching':
        return '#2563eb';
      case 'meeting':
        return '#ea580c';
      case 'offline':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const getStatusText = (status: CheckInData['status']) => {
    switch (status) {
      case 'available':
        return 'Available for consultation';
      case 'teaching':
        return 'Currently teaching';
      case 'meeting':
        return 'In meeting';
      case 'offline':
        return 'Not available';
      default:
        return 'Unknown status';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (startTime: Date, currentTime: Date) => {
    const diff = currentTime.getTime() - startTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
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
    headerTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: isDark ? '#ffffff' : '#111827',
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: 16,
      color: isDark ? '#9ca3af' : '#6b7280',
    },
    content: {
      flex: 1,
      padding: 20,
    },
    statusCard: {
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderRadius: 16,
      padding: 24,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#e5e7eb',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
      alignItems: 'center',
    },
    statusIcon: {
      marginBottom: 16,
    },
    statusTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: isDark ? '#ffffff' : '#111827',
      marginBottom: 8,
    },
    statusSubtitle: {
      fontSize: 16,
      color: isDark ? '#9ca3af' : '#6b7280',
      textAlign: 'center',
      marginBottom: 16,
    },
    checkInButton: {
      backgroundColor: '#059669',
      paddingHorizontal: 32,
      paddingVertical: 16,
      borderRadius: 12,
      minWidth: 150,
    },
    checkOutButton: {
      backgroundColor: '#ef4444',
      paddingHorizontal: 32,
      paddingVertical: 16,
      borderRadius: 12,
      minWidth: 150,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#ffffff',
      textAlign: 'center',
    },
    infoSection: {
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderRadius: 12,
      padding: 20,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#e5e7eb',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#111827',
      marginBottom: 16,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      gap: 12,
    },
    infoText: {
      fontSize: 14,
      color: isDark ? '#d1d5db' : '#374151',
      flex: 1,
    },
    statusOptions: {
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderRadius: 12,
      padding: 20,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#e5e7eb',
    },
    statusGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    statusButton: {
      flex: 1,
      minWidth: '45%',
      padding: 16,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: isDark ? '#4b5563' : '#d1d5db',
      alignItems: 'center',
    },
    statusButtonActive: {
      borderColor: '#2563eb',
      backgroundColor: isDark ? '#1e3a8a' : '#dbeafe',
    },
    statusButtonDisabled: {
      opacity: 0.5,
    },
    statusButtonText: {
      fontSize: 14,
      fontWeight: '500',
      color: isDark ? '#ffffff' : '#111827',
      textAlign: 'center',
      marginTop: 4,
    },
    settingsSection: {
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderRadius: 12,
      padding: 20,
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#e5e7eb',
    },
    settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 8,
    },
    settingLabel: {
      fontSize: 16,
      color: isDark ? '#ffffff' : '#111827',
      flex: 1,
    },
    settingDescription: {
      fontSize: 12,
      color: isDark ? '#9ca3af' : '#6b7280',
      marginTop: 2,
    },
    currentTime: {
      fontSize: 20,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#111827',
      textAlign: 'center',
      marginBottom: 20,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Faculty Check-In</Text>
        <Text style={styles.headerSubtitle}>
          Manage your presence and availability status
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.currentTime}>
          {formatTime(currentTime)}
        </Text>

        <View style={[styles.statusCard, { borderColor: getStatusColor(checkInData.status) }]}>
          <View style={styles.statusIcon}>
            {checkInData.isCheckedIn ? (
              <CheckCircle size={48} color={getStatusColor(checkInData.status)} />
            ) : (
              <XCircle size={48} color="#6b7280" />
            )}
          </View>
          
          <Text style={styles.statusTitle}>
            {checkInData.isCheckedIn ? 'Checked In' : 'Checked Out'}
          </Text>
          
          <Text style={styles.statusSubtitle}>
            {checkInData.isCheckedIn 
              ? getStatusText(checkInData.status)
              : 'You are currently not visible to students'
            }
          </Text>

          {checkInData.isCheckedIn ? (
            <TouchableOpacity style={styles.checkOutButton} onPress={handleCheckOut}>
              <Text style={styles.buttonText}>Check Out</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.checkInButton} onPress={handleCheckIn}>
              <Text style={styles.buttonText}>Check In</Text>
            </TouchableOpacity>
          )}
        </View>

        {checkInData.isCheckedIn && (
          <>
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Session Information</Text>
              
              <View style={styles.infoRow}>
                <Clock size={16} color={isDark ? '#9ca3af' : '#6b7280'} />
                <Text style={styles.infoText}>
                  Checked in at: {checkInData.checkedInAt && formatTime(checkInData.checkedInAt)}
                </Text>
              </View>
              
              <View style={styles.infoRow}>
                <Users size={16} color={isDark ? '#9ca3af' : '#6b7280'} />
                <Text style={styles.infoText}>
                  Duration: {checkInData.checkedInAt && formatDuration(checkInData.checkedInAt, currentTime)}
                </Text>
              </View>
              
              <View style={styles.infoRow}>
                <MapPin size={16} color={isDark ? '#9ca3af' : '#6b7280'} />
                <Text style={styles.infoText}>
                  Location: {checkInData.location || 'Location not available'}
                </Text>
              </View>
            </View>

            <View style={styles.statusOptions}>
              <Text style={styles.sectionTitle}>Update Status</Text>
              
              <View style={styles.statusGrid}>
                {[
                  { key: 'available', label: 'Available', icon: CheckCircle },
                  { key: 'teaching', label: 'Teaching', icon: Users },
                  { key: 'meeting', label: 'In Meeting', icon: Calendar },
                ].map(({ key, label, icon: Icon }) => (
                  <TouchableOpacity
                    key={key}
                    style={[
                      styles.statusButton,
                      checkInData.status === key && styles.statusButtonActive,
                    ]}
                    onPress={() => handleStatusChange(key)}
                  >
                    <Icon size={24} color={getStatusColor(key)} />
                    <Text style={styles.statusButtonText}>{label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        )}

        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Auto-detect Location</Text>
              <Text style={styles.settingDescription}>
                Automatically update your location when you move around campus
              </Text>
            </View>
            <Switch
              value={checkInData.autoLocation}
              onValueChange={(value) => setCheckInData(prev => ({ ...prev, autoLocation: value }))}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={checkInData.autoLocation ? '#2563eb' : '#f4f3f4'}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}