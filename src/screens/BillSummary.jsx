import { Image, View, Text, Button, FlatList, ScrollView } from "react-native";
import Member from "../components/Member";
import MainNavigation from "../router/MainNavigation";
import DataBox from "../components/DataBox";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { useMember } from "../stores/memberContext";


export default function BillSummary({ route, navigation }) {
  console.log("data is ", route.params.data);
  const { data } = route.params;
  const [bill, setBill] = useState(data);
  const isFocused = useIsFocused();
  const {members, updateMember} = useMember();

  const billbyid = async () => {
    const token = await SecureStore.getItemAsync("token");
    const res = await fetch(`http://172.20.10.2:3000/bill/${data['id']}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      setBill(data);
      console.log(data);
    } else {
      const err = await res.json();
      console.log(err);
    }
  }

  useEffect(() => {
    if (isFocused) {
      billbyid();
      console.log('BillSummary is focused')
    }
    else {
      console.log('BillSummary is not focused')
    }
  }, [isFocused, navigation]);

  navigation.setOptions({
    title: data['name'],
    headerRight: () => (
      <Button
        title="Edit"
        onPress={() => {
          updateMember(data.user)
          navigation.navigate("BillEdit", { id: data['id'] })}}
      />
    ),
    headerBackTitle: " ",
  });

  return (
    <View className="overflow-auto">
      <ScrollView className="w-full h-full  ">
        <View className="my-5  m-[20px]">
          <ScrollView className="w-full">
            <View className="flex flex-row justify-end ">
              <Text className="text-[17px] mb-5 text-center font-bold ">
                Food(s)
              </Text>
              <Text
                className="text-[30px] pb-1  ml-28 mr-2 "
                onPress={() => {
                  console.log("++++++++++++++++++++++++++++++++++++++++++++++")
                  console.log(data)
                  updateMember(data.user)
                  navigation.navigate("FoodAdd", { id: data['id'] })}}
              >
                +
              </Text>
            </View>
            <View className="border-t-2 border-[#CFCFCF]"></View>
            <FlatList
              className=" max-h-[200px]"
              keyExtractor={(item) => item.id.toString()}
              data={data['items']}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    updateMember(data.user)
                    navigation.navigate("FoodEdit", { itemid: item })}}
                >
                  <DataBox
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    amount_of_member={item.amount_of_member}
                    page="food"
                  ></DataBox>
                </TouchableOpacity>
              )}
            />
          </ScrollView>
        </View>
        <View className=" max-h-[250px] h-[250px]  mx-[20px]">
          <Member data={bill.user}></Member>
        </View>
        <View className=" w-full mt-28 ">
          <View className="flex flex-row  border m-5 p-4 rounded-md justify-between">
            <Text className=" text-[16px]">Total</Text>
            <Text className=" text-[16px]">1987 ฿</Text>
          </View>

          <View className="flex flex-row border mx-5 p-4 mb-5 justify-between rounded-md bg-black">
            <Text className="text-white text-[16px]">You need to pay</Text>
            <Text className="text-white text-[16px]">150 ฿</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
