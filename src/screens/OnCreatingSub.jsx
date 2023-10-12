import { Image, View, Text, Button, FlatList, ScrollView, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { format } from "date-fns";

import ImagePickerExample from "../components/ImgPicker";
import DatePicker from "../components/DatePicker";
import Selecter from "../components/Selecter";

export default function OnCreatingSub({ navigation, route }) {
    const [color, setColor] = useState(false);
    const [date, setDate] = useState('Pick Date');
    const [cycle, setCycle] = useState('');

    const handleDate = (date) => {
        var date = new Date(date);
        var formattedDate = format(date, "dd/MM/yyyy");
        console.log(formattedDate);
        setDate(formattedDate);
    }

    const handleCycle = (cycle) => {
        setCycle(cycle);
    }

    useEffect(() => {
        const routeColor = route.params ? route.params.color : ""; // ดึงค่า color จาก route.params
        if (routeColor) {
            console.log(routeColor);
            setColor(routeColor); // กำหนดค่า color ด้วยค่าที่มาจาก route.params
        }
    }, [route.params]);
    return (
        <View className="flex flex-col items-center mx-4 my-4 h-[88%]">
            <View className="border-[0.25px] rounded-xl w-full p-4">
                <View className="flex flex-row justify-between">
                    <ImagePickerExample />
                    <View className="flex flex-row items-center">
                        <Text className="mx-2">฿</Text>
                        <TextInput placeholder="0.00" className="border-[0.25px] p-2 rounded-lg w-28 h-8" />
                    </View>
                </View>
                <View className="mt-3 border-t-[0.25px] flex flex-row justify-between items-center py-3">
                    <Text>Name</Text>
                    <TextInput placeholder="Enter Name" className="p-2 rounded-lg w-28 h-8 ml-2" />
                </View>
                <View className="border-t-[0.25px] flex flex-row justify-between items-center py-3">
                    <View className="flex flex-row items-center">
                        <Text>Color</Text>
                        <View className="mx-2 w-6 h-6 rounded-full" style={{ backgroundColor: color }}></View>
                    </View>
                    <View className="flex flex-row items-center">
                        <Text>{color ? color : 'Pick Color'}</Text>
                        <Button title=">" onPress={() => navigation.navigate('ColorPick')} />
                    </View>
                </View>
                <View className="border-t-[0.25px] flex flex-row justify-between items-center py-3">
                    <Text>First Bill</Text>
                    <View className="flex flex-row items-center">
                        <Text className="text-slate-400">{date}</Text>
                        <DatePicker selectDate={handleDate} />
                    </View>
                </View>
                <View className="border-t-[0.25px] flex flex-row items-center py-3">
                    <Text>Cycle</Text>
                    <Selecter noti={handleCycle} />
                </View>
            </View>
            <View>
                <Text>Members</Text>
            </View>
        </View>
    );
}