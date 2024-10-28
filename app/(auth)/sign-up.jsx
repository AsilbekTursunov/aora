import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import { Link, router } from "expo-router";
import CustomButton from "../../components/CustomButton";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const onSubmit = async () => {
    if (!form.username && !form.email && !form.password) {
      Alert.alert("Error", "Please fill all fields");
    } else {
      setIsSubmitting(true);
      // Simulate an API call
      try {
        const result = await createUser(form);
        setUser(result);
        setIsLoggedIn(true);
        router.push("/home");
      } catch (error) {
        Alert.alert("Error", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={images.logo}
            className="w-[115px] h-[34px] mb-4"
            resizeMode="contain"
          />
          <Text className="text-white text-2xl font-extrabold">
            Sign up to Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            placeholder="Enter your username"
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles={"mt-7"}
          />
          <FormField
            title="Email"
            value={form.email}
            placeholder="Enter your email"
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={"mt-7"}
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            placeholder="Enter your password"
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={"mt-7"}
          />
          <CustomButton
            title={"Sign up"}
            contentContainerStyle="mt-10"
            handlePress={() => onSubmit()}
            isLoading={isSubmitting}
            textStyles={"font-psemibold text-xl"}
          />

          <View className="flex flex-row justify-center mt-3 items-center">
            <Text className="text-white text-sm font-medium mr-2">
              Have already an account?
            </Text>
            <Link href={"/sign-in"} className="text-secondary">
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" barStyle="light-content" />
    </SafeAreaView>
  );
};

export default SignUp;
