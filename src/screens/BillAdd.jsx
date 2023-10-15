import Member from "../components/Member";
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

export default function BillAdd({ navigation, route }) {
  const [color, setColor] = useState(false);
  const [name, setName] = useState("");
  useEffect(() => {
    const routeColor = route.params ? route.params.color : "";
    if (routeColor) {
      setColor(routeColor);
    }
  }, [route.params]);
  return (
    <>
      <View className="my-2 m-[20px] h-full">
        <View className="border p-2 rounded-md border-[#CFCFCF]">
          <View className=" border-b-[0.25px] flex flex-row justify-between items-center py-1">
            <Text className="font-semibold">Name</Text>
            <TextInput
              value={name}
              placeholder="Enter Name"
              className="p-2 rounded-lg w-28 h-8 ml-2"
              onChangeText={(e) => setName(e)}
            />
          </View>
          <View className="border-t-[0.25px] flex flex-row justify-between items-center py-1">
            <View className="flex flex-row items-center">
              <Text className="font-semibold">Color</Text>
              <View
                className="mx-2 w-6 h-6 rounded-full"
                style={{ backgroundColor: color }}
              ></View>
            </View>
            <View className="flex flex-row items-center">
              <Text>{color ? color : "Pick Color"}</Text>
              <Button
                title=">"
                onPress={() =>
                  navigation.navigate("ColorPick", { page: "BillAdd" })
                }
              />
            </View>
          </View>
        </View>
        <View className=" max-h-[250px] h-[250px] mt-4 ">
          <Member
            data={Data}
            stage="add"
            type="edit"
            memberType="delete"
          ></Member>
        </View>
      </View>
    </>
  );
}
