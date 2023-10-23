import { Text, TouchableOpacity, View } from "react-native";
import Member from "../components/Member";
export default function BoxRequstFriends({ route}) {
    const { data } = route.params;
    return (
        <View className="mb-2 my-5 p-5 items-center max-h-[750px]">
            <Member data={data} memberType="acceptfriend" />
        </View>
    )
}