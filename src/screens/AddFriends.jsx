import { Image, View, Text, Button, FlatList, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import Member from "../components/Member";
import { useIsFocused } from "@react-navigation/core";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";



export default function AddFriends({ }) {
  const isFocused = useIsFocused();
  const [text, setText] = useState('');
  const [allfriend, setAllfriend] = useState([]);

  const getnamefriend = async () => {
    const token = await SecureStore.getItemAsync("token");
    const res = await fetch(`http://localhost:3000/friend/search/${text}`, {
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


  useEffect(() => {
    if (isFocused) {
      console.log(text.length)
      if (text.length > 0) {
        getnamefriend();
      } else {
        setAllfriend(null)
      }
      console.log('Add Friends is focused')
    }
    else {
      console.log('Add Friends is not focused')
    }
  }, [text]);

  return (
    <ScrollView className="h-full my-4  max-h-[770px]">
      <View className="mx-5">
        <SearchBar onChangeText={(e) => { setText(e) }} />
      </View>
      {allfriend ? (<View className="mx-5 mt-2">
        <Member
          data={allfriend}
          memberType={'addfirend'}
        />
      </View>)
        :
        <View className="flex flex-col items-center">
          <Text className="text-2xl font-normal my-3 ">No Friends</Text>
        </View>
      }
    </ScrollView>
  );
}
