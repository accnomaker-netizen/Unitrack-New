import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MapPin, Clock, Phone, Mail, Filter, X } from 'lucide-react-native';

interface Faculty {
  id: string;
  name: string;
  department: string;
  status: 'available' | 'teaching' | 'meeting' | 'offline';
  location: string;
  office: string;
  email: string;
  phone: string;
  specialization: string[];
  lastSeen: string;
  nextClass?: string;
}

const mockFaculty: Faculty[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    department: 'Computer Science',
    status: 'available',
    location: 'CS Building - Room 201',
    office: 'CS-201',
    email: 's.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    specialization: ['Machine Learning', 'Data Structures', 'AI'],
    lastSeen: '2 minutes ago',
    nextClass: '2:00 PM - Data Structures',
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    department: 'Mathematics',
    status: 'teaching',
    location: 'Math Building - Room 105',
    office: 'MATH-305',
    email: 'm.chen@university.edu',
    phone: '+1 (555) 234-5678',
    specialization: ['Calculus', 'Linear Algebra', 'Statistics'],
    lastSeen: 'Active now',
    nextClass: '3:30 PM - Calculus II',
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    department: 'Physics',
    status: 'meeting',
    location: 'Physics Lab - Room 302',
    office: 'PHY-302',
    email: 'e.rodriguez@university.edu',
    phone: '+1 (555) 345-6789',
    specialization: ['Quantum Physics', 'Thermodynamics', 'Optics'],
    lastSeen: '15 minutes ago',
    nextClass: '4:00 PM - Quantum Physics',
  },
  {
    id: '4',
    name: 'Prof. James Wilson',
    department: 'Chemistry',
    status: 'offline',
    location: 'Unknown',
    office: 'CHEM-101',
    email: 'j.wilson@university.edu',
    phone: '+1 (555) 456-7890',
    specialization: ['Organic Chemistry', 'Biochemistry', 'Analytical Chemistry'],
    lastSeen: '2 hours ago',
  },
  {
    id: '5',
    name: 'Dr. Lisa Wang',
    department: 'Biology',
    status: 'available',
    location: 'Biology Lab - Room 205',
    office: 'BIO-205',
    email: 'l.wang@university.edu',
    phone: '+1 (555) 567-8901',
    specialization: ['Molecular Biology', 'Genetics', 'Cell Biology'],
    lastSeen: '5 minutes ago',
    nextClass: '1:30 PM - Molecular Biology',
  },
  {
    id: '6',
    name: 'Dr. Robert Martinez',
    department: 'Computer Science',
    status: 'available',
    location: 'CS Building - Room 150',
    office: 'CS-150',
    email: 'r.martinez@university.edu',
    phone: '+1 (555) 678-9012',
    specialization: ['Software Engineering', 'Database Systems', 'Web Development'],
    lastSeen: '10 minutes ago',
    nextClass: '5:00 PM - Software Engineering',
  },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const departments = Array.from(new Set(mockFaculty.map(f => f.department)));
  const statuses = ['available', 'teaching', 'meeting', 'offline'];

  const filteredFaculty = useMemo(() => {
    let filtered = mockFaculty;

    if (searchQuery) {
      filtered = filtered.filter(faculty =>
        faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.specialization.some(spec => 
          spec.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    if (selectedDepartment) {
      filtered = filtered.filter(faculty => faculty.department === selectedDepartment);
    }

    if (selectedStatus) {
      filtered = filtered.filter(faculty => faculty.status === selectedStatus);
    }

    return filtered;
  }, [searchQuery, selectedDepartment, selectedStatus]);

  const clearFilters = () => {
    setSelectedDepartment(null);
    setSelectedStatus(null);
    setSearchQuery('');
  };

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#111827' : '#f9fafb',
    },
    header: {
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#374151' : '#e5e7eb',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#374151' : '#f3f4f6',
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginBottom: 16,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: isDark ? '#ffffff' : '#111827',
      marginLeft: 8,
    },
    filterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#374151' : '#e5e7eb',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      gap: 6,
    },
    filterButtonText: {
      fontSize: 14,
      fontWeight: '500',
      color: isDark ? '#ffffff' : '#374151',
    },
    filtersContainer: {
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#374151' : '#e5e7eb',
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    filterSection: {
      marginBottom: 16,
    },
    filterLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#111827',
      marginBottom: 8,
    },
    filterOptions: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    filterChip: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: isDark ? '#4b5563' : '#d1d5db',
      backgroundColor: isDark ? '#374151' : '#f9fafb',
    },
    filterChipActive: {
      backgroundColor: '#2563eb',
      borderColor: '#2563eb',
    },
    filterChipText: {
      fontSize: 12,
      color: isDark ? '#d1d5db' : '#374151',
    },
    filterChipTextActive: {
      color: '#ffffff',
    },
    clearFiltersButton: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#dc2626' : '#ef4444',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      gap: 4,
      marginTop: 8,
    },
    clearFiltersText: {
      fontSize: 12,
      color: '#ffffff',
      fontWeight: '500',
    },
    content: {
      flex: 1,
      padding: 20,
    },
    resultsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    resultsCount: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#111827',
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
    statusDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginTop: 2,
    },
    facultyDetails: {
      gap: 8,
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
    specializations: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
      marginTop: 8,
    },
    specializationChip: {
      backgroundColor: isDark ? '#374151' : '#f3f4f6',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
    },
    specializationText: {
      fontSize: 12,
      color: isDark ? '#d1d5db' : '#6b7280',
    },
    lastSeen: {
      fontSize: 12,
      color: isDark ? '#9ca3af' : '#6b7280',
      fontStyle: 'italic',
      marginTop: 4,
    },
    noResults: {
      textAlign: 'center',
      fontSize: 16,
      color: isDark ? '#9ca3af' : '#6b7280',
      marginTop: 40,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search faculty, department, or expertise..."
            placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter size={16} color={isDark ? '#ffffff' : '#374151'} />
          <Text style={styles.filterButtonText}>Filters</Text>
        </TouchableOpacity>
      </View>

      {showFilters && (
        <View style={styles.filtersContainer}>
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Department</Text>
            <View style={styles.filterOptions}>
              {departments.map((dept) => (
                <TouchableOpacity
                  key={dept}
                  style={[
                    styles.filterChip,
                    selectedDepartment === dept && styles.filterChipActive,
                  ]}
                  onPress={() => setSelectedDepartment(
                    selectedDepartment === dept ? null : dept
                  )}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      selectedDepartment === dept && styles.filterChipTextActive,
                    ]}
                  >
                    {dept}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Status</Text>
            <View style={styles.filterOptions}>
              {statuses.map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.filterChip,
                    selectedStatus === status && styles.filterChipActive,
                  ]}
                  onPress={() => setSelectedStatus(
                    selectedStatus === status ? null : status
                  )}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      selectedStatus === status && styles.filterChipTextActive,
                    ]}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {(selectedDepartment || selectedStatus || searchQuery) && (
            <TouchableOpacity style={styles.clearFiltersButton} onPress={clearFilters}>
              <X size={12} color="#ffffff" />
              <Text style={styles.clearFiltersText}>Clear Filters</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <ScrollView style={styles.content}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredFaculty.length} faculty member{filteredFaculty.length !== 1 ? 's' : ''} found
          </Text>
        </View>

        {filteredFaculty.length === 0 ? (
          <Text style={styles.noResults}>
            No faculty members match your search criteria
          </Text>
        ) : (
          filteredFaculty.map((faculty) => (
            <TouchableOpacity key={faculty.id} style={styles.facultyCard}>
              <View style={styles.facultyHeader}>
                <View style={styles.facultyInfo}>
                  <Text style={styles.facultyName}>{faculty.name}</Text>
                  <Text style={styles.facultyDepartment}>{faculty.department}</Text>
                </View>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor(faculty.status) }]} />
              </View>

              <View style={styles.facultyDetails}>
                <View style={styles.detailRow}>
                  <MapPin size={16} color={isDark ? '#9ca3af' : '#6b7280'} />
                  <Text style={styles.detailText}>{faculty.location}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Mail size={16} color={isDark ? '#9ca3af' : '#6b7280'} />
                  <Text style={styles.detailText}>{faculty.email}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Phone size={16} color={isDark ? '#9ca3af' : '#6b7280'} />
                  <Text style={styles.detailText}>{faculty.phone}</Text>
                </View>

                {faculty.nextClass && (
                  <View style={styles.detailRow}>
                    <Clock size={16} color={isDark ? '#9ca3af' : '#6b7280'} />
                    <Text style={styles.detailText}>Next: {faculty.nextClass}</Text>
                  </View>
                )}

                <View style={styles.specializations}>
                  {faculty.specialization.map((spec, index) => (
                    <View key={index} style={styles.specializationChip}>
                      <Text style={styles.specializationText}>{spec}</Text>
                    </View>
                  ))}
                </View>

                <Text style={styles.lastSeen}>Last seen: {faculty.lastSeen}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}