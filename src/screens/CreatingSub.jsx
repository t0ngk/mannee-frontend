import { Image, View, Text, Button, FlatList, ScrollView } from "react-native";

import SearchBar from "../components/SearchBar";
import Boxsubscription from "../components/Boxsubscription";

const Data = [
  {
    id: 1,
    name: "Netflix",
    price: 169,
    img: 'https://minio.haxter.ee/ctx-betterexperience-prd/uploads/images/221ddf5a-642b-4ace-b145-f9426ab2ad03_original.jpg',
    color: '#E50914'
  },
  {
    id: 2,
    name: "Spotify",
    price: 129,
    img: 'https://play-lh.googleusercontent.com/cShys-AmJ93dB0SV8kE6Fl5eSaf4-qMMZdwEDKI5VEmKAXfzOqbiaeAsqqrEBCTdIEs',
    color: '#1DB954'
  }
]


export default function CreatingSub({ navigation}) {
  return (
    <View className="flex flex-col justify-between items-center mx-4 my-4 h-[88%]">
      <SearchBar />
      <ScrollView className="w-full">
        <FlatList data={Data} renderItem={({ item }) => <Boxsubscription image={item.img} name={item.name} price={item.price} color={item.color}/>}/>
      </ScrollView>
      <View className="border-[0.5px] rounded-lg bg-[#2F2F2F] py-2 w-full">
        <Button title="Create Custom Subscription" color={'#FFFF'} onPress={({}) =>{
          navigation.navigate("NewSubscription")
        }} />
      </View>
    </View>
  );
}