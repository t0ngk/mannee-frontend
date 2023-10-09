import { TextInput, View, Text } from "react-native";

export default function Input({ label = "Label" }) {
  return (
    <View>
      <Text className="text-2xl text-neutral-500">{label}</Text>
      <TextInput className="border-2 border-gray-300 rounded-lg p-2 w-80 text-xl justify-center" placeholder={label} />
    </View>
  );
}
