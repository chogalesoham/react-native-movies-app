import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { Image, ScrollView, View } from "react-native";
import SearchBar from "../Componets/SearchBar";

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-primary">
      <Image className=" absolute w-full z-0" source={images.bg} />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-16 h-14 mt-20 mb-5 mx-auto" />
        <View className=" flex-1 mt-1">
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search Your Favorite Movie"
          />
        </View>
      </ScrollView>
    </View>
  );
}
