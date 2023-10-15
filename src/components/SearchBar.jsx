import { TextInput, View, Text } from "react-native";

export default function SearchBar() {
  return (
    <View>
      {/* <View className="mx-4 my-5 w-full"> */}
      <TextInput
        className="w-full h-12 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
        placeholder="Search"
      />
    </View>
  );
}
