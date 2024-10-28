import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { router, useLocalSearchParams, usePathname } from "expo-router";

const SearchInput = ({
  value,
  otherStyles,
  placeholder,
  handleChangeText,
  handlePress,
  ...props
}) => {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  return (
    <View
      className={`w-full h-16 px-4 bg-black-100 rounded-xl border-2 border-black-200 focus:border-secondary flex flex-row items-center justify-between ${otherStyles}`}
    >
      <TextInput
        value={query}
        onChangeText={(e) => setQuery(e)}
        placeholder={"Search for a video topic"}
        placeholderTextColor={"#CDCDE0"}
        className=" placeholder:text-slate-400"
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert("Missing query", "Please filling out the query");
          }

          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
