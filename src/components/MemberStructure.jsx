import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { View, Image, Text, TouchableOpacity, Alert } from "react-native";
import { Checkbox } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function MemberStructure({ id, img, name, type, memberType }) {
  const [checked, setChecked] = useState(false);
  const [paid, setPaid] = useState(false);

  const togglepaid = () => setPaid(!paid);
  return (
    <View>
      {memberType !== "kill" && <View className="h- full flex flex-row w-full justify-between  my-2  border p-[10px] rounded-md border-[#CFCFCF]">
        <View className="flex flex-row items-center">
          <Ionicons name="md-person-circle-outline" size={40} color="black" />
          <Text className="p-3">{name}</Text>
        </View>
        {memberType === "add" && (
          <View className="border rounded-md border-[#CFCFCF]">
            <Checkbox
              color="#808080"
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked)
                console.log(checked);
              }}
            />
          </View>
        )}
        {memberType === "delete" && (
          <TouchableOpacity
            className="flex flex-row m-2"
            onPress={() => alert(`delete member ${id} `)}
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
            onPress={() => alert(`Add this member ${id} `)}
          >
            <Ionicons name="ios-person-add-outline"
              size={24} color="black" />
          </TouchableOpacity>
        )}
        {memberType === "acceptfriend" && (
          <View className="flex-row items-center">
            <TouchableOpacity
              className="flex flex-row m-2"
              onPress={() => alert(`Accept this member ${id} `)}
            >
              <AntDesign name="check" size={24} color="green" />
            </TouchableOpacity>
            <TouchableOpacity
              className="flex flex-row m-2"
              onPress={() => alert(`Delete this member ${id} `)}
            >
              <AntDesign name="close" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
        {memberType === "none" && <></>}
      </View>}
      {memberType === "kill" &&
        <TouchableOpacity onPress={() => {Alert.alert('check member')}}>
          <View className="h- full flex flex-row w-full justify-between  my-2  border p-[10px] rounded-md border-[#CFCFCF]">
            <View className="flex flex-row items-center">
              <Ionicons name="md-person-circle-outline" size={40} color="black" />
              <Text className="p-3">{name}</Text>
            </View>
            <View className="justify-center">
              <MaterialIcons name="attach-money" size={24} color="red" />
            </View>
          </View>
        </TouchableOpacity>}
    </View>
  );
}
