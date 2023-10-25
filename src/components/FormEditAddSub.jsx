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
import { format, set } from "date-fns";

import dayjs from "dayjs";
import ImagePickerExample from "../components/ImgPicker";
import DatePicker from "../components/DatePicker";
import Selecter from "../components/Selecter";
import { TouchableOpacity } from "react-native-gesture-handler";
import SelecterCurrency from "./SelecterCurrency";
import { useSubcon } from "../context/subcon";

export default function FormEditAddSub({
  navigation,
  Subcolor,
  page,
  data,
  bindPrice,
  newPrice,
  bindName,
  newName,
  bindDate,
  newDate,
  bindCycle,
  newCycle,
  newCycleFreq,
  bindCurrency,
  index
}) {
  const handleDate = (date) => {
    var date = new Date(date);
    var formattedDate = format(date, "MM/dd/yyyy");
    console.log(formattedDate);
    bindDate(formattedDate);
  };

  const {subcon, updateSubcon} = useSubcon();

  useEffect(() => {
    setIcon(data['icon'])
    setColor(data['color'])
  }, [subcon])

  const [color , setColor] = useState(data['color'])
  const [icon, setIcon] = useState(data['icon']);


  const changcycle = (frist, second) => {
    bindCycle(frist, second);
  }

  const changcurrency = (newcurrency) => {
    bindCurrency(newcurrency)
  }

  console.log(data)

  return (
    <View className="flex flex-col items-center">
      <View className="border-[0.25px] rounded-xl w-full p-4">
        <View className="flex flex-row justify-between">
          <TouchableOpacity onPress={() => {
            navigation.navigate("PickIcon", { page: page, data: index })
          }}>
            {icon == 'TEST' ? (<View className="items-center p-5 border-[1px] rounded-full">
              <Text>Add Icon</Text>
            </View>) : (<Image
              className="w-20 h-20 rounded-full"
              source={{ uri: icon }}
            />)}
          </TouchableOpacity>
          <View className="flex flex-row items-center">
            <SelecterCurrency data={data} newcurrency={changcurrency} />
            <TextInput
              // value={price.toString() ? price.toString() : 0}
              value={newPrice.toString()}
              onChangeText={(e) => {
                bindPrice(e);
              }}
              keyboardType="numeric"
              placeholder="Enter Price"
              className="p-2 rounded-lg w-30 h-12 border-[1px] text-2xl mx-2"
            />
          </View>
        </View>
        <View className="mt-3 border-t-[0.25px] flex flex-row justify-between items-center py-3">
          <Text>Name</Text>
          <TextInput
            value={newName}
            placeholder="Enter Name"
            className="p-2 rounded-lg w-30 h-8"
            onChangeText={(e) => bindName(e)}
          />
        </View>
        <View className="border-t-[0.25px] flex flex-row justify-between items-center py-3">
          <View className="flex flex-row items-center">
            <Text>Color</Text>
          </View>
          <View className="flex flex-row items-center">
            <TouchableOpacity className="flex flex-row items-center" onPress={() => navigation.navigate("ColorPick", { page: page, data: index })}>
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
            <Text>{newDate}</Text>
            <DatePicker selectDate={handleDate} />
          </View>
        </View>
        <View className="border-t-[0.25px] flex flex-row justify-between items-center py-3">
          <Text>Cycle</Text>
          <View className="flex flex-row items-center">
            <Text>{newCycleFreq + " "+ newCycle}</Text>
            <Selecter page={page} newcycle={changcycle} />
          </View>
        </View>
      </View>
    </View>
  );
}
