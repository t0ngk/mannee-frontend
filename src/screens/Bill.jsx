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
    id: 2,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 2,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 2,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 2,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 2,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 2,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 2,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 2,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },

  {
    id: 2,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 2,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 2,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 2,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 2,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 2,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 2,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 2,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 2,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 2,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 2,
    name: "Bill 02",
    price: 129,
    amount_of_member: 3,
  },
  {
    id: 2,
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
