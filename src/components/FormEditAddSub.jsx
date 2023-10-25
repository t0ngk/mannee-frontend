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
import { useColor } from "../stores/colorContext";
import { useIcon } from "../stores/iconContext";
import dayjs from "dayjs";

export default function FormEditAddSub({
  navigation,
  Subprice,
  Subname,
  Subcolor,
  Subdate,
  Subcycle,
  Subimg,
  SubcycleFeqy,
  bindcycleFeqy,
  page,
  bindprice,
  bindname,
  binddate,
  bindcycle,
  bindimg,
  bindcolor,
}) {
  const handleDate = (date) => {
    binddate(dayjs(date).format("YYYY-MM-DD"));
  };

  const { color, updateColor } = useColor();
  const { icon, updateIcon } = useIcon();

  useEffect(() => {
    updateIcon(Subimg);
    console.log("icon chang to",Subimg);
  }, [Subimg]);
  
  useEffect(() => {
    updateColor(Subcolor);
  }, [Subcolor]);

  console.log(SubcycleFeqy)

  const handleselect = (cycle) => {
    bindcycleFeqy(parseInt(cycle));
    console.log(cycle);
  };

  console.log(Subprice, bindprice)

  // const [price, setPrice] = useState(Subprice);
  // const [name, setName] = useState(Subname);
  // const [date, setDate] = useState(Subdate);
  // const [cycle, setCycle] = useState(Subcycle);
  // const [img, setImg] = useState(Subimg);

  return (
    <View className="flex flex-col items-center">
      <View className="border-[0.25px] rounded-xl w-full p-4">
        <View className="flex flex-row justify-between">
          {/* <ImagePickerExample /> */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PickIcon", { page: page });
            }}
          >
            {!icon && (
              <View className="items-center p-5 border-[1px] rounded-full">
                <Text>Add Icon</Text>
              </View>
            )}
            {icon && (
              <Image
                source={{ uri: icon }}
                className="w-14 h-14 rounded-full"
              />
            )}
          </TouchableOpacity>
          <View className="flex flex-row items-center">
            <Text>฿</Text>
            <TextInput
              value={Subprice.toString()}
              onChangeText={(e) => {
                bindprice(e);
              }}
              keyboardType="numeric"
              placeholder="Enter price"
              className="p-2 rounded-lg w-30 h-8"
            />
          </View>
        </View>
        <View className="mt-3 border-t-[0.25px] flex flex-row justify-between items-center py-3">
          <Text>Name</Text>
          <TextInput
            value={Subname}
            placeholder="Enter Name"
            className="p-2 rounded-lg w-30 h-8"
            onChangeText={(e) => bindname(e)}
          />
        </View>
        <View className="border-t-[0.25px] flex flex-row justify-between items-center py-3">
          <View className="flex flex-row items-center">
            <Text>Color</Text>
            {/* <View
              className="mx-2 w-6 h-6 rounded-full"
              style={{ backgroundColor: color }}
            ></View> */}
          </View>
          <View className="flex flex-row items-center">
            <TouchableOpacity
              className="flex flex-row items-center"
              onPress={() => navigation.navigate("ColorPick", { page: page })}
            >
              <View
                className="mx-2 w-6 h-6 rounded-full"
                style={{ backgroundColor: color }}
              ></View>
              <Text className="text-xl">{">"}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="border-t-[0.25px] flex flex-row justify-between items-center py-3">
          <Text>First Bill</Text>
          <View className="flex flex-row items-center">
            <Text>{dayjs(Subdate).format('DD/MM/YYYY')}</Text>
            <DatePicker selectDate={handleDate} />
          </View>
        </View>
        <View className="border-t-[0.25px] flex flex-row justify-between items-center py-3">
          <Text>Cycle</Text>
          <View className="flex flex-row items-center">
            <Text>{SubcycleFeqy}</Text>
            <Selecter handleselect={handleselect} defaultValue={SubcycleFeqy} />
          </View>
        </View>
      </View>
    </View>
  );
}
