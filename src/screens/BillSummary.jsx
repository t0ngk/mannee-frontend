import { Image, View, Text, Button, FlatList, ScrollView } from "react-native";
import Member from "../components/Member";
import MainNavigation from "../router/MainNavigation";
import DataBox from "../components/DataBox";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useMember } from "../stores/memberContext";
import { useUser } from "../stores/userContext";
import MemberStructure from "../components/MemberStructure";

export default function BillSummary({ route, navigation }) {
  const { data } = route.params;
  const [bill, setBill] = useState(data);
  const isFocused = useIsFocused();
  const { members, updateMember } = useMember();
  const { user } = useUser();
  const [name, setName] = useState("");

  const billbyid = async () => {
    const token = await SecureStore.getItemAsync("token");
    const res = await fetch(`http://localhost:3000/bill/${data["id"]}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      setBill(data);
    } else {
      const err = await res.json();
      console.log(err);
    }
  };

  const filterWhoIn = (item) => {
    const people = item.peopleId;
    return bill.user.filter((item) => people.includes(item.id));
  };

  useEffect(() => {
    if (isFocused) {
      billbyid();
      console.log("BillSummary is focused");
    } else {
      billbyid();
      console.log("BillSummary is not focused");
    }
  }, [isFocused, navigation]);

  navigation.setOptions({
    title: data["name"],
    headerRight: () =>
      user.id == bill.ownerId && (
        <Button
          title="Edit"
          onPress={() => {
            updateMember(bill.user);
            navigation.navigate("BillEdit", { id: data["id"], data: bill });
          }}
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
                  updateMember(bill.user);
                  navigation.navigate("FoodEdit", {
                    itemid: {
                      id: "new",
                      billId: data.id,
                    },
                    price: 0,
                    group: bill.user,
                    name: "New Item",
                  });
                }}
              >
                +
              </Text>
            </View>
            <View className="border-t-2 border-[#CFCFCF]"></View>
            {bill.items.map((item) => (
              <TouchableOpacity
                onPress={() => {
                  updateMember(filterWhoIn(item));
                  navigation.navigate("FoodEdit", {
                    itemid: item,
                    group: bill.user,
                    name: item.name,
                    price: item.price,
                  });
                }}
              >
                <DataBox
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  amount_of_member={item.peopleId.length}
                  page="food"
                ></DataBox>
              </TouchableOpacity>
            ))}
            {/* <FlatList
              className=" max-h-[200px]"
              keyExtractor={(item) => item.id.toString()}
              data={data["items"]}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    updateMember(filterWhoIn(item));
                    navigation.navigate("FoodEdit", {
                      itemid: item,
                      group: bill.user,
                      name: item.name,
                      price: item.price,
                    });
                  }}
                >
                  <DataBox
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    amount_of_member={item.peopleId.length}
                    page="food"
                  ></DataBox>
                </TouchableOpacity>
              )}
            /> */}
          </ScrollView>
        </View>
        <View className=" max-h-[250px] h-[250px]  mx-[20px]">
          {/* <Member data={bill.user} memberType={"paid"}></Member> */}
          {bill?.user?.map((item) => (
            <MemberStructure
              key={item.id}
              id={item.id}
              name={item.username}
              subhead={`฿ ${bill.items.reduce((a, b) => {
                if (b.peopleId.includes(item.id)) {
                  return a + b.price / b.peopleId.length;
                }
                return a;
              }, 0)}`}
              target={data.id}
              memberType={bill?.paidedId?.includes(item.id) ? "paid" : "unpaid"}
            />
          ))}
        </View>
        <View className=" w-full mt-28 ">
          <View className="flex flex-row  border m-5 p-4 rounded-md justify-between">
            <Text className=" text-[16px]">Total</Text>
            <Text className=" text-[16px]">
              {bill.items.reduce((a, b) => a + b.price, 0)} ฿
            </Text>
          </View>

          <View className="flex flex-row border mx-5 p-4 mb-5 justify-between rounded-md bg-black">
            <Text className="text-white text-[16px]">You need to pay</Text>
            <Text className="text-white text-[16px]">
              {bill.items.reduce((a, b) => {
                if (b.peopleId.includes(user.id)) {
                  return a + b.price / b.peopleId.length;
                }
                return a;
              }, 0)}{" "}
              ฿
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
