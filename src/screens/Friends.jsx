import { TextInput, View, Text, ScrollView, TouchableOpacity } from "react-native";
import SearchBar from "../components/SearchBar";
import Member from "../components/Member";
import BoxRequstFriends from "./BoxRequstFriends";
import { useIsFocused } from "@react-navigation/core";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Octicons } from '@expo/vector-icons';
import Badge from "../components/Badge";

export default function Friends({ navigation }) {
  const isFocused = useIsFocused();
  const [allfriend, setAllfriend] = useState([]);
  const [notificationCount, setNotificationCount] = useState(2);



  navigation.setOptions({
    headerLeft: () => {
      return (
        <TouchableOpacity onPress={() => navigation.navigate("BoxRequstFriends")}>
          <View className="mx-4">
            {notificationCount > 0 && <Badge count={notificationCount} />}
            <Octicons name="person-add" size={24} color="black" />
          </View>
        </TouchableOpacity>
      )
    },
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("AddFriends")}>
        <View className="mx-4">
          <Text className="text-4xl font-light">+</Text>
        </View>
      </TouchableOpacity>
    ),
  })


  useEffect(() => {
    if (isFocused) {
      console.log('Friends is focused')
      getFriend();
      getfriendRequst();
    }
    else {
      console.log('Friends is not focused')
    }
  }, [isFocused]);


  const getfriendRequst = async () => {
    const token = await SecureStore.getItemAsync("token");
    const res = await fetch(`http://localhost:3000/friend/request`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      const result = await res.json();
      setNotificationCount(Object.keys(result).length);
      console.log(result);
    } else {
      const err = await res.json();
      console.log(err);
    }

  }

  const getFriend = async () => {
    const token = await SecureStore.getItemAsync("token");
    const res = await fetch("http://localhost:3000/friend", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      const result = await res.json();
      setAllfriend(result);
      console.log(result);
    } else {
      const err = await res.json();
      console.log(err);
    }
  }

  return (
    <ScrollView className="overflow-auto w-full h-full px-4 py-4">
      <View>
        <SearchBar />
      </View >
      {allfriend ? (<View>
        <Member
          data={allfriend}
          memberType={'delete'}
        />
      </View>) 
      : 
      <View className="flex flex-col items-center">
        <Text className="text-2xl font-normal my-3 ">No Friends</Text>
      </View>}
    </ScrollView>
  );
}
