import {
  TextInput,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import dayjs from "dayjs";
import Boxsubscription from "../components/Boxsubscription";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useColor } from "../stores/colorContext";
import { useSubscription } from "../stores/subscriptionContext";

export default function Subscriptions({ navigation }) {
  const isFocused = useIsFocused();
  const { color, updateColor } = useColor();
  const { subscription, fetchSubscription } = useSubscription();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (isFocused) {
      fetchSubscription();
    }
  }, [navigation, isFocused]);

  const costperWeek = () => {
    const sum = subscription?.reduce((total, item) => total + item.price, 0);
    return sum?.toString();
  };

  const calculateTotalDatetime = (startDate) => {
    const startdateformat = dayjs().format("YYYY-MM-DD");
    const endDate = dayjs(startDate).add(1, "M").format("YYYY-MM-DD");
    // console.log(startdateformat, endDate);
    const newStartDate = new Date(startdateformat);
    const startTimestamp = newStartDate.getTime();
    const newEndDate = new Date(endDate);
    const endTimestamp = newEndDate.getTime();
    const diffTime = endTimestamp - startTimestamp;
    const diffDay = diffTime / (1000 * 3600 * 24);
    setPayday(Math.ceil(diffDay));
    return Math.ceil(diffDay);
  };

  const [payday, setPayday] = useState(0);
  return (
    <View className="flex flex-col items-center mx-4 my-2">
      <View className="border-[0.5px] border-[#CFCFCF] flex flex-col px-4 py-4 w-full my-4 rounded-md justify-start">
        <Text className="text-4xl font-bold">Average Expenses</Text>
        <Text className="font-light">Per week</Text>
        <Text className="self-end text-3xl mt-7">฿ {costperWeek()}</Text>
      </View>
      <FlatList
        className="w-full"
        data={subscription}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              updateColor(item.color);
              console.log('Id is', item.id)
              navigation.navigate("DetailSub", {
                id: item.id,
                name: item.name,
                price: item.price,
                color: item.color,
                img: item.icon,
                cycle: item.cycle,
                firstbill: dayjs(item.firstbill).format("MM/DD/YYYY"),
                daytopay: payday,
              });
              calculateTotalDatetime(item.firstbill);
            }}
          >
            <Boxsubscription
              image={item.icon}
              name={item.name}
              price={item.price}
              color={item.color}
              day={calculateTotalDatetime(item.firstbill)}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
