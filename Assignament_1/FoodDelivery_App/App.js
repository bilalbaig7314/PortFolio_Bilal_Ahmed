import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Alert } from "react-native";

export default function App() {
  const [foodItems, setFoodItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://192.168.100.144:5000/food")
      .then(res => res.json())
      .then(data => setFoodItems(data))
      .catch(error => console.error("Error fetching food:", error));
  }, []);

  const addToCart = (item) => {
    setCart([...cart, item]);
    Alert.alert("Added to Cart", `${item.name} added successfully!`);
  };
  const goToCart = () => {
  Alert.alert("Cart", `You have ${cart.length} items in your cart`);
};


  return (
    
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>Food Menu</Text>
      <FlatList
        data={foodItems}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={{ margin: 10, padding: 10, backgroundColor: "#f8f8f8", borderRadius: 10 }}>
            <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Text style={{ fontSize: 16, color: "green" }}>${item.price}</Text>
            <TouchableOpacity onPress={() => addToCart(item)} style={{ backgroundColor: "blue", padding: 10, marginTop: 10 }}>
              <Text style={{ color: "white", textAlign: "center" }}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
    
  );
}
