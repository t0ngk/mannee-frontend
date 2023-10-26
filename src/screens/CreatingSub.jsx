import {
  Image,
  View,
  Text,
  Button,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";

import SearchBar from "../components/SearchBar";
import Boxsubscription from "../components/Boxsubscription";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useColor } from "../stores/colorContext";
import dayjs from "dayjs";

const Data = [
  {
    id: 1,
    name: "Netflix",
    price: 169,
    img: "https://minio.haxter.ee/ctx-betterexperience-prd/uploads/images/221ddf5a-642b-4ace-b145-f9426ab2ad03_original.jpg",
    color: "#E50914",
    firstbill: dayjs().format("YYYY-MM-DD"),
  },
  {
    id: 2,
    name: "Spotify",
    price: 129,
    img: "https://play-lh.googleusercontent.com/cShys-AmJ93dB0SV8kE6Fl5eSaf4-qMMZdwEDKI5VEmKAXfzOqbiaeAsqqrEBCTdIEs",
    color: "#1DB954",
    firstbill: dayjs().format("YYYY-MM-DD"),
  },
];

export default function CreatingSub({ navigation }) {
  const {updateColor} = useColor();
  return (
    <View className="flex flex-col justify-between items-center mx-4 my-4 h-[88%]">
      <View className="w-full">
        {/* <SearchBar /> */}
      </View>
      <ScrollView className="w-full">
        {/* <FlatList
          data={Data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                updateColor(item.color);
                navigation.navigate("EditSubscription", {id: 'new', name: item.name, price: item.price, img: item.img, firstbill: "", cycle: "", daytopay: "" });
              }}
            >
              <Boxsubscription
                image={item.img}
                name={item.name}
                price={item.price}
                color={item.color}
              />
            </TouchableOpacity>
          )}
        /> */}
        {Data.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              updateColor(item.color);
              navigation.navigate("EditSubscription", {id: 'new', name: item.name, price: item.price, img: item.img, firstbill: item.firstbill, cycleFreq: 1, daytopay: "" });
            }}
          >
            <Boxsubscription
              image={item.img}
              name={item.name}
              price={item.price}
              color={item.color}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View className="border-[0.5px] rounded-lg bg-[#2F2F2F] py-2 w-full">
        <Button
          title="Create Custom Subscription"
          color={"#FFFF"}
          onPress={({ }) => {
            updateColor("#FFFFFF");
            navigation.navigate("EditSubscription", { page: "EditSubscription", id:"new" , name: "New Subscription", firstbill: dayjs().format("YYYY-MM-DD"), cycleFreq: 1});
          }}
        />
      </View>
    </View>
  );
}
