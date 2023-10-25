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


export default function Subscriptions({ navigation }) {
  const isFocused = useIsFocused();
  const fetchData = async () => {
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzU2YWFjMzE0MWIxMTNkZmVkYWExZiIsImlhdCI6MTY5ODIwNTI4OX0.M6YwKMRHNLpOqQhoc3dW-nJDroUXniTXrfikFR9r2cs`;
    const response = await fetch("https://local.t0ng.dev/subscription", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      setData(data);
    }
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [navigation, isFocused]);

  const costperWeek = () => {
    const sum = data.reduce((total, item) => total + item.price, 0);
    return sum.toString();
  };

  const calculateTotalDatetime = (startDate) => {
    const startdateformat = dayjs().format("YYYY-MM-DD");
    const endDate = dayjs(startDate).add(1, "M").format("YYYY-MM-DD");
    console.log(startdateformat, endDate);
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
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DetailSub", {
                name: item.name,
                price: item.price,
                color: item.color,
                img: item.icon,
                cycle: item.cycle,
                firstbill: dayjs(item.firstbill).format("DD-MMM-YYYY"),
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
