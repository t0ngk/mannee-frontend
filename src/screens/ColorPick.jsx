import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';

const ColorPick = ({ navigation }) => {
  const [color, setColor] = useState('');
  
  const onColorChange = color => {
    setColor(color);
  };
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
        <Button title='Confrim' color={'#ffff'} onPress={() => navigation.navigate('NewSubscription', {color : color})} />
      </View>
    </SafeAreaView>
  );
};

export default ColorPick;