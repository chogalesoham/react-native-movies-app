import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { TrendingMovies as fetchTrendingMovies } from "../utils/api";
import TrendingCart from "./TrendingCart";

const TrendingMovies = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTrending = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (err: any) {
        setError(err.message || "Failed to load trending movies");
      } finally {
        setLoading(false);
      }
    };
    getTrending();
  }, []);

  return (
    <View className="my-4">
      <Text className="text-teal-50 mb-6 text-4xl font-bold text-center mt-6">
        _Trending Movies_
      </Text>
      {loading ? (
        <ActivityIndicator color="#00bcd4" />
      ) : error ? (
        <Text className="text-red-500">{error}</Text>
      ) : (
        <FlatList
          horizontal
          data={movies}
          renderItem={({ item, index }) => (
            <TrendingCart movies={item} index={index} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default TrendingMovies;
