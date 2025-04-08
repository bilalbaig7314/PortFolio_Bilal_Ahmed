import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';

export default function App() {
  const [city, setCity] = useState('San Francisco'); // State to manage city input

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Weather App</Text>
      </View>

      {/* City Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter city name"
          placeholderTextColor="#ccc"
          value={city}
          onChangeText={(text) => setCity(text)} // Update city state on input change
        />
      </View>

      {/* Current Weather Section */}
      <View style={styles.weatherContainer}>
        <Text style={styles.cityText}>{city || 'Enter a city'}</Text>
        <Text style={styles.tempText}>18°C</Text>
        <Text style={styles.conditionText}>Partly Cloudy</Text>
      </View>

      {/* Weather Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style={styles.detailValue}>65%</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Wind</Text>
          <Text style={styles.detailValue}>12 km/h</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Pressure</Text>
          <Text style={styles.detailValue}>1015 hPa</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E90FF', // DodgerBlue background
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#4169E1', // RoyalBlue header
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  inputContainer: {
    padding: 15,
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  weatherContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cityText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  tempText: {
    fontSize: 64,
    fontWeight: '300',
    color: '#fff',
    marginVertical: 10,
  },
  conditionText: {
    fontSize: 20,
    color: '#fff',
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 16,
    color: '#fff',
  },
  detailValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
});