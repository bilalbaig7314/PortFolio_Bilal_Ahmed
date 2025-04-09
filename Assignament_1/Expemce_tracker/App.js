import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Dummy data for the app
const transactionsData = [
  { id: '1', type: 'Expense', amount: 50, category: 'Food', date: '2025-04-05' },
  { id: '2', type: 'Income', amount: 200, category: 'Salary', date: '2025-04-01' },
  { id: '3', type: 'Expense', amount: 30, category: 'Transport', date: '2025-04-03' },
];

// Stack Navigator
const Stack = createStackNavigator();

// Dashboard Screen
function DashboardScreen({ navigation }) {
  const totalIncome = transactionsData
    .filter((t) => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactionsData
    .filter((t) => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Expense Tracker</Text>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Balance: ${balance}</Text>
        <Text style={styles.summaryText}>Income: ${totalIncome}</Text>
        <Text style={styles.summaryText}>Expenses: ${totalExpense}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddExpense')}
      >
        <Text style={styles.buttonText}>Add Expense/Income</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TransactionsList')}
      >
        <Text style={styles.buttonText}>View Transactions</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Add Expense Screen
function AddExpenseScreen({ navigation }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleAdd = () => {
    // Add logic to save data (mocked here)
    console.log({ amount, category, date });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Add Expense/Income</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount ($)"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Category (e.g., Food, Salary)"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Transactions List Screen
function TransactionsListScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.category}</Text>
      <Text>{item.type}: ${item.amount}</Text>
      <Text>Date: {item.date}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Transactions</Text>
      <FlatList
        data={transactionsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ReportsAnalytics')}
      >
        <Text style={styles.buttonText}>View Reports</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Reports & Analytics Screen
function ReportsAnalyticsScreen({ navigation }) {
  const totalExpense = transactionsData
    .filter((t) => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Reports & Analytics</Text>
      <View style={styles.details}>
        <Text style={styles.subHeader}>Spending Trends</Text>
        <Text>Total Expenses: ${totalExpense}</Text>
        <Text>Food: $50 (Hardcoded for demo)</Text>
        <Text>Transport: $30 (Hardcoded for demo)</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BudgetSettings')}
      >
        <Text style={styles.buttonText}>Set Budget</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Budget Settings Screen
function BudgetSettingsScreen() {
  const [budget, setBudget] = useState('500');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Budget Settings</Text>
      <TextInput
        style={styles.input}
        placeholder="Monthly Budget ($)"
        keyboardType="numeric"
        value={budget}
        onChangeText={setBudget}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save Budget</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Profile & Theme Settings Screen
function ProfileThemeSettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Profile & Settings</Text>
      <View style={styles.details}>
        <Text>Name: Bilal Ahmed (Hardcoded)</Text>
        <Text>Email: bilal@example.com</Text>
        <Text style={styles.subHeader}>Theme</Text>
        <Text>Current Theme: Light (Hardcoded)</Text>
      </View>
    </SafeAreaView>
  );
}

// App Component with Navigation
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
        <Stack.Screen name="TransactionsList" component={TransactionsListScreen} />
        <Stack.Screen name="ReportsAnalytics" component={ReportsAnalyticsScreen} />
        <Stack.Screen name="BudgetSettings" component={BudgetSettingsScreen} />
        <Stack.Screen name="ProfileThemeSettings" component={ProfileThemeSettingsScreen} />
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
  summary: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 18,
    color: '#333',
    marginVertical: 5,
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