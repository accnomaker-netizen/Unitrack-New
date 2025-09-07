import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Navigation, Users, Building, Phone, Mail } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface Professor {
  id: string;
  name: string;
  department: string;
  status: 'available' | 'teaching' | 'meeting' | 'offline';
  building: string;
  room: string;
  coordinates: { x: number; y: number };
  email: string;
  phone: string;
}

interface Building {
  id: string;
  name: string;
  coordinates: { x: number; y: number };
  professors: Professor[];
}

const mockBuildings: Building[] = [
  {
    id: '1',
    name: 'Computer Science',
    coordinates: { x: 0.3, y: 0.4 },
    professors: [
      {
        id: '1',
        name: 'Dr. Sarah Johnson',
        department: 'Computer Science',
        status: 'available',
        building: 'CS Building',
        room: '201',
        coordinates: { x: 0.3, y: 0.4 },
        email: 's.johnson@university.edu',
        phone: '+1 (555) 123-4567',
      },
      {
        id: '6',
        name: 'Dr. Robert Martinez',
        department: 'Computer Science',
        status: 'teaching',
        building: 'CS Building',
        room: '150',
        coordinates: { x: 0.32, y: 0.42 },
        email: 'r.martinez@university.edu',
        phone: '+1 (555) 678-9012',
      },
    ],
  },
  {
    id: '2',
    name: 'Mathematics',
    coordinates: { x: 0.6, y: 0.3 },
    professors: [
      {
        id: '2',
        name: 'Prof. Michael Chen',
        department: 'Mathematics',
        status: 'teaching',
        building: 'Math Building',
        room: '105',
        coordinates: { x: 0.6, y: 0.3 },
        email: 'm.chen@university.edu',
        phone: '+1 (555) 234-5678',
      },
    ],
  },
  {
    id: '3',
    name: 'Physics Lab',
    coordinates: { x: 0.2, y: 0.7 },
    professors: [
      {
        id: '3',
        name: 'Dr. Emily Rodriguez',
        department: 'Physics',
        status: 'meeting',
        building: 'Physics Lab',
        room: '302',
        coordinates: { x: 0.2, y: 0.7 },
        email: 'e.rodriguez@university.edu',
        phone: '+1 (555) 345-6789',
      },
    ],
  },
  {
    id: '4',
    name: 'Biology Lab',
    coordinates: { x: 0.7, y: 0.6 },
    professors: [
      {
        id: '5',
        name: 'Dr. Lisa Wang',
        department: 'Biology',
        status: 'available',
        building: 'Biology Lab',
        room: '205',
        coordinates: { x: 0.7, y: 0.6 },
        email: 'l.wang@university.edu',
        phone: '+1 (555) 567-8901',
      },
    ],
  },
  {
    id: '5',
    name: 'Chemistry Building',
    coordinates: { x: 0.5, y: 0.8 },
    professors: [],
  },
];

