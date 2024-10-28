import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="flex items-center justify-center mt-5">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[275px] h-[215px]"
      />
      <Text className="text-white text-2xl font-bold">{title}</Text>
      <Text className="text-slate-400 text-lg">{subtitle}</Text>
      <CustomButton
        title={"Create a video"}
        handlePress={() => router.push("/create")}
        contentContainerStyle={"w-full mt-5"}
      />
    </View>
  );
};

export default EmptyState;
