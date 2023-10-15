import { TextInput, View, Text, FlatList, TouchableOpacity } from "react-native";
import dayjs from 'dayjs'
import Boxsubscription from "../components/Boxsubscription";
import { useState } from "react";
import { set } from "date-fns";





export default function Subscriptions({ navigation }) {
  const dummyData = [{
    id: 1,
    name: "Netflix",
    price: 169,
    color: '#E50914',
    img: 'https://minio.haxter.ee/ctx-betterexperience-prd/uploads/images/221ddf5a-642b-4ace-b145-f9426ab2ad03_original.jpg',
    firstbill: new Date('2023-10-13T17:02:15.152Z'),
    cycle: 'Monthly',
  },
  {
    id: 2,
    name: "Spotify",
    price: 129,
    color: '#1DB954',
    img: 'https://www.scdn.co/i/_global/open-graph-default.png',
    firstbill: new Date('2023-10-01T17:02:15.152Z'),
    cycle: 'Monthly',
  }]

  const costperWeek = () => {
    const sum = dummyData.reduce((total, item) => total + item.price, 0);
    return sum.toString();
  };

  const calculateTotalDatetime = (startDate) => {
    const startdateformat = dayjs().format('YYYY-MM-DD')
    const endDate = dayjs(startDate).add(1, 'M').format('YYYY-MM-DD')
    console.log(startdateformat, endDate)
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
      <FlatList className="w-full" data={dummyData} renderItem={({ item }) =>
        <TouchableOpacity onPress={() => {
          navigation.navigate("DetailSub", { name: item.name,price: item.price, color: item.color, img: item.img, cycle: item.cycle, firstbill: dayjs(item.firstbill).format('DD-MMM-YYYY'), daytopay: payday })
          calculateTotalDatetime(item.firstbill)
        }}>
          <Boxsubscription image={item.img} name={item.name} price={item.price} color={item.color} day={calculateTotalDatetime(item.firstbill)} />
        </TouchableOpacity>
      } />
    </View>
  );
}