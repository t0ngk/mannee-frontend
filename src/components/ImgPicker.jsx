import React, { useState, useEffect } from 'react';
import { TouchableOpacity, ImageBackground, View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="items-center justify-center">
      <TouchableOpacity onPress={pickImage}>
        <View className="border-[0.25px] p-4 py-5 rounded-3xl">
          <Text>Add Icon</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}