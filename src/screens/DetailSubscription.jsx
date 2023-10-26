import { Text, View, Image, ScrollView } from "react-native";
import Member from "../components/Member";
import dayjs from "dayjs";
import { useUser } from "../stores/userContext";
import MemberStructure from "../components/MemberStructure";
import { useMember } from "../stores/memberContext";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
export default function DetailSubscription({ navigation, route }) {
  const { user } = useUser();
  const { member, id, paidId } = route.params;
  const { updateMember } = useMember();
  const [paidMember, setPaidMember] = useState(paidId);
  // console.log("LLL",paid)

  // useEffect(() => {
  //   if (paid.length === member.length) {
  //     setPaidMember([]);
  //   }
  // }, [paid])

  // useEffect(() => {
  //   console.log(paidMember)
  // }, [paidMember])

  console.log(paidId);
  console.log("++++++++++++++++++++++++++");
  console.log(paidId);

  const paidCheck = async () => {
    const token = await SecureStore.getItemAsync("token");
    const res = await fetch(
      `http://localhost:3000/subscription/${id}/uncheckAll`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      console.log("OK");
    } else {
      console.log("ERROR");
    }
  };

  useEffect(() => {
    if (paidMember.length === member.length) {
      paidCheck();
      setPaidMember([]);
    }
  }, [paidMember]);

  // useEffect(() => {
  //   console.log("Double Reactive", paidMember.length, member.length)
  // }, [paidMember, paid])

  function calculateMembershipDueDate(registrationDate, paymentIntervalMonths) {
    const registration = dayjs(registrationDate);
    const today = dayjs();
    const nextDueDate = registration.add(paymentIntervalMonths, "month");
    if (nextDueDate.isAfter(today)) {
      return nextDueDate;
    } else {
      while (nextDueDate.isBefore(today)) {
        nextDueDate.add(paymentIntervalMonths, "month");
      }
      return nextDueDate;
    }
  }

  const { price, img, firstbill, cycleFreq, ownerId } = route.params;
  const nextbill = calculateMembershipDueDate(firstbill, cycleFreq);
  const diff = dayjs(nextbill).diff(dayjs(), "day");
  return (
    <View className="flex flex-col w-full bg-white h-full">
      <ScrollView>
        <View className="flex flex-row items-center justify-between mx-8 my-5">
          <Image className="h-20 w-20 rounded-full" source={{ uri: img }} />
          <Text className="text-4xl font-medium">฿ {price}</Text>
        </View>
        <View className="flex flex-row items-center justify-between mx-8">
          <Text className="text-xl font-light">First Bill</Text>
          <Text className="text-xl font-light">
            {dayjs(firstbill).format("DD/MM/YYYY")}
          </Text>
        </View>
        <View className="flex flex-col items-center my-6 pt-7 gap-2">
          <Text className="text-4xl">Next bill in</Text>
          <Text className="text-7xl">{diff + 1}</Text>
          <Text className="text-4xl">Days</Text>
        </View>
        <View className=" max-h-[300px] h-[290px]  mx-[20px]">
          {member?.map((item) => (
            <MemberStructure
              key={item.id}
              id={item.id}
              name={item.username}
              target={id}
              memberType={paidMember.includes(item.id) ? "unkill" : "kill"}
              changeMemberType={(id) => {
                if (paidMember.includes(id)) {
                  setPaidMember(paidMember.filter((item) => item !== id));
                  console.log("Remove");
                } else {
                  setPaidMember([...paidMember, id]);
                  console.log("Add");
                }
              }}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
