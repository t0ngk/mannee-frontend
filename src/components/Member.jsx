import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import MemberStructure from "./MemberStructure";
export default function Member({ data, stage, type, memberType, showheader, disable, target }) {
  const navigation = useNavigation();
  return (
    <View className="h-full">
      <View className="flex items-center">
        {showheader === "show" && (
          <Text className="text-[17px] font-bold my-3 ">Member(s)</Text>
        )}
        <View className="border max-h-[650px] p-3  rounded-xl border-[#CFCFCF] w-full ">
          <View className="items-end">
            {type === "edit" && (
              <Text
                onPress={() => navigation.navigate("AddMember", {member: data})}
                className="text-[29px] pb-2 "
              >
                +
              </Text>
            )}
          </View>
          <ScrollView className="w-full ">
            {data?.map((item) => (
              <MemberStructure
                memberType={memberType}
                key={item.id}
                id={item.id}
                img={item.img}
                name={item.username}
                disable={disable}
                target={target}
              ></MemberStructure>
            ))}
          </ScrollView>
        </View>
      </View>
    
    </View>
  );
}
