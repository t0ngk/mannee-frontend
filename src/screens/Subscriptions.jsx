import { TextInput, View, Text, FlatList, TouchableOpacity, Button } from "react-native";
import dayjs from 'dayjs'
import Boxsubscription from "../components/Boxsubscription";
import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { useSubcon } from "../context/subcon";

export default function Subscriptions({ navigation, route }) {
  const [Data, setData] = useState([])
  const { subcon, updateSubcon } = useSubcon();
  useEffect(() => {
    const getSubscriptions = async () => {
      console.log("Fetching Data")
      const token = await SecureStore.getItemAsync('token');
      const api = await fetch('https://mobile.t0ng.dev/subscription', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (api.ok) {
        const res = await api.json();
        updateSubcon(res)
        return res
      } else {
        const err = await api.json();
        return err
      }
    }
    getSubscriptions();
  }, [])
  // console.log("Data is :", Data)
  const costperWeek = () => {
    const sum = Object.keys(subcon).reduce((sum, key) => sum + subcon[key].price, 0)
    return sum.toString();
  };

  const calculateTotalDatetime = (startDate) => {
    const startdateformat = dayjs().format('YYYY-MM-DD')
    const endDate = dayjs(startDate).add(1, 'M').format('YYYY-MM-DD')
    // console.log(startdateformat, endDate)
    const newStartDate = new Date(startdateformat)
    const startTimestamp = newStartDate.getTime()
    const newEndDate = new Date(endDate)
    const endTimestamp = newEndDate.getTime()
    const diffTime = endTimestamp - startTimestamp
    const diffDay = diffTime / (1000 * 3600 * 24)
    setPayday(Math.ceil(diffDay))
    return Math.ceil(diffDay)
  }

  const [payday, setPayday] = useState(0)
  return (
    <View className="flex flex-col items-center mx-4 my-2">
      <View className="border-[0.5px] border-[#CFCFCF] flex flex-col px-4 py-4 w-full my-4 rounded-md justify-start">
        <Text className="text-4xl font-bold">Average Expenses</Text>
        <Text className="font-light">Per week</Text>
        <Text className="self-end text-3xl mt-7">฿ {costperWeek()}</Text>
      </View>
      <FlatList className="w-full max-h-[550px]" data={Object.keys(subcon)} renderItem={({ item }) =>
        <TouchableOpacity onPress={() => {
          navigation.navigate("DetailSub", { data: item, paid: payday })
          calculateTotalDatetime(item.firstbill)
        }}>
          <Boxsubscription image={subcon[item].icon} name={subcon[item].name} price={subcon[item].price} color={subcon[item].color} day={calculateTotalDatetime(subcon[item].firstBill)} />
        </TouchableOpacity>
      } />
    </View>
  );
}