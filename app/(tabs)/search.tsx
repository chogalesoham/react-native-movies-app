import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import MovieCart from "../Componets/MovieCart";
import SearchBar from "../Componets/SearchBar";
import { fetchMovies } from "../utils/api";
import useFetch from "../utils/useFetch";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: movies,
    loading,
    error,

    reset,
    fetchData: loadMovies,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className=" flex-1 bg-primary">
      <Image
        source={images.bg}
        className=" flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        className=" px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className=" w-12 h-10" />
            </View>
            <View className=" my-5">
              <SearchBar
                onPress={() => loadMovies()}
                placeholder="Search Movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            {error && (
              <Text className="text-red text-lg px-5 my-3">{error}</Text>
            )}
            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-white text-lg font-bold">
                Search Results for{" "}
                <Text className=" text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        keyExtractor={(item) => item.id.toString()}
        data={movies}
        renderItem={({ item }) => <MovieCart {...item} />}
        ListEmptyComponent={
          !loading && !error ? (
            <View className=" mt-20 px-5">
              <Text className=" text-center text-2xl text-gray-500">
                {searchQuery.trim()
                  ? "No Movies Found ! "
                  : "Search for a Movies"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
