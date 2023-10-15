import { Text, View, Image, ScrollView } from "react-native";
import Member from "../components/Member";

const Data = [
  {
    id: 1,
    name: "User1",
    img: "https://minio.haxter.ee/ctx-betterexperience-prd/uploads/images/221ddf5a-642b-4ace-b145-f9426ab2ad03_original.jpg",
  },
  {
    id: 2,
    name: "User1",
    img: "https://minio.haxter.ee/ctx-betterexperience-prd/uploads/images/221ddf5a-642b-4ace-b145-f9426ab2ad03_original.jpg",
  },
  {
    id: 3,
    name: "User1",
    img: "https://minio.haxter.ee/ctx-betterexperience-prd/uploads/images/221ddf5a-642b-4ace-b145-f9426ab2ad03_original.jpg",
  },
  {
    id: 3,
    name: "User1",
    img: "https://minio.haxter.ee/ctx-betterexperience-prd/uploads/images/221ddf5a-642b-4ace-b145-f9426ab2ad03_original.jpg",
  },
];
export default function DetailSubscription({ navigation, route }) {
  console.log(route.params);
  const { name, price, img, color, firstbill, cycle, daytopay } = route.params;
  return (
    <View className="flex flex-col w-full bg-white h-full">
      <ScrollView>
        <View className="flex flex-row items-center justify-between mx-8 my-5">
          <Image className="h-20 w-20 rounded-full" source={{ uri: img }} />
          <Text className="text-4xl font-medium">฿ {price}</Text>
        </View>
        <View className="flex flex-row items-center justify-between mx-8">
          <Text className="text-xl font-light">First Bill</Text>
          <Text className="text-xl font-light">{firstbill}</Text>
        </View>
        <View className="flex flex-col items-center my-10 pt-7 gap-2">
          <Text className="text-4xl">Next bill in</Text>
          <Text className="text-7xl">{daytopay}</Text>
          <Text className="text-4xl">Days</Text>
        </View>
        <View className=" max-h-[300px] h-[290px]  mx-[20px]">
          <Member data={Data} memberType="none"></Member>
        </View>
      </ScrollView>
    </View>
  );
}
