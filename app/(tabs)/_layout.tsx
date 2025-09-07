import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { Chrome as Home, Search, MapPin, User, SquareCheck as CheckSquare } from 'lucide-react-native';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!global.currentUser) {
      router.replace('/login');
      return;
    }
    
    // Redirect students away from faculty-only features
    if (global.currentUser.role === 'student') {
      // Students can access all tabs but with limited functionality
    }
  }, []);

  const tabBarStyle = {
    backgroundColor: colorScheme === 'dark' ? '#1f2937' : '#ffffff',
    borderTopColor: colorScheme === 'dark' ? '#374151' : '#e5e7eb',
    borderTopWidth: 1,
    height: 80,
    paddingTop: 8,
    paddingBottom: 20,
  };

  const tabBarActiveTintColor = '#2563eb';
  const tabBarInactiveTintColor = colorScheme === 'dark' ? '#9ca3af' : '#6b7280';

  // Don't render tabs if not authenticated
  if (!global.currentUser) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle,
        tabBarActiveTintColor,
        tabBarInactiveTintColor,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ size, color }) => (
            <Search size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Campus Map',
          tabBarIcon: ({ size, color }) => (
            <MapPin size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="checkin"
        options={{
          title: 'Check-In',
          tabBarIcon: ({ size, color }) => (
            <CheckSquare size={size} color={color} />
          ),
          // Hide check-in tab for students
          href: global.currentUser?.role === 'student' ? null : '/checkin',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}