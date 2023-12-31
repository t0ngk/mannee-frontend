import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, Alert } from "react-native";
import { Checkbox } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { useMember } from "../stores/memberContext";
import { set } from "date-fns";

export default function MemberStructure({
  id,
  img,
  name,
  memberType,
  target,
  disable,
  action,
  value,
  subhead,
  changeMemberType
}) {
  const [checked, setChecked] = useState(value || false);
  const [paid, setPaid] = useState(false);
  const { members, updateMember } = useMember();

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
    const res = await fetch(`http://localhost:3000/friend/accept/${name}`, {
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
    const res = await fetch(`http://localhost:3000/friend/reject/${name}`, {
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
      {memberType !== "kill" &&
        memberType !== "unkill" &&
        memberType !== "paid" &&
        memberType !== "unpaid" && (
          <View className="h- full flex flex-row w-full justify-between  my-2  border p-[10px] rounded-md border-[#CFCFCF]">
            <View className="flex flex-row items-center">
              {/* <Ionicons name="md-person-circle-outline" size={40} color="black" /> */}
              <Image
                source={{
                  uri: `https://github.com/identicons/${name}.png`,
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
                    if (checked) {
                      updateMember(members.filter((item) => item.id !== id));
                      setChecked(false);
                    } else {
                      updateMember([...members, { id, username: name }]);
                      setChecked(true);
                    }
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
        )}
      {memberType === "kill" && (
        <TouchableOpacity
          disabled={disable}
          onPress={async () => {
            const token = await SecureStore.getItemAsync("token");
            const res = await fetch(
              `http://localhost:3000/subscription/${target}/paid/${id}`,
              {
                method: "PUT",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (res.ok) {
              // setMode("unkill");
              changeMemberType(id)
              {action && action(id)}
            }
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
              <MaterialIcons name="attach-money" size={24} color="red" />
            </View>
          </View>
        </TouchableOpacity>
      )}
      {memberType === "unkill" && (
        <TouchableOpacity
          disabled={disable}
          onPress={async () => {
            const token = await SecureStore.getItemAsync("token");
            const res = await fetch(
              `http://localhost:3000/subscription/${target}/paid/${id}`,
              {
                method: "PUT",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (res.ok) {
              // setMode("kill");
              changeMemberType(id)
              {action && action(id)}
            }
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
      {memberType === "paid" && (
        <TouchableOpacity
          disabled={disable}
          onPress={async () => {
            const token = await SecureStore.getItemAsync("token");
            const res = await fetch(
              `http://localhost:3000/bill/${target}/paid/${id}`,
              {
                method: "PUT",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (res.ok) {
              // setMode("unpaid");
            } else {
              const err = await res.json();
              console.log(err);
            }
          }}
        >
          <View className="h- full flex flex-row w-full justify-between  my-2  border p-[10px] rounded-md border-[#CFCFCF]">
            <View className="flex flex-row items-center gap-3">
              <Image
                source={{
                  uri: `https://github.com/identicons/${name}.png`,
                }}
                style={{ width: 40, height: 40, borderRadius: 40 / 2 }}
              />
              <View>
                <Text>{name}</Text>
                {subhead && <Text>{subhead}</Text>}
              </View>
            </View>
            <View className="justify-center">
              <MaterialIcons name="attach-money" size={24} color="green" />
            </View>
          </View>
        </TouchableOpacity>
      )}
      {memberType === "unpaid" && (
        <TouchableOpacity
          disabled={disable}
          onPress={async () => {
            const token = await SecureStore.getItemAsync("token");
            const res = await fetch(
              `http://localhost:3000/bill/${target}/paid/${id}`,
              {
                method: "PUT",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (res.ok) {
              // setMode("paid");
            } else {
              const err = await res.json();
              console.log(err);
            }
          }}
        >
          <View className="h- full flex flex-row w-full justify-between  my-2  border p-[10px] rounded-md border-[#CFCFCF]">
            <View className="flex flex-row items-center gap-3">
              <Image
                source={{
                  uri: `https://github.com/identicons/${name}.png`,
                }}
                style={{ width: 40, height: 40, borderRadius: 40 / 2 }}
              />
              <View className="flex flex-col">
                <Text>{name}</Text>
                {subhead && <Text>{subhead}</Text>}
              </View>
            </View>
            <View className="justify-center">
              <MaterialIcons name="attach-money" size={24} color="red" />
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}