export default function MapScreen() {
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const getStatusColor = (status: Professor['status']) => {
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

  const allProfessors = mockBuildings.flatMap(building => building.professors);

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
    headerTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: isDark ? '#ffffff' : '#111827',
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: 14,
      color: isDark ? '#9ca3af' : '#6b7280',
    },
    mapContainer: {
      flex: 1,
      position: 'relative',
    },
    map: {
      flex: 1,
      backgroundColor: isDark ? '#374151' : '#e5e7eb',
      margin: 20,
      borderRadius: 12,
      overflow: 'hidden',
    },
    mapGrid: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    gridLine: {
      position: 'absolute',
      backgroundColor: isDark ? '#4b5563' : '#d1d5db',
      opacity: 0.3,
    },
    building: {
      position: 'absolute',
      width: 60,
      height: 60,
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: isDark ? '#4b5563' : '#d1d5db',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    buildingSelected: {
      borderColor: '#2563eb',
      backgroundColor: '#dbeafe',
    },
    buildingLabel: {
      fontSize: 10,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#111827',
      textAlign: 'center',
    },
    professor: {
      position: 'absolute',
      width: 12,
      height: 12,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: '#ffffff',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 3,
    },
    professorSelected: {
      width: 16,
      height: 16,
      borderRadius: 8,
      borderWidth: 3,
    },
    legend: {
      position: 'absolute',
      top: 20,
      right: 20,
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      padding: 12,
      borderRadius: 8,
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
    legendTitle: {
      fontSize: 12,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#111827',
      marginBottom: 8,
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
      gap: 8,
    },
    legendDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    legendText: {
      fontSize: 10,
      color: isDark ? '#d1d5db' : '#374151',
    },
    bottomSheet: {
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      borderTopWidth: 1,
      borderTopColor: isDark ? '#374151' : '#e5e7eb',
      maxHeight: height * 0.4,
    },
    bottomSheetHandle: {
      width: 40,
      height: 4,
      backgroundColor: isDark ? '#4b5563' : '#d1d5db',
      borderRadius: 2,
      alignSelf: 'center',
      marginBottom: 16,
    },
    professorInfo: {
      marginBottom: 16,
    },
    professorName: {
      fontSize: 18,
      fontWeight: '700',
      color: isDark ? '#ffffff' : '#111827',
      marginBottom: 4,
    },
    professorDepartment: {
      fontSize: 14,
      color: isDark ? '#9ca3af' : '#6b7280',
      marginBottom: 8,
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 16,
    },
    statusDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    statusText: {
      fontSize: 14,
      fontWeight: '500',
      color: isDark ? '#ffffff' : '#111827',
    },
    detailsContainer: {
      gap: 12,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    detailText: {
      fontSize: 14,
      color: isDark ? '#d1d5db' : '#374151',
    },
    buildingInfo: {
      marginBottom: 16,
    },
    buildingName: {
      fontSize: 18,
      fontWeight: '700',
      color: isDark ? '#ffffff' : '#111827',
      marginBottom: 8,
    },
    professorsList: {
      gap: 8,
    },
    professorItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
      backgroundColor: isDark ? '#374151' : '#f9fafb',
      borderRadius: 8,
    },
    professorItemLeft: {
      flex: 1,
    },
    professorItemName: {
      fontSize: 14,
      fontWeight: '500',
      color: isDark ? '#ffffff' : '#111827',
    },
    professorItemRoom: {
      fontSize: 12,
      color: isDark ? '#9ca3af' : '#6b7280',
    },
    closeButton: {
      backgroundColor: isDark ? '#374151' : '#f3f4f6',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 16,
    },
    closeButtonText: {
      fontSize: 14,
      fontWeight: '500',
      color: isDark ? '#ffffff' : '#374151',
    },
  });

  const mapWidth = width - 40;
  const mapHeight = height * 0.6;

  // Create grid lines
  const gridLines = [];
  for (let i = 0; i <= 10; i++) {
    gridLines.push(
      <View
        key={`v-${i}`}
        style={[
          styles.gridLine,
          {
            left: (i / 10) * mapWidth,
            width: 1,
            height: mapHeight,
          },
        ]}
      />
    );
    gridLines.push(
      <View
        key={`h-${i}`}
        style={[
          styles.gridLine,
          {
            top: (i / 10) * mapHeight,
            height: 1,
            width: mapWidth,
          },
        ]}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Campus Map</Text>
        <Text style={styles.headerSubtitle}>
          Real-time professor locations • {allProfessors.length} faculty tracked
        </Text>
      </View>

      <View style={styles.mapContainer}>
        <View style={styles.map}>
          <View style={styles.mapGrid}>
            {gridLines}
          </View>

          {/* Buildings */}
          {mockBuildings.map((building) => (
            <TouchableOpacity
              key={building.id}
              style={[
                styles.building,
                {
                  left: building.coordinates.x * mapWidth - 30,
                  top: building.coordinates.y * mapHeight - 30,
                },
                selectedBuilding?.id === building.id && styles.buildingSelected,
              ]}
              onPress={() => {
                setSelectedBuilding(building);
                setSelectedProfessor(null);
              }}
            >
              <Building size={20} color={isDark ? '#ffffff' : '#111827'} />
              <Text style={styles.buildingLabel}>{building.name.split(' ')[0]}</Text>
            </TouchableOpacity>
          ))}

          {/* Professors */}
          {allProfessors.map((professor) => (
            <TouchableOpacity
              key={professor.id}
              style={[
                styles.professor,
                {
                  left: professor.coordinates.x * mapWidth - 6,
                  top: professor.coordinates.y * mapHeight - 6,
                  backgroundColor: getStatusColor(professor.status),
                },
                selectedProfessor?.id === professor.id && styles.professorSelected,
              ]}
              onPress={() => {
                setSelectedProfessor(professor);
                setSelectedBuilding(null);
              }}
            />
          ))}

          {/* Legend */}
          <View style={styles.legend}>
            <Text style={styles.legendTitle}>Status Legend</Text>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#059669' }]} />
              <Text style={styles.legendText}>Available</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#2563eb' }]} />
              <Text style={styles.legendText}>Teaching</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#ea580c' }]} />
              <Text style={styles.legendText}>Meeting</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#6b7280' }]} />
              <Text style={styles.legendText}>Offline</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Bottom Sheet for Selected Professor */}
      {selectedProfessor && (
        <View style={styles.bottomSheet}>
          <View style={styles.bottomSheetHandle} />
          <View style={styles.professorInfo}>
            <Text style={styles.professorName}>{selectedProfessor.name}</Text>
            <Text style={styles.professorDepartment}>{selectedProfessor.department}</Text>
            
            <View style={styles.statusContainer}>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor(selectedProfessor.status) }]} />
              <Text style={styles.statusText}>
                {selectedProfessor.status.charAt(0).toUpperCase() + selectedProfessor.status.slice(1)}
              </Text>
            </View>
          </View>

          <ScrollView style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <MapPin size={16} color={isDark ? '#9ca3af' : '#6b7280'} />
              <Text style={styles.detailText}>
                {selectedProfessor.building} - Room {selectedProfessor.room}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Mail size={16} color={isDark ? '#9ca3af' : '#6b7280'} />
              <Text style={styles.detailText}>{selectedProfessor.email}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Phone size={16} color={isDark ? '#9ca3af' : '#6b7280'} />
              <Text style={styles.detailText}>{selectedProfessor.phone}</Text>
            </View>
          </ScrollView>

          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setSelectedProfessor(null)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom Sheet for Selected Building */}
      {selectedBuilding && (
        <View style={styles.bottomSheet}>
          <View style={styles.bottomSheetHandle} />
          <View style={styles.buildingInfo}>
            <Text style={styles.buildingName}>{selectedBuilding.name}</Text>
          </View>

          <ScrollView style={styles.professorsList}>
            {selectedBuilding.professors.length === 0 ? (
              <Text style={styles.detailText}>No professors currently in this building</Text>
            ) : (
              selectedBuilding.professors.map((professor) => (
                <TouchableOpacity
                  key={professor.id}
                  style={styles.professorItem}
                  onPress={() => {
                    setSelectedProfessor(professor);
                    setSelectedBuilding(null);
                  }}
                >
                  <View style={styles.professorItemLeft}>
                    <Text style={styles.professorItemName}>{professor.name}</Text>
                    <Text style={styles.professorItemRoom}>Room {professor.room}</Text>
                  </View>
                  <View style={[styles.statusDot, { backgroundColor: getStatusColor(professor.status) }]} />
                </TouchableOpacity>
              ))
            )}
          </ScrollView>

          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setSelectedBuilding(null)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}