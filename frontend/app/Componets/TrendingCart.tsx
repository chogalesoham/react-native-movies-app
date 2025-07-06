import { images } from "@/constants/images";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const TrendingCart = ({ movies, index }: any) => {
  const { id, title, poster_path } = movies;
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className=" w-32 mx-1 relative p-2 rounded-lg border-gray-600 border">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://via.placeholder.com/500",
          }}
          className=" h-48 rounded-lg"
          resizeMode="cover"
        />
        <View className=" absolute bottom-16 left-3.5 px-2 py-1 rounded-full">
          <MaskedView
            maskElement={
              <Text className=" font-bold text-white text-[90px] ">
                {index + 1}
              </Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className=" size-20 "
              resizeMode="cover"
            />
          </MaskedView>
        </View>
        <Text
          className=" text-sm font-bold mt-2 text-light-200"
          numberOfLines={2}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCart;
