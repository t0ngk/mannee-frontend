import { Image, View, Text, Button, FlatList, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import Member from "../components/Member";


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

export default function AddFriends({}) {
    return (
        <ScrollView className="h-full my-4  max-h-[770px]">
            <View className="mx-5">
                <SearchBar/>
            </View>
            <View className="mx-5 mt-2">
                <Member
                data={Data}
                memberType={'addfirend'}
                />
            </View>
        </ScrollView>
    );
}