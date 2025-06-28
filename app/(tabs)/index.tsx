import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Image, ScrollView, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 bg-primary">
      <Image className=" absolute w-full z-0" source={images.bg} />
      <ScrollView className="flex-1 px-5">
        <Image source={icons.logo} className="w-16 h-14 mt-20 mb-5 mx-auto" />
      </ScrollView>
    </View>
  );
}
