import { Image, View, Text, Button, FlatList, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import DataBox from "../components/DataBox";
import CreatingSubNavigate from "../router/CreatingSubNavigate";
import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { useIsFocused } from "@react-navigation/core";


export default function Bill({ route, navigation }) {
  const isFocused = useIsFocused();
  const [bills, setbills] = useState([]);


  useEffect(() => {
    if (isFocused) {
      getBill();
      console.log('Bill is focused', bills)
    }
    else {
      console.log('Bill is not focused')
    }
  }, [isFocused]);

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity className="mx-5" onPress={() => navigation.navigate("BillAdd")}>
        <Text className="text-2xl">+</Text>
      </TouchableOpacity>
    ),
  })

  const getBill = async () => {
    const token = await SecureStore.getItemAsync("token");
    const res = await fetch(`http://localhost:3000/bill`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      setbills(data);
      console.log(data);
    } else {
      const err = await res.json();
      console.log(err);
    }
  }


  return (
    <View className="my-2 m-[20px] h-full">
      <ScrollView className="w-full">
        {bills && <FlatList
          data={bills}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("BillSummary", {
                  data: item,
                });
              }}
            >
              <DataBox
                id={item.id}
                name={item.name}
                price={item.price}
                amount_of_member={item.member}
                page="member"
              ></DataBox>
            </TouchableOpacity>
          )}
        />}
        {
          bills == [] &&
          <View className="flex flex-col items-center justify-center h-full">
            <Text className="text-2xl">No Bill</Text>
          </View>
        }
      </ScrollView>
    </View>
  );
}
