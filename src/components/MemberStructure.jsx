import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Checkbox } from "react-native-paper";
export default function MemberStructure({ id, img, name, type, memberType }) {
  const [checked, setChecked] = useState(false);
  return (
    <View className="h- full flex flex-row w-full justify-between  my-2  border p-[10px] rounded-md border-[#CFCFCF]">
      <View className="flex flex-row">
        <Image className="h-10 w-10 rounded-full" source={{ uri: img }} />
        <Text className="p-3">{name}</Text>
      </View>
      {memberType === "add" && (
        <View className="border rounded-md border-[#CFCFCF]">
          <Checkbox
            color="#808080"
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
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
      {memberType === "none" && <></>}
    </View>
  );
}
