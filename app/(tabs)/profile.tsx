import { icons } from "@/constants/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface User {
  email: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const parsedUser: User = JSON.parse(userData);
          setUser(parsedUser);
        } else {
          router.replace("/login");
        }
      } catch (error) {
        console.error("Error retrieving user:", error);
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logoutUser = async () => {
    try {
      await AsyncStorage.removeItem("user");
      Alert.alert("Logged out", "You have been logged out successfully.");
      router.replace("/login");
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!user) return null;

  return (
    <View className="flex-1 bg-black px-10">
      <View className="flex justify-center items-center flex-1 gap-5">
        <Image source={icons.person} className="size-10" tintColor="#fff" />
        <Text className="text-gray-500 text-2xl">{user.email}</Text>
        <TouchableOpacity
          className="bg-red-600 py-2 px-4 rounded-md"
          onPress={logoutUser}
        >
          <Text className="text-white text-lg">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
