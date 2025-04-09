import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Dummy data for the app
const eventsData = [
  { id: '1', type: 'Movie', title: 'Avengers: Endgame', time: '7:00 PM', price: '$12' },
  { id: '2', type: 'Event', title: 'Music Concert', time: '8:00 PM', price: '$25' },
  { id: '3', type: 'Travel', title: 'Flight to New York', time: '10:00 AM', price: '$150' },
];

const bookingsData = [
  { id: '1', title: 'Avengers: Endgame', date: '2025-04-10', status: 'Upcoming' },
  { id: '2', title: 'Music Concert', date: '2025-03-15', status: 'Past' },
];

// Stack Navigator
const Stack = createStackNavigator();

// Home Screen
function HomeScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('BookingDetails', { item })}
    >
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text>{item.type} - {item.time}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Ticket Booking App</Text>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => navigation.navigate('SearchFilter')}
      >
        <Text style={styles.buttonText}>Search & Filter</Text>
      </TouchableOpacity>
      <FlatList
        data={eventsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

// Search & Filter Screen
function SearchFilterScreen({ navigation }) {
  const [search, setSearch] = React.useState('');
  const filteredData = eventsData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('BookingDetails', { item })}
    >
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text>{item.type} - {item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Search & Filter</Text>
      <TextInput
        style={styles.input}
        placeholder="Search events, movies, flights..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

// Booking Details Screen
function BookingDetailsScreen({ route, navigation }) {
  const { item } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Booking Details</Text>
      <View style={styles.details}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text>Type: {item.type}</Text>
        <Text>Time: {item.time}</Text>
        <Text>Price: {item.price}</Text>
        <Text style={styles.subHeader}>Select Seats/Showtime</Text>
        <Text>Seat: A1 (Hardcoded for demo)</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Payment', { item })}
      >
        <Text style={styles.buttonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Payment Screen
function PaymentScreen({ route, navigation }) {
  const { item } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Payment</Text>
      <View style={styles.details}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text>Price: {item.price}</Text>
        <TextInput style={styles.input} placeholder="Card Number" />
        <TextInput style={styles.input} placeholder="Discount Code" />
        <Text>Payment Method: Card (Hardcoded for demo)</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MyBookings')}
      >
        <Text style={styles.buttonText}>Confirm Payment</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// My Bookings Screen
function MyBookingsScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text>Date: {item.date}</Text>
      <Text>Status: {item.status}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Bookings</Text>
      <FlatList
        data={bookingsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ProfileSettings')}
      >
        <Text style={styles.buttonText}>Go to Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Profile & Settings Screen
function ProfileSettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Profile & Settings</Text>
      <View style={styles.details}>
        <Text>Name: Bilal Ahmed (Hardcoded)</Text>
        <Text>Email: bilal@example.com</Text>
        <Text style={styles.subHeader}>Payment History</Text>
        <Text>Avengers: Endgame - $12 (2025-04-10)</Text>
        <Text style={styles.subHeader}>Settings</Text>
        <Text>Notifications: On</Text>
      </View>
    </SafeAreaView>
  );
}

// App Component with Navigation
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SearchFilter" component={SearchFilterScreen} />
        <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="MyBookings" component={MyBookingsScreen} />
        <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#555',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#1E90FF',
    marginTop: 5,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  searchButton: {
    backgroundColor: '#4169E1',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
});