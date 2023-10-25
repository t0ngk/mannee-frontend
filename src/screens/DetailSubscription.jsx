import { Text, View, Image, ScrollView } from "react-native";
import Member from "../components/Member";
import dayjs from "dayjs";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { useSubcon } from "../context/subcon";

export default function DetailSubscription({ navigation, route }) {
  const { subcon, updateSubcon } = useSubcon();
  const [member, setMember] = useState([]);
  // const [paid, setPaid] = useState(route.params.paid);
  const {data, paid} = route.params;
  console.log('data', data)

  navigation.setOptions({
    headerRight: () => {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EditSubscription", {
              page: "EditSubscription",
              data: data,
              paid: paid,
            });
          }}
        >
          <View className="mx-4">
            <Text className="text-lg font-semibold">Edit</Text>
          </View>
        </TouchableOpacity>
      );
    }
  });

  return (
    <View className="flex flex-col w-full bg-white h-full">
      <ScrollView>
        <View className="flex flex-row items-center justify-between mx-8 my-5">
          <Image className="h-20 w-20 rounded-full" source={subcon[data]['icon'] ? { uri: subcon[data]['icon'] } : { uri: 'https://lpm.ulm.ac.id/image/desain/empty.jpg' }} />
          <Text className="text-4xl font-medium">{subcon[data]["currency"] + " " + subcon[data]['price']}</Text>
        </View>
        <View className="flex flex-row items-center justify-between mx-8">
          <Text className="text-xl font-light">Name</Text>
          <Text className="text-xl font-light">{subcon[data]['name']}</Text>
        </View>
        <View className="flex flex-row items-center justify-between mx-8">
          <Text className="text-xl font-light">First Bill</Text>
          <Text className="text-xl font-light">{dayjs(subcon[data]['firstBill']).format('MM/DD/YYYY')}</Text>
        </View>
        <View className="flex flex-col items-center my-6 pt-7 gap-2">
          <Text className="text-4xl">Next bill in</Text>
          <Text className="text-7xl">{paid}</Text>
          <Text className="text-4xl">Days</Text>
        </View>
        <View className=" max-h-[300px] h-[290px]  mx-[20px]">
          <Member data={member} showheader={'show'} memberType={'kill'}></Member>
        </View>
      </ScrollView>
    </View>
  );
}
