import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import MovieCart from "../Componets/MovieCart";
import SearchBar from "../Componets/SearchBar";
import { fetchMovies } from "../utils/api";
import useFetch from "../utils/useFetch";

export default function Index() {
  const router = useRouter();
  const {
    data: Movies,
    loading,
    error,
    fetchData,
  } = useFetch(() => fetchMovies({ query: "" }), false);

  React.useEffect(() => {
    fetchData();
  }, []);

  const renderHeader = () => (
    <>
      <Image
        source={images.bg}
        className=" flex-1 absolute w-full z-0 right-0 left-0"
        resizeMode="cover"
      />
      <Image source={icons.logo} className="w-16 h-14 mt-20 mb-5 mx-auto" />
      <SearchBar
        onPress={() => router.push("/search")}
        placeholder="Search Your Favorite Movie"
      />
      <Text className=" text-lg text-white font-bold mt-5 mb-3 ">
        Latest Movies
      </Text>
    </>
  );

  if (loading) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <Text className="mt-10 text-center">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary w-full">
      <FlatList
        data={Movies?.slice(0, 50) || []}
        renderItem={({ item }) => <MovieCart {...item} />}
        keyExtractor={(item) => item.id?.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 5,
          marginBottom: 10,
          paddingRight: 10,
        }}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
        className="mt-2 pb-32"
      />
    </View>
  );
}
