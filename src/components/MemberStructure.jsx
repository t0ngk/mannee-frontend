import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { View, Image, Text, TouchableOpacity, Alert } from "react-native";
import { Checkbox } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

export default function MemberStructure({
  id,
  img,
  name,
  type,
  memberType,
  disable,
}) {
  const [checked, setChecked] = useState(false);
  const [paid, setPaid] = useState(false);

  const togglepaid = () => setPaid(!paid);

  const sendrequestfriend = async () => {
    const token = await SecureStore.getItemAsync("token");
    const res = await fetch(`http://localhost:3000/friend/add/${name}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      const result = await res.json();
      Alert.alert("Send Request Success");
      console.log(result);
    } else {
      const err = await res.json();
      console.log(err);
    }
  };

  const acceptfriend = async () => {
    const token = await SecureStore.getItemAsync("token");
    const res = await fetch(`http://localhost:3000/friend/accept/TESTT`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      const result = await res.json();
      Alert.alert("Accept Request Success");
      console.log(result);
    } else {
      const err = await res.json();
      console.log(err);
    }
  };

  const deletefriend = async () => {
    const token = await SecureStore.getItemAsync("token");
    const res = await fetch(`http://localhost:3000/friend/reject/TESTT`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      const result = await res.json();
      Alert.alert("Delete Request Success");
      console.log(result);
    } else {
      const err = await res.json();
      console.log(err);
    }
  };
  return (
    <View>
      {memberType !== "kill" ||
        (memberType !== "unkill" && (
          <View className="h- full flex flex-row w-full justify-between  my-2  border p-[10px] rounded-md border-[#CFCFCF]">
            <View className="flex flex-row items-center">
              {/* <Ionicons name="md-person-circle-outline" size={40} color="black" /> */}
              <Image
                source={{
                  uri: img,
                }}
                style={{ width: 40, height: 40, borderRadius: 40 / 2 }}
              />
              <Text className="p-3">{name}</Text>
            </View>
            {memberType === "add" && (
              <View className="border rounded-md border-[#CFCFCF]">
                <Checkbox
                  color="#808080"
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                    console.log(checked);
                  }}
                />
              </View>
            )}
            {memberType === "delete" && (
              <TouchableOpacity
                className="flex flex-row m-2"
                onPress={() => alert(`delete member ${id} `)}
                disabled={disable}
              >
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  color="red"
                  size={20}
                ></FontAwesomeIcon>
              </TouchableOpacity>
            )}
            {memberType === "addfirend" && (
              <TouchableOpacity
                className="flex flex-row m-2"
                onPress={() => sendrequestfriend()}
                disabled={disable}
              >
                <Ionicons
                  name="ios-person-add-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            )}
            {memberType === "acceptfriend" && (
              <View className="flex-row items-center">
                <TouchableOpacity
                  className="flex flex-row m-2"
                  onPress={() => acceptfriend()}
                  disabled={disable}
                >
                  <AntDesign name="check" size={24} color="green" />
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex flex-row m-2"
                  onPress={() => deletefriend()}
                  disabled={disable}
                >
                  <AntDesign name="close" size={24} color="red" />
                </TouchableOpacity>
              </View>
            )}
            {memberType === "none" && <></>}
          </View>
        ))}
      {memberType === "kill" && (
        <TouchableOpacity
          disabled={disable}
          onPress={() => {
            Alert.alert("check member");
          }}
        >
          <View className="h- full flex flex-row w-full justify-between  my-2  border p-[10px] rounded-md border-[#CFCFCF]">
            <View className="flex flex-row items-center">
              <Ionicons
                name="md-person-circle-outline"
                size={40}
                color="black"
              />
              <Text className="p-3">{name}</Text>
            </View>
            <View className="justify-center">
              <MaterialIcons name="attach-money" size={24} color="red" />
            </View>
          </View>
        </TouchableOpacity>
      )}
      {memberType === "unkill" && (
        <TouchableOpacity
          disabled={disable}
          onPress={() => {
            Alert.alert("check member");
          }}
        >
          <View className="h- full flex flex-row w-full justify-between  my-2  border p-[10px] rounded-md border-[#CFCFCF]">
            <View className="flex flex-row items-center">
              <Image
                source={{
                  uri: `https://github.com/identicons/${name}.png`,
                }}
                style={{ width: 40, height: 40, borderRadius: 40 / 2 }}
              />
              <Text className="p-3">{name}</Text>
            </View>
            <View className="justify-center">
              <MaterialIcons name="attach-money" size={24} color="green" />
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}
