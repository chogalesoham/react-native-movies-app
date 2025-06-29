import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const LoginScreen = () => {
  const API_URL =
    process.env.EXPO_API_URL ||
    "https://login-and-registration-system-9szk.onrender.com";

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (key: keyof typeof userInfo, value: string) => {
    setUserInfo({ ...userInfo, [key]: value });
  };

  const handleLoginUser = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert("Success", data.message || "Login successful");
        await AsyncStorage.setItem("user", JSON.stringify(userInfo));
        setLoading(false);
        router.push("/");
      } else {
        Alert.alert("Error", data.message || "Something went wrong");
        setLoading(false);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to Login. Please try again.");
      console.error("Login error:", error);
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-primary justify-center px-6">
      <Text className="text-white text-3xl font-bold mb-10 text-center">
        Login
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={userInfo.email}
        onChangeText={(text) => handleChange("email", text)}
        className="bg-[#1e1e1e] text-white px-4 py-4 rounded-xl mb-4"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={userInfo.password}
        onChangeText={(text) => handleChange("password", text)}
        className="bg-[#1e1e1e] text-white px-4 py-4 rounded-xl mb-6"
      />

      <TouchableOpacity
        onPress={handleLoginUser}
        className="bg-white py-3 rounded-xl mb-4"
      >
        <Text className="text-black text-center text-lg font-semibold">
          {loading ? <ActivityIndicator size="large" color="black" /> : "Login"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text className="text-gray-400 text-lg text-center">
          Don't have an account ?{" "}
          <Link href="/ragister" className="text-white underline">
            Create one
          </Link>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
