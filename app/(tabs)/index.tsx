import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Users, Clock, MapPin, Wifi, WifiOff } from 'lucide-react-native';

interface Faculty {
  id: string;
  name: string;
  department: string;
  status: 'available' | 'teaching' | 'meeting' | 'offline';
  location: string;
  lastSeen: string;
  nextClass?: string;
  office: string;
}

const mockFaculty: Faculty[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    department: 'Computer Science',
    status: 'available',
    location: 'CS Building - Room 201',
    lastSeen: '2 minutes ago',
    nextClass: '2:00 PM - Data Structures',
    office: 'CS-201',
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    department: 'Mathematics',
    status: 'teaching',
    location: 'Math Building - Room 105',
    lastSeen: 'Active now',
    nextClass: '3:30 PM - Calculus II',
    office: 'MATH-305',
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    department: 'Physics',
    status: 'meeting',
    location: 'Physics Lab - Room 302',
    lastSeen: '15 minutes ago',
    nextClass: '4:00 PM - Quantum Physics',
    office: 'PHY-302',
  },
  {
    id: '4',
    name: 'Prof. James Wilson',
    department: 'Chemistry',
    status: 'offline',
    location: 'Unknown',
    lastSeen: '2 hours ago',
    office: 'CHEM-101',
  },
  {
    id: '5',
    name: 'Dr. Lisa Wang',
    department: 'Biology',
    status: 'available',
    location: 'Biology Lab - Room 205',
    lastSeen: '5 minutes ago',
    nextClass: '1:30 PM - Molecular Biology',
    office: 'BIO-205',
  },
];

export default function HomeScreen() {
  const [faculty, setFaculty] = useState<Faculty[]>(mockFaculty);
  const [refreshing, setRefreshing] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getStatusColor = (status: Faculty['status']) => {
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

  const getStatusIcon = (status: Faculty['status']) => {
    switch (status) {
      case 'available':
      case 'teaching':
      case 'meeting':
        return <Wifi size={16} color="#ffffff" />;
      case 'offline':
        return <WifiOff size={16} color="#ffffff" />;
      default:
        return <WifiOff size={16} color="#ffffff" />;
    }
  };

  const getStatusText = (status: Faculty['status']) => {
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#111827' : '#f9fafb',
    },
    scrollView: {
      flex: 1,
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
      marginBottom: 16,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    statItem: {
      alignItems: 'center',
      flex: 1,
    },
    statNumber: {
      fontSize: 24,
      fontWeight: '700',
      color: isDark ? '#ffffff' : '#111827',
    },
    statLabel: {
      fontSize: 12,
      color: isDark ? '#9ca3af' : '#6b7280',
      marginTop: 2,
    },
    content: {
      padding: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#111827',
      marginBottom: 16,
    },
    facultyCard: {
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#e5e7eb',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    facultyHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    facultyInfo: {
      flex: 1,
    },
    facultyName: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#111827',
      marginBottom: 2,
    },
    facultyDepartment: {
      fontSize: 14,
      color: isDark ? '#9ca3af' : '#6b7280',
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      gap: 4,
    },
    statusText: {
      fontSize: 12,
      fontWeight: '600',
      color: '#ffffff',
    },
    facultyDetails: {
      marginTop: 12,
      gap: 6,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    detailText: {
      fontSize: 14,
      color: isDark ? '#d1d5db' : '#374151',
      flex: 1,
    },
    lastSeen: {
      fontSize: 12,
      color: isDark ? '#9ca3af' : '#6b7280',
      fontStyle: 'italic',
    },
  });

  const availableCount = faculty.filter(f => f.status === 'available').length;
  const teachingCount = faculty.filter(f => f.status === 'teaching').length;
  const totalCount = faculty.length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Where's My Prof?</Text>
        <Text style={styles.headerSubtitle}>
          Real-time faculty availability and location tracking
        </Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#059669' }]}>
              {availableCount}
            </Text>
            <Text style={styles.statLabel}>Available</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#2563eb' }]}>
              {teachingCount}
            </Text>
            <Text style={styles.statLabel}>Teaching</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#6b7280' }]}>
              {totalCount}
            </Text>
            <Text style={styles.statLabel}>Total Faculty</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Faculty Status</Text>
          
          {faculty.map((prof) => (
            <TouchableOpacity key={prof.id} style={styles.facultyCard}>
              <View style={styles.facultyHeader}>
                <View style={styles.facultyInfo}>
                  <Text style={styles.facultyName}>{prof.name}</Text>
                  <Text style={styles.facultyDepartment}>{prof.department}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(prof.status) }]}>
                  {getStatusIcon(prof.status)}
                  <Text style={styles.statusText}>
                    {prof.status.charAt(0).toUpperCase() + prof.status.slice(1)}
                  </Text>
                </View>
              </View>
              
              <View style={styles.facultyDetails}>
                <View style={styles.detailRow}>
                  <MapPin size={16} color={isDark ? '#9ca3af' : '#6b7280'} />
                  <Text style={styles.detailText}>{prof.location}</Text>
                </View>
                
                {prof.nextClass && (
                  <View style={styles.detailRow}>
                    <Clock size={16} color={isDark ? '#9ca3af' : '#6b7280'} />
                    <Text style={styles.detailText}>Next: {prof.nextClass}</Text>
                  </View>
                )}
                
                <Text style={styles.lastSeen}>Last seen: {prof.lastSeen}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}