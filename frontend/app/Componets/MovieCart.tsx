import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCart = ({
  title,
  id,
  poster_path,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-1/3 p-2 shadow-white shadow-md bg-primary rounded-lg border border-dark-100">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://via.placeholder.com/500",
          }}
          className="w-full h-52 rounded-lg "
          resizeMode="cover"
        />
        <Text className="text-white font-bold mt-2" numberOfLines={1}>
          {title}
        </Text>
        <View className=" flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size=4" />
          <Text className="text-white text-md font-semibold">
            {vote_average.toFixed(1)}{" "}
          </Text>
        </View>
        <View>
          <Text className="text-md text-light-200 font-medium mt-1">
            {release_date?.split("-")[0] || "Unknown Year"}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCart;
