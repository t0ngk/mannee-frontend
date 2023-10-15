import { View, Image, Text } from "react-native";

export default function DataBox({ id, name, price, amount_of_member, page }) {
  return (
    <View
      className={`flex flex-row justify-between ${
        page == "food" ? "border-b-2 p-[15px]" : "border my-2  p-[25px]"
      }  rounded-md border-[#CFCFCF]`}
    >
      <View className="pt-2">
        <Text className="font-medium">{name}</Text>
      </View>
      <View className=" items-end">
        <Text>฿{price}</Text>
        <Text className="text-[12px] text-gray-600">
          {amount_of_member} Members
        </Text>
      </View>
    </View>
  );
}
