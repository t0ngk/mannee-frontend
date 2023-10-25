import { Image, View, Text, Button, FlatList, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import DataBox from "../components/DataBox";
import CreatingSubNavigate from "../router/CreatingSubNavigate";
import { useEffect } from "react";
import * as SecureStore from 'expo-secure-store';
import { useIsFocused } from "@react-navigation/core";
import { el } from "date-fns/locale";

const Data = [
  
];

export default function Bill({ route, navigation }) {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      console.log('Bill is focused')
    }
    else{
      console.log('Bill is not focused')
    }
  }, [navigation, isFocused]);

  return (
    <View className="my-2 m-[20px] h-full">
      <ScrollView className="w-full">
        <FlatList
          data={Data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("BillSummary", {
                  id: item.id,
                });
              }}
            >
              <DataBox
                id={item.id}
                name={item.name}
                price={item.price}
                amount_of_member={item.amount_of_member}
                page="member"
              ></DataBox>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
}
