import { View, Text, TouchableOpacity } from "react-native";

import React, { useEffect, useRef, useState } from 'react';
import SegmentedPicker from 'react-native-segmented-picker';
import { MaterialIcons } from '@expo/vector-icons';




export default function SelecterCurrency({ data, newcurrency }) {
    const segmentedPicker = useRef();
    const currency = data['currency']
    console.log(currency)
    const [icon , setIcon] = useState(currency)
    const onConfirm = (selections) => {
        console.info(selections);
        newcurrency(selections['currency'])
        setIcon(selections['currency'])
    }
    return (
        <>
            <View className="items-center border-[1px] rounded-xl p-2">
                <TouchableOpacity onPress={() => segmentedPicker.current.show()}>
                    {data['currency'] == null ?(<MaterialIcons name="arrow-drop-down" size={24} color="black" />)
                    : (<Text className="text-xl items-center">{icon}</Text>)}
                </TouchableOpacity>
                <SegmentedPicker
                    confirmText="Confirm"
                    ref={segmentedPicker}
                    onConfirm={onConfirm}
                    options={[
                        {
                            key: 'currency',
                            items: [
                                { label: '฿ (Bath)', value: '฿' },
                                { label: '$ (USD)', value: '$' },
                                { label: '¥ (Yen)', value: '¥' },
                                { label: '€ (Euro)', value: '€' },
                            ],
                        },
                    ]}
                />
            </View>
        </>
    );
}