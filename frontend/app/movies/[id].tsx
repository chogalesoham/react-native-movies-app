import { icons } from "@/constants/icons";
import { router, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { fetchMovieDetails } from "../utils/api";
import useFetch from "../utils/useFetch";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className=" flex-col justify-center mt-5">
    <Text className=" text-light-200 font-semibold text-2xl">{label}</Text>
    <Text className=" text-light-100 font-bold text-sm">{value || "N/A"}</Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movie } = useFetch(() => fetchMovieDetails(id as string));
  return (
    <View className=" bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className=" w-full h-[550px] object-cover"
            resizeMode="stretch"
          />
        </View>
        <View className=" flex-col items-start justify-center mt-5 px-5">
          <Text className=" text-white font-bold text-2xl">{movie?.title}</Text>
          <View className=" flex-row items-center gap-x-1 mt-2">
            <Text className=" text-light-200">
              {movie?.release_date?.split("_")[0]}
            </Text>
            <Text className=" text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>
          <View className=" flex-row items-center py-2 px-4 bg-dark-100 rounded-full gap-x-1 mt-2">
            <Image source={icons.star} className=" size-4" />
            <Text className=" text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className=" text-light-200 text-sm">
              {" "}
              ({movie?.vote_count} Votess)
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" - ") || "N/A"}
          />
          <View>
            <MovieInfo
              label="Budget"
              value={`$${movie?.budget / 1_000_00} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(movie?.revenue) / 1_000_00}`}
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies
                ?.map((c: any) => c.name)
                .join(" - ") || "N/A"
            }
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={router.back}
        className=" absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
      >
        <Image
          source={icons.arrow}
          className=" size-5 mr-1 rotate-180"
          tintColor="#ffff"
        />
        <Text className=" text-white font-bold text-base">Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
