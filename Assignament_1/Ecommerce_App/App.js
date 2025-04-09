import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Image, FlatList, TouchableOpacity, Button, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const products = [
  { id: "1", name: "Smartphone", price: "$699", category: "Electronics", image: "https://images.squarespace-cdn.com/content/v1/6487bef30edbef7ab095cc7f/10fcd996-1c15-45c1-9ca9-539ba4cdc87c/Stuff-Best-Smartphone-Lead.png" },
  { id: "2", name: "Laptop", price: "$999", category: "Electronics", image: "https://th.bing.com/th/id/OIP.i93kgvtClw5v9M1XLz9NQgHaHa?rs=1&pid=ImgDetMain" },
  { id: "3", name: "Headphones", price: "$199", category: "Accessories", image: "https://th.bing.com/th/id/OIP.yX25zrp5UPNeGTzG-KWVIgHaHa?rs=1&pid=ImgDetMain" },
  { id: "4", name: "Smartwatch", price: "$299", category: "Accessories", image: "https://th.bing.com/th/id/OIP.LFcx9aj0EqaogmrJcuTjZwHaHa?rs=1&pid=ImgDetMain" },
  { id: "5", name: "Gaming Console", price: "$499", category: "Gaming", image: "https://th.bing.com/th/id/OIP.fO-uXREkUVz5NayldFSJlwHaHa?rs=1&pid=ImgDetMain" },
  { id: "6", name: "Camera", price: "$799", category: "Photography", image: "https://th.bing.com/th/id/OIP.ZsJSks6jUB0mpH_HJ0w0wQHaHa?rs=1&pid=ImgDetMain" },
];

const HomeScreen = ({ navigation, cart, setCart }) => {
  const [search, setSearch] = useState("");
  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>E-Commerce App</Text>
      <TextInput style={styles.searchBar} placeholder="Search products..." value={search} onChangeText={setSearch} />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("ProductDetails", { item })}>
            <View style={styles.productItem}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Cart")} style={styles.cartButton}>
        <MaterialIcons name="shopping-cart" size={26} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const ProductDetailsScreen = ({ route, cart, setCart }) => {
  const { item } = route.params;

  const handleAddToCart = () => {
    setCart([...cart, item]);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.detailsImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <Button title="Add to Cart" onPress={handleAddToCart} color="#007BFF" />
    </View>
  );
};

const CartScreen = ({ cart, setCart }) => {
  const handleRemoveFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            <Button title="Remove" onPress={() => handleRemoveFromCart(item.id)} color="red" />
          </View>
        )}
      />
      <Button title="Checkout" onPress={() => alert("Proceed to checkout!")} color="#28a745" />
    </View>
  );
};

export default function App() {
  const [cart, setCart] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {props => <HomeScreen {...props} cart={cart} setCart={setCart} />}
        </Stack.Screen>
        <Stack.Screen name="ProductDetails">
          {props => <ProductDetailsScreen {...props} cart={cart} setCart={setCart} />}
        </Stack.Screen>
        <Stack.Screen name="Cart">
          {props => <CartScreen {...props} cart={cart} setCart={setCart} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  searchBar: { height: 40, borderBottomWidth: 1, marginBottom: 10, paddingHorizontal: 10, backgroundColor: "#fff", borderRadius: 5 },
  productItem: { flexDirection: "row", padding: 15, borderBottomWidth: 1, alignItems: "center", backgroundColor: "#fff", borderRadius: 10, marginBottom: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 5 },
  productImage: { width: 80, height: 80, marginRight: 15, borderRadius: 10 },
  productName: { fontSize: 18, fontWeight: "600" },
  productPrice: { fontSize: 16, color: "#28a745" },
  detailsImage: { width: 250, height: 250, alignSelf: "center", borderRadius: 10, marginBottom: 20 },
  cartButton: { position: "absolute", top: 10, right: 10, backgroundColor: "#007BFF", padding: 10, borderRadius: 50, shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 5, elevation: 5 },
});
