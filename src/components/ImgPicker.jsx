import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, FlatList} from 'react-native';
// import Modal from "react-native-modal";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIcon } from '../stores/iconContext';

const dataImage = [{
  name: "Netflix",
  img: 'https://minio.haxter.ee/ctx-betterexperience-prd/uploads/images/221ddf5a-642b-4ace-b145-f9426ab2ad03_original.jpg'
},
{
  name: "Spotify",
  img: 'https://www.scdn.co/i/_global/open-graph-default.png'
},
{
  name: "Netflix",
  img: 'https://minio.haxter.ee/ctx-betterexperience-prd/uploads/images/221ddf5a-642b-4ace-b145-f9426ab2ad03_original.jpg'
},
{
  name: "Spotify",
  img: 'https://www.scdn.co/i/_global/open-graph-default.png'
},
{
  name: "Netflix",
  img: 'https://minio.haxter.ee/ctx-betterexperience-prd/uploads/images/221ddf5a-642b-4ace-b145-f9426ab2ad03_original.jpg'

},
{
  name: "Spotify",
  img: 'https://www.scdn.co/i/_global/open-graph-default.png'
}];

const numColumns = 4;

const ImagePickerExample = ({navigation, route}) => {
  const { updateIcon } = useIcon();
  const {page} = route.params;
  // const [modalVisible, setModalVisible] = useState(false);

  // const toggleModal = () => {
  //   setModalVisible(!modalVisible);
  // };
  return (
    <SafeAreaView className="flex-1 flex-col m-5 max-w-[400px]">
      {/* <Modal isVisible={modalVisible}>
        <View className="rounded-xl flex-col bg-red-400 items-center h-[15%] w-2/3 mx-auto">
          <Text className="py-4 font-medium text-xl">Are you sure?</Text>
        </View>
      </Modal> */}
      <FlatList
        data={dataImage}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=> {
            updateIcon(item.img);
            navigation.goBack();
            // navigation.navigate(page, {img: item.img})
          }}>
            <View className="flex-row items-center border-[1px] rounded-xl p-3 my-2 mx-2">
              <Image source={{ uri: item.img }} className="w-14 h-14 rounded-full" />
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};


export default ImagePickerExample;
