import { View, Image, Text } from "react-native";

export default function Boxsubscription({image, name, price, color}) {
    return (
        <View style={{backgroundColor: color}} className="flex flex-row justify-between items-center border-[0.5px] border-[#CFCFCF] px-4 py-3 w-full my-2 rounded-xl">
            <View className="flex flex-row items-center">
                <Image className="h-20 w-20 rounded-full" source={{ uri: image }} />
                <View className="flex flex-col ml-4">
                    <Text className="text-xl font-bold">{name}</Text>
                    <Text className="font-light">฿ {price}</Text>
                </View>
            </View>
        </View>
    );
}