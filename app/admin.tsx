import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  useColorScheme,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Users, Plus, CreditCard as Edit3, Trash2, LogOut, Search, UserCheck, UserX, GraduationCap, Shield } from 'lucide-react-native';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  department: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 's.johnson@university.edu',
    role: 'faculty',
    department: 'Computer Science',
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john.doe@student.university.edu',
    role: 'student',
    department: 'Computer Science',
    status: 'active',
    createdAt: '2024-01-20',
  },
  {
    id: '3',
    name: 'Prof. Michael Chen',
    email: 'm.chen@university.edu',
    role: 'faculty',
    department: 'Mathematics',
    status: 'active',
    createdAt: '2024-01-10',
  },
  {
    id: '4',
    name: 'Jane Smith',
    email: 'jane.smith@student.university.edu',
    role: 'student',
    department: 'Biology',
    status: 'inactive',
    createdAt: '2024-01-25',
  },
];

export default function AdminScreen() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'student' as User['role'],
    department: '',
  });
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.department) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const user: User = {
      id: Date.now().toString(),
      ...newUser,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setUsers(prev => [...prev, user]);
    setNewUser({ name: '', email: '', role: 'student', department: '' });
    setShowAddModal(false);
    Alert.alert('Success', 'User added successfully');
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
    });
    setShowAddModal(true);
  };

  const handleUpdateUser = () => {
    if (!editingUser) return;

    setUsers(prev => prev.map(user => 
      user.id === editingUser.id 
        ? { ...user, ...newUser }
        : user
    ));
    
    setEditingUser(null);
    setNewUser({ name: '', email: '', role: 'student', department: '' });
    setShowAddModal(false);
    Alert.alert('Success', 'User updated successfully');
  };

  const handleDeleteUser = (userId: string) => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setUsers(prev => prev.filter(user => user.id !== userId));
            Alert.alert('Success', 'User deleted successfully');
          },
        },
      ]
    );
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: () => {
            global.currentUser = null;
            router.replace('/login');
          },
        },
      ]
    );
  };

  const getRoleIcon = (role: User['role']) => {
    switch (role) {
      case 'student':
        return <GraduationCap size={16} color={isDark ? '#9ca3af' : '#6b7280'} />;
      case 'faculty':
        return <Users size={16} color={isDark ? '#9ca3af' : '#6b7280'} />;
      case 'admin':
        return <Shield size={16} color={isDark ? '#9ca3af' : '#6b7280'} />;
    }
  };

  const getRoleColor = (role: User['role']) => {
    switch (role) {
      case 'student':
        return '#059669';
      case 'faculty':
        return '#2563eb';
      case 'admin':
        return '#dc2626';
    }
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
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#ef4444',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      gap: 6,
    },
    logoutButtonText: {
      fontSize: 14,
      fontWeight: '500',
      color: '#ffffff',
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
    filtersContainer: {
      flexDirection: 'row',
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
    content: {
      flex: 1,
      padding: 20,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    statCard: {
      flex: 1,
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 4,
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#e5e7eb',
      alignItems: 'center',
    },
    statNumber: {
      fontSize: 24,
      fontWeight: '700',
      color: isDark ? '#ffffff' : '#111827',
    },
    statLabel: {
      fontSize: 12,
      color: isDark ? '#9ca3af' : '#6b7280',
      marginTop: 4,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#111827',
    },
    addButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#059669',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      gap: 6,
    },
    addButtonText: {
      fontSize: 14,
      fontWeight: '500',
      color: '#ffffff',
    },
    userCard: {
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#e5e7eb',
    },
    userHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#111827',
      marginBottom: 2,
    },
    userEmail: {
      fontSize: 14,
      color: isDark ? '#9ca3af' : '#6b7280',
    },
    userActions: {
      flexDirection: 'row',
      gap: 8,
    },
    actionButton: {
      padding: 8,
      borderRadius: 6,
      backgroundColor: isDark ? '#374151' : '#f3f4f6',
    },
    userDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      marginTop: 8,
    },
    userDetail: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    userDetailText: {
      fontSize: 12,
      color: isDark ? '#d1d5db' : '#374151',
    },
    roleBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      alignSelf: 'flex-start',
    },
    roleBadgeText: {
      fontSize: 10,
      fontWeight: '600',
      color: '#ffffff',
      textTransform: 'uppercase',
    },
    statusBadge: {
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 8,
      alignSelf: 'flex-start',
    },
    statusBadgeText: {
      fontSize: 10,
      fontWeight: '500',
      color: '#ffffff',
    },
    modal: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: isDark ? '#1f2937' : '#ffffff',
      borderRadius: 16,
      padding: 24,
      width: '90%',
      maxWidth: 400,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: isDark ? '#ffffff' : '#111827',
      marginBottom: 20,
      textAlign: 'center',
    },
    formField: {
      marginBottom: 16,
    },
    fieldLabel: {
      fontSize: 14,
      fontWeight: '500',
      color: isDark ? '#d1d5db' : '#374151',
      marginBottom: 6,
    },
    fieldInput: {
      backgroundColor: isDark ? '#374151' : '#f9fafb',
      borderWidth: 1,
      borderColor: isDark ? '#4b5563' : '#e5e7eb',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      color: isDark ? '#ffffff' : '#111827',
    },
    roleSelector: {
      flexDirection: 'row',
      backgroundColor: isDark ? '#374151' : '#f3f4f6',
      borderRadius: 8,
      padding: 2,
    },
    roleOption: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 6,
      alignItems: 'center',
    },
    roleOptionActive: {
      backgroundColor: '#2563eb',
    },
    roleOptionText: {
      fontSize: 12,
      fontWeight: '500',
      color: isDark ? '#d1d5db' : '#6b7280',
    },
    roleOptionTextActive: {
      color: '#ffffff',
    },
    modalActions: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 20,
    },
    modalButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    cancelButton: {
      backgroundColor: isDark ? '#374151' : '#f3f4f6',
    },
    saveButton: {
      backgroundColor: '#059669',
    },
    modalButtonText: {
      fontSize: 16,
      fontWeight: '500',
    },
    cancelButtonText: {
      color: isDark ? '#ffffff' : '#374151',
    },
    saveButtonText: {
      color: '#ffffff',
    },
  });

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const facultyCount = users.filter(u => u.role === 'faculty').length;
  const studentCount = users.filter(u => u.role === 'student').length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Admin Panel</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={16} color="#ffffff" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Search size={20} color={isDark ? '#9ca3af' : '#6b7280'} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search users..."
            placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filtersContainer}>
          {['all', 'student', 'faculty', 'admin'].map((role) => (
            <TouchableOpacity
              key={role}
              style={[
                styles.filterChip,
                selectedRole === role && styles.filterChipActive,
              ]}
              onPress={() => setSelectedRole(role)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedRole === role && styles.filterChipTextActive,
                ]}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{totalUsers}</Text>
            <Text style={styles.statLabel}>Total Users</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#059669' }]}>{activeUsers}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#2563eb' }]}>{facultyCount}</Text>
            <Text style={styles.statLabel}>Faculty</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#ea580c' }]}>{studentCount}</Text>
            <Text style={styles.statLabel}>Students</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>User Management</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => setShowAddModal(true)}>
            <Plus size={16} color="#ffffff" />
            <Text style={styles.addButtonText}>Add User</Text>
          </TouchableOpacity>
        </View>

        {filteredUsers.map((user) => (
          <View key={user.id} style={styles.userCard}>
            <View style={styles.userHeader}>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
              </View>
              <View style={styles.userActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleToggleStatus(user.id)}
                >
                  {user.status === 'active' ? (
                    <UserCheck size={16} color="#059669" />
                  ) : (
                    <UserX size={16} color="#ef4444" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleEditUser(user)}
                >
                  <Edit3 size={16} color={isDark ? '#9ca3af' : '#6b7280'} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleDeleteUser(user.id)}
                >
                  <Trash2 size={16} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.userDetails}>
              <View style={styles.userDetail}>
                {getRoleIcon(user.role)}
                <View style={[styles.roleBadge, { backgroundColor: getRoleColor(user.role) }]}>
                  <Text style={styles.roleBadgeText}>{user.role}</Text>
                </View>
              </View>
              <View style={styles.userDetail}>
                <Text style={styles.userDetailText}>{user.department}</Text>
              </View>
              <View style={styles.userDetail}>
                <View style={[
                  styles.statusBadge, 
                  { backgroundColor: user.status === 'active' ? '#059669' : '#ef4444' }
                ]}>
                  <Text style={styles.statusBadgeText}>{user.status}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal visible={showAddModal} transparent animationType="fade">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingUser ? 'Edit User' : 'Add New User'}
            </Text>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Full Name</Text>
              <TextInput
                style={styles.fieldInput}
                value={newUser.name}
                onChangeText={(text) => setNewUser(prev => ({ ...prev, name: text }))}
                placeholder="Enter full name"
                placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                style={styles.fieldInput}
                value={newUser.email}
                onChangeText={(text) => setNewUser(prev => ({ ...prev, email: text }))}
                placeholder="Enter email address"
                placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Department</Text>
              <TextInput
                style={styles.fieldInput}
                value={newUser.department}
                onChangeText={(text) => setNewUser(prev => ({ ...prev, department: text }))}
                placeholder="Enter department"
                placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Role</Text>
              <View style={styles.roleSelector}>
                {(['student', 'faculty', 'admin'] as const).map((role) => (
                  <TouchableOpacity
                    key={role}
                    style={[
                      styles.roleOption,
                      newUser.role === role && styles.roleOptionActive,
                    ]}
                    onPress={() => setNewUser(prev => ({ ...prev, role }))}
                  >
                    <Text
                      style={[
                        styles.roleOptionText,
                        newUser.role === role && styles.roleOptionTextActive,
                      ]}
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowAddModal(false);
                  setEditingUser(null);
                  setNewUser({ name: '', email: '', role: 'student', department: '' });
                }}
              >
                <Text style={[styles.modalButtonText, styles.cancelButtonText]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={editingUser ? handleUpdateUser : handleAddUser}
              >
                <Text style={[styles.modalButtonText, styles.saveButtonText]}>
                  {editingUser ? 'Update' : 'Add User'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}