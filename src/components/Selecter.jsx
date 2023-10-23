import { View, Text, TouchableOpacity } from "react-native";

import React, { useEffect, useRef, useState } from 'react';
import SegmentedPicker from 'react-native-segmented-picker';




export default function Selecter({ }) {
    const segmentedPicker = useRef();

    const onConfirm = (selections) => {
        console.info(selections);
        // => { col_1: "option_1", col_2: "option_3" }
    }
    return (
        <>
            <View className="items-center mx-2">
                <TouchableOpacity onPress={()=> segmentedPicker.current.show()}>
                    <Text className="text-xl">{'>'}</Text>
                </TouchableOpacity>
                <SegmentedPicker
                    confirmText="Confirm"
                    ref={segmentedPicker}
                    onConfirm={onConfirm}
                    options={[
                        {
                            key: 'dayofweek',
                            items: [
                                { label: '1', value: '1' },
                                { label: '2', value: '2' },
                            ],
                        },
                        {
                            key: 'type',
                            items: [
                                { label: 'Day', value: 'day' },
                                { label: 'Mouth', value: 'mouth' }
                            ],
                        },
                    ]}
                />
            </View>
        </>
    );
}