import { Text, View, Image, ScrollView } from "react-native";
import Member from "../components/Member";
import dayjs from "dayjs";
import { useUser } from "../stores/userContext";
import MemberStructure from "../components/MemberStructure";
import { useMember } from "../stores/memberContext";
import { useEffect } from "react";
export default function DetailSubscription({ navigation, route }) {
  const { user } = useUser();
  const { member, id, paidId } = route.params;
  const { updateMember } = useMember();

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
              memberType={paidId.includes(item.id) ? "unkill" : "kill"}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
