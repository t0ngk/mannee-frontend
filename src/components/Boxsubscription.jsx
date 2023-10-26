import { View, Image, Text } from "react-native";

export default function Boxsubscription({
  image,
  name,
  price,
  color,
  day,
  redAlert,
}) {
  return (
    <View
      style={{ backgroundColor: color }}
      className="flex flex-row justify-between items-center border-[0.5px] border-[#CFCFCF] px-4 py-3 w-full my-2 rounded-xl relative"
    >
      {redAlert && (
        <View className="w-4 h-4 absolute bg-red-500 -top-1 -right-1 border border-black/20 shadow-xl rounded-full"></View>
      )}
      <View className="flex flex-row items-center">
        <Image className="h-20 w-20 rounded-full" source={{ uri: image }} />
        <View className="flex flex-col ml-4">
          <Text className="text-xl font-bold">{name}</Text>
          <Text className="font-light">฿ {price}</Text>
        </View>
      </View>
      {day ? (
        <View>
          <Text className="text-light">{day ? day : 0} DAYS</Text>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}
