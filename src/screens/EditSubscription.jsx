import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Image,
  View,
  Text,
  Button,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import FormEditAddSub from "../components/FormEditAddSub";
import Member from "../components/Member";
import * as SecureStore from 'expo-secure-store';
import { useSubcon } from "../context/subcon";

export default function EditSubscription({ navigation, route }) {
  const { subcon, updateSubcon, reloadSubcon } = useSubcon();
  const { data, paid } = route.params;
  console.log('edit data', subcon[data])
  const [newPrice, setNewPrice] = useState(subcon[data]['price']);
  const [newName, setNewName] = useState(subcon[data]['name']);
  const [newDate, setNewDate] = useState(dayjs(subcon[data]['firstBill']).format("MM/DD/YYYY"));
  const [newCycle, setNewCycle] = useState(subcon[data]['cycle']);
  const [newCycleFreq, setNewCycleFreq] = useState(subcon[data]['cycleFreq']);
  const [newCurrency, setNewCurrency] = useState(subcon[data]['currency']);
  const [member, setMember] = useState([])
  const api = async () => {
    console.log('data', data)

    const Data = {
      price: parseInt(newPrice),
      name: newName,
      currency: newCurrency,
      firstBill: newDate,
      cycle: newCycle,
      cycleFreq: parseInt(newCycleFreq),
      icon: subcon[data]['icon'],
      color: subcon[data]['color'],
      member: member
    }
    console.log('data to send', Data)
    const token = await SecureStore.getItemAsync('token');
    const api = await fetch(`https://mobile.t0ng.dev/subscription/${subcon[data]['id']}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(Data)
    });
    if (api.ok) {
      const res = await api.json();
      // updateSubcon({
      //   ...subcon,
      //   [data]: {
      //     ...subcon[data],
      //     ...res
      //   }
      // })
      await reloadSubcon();

      navigation.navigate('DetailSub', { data: data, paid: paid })
      console.log(res)
      Alert.alert("Edit Success");
      return res
    } else {
      const err = await api.json();
      Alert.alert("Error : " + err.error);
    }
  }


  const bindCurrency = (currency) => {
    try {
      setNewCurrency(currency)
    } catch (error) {
      return
    }
  }

  const bindCycle = (cycleFreq, cycle) => {
    try {
      setNewCycle(cycle)
      setNewCycleFreq(cycleFreq)
    }
    catch (error) {
      return
    }
  }
  const bindDate = (date) => {
    try {
      setNewDate(date)
    } catch (error) {
      return
    }
  }
  const bindName = (name) => {
    try {
      setNewName(name)
    } catch (error) {
      return
    }
  }
  const bindPrice = (price) => {
    try {
      setNewPrice((price))
    } catch (error) {
      return
    }
  }

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity onPress={() => api()}>
        <View className="mx-4">
          <Text className="font-medium text-xl text-black">Edit</Text>
        </View>
      </TouchableOpacity>
    ),
  });

  return (
    <>
      <ScrollView className="overflow-auto w-full h-full max-h-[740px">
        <View className="m-[20px]">
          <FormEditAddSub
            data={subcon[data]}
            Subprice={subcon[data]['price']}
            Subname={subcon[data]['name']}
            Subcolor={subcon[data]['color']}
            Subimg={subcon[data]['icon']}
            Subdate={dayjs(subcon[data]['firstBill']).format("DD/MMMM/YYYY")}
            Subcycle={subcon[data]['cycle']}
            navigation={navigation}
            page={'EditSubscription'}
            bindPrice={bindPrice}
            newPrice={newPrice}
            bindName={bindName}
            newName={newName}
            newDate={newDate}
            bindDate={bindDate}
            newCycle={newCycle}
            bindCycle={bindCycle}
            newCycleFreq={newCycleFreq}
            bindCycleFreq={bindCycle}
            bindCurrency={bindCurrency}
            index={data}
          />
        </View>
        <View className="mx-[20px] h-[50%]">
          <Member
            showheader={'show'}
            data={subcon[data]}
            type="edit"
          ></Member>
        </View>
        <TouchableOpacity className="items-center my-4" onPress={() => Alert.alert('Delete subscription')}>
          <View className="px-32 py-3 rounded-xl bg-red-700">
            <Text className="font-medium text-white">Delete Subsription</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}
