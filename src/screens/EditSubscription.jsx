import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Image,
  View,
  Text,
  Button,
  FlatList,
  ScrollView,
  TextInput,
} from "react-native";
import FormEditAddSub from "../components/FormEditAddSub";
import Member from "../components/Member";
const Data = [
  {
    id: 1,
    name: "User1",
    img: "https://minio.haxter.ee/ctx-betterexperience-prd/uploads/images/221ddf5a-642b-4ace-b145-f9426ab2ad03_original.jpg",
  },
  {
    id: 2,
    name: "User2",
    img: "https://play-lh.googleusercontent.com/cShys-AmJ93dB0SV8kE6Fl5eSaf4-qMMZdwEDKI5VEmKAXfzOqbiaeAsqqrEBCTdIEs",
  },
  {
    id: 3,
    name: "User3",
    img: "https://play-lh.googleusercontent.com/cShys-AmJ93dB0SV8kE6Fl5eSaf4-qMMZdwEDKI5VEmKAXfzOqbiaeAsqqrEBCTdIEs",
  },
  {
    id: 4,
    name: "User4",
    img: "https://play-lh.googleusercontent.com/cShys-AmJ93dB0SV8kE6Fl5eSaf4-qMMZdwEDKI5VEmKAXfzOqbiaeAsqqrEBCTdIEs",
  },
];
export default function EditSubscription({ navigation, route }) {
  console.log(route.params);
  const { name, price, img, color, firstbill, cycle, daytopay, page } = route.params;

  return (
    <ScrollView className="overflow-auto w-full h-full">
      <View className="m-[20px]">
        <FormEditAddSub
          Subprice={price}
          Subname={name}
          Subcolor={color}
          Subimg={img}
          Subdate={firstbill}
          Subcycle={cycle}
          navigation={'EditSubscription'}
          page={page}
        />
      </View>
      <View className="mx-[20px]">
        <Member
          data={Data}
          stage="edit"
          type="edit"
          memberType="delete"
        ></Member>
      </View>
    </ScrollView>
  );
}
