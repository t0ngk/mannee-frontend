import { Image, View, Text, Button, FlatList, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import DataBox from "../components/DataBox";
import CreatingSubNavigate from "../router/CreatingSubNavigate";
const Data = [
  {
    id: 1,
    name: "Bill 01",
    price: 169,
    amount_of_member: 2,
  },
  {
    id: 2,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 3,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 4,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 5,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 6,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 7,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 8,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 9,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 10,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },

  {
    id: 11,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 12,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 13,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 14,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 15,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 16,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 17,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 18,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 19,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 20,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 21,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 22,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
];

export default function Bill({ route, navigation }) {
  return (
    <View className="my-2 m-[20px] h-full">
      <ScrollView className="w-full">
        <FlatList
          keyExtractor={(item) => item.id.toString()}
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
