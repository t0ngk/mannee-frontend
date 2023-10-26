import {
  Image,
  View,
  Text,
  Button,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import SearchBar from "../components/SearchBar";
import MemberStructure from "../components/MemberStructure";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
export default function AddMember({ navigation, route }) {
  const { member } = route.params;
  const [friend, setFriend] = useState([]);
  const isFocused = useIsFocused();

  const fetchFriend = async () => {
    const token = await SecureStore.getItemAsync("token");
    const res = await fetch(`http://localhost:3000/friend`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const result = await res.json();
      setFriend(result);
    } else {
      const err = await res.json();
      console.log(err);
    }
  }

  useEffect(() => {
    if (isFocused) {
      console.log("Ready to fetch")
      fetchFriend()
    }
  }, [isFocused]);
  return (
    <View className="my-2  m-[20px] h-full">
      <SearchBar />
      <ScrollView className="w-full">
        {friend.map((item) => (
          <MemberStructure
            memberType="add"
            key={item.id}
            id={item.id}
            name={item.username}
          ></MemberStructure>
        ))}
      </ScrollView>
    </View>
  );
}
