import { Text, TouchableOpacity, View } from "react-native";
import Member from "../components/Member";
import { useIsFocused } from "@react-navigation/core";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { AntDesign } from '@expo/vector-icons';

export default function BoxRequstFriends({ route }) {
    const isFocused = useIsFocused();
    const [allfriend, setAllfriend] = useState([]);

    const getfriendRequst = async () => {
        const token = await SecureStore.getItemAsync("token");
        const res = await fetch(`http://172.20.10.2:3000/friend/request`, {
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
            getfriendRequst();
            console.log('Friends Requst is focused')
        }
        else {
            console.log('Friends Requst is not focused')
        }
    }, [isFocused]);

    return (
        <View className="mb-2 my-5 p-5 items-center max-h-[750px] mx-14">
            {allfriend != null ?(<Member data={allfriend} memberType="acceptfriend" />)
            :
            <View className="flex flex-col items-center">
                <AntDesign name="frowno" size={40} color="black" />
                <Text className="text-2xl font-normal my-3 ">No Friends Request</Text>
            </View> }
        </View>
    )
}