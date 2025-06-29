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

const RegisterScreen = () => {
  const API_URL =
    process.env.EXPO_API_URL ||
    "https://login-and-registration-system-9szk.onrender.com";

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    dob: "30-08-2004",
  });

  const handleChange = (key: keyof typeof userInfo, value: string) => {
    setUserInfo({ ...userInfo, [key]: value });
  };

  const handleRegisterUser = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/auth/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert("Success", data.message || "Registration successful");
        router.push("/login");
        setLoading(false);
      } else {
        Alert.alert("Error", data.message || "Something went wrong");
        setLoading(false);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to register. Please try again.");
      console.error("Registration error:", error);
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-black justify-center px-6">
      <Text className="text-white text-3xl font-bold mb-10 text-center">
        Create Account
      </Text>

      <TextInput
        placeholder="Username"
        placeholderTextColor="#888"
        value={userInfo.name}
        onChangeText={(text) => handleChange("name", text)}
        className="bg-[#1e1e1e] text-white px-4 py-4 rounded-xl mb-4"
      />

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
        className="bg-white py-3 rounded-xl mb-4"
        onPress={handleRegisterUser}
      >
        <Text className="text-black text-center text-lg font-semibold">
          {loading ? (
            <ActivityIndicator size={"large"} color={"black"} />
          ) : (
            "Create Account"
          )}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text className="text-gray-400 text-center text-lg">
          Already have an account?{" "}
          <Link href="/login" className="text-white underline">
            Login
          </Link>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
