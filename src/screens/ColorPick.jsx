import React, { useState } from "react";
import { Button, SafeAreaView, StyleSheet, View } from "react-native";
import ColorPicker from "react-native-wheel-color-picker";
import { useSubcon } from "../context/subcon";

const ColorPick = ({ navigation, route }) => {
  const { page, data } = route.params;
  const [color, setColor] = useState("");

  const {subcon, updateSubcon} = useSubcon();

  const onColorChange = (color) => {
    console.log(color);
    setColor(color);
  };

  const onConfirm = (color1) => {
    const newdata = subcon[data];
    console.log('newdata', subcon[data])
    newdata.color = color1;
    updateSubcon({
      ...subcon,
      [data]: newdata
    });
    navigation.navigate(page, { data: data });
  }

  return (
    <SafeAreaView className="flex flex-col justify-between h-2/6 items-center mx-5">
      <View className="mt-20 px-6">
        <ColorPicker
          color={color}
          onColorChange={(color) => onColorChange(color)}
          thumbSize={30}
          sliderSize={30}
          noSnap={true}
          row={false}
        />
      </View>
      <View className="top-full border-[0.5px] border-[#CFCFCF] rounded-xl w-28 bg-black">
        <Button
          title="Confrim"
          color={"#ffff"}
          onPress={() => onConfirm(color)}
        />
      </View>
    </SafeAreaView>
  );
};

export default ColorPick;
