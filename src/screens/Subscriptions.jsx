import { TextInput, View, Text } from "react-native";

export default function Subscriptions({}) {
  return (
    <View className="flex flex-col items-center mx-4 my-2">
      <View className="border-[0.5px] border-[#CFCFCF] flex flex-col px-4 py-4 w-full my-4 rounded-md justify-start">
        <Text className="text-4xl font-bold">Average Expenses</Text>
        <Text className="font-light">Per week</Text>
        <Text className="self-end text-3xl mt-7">฿ 0.0</Text>
      </View>
      <View className="my-10">
        <Text className="text-xl font-light opacity-30">You don't have any Subscription</Text>
      </View>
    </View>
  );
}