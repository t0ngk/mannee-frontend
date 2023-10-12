import { TextInput, View, Text } from "react-native";

export default function Input({ label = "Label", placeholder = " " }) {
  return (
    <View className="my-2">
      <Text className="text-xl text-black font-light">{label}</Text>
      <TextInput className="border-2 border-gray-300 rounded-lg p-2 w-80 text-xl justify-center my-1" placeholder={placeholder} />
    </View>
  );
}
