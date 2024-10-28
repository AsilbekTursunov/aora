import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useRef, useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";


const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  const [status, setStatus] = useState(false);
  const video = React.useRef(null);

  return (
    <Animatable.View  className="mr-5">
      {play ? (
        <Video
          ref={video}
          className="w-56 h-80 rounded-[33px] mt-3 bg-white/10"
          source={{
            uri: item.video,
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-56 h-80 rounded-[33px] my-2 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {


  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem  item={item} />
      )}
      // onViewableItemsChanged={onViewableItemsChanged}
      
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default Trending;
