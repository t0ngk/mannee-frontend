import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Image, View, Text, Button, FlatList, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import MemberStructure from "./MemberStructure";
export default function Member({ data, stage, type, memberType }) {
  const keyExtractor = (item) => item.id.toString();
  const navigation = useNavigation();
  return (
    <View className="h-full">
      <View className="flex items-center max-h-[280px]">
        <Text className="text-[17px] font-bold ">Member(s)</Text>
        <View className="border max-h-[650px] my-5 p-3  rounded-xl border-[#CFCFCF] w-full ">
          <View className="items-end">
            {type === "edit" && (
              <Text
                onPress={() => navigation.navigate("AddMember")}
                className="text-[29px] pb-2 "
              >
                +
              </Text>
            )}
          </View>
          <ScrollView className="w-full ">
            <FlatList
              keyExtractor={keyExtractor}
              data={data}
              renderItem={({ item }) => (
                <MemberStructure
                  memberType={memberType}
                  id={item.id}
                  img={item.img}
                  name={item.name}
                ></MemberStructure>
              )}
            />
          </ScrollView>
        </View>
      </View>
      {stage === "edit" && (
        <View className=" w-full my-[60px] ">
          <TouchableOpacity
            className="flex flex-row w-full  bg-[#BB2727] h-[40px]   rounded-xl "
            onPress={() => alert("delete bill")}
          >
            <View className="p-2 justify-center">
              <FontAwesomeIcon
                icon={faTrashAlt}
                color="white"
                size={20}
              ></FontAwesomeIcon>
            </View>
            <Text className="text-center mx-[100px] mt-1 p-2 text-white font-semibold">
              Delete Bill
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {stage === "foodEdit" && (
        <View className="  w-full mt-3">
          <TouchableOpacity
            className="flex bottom-0 flex-row w-full  bg-[#BB2727] h-[40px]   rounded-xl "
            onPress={() => alert("delete bill")}
          >
            <View className="p-2 justify-center">
              <FontAwesomeIcon
                icon={faTrashAlt}
                color="white"
                size={20}
              ></FontAwesomeIcon>
            </View>
            <Text className="text-center mx-[100px] mt-1 p-2 text-white font-semibold">
              Delete Food
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
