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
import { Ionicons } from '@expo/vector-icons';

export default function Subscriptions({ navigation }) {
  const isFocused = useIsFocused();
  const { color, updateColor } = useColor();
  const { subscription, fetchSubscription } = useSubscription();
  console.log(subscription)
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

  function calculateMembershipDueDate(registrationDate, paymentIntervalMonths) {
    const registration = dayjs(registrationDate);
    const today = dayjs();
    const nextDueDate = registration.add(paymentIntervalMonths, 'month');
    if (nextDueDate.isAfter(today)) {
      return nextDueDate;
    } else {
      while (nextDueDate.isBefore(today)) {
        nextDueDate.add(paymentIntervalMonths, 'month');
      }
      return nextDueDate;
    }
  }

  function diffFromToday(date) {
    const today = dayjs();
    const dueDate = dayjs(date);
    return dueDate.diff(today, 'day');
  }

  navigation.setOptions({
    headerLeft: () => {
      return (
        <TouchableOpacity className="mx-5" onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="ios-person-outline" size={30} color="black" />
        </TouchableOpacity>
      )
    },
  })

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
                cycleFreq: item.cycleFreq,
                firstbill: item.firstBill,
                ownerId: item.ownerId,
                member: item.user,
                paidId: item.paidId,
              });
            }}
          >
            <Boxsubscription
              image={item.icon}
              name={item.name}
              price={item.price}
              color={item.color}
              day={diffFromToday(calculateMembershipDueDate(item.firstBill, item.cycleFreq))}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
