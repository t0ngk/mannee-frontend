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
  TouchableOpacity,
  Alert,
} from "react-native";
import FormEditAddSub from "../components/FormEditAddSub";
import Member from "../components/Member";
import { useColor } from "../stores/colorContext";
import { useIcon } from "../stores/iconContext";
import dayjs from "dayjs";
import * as SecureStore from "expo-secure-store";

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
  console.log("data is ", route.params);
  const { name, price, img, firstbill, cycle, daytopay, page, id } =
    route.params;
  const [newprice, setNewprice] = useState(price || 0);
  const [newname, setNewname] = useState(name || "");
  const [newdate, setNewdate] = useState(firstbill || "");
  const [newcycle, setNewcycle] = useState(cycle || "");
  const [newcycleFeqy, setNewcycleFeqy] = useState(daytopay || "");
  const [newimg, setNewimg] = useState(img || "");
  const [newcolor, setNewcolor] = useState(color || "");
  const { icon, updateIcon } = useIcon();
  const { color, updateColor } = useColor();
  

  const editSubscription = async () => {
    const token = await SecureStore.getItemAsync("token");
    const Data = {
      icon: icon,
      currency: "฿",
      price: parseInt(newprice),
      name: newname,
      color: color,
      firstBill: dayjs(Date(newdate)).format("MM/DD/YYYY"),
      cycle: newcycle['type'],
      cycleFreq: parseInt(newcycle['dayofweek']),
      member: [],
    };
    console.log(Data);
    const response = await fetch(`http://localhost:3000/subscription/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(Data),
    });
    if (response.ok) {
      console.log("Pasing json")
      const data = await response.json();
      console.log(data);
      Alert.alert("Create Subscription Success");
      navigation.navigate("DetailSub", {
        ...data,
        img: data.icon,
        firstbill: dayjs(data.firstbill).format("DD-MMM-YYYY"),
        daytopay: 0,
      });
    } else {
      const error = await response.json();
      console.log(error);
      Alert.alert("Create Subscription Fail");
    }
  };

  const addSubscription = async () => {
    const Data = {
      icon: icon,
      currency: "฿",
      price: parseInt(newprice),
      name: newname,
      color: color,
      firstBill: dayjs(Date(newdate)).format("MM/DD/YYYY"),
      cycle: newcycle['type'],
      cycleFreq: parseInt(newcycle['dayofweek']),
      member: [],
    };
    const token = await SecureStore.getItemAsync("token");
    const response = await fetch("http://localhost:3000/subscription/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(Data),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      Alert.alert("Create Subscription Success");
      navigation.navigate("DetailSub", {
        ...data,
        img: data.icon,
        firstbill: dayjs(data.firstbill).format("DD-MMM-YYYY"),
        daytopay: 0,
      });
    } else {
      const error = await response.json();
      console.log(error);
      Alert.alert("Create Subscription Fail");
    }
  };

  const deteleSubscription = async () => {
    const token = await SecureStore.getItemAsync("token");
    const response = await fetch(`http://localhost:3000/subscription/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      Alert.alert("Delete Subscription Success");
      navigation.popToTop();
      // navigation.navigate("Subscriptions");
    }
  };
  navigation.setOptions({
    title: id == "new" ? "Create Subscription" : "Edit Subscription",
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          if (id == "new") {
            addSubscription();
          } else {
            editSubscription();
          }
        }}
      >
        <View className="mx-4">
          <Text className="text-lg font-semibold">
            {id == "new" ? "Add" : "Edit"}
          </Text>
        </View>
      </TouchableOpacity>
    ),
  });
  return (
    <>
      <ScrollView className="overflow-auto w-full h-full max-h-[740px">
        <View className="m-[20px]">
          <FormEditAddSub
            bindprice={(price) => setNewprice(price)}
            bindname={(name) => setNewname(name)}
            binddate={(date) => setNewdate(date)}
            bindcycle={(cycle) => setNewcycle(cycle)}
            bindimg={(img) => setNewimg(img)}
            bindcolor={(color) => setNewcolor(color)}
            SubcycleFeqy={newcycleFeqy}
            Subprice={newprice}
            Subname={newname}
            Subcolor={color}
            Subimg={img}
            Subdate={newdate}
            Subcycle={newcycle}
            navigation={navigation}
            page={"EditSubscription"}
          />
        </View>
        <View className="mx-[20px] h-[50%]">
          <Member showheader={"show"} data={Data} type="edit"></Member>
        </View>
        <TouchableOpacity
          className="items-center my-4"
          onPress={() => (deteleSubscription())}
        >
          <View className="px-32 py-3 rounded-xl bg-red-700">
            <Text className="font-medium text-white">Delete Subsription</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}
