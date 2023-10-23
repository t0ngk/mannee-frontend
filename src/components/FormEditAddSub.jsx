import {
  Image,
  View,
  Text,
  Button,
  FlatList,
  ScrollView,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import { format } from "date-fns";

import ImagePickerExample from "../components/ImgPicker";
import DatePicker from "../components/DatePicker";
import Selecter from "../components/Selecter";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function FormEditAddSub({
  navigation,
  Subprice,
  Subname,
  Subcolor,
  Subdate,
  Subcycle,
  Subimg,
  page,
}) {
  const handleDate = (date) => {
    var date = new Date(date);
    var formattedDate = format(date, "dd-MMMM-yyyy");
    console.log(formattedDate);
    setDate(formattedDate);
  };
 
  const [price, setPrice] = useState(Subprice);
  const [name, setName] = useState(Subname);
  const [date, setDate] = useState(Subdate);
  const [cycle, setCycle] = useState(Subcycle);
  const [img, setImg] = useState(Subimg);



  console.log(page)
  return (
    <View className="flex flex-col items-center">
      <View className="border-[0.25px] rounded-xl w-full p-4">
        <View className="flex flex-row justify-between">
          {/* <ImagePickerExample /> */}
          <TouchableOpacity onPress={()=> {
            navigation.navigate("PickIcon", {page: page})
          }}>
            {!Subimg &&<View className="items-center p-5 border-[1px] rounded-full">
              <Text>Add Icon</Text>
            </View>}
            {Subimg && <Image source={{ uri: Subimg }} className="w-14 h-14 rounded-full" />}
          </TouchableOpacity>
          <View className="flex flex-row items-center">
            <Text>฿</Text>
            <TextInput
              value={price.toString()}
              onChangeText={(e) => {
                setPrice(e);
              }}
              keyboardType="numeric"
              placeholder="Enter Name"
              className="p-2 rounded-lg w-30 h-8"
            />
          </View>
        </View>
        <View className="mt-3 border-t-[0.25px] flex flex-row justify-between items-center py-3">
          <Text>Name</Text>
          <TextInput
            value={name}
            placeholder="Enter Name"
            className="p-2 rounded-lg w-30 h-8"
            onChangeText={(e) => setName(e)}
          />
        </View>
        <View className="border-t-[0.25px] flex flex-row justify-between items-center py-3">
          <View className="flex flex-row items-center">
            <Text>Color</Text>
            <View
              className="mx-2 w-6 h-6 rounded-full"
              style={{ backgroundColor: Subcolor }}
            ></View>
          </View>
          <View className="flex flex-row items-center">
            <TouchableOpacity className="flex flex-row items-center" onPress={() => navigation.navigate("ColorPick", {page: page})}>
              <View
                className="mx-2 w-6 h-6 rounded-full"
                style={{ backgroundColor: Subcolor }}
              >
              </View>
              <Text className="text-xl">{'>'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="border-t-[0.25px] flex flex-row justify-between items-center py-3">
          <Text>First Bill</Text>
          <View className="flex flex-row items-center">
            <Text>{date}</Text>
            <DatePicker selectDate={handleDate} />
          </View>
        </View>
        <View className="border-t-[0.25px] flex flex-row justify-between items-center py-3">
          <Text>Cycle</Text>
          <Selecter/>
        </View>
      </View>
    </View>
  );
}
