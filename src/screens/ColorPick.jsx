import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, StyleSheet, View } from "react-native";
import ColorPicker from "react-native-wheel-color-picker";
import { useColor } from "../stores/colorContext";

const ColorPick = ({ navigation, route }) => {
  const [value, setValue] = useState("#000000");
  const { updateColor } = useColor();

  const onColorChange = (color) => {
    setValue(color);
  };
  return (
    <SafeAreaView className="flex flex-col justify-between h-2/6 items-center mx-5">
      <View className="mt-20 px-6">
        <ColorPicker
          color={value}
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
          onPress={() => {
            updateColor(value);
            navigation.goBack();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ColorPick;
