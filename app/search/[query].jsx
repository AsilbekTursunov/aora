import { View, Text, StatusBar, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppwrite from "../../lib/useAppwrite";
import { getSearchData } from "../../lib/appwrite";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import SearchInput from "../../components/SearchInput";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { posts, isLoading, refetch } = useAppwrite(() => getSearchData(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full  px-4 ">
      <FlatList
        data={isLoading ? [] : posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View>
            <View className="flex  items-start justify-between mt-10 mb-5">
              <Text className="text-slate-400 text-lg">Search results of</Text>
              <Text className="text-white text-2xl font-bold">{query}</Text>
            </View>
            <SearchInput otherStyles={"mb-5"} />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No a video found"
            subtitle="No videos found for this query"
          />
        )}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar backgroundColor="#161622" barStyle="light-content" />
    </SafeAreaView>
  );
};

export default Search;
