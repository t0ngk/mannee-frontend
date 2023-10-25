import { View, Text, TouchableOpacity } from "react-native";

import React, { useEffect, useRef, useState } from 'react';
import SegmentedPicker from 'react-native-segmented-picker';




export default function Selecter({handleselect}) {
    const segmentedPicker = useRef();

    const onConfirm = (selections) => {
        console.info(selections);
        handleselect(selections)
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
                                { label: '3', value: '3' },
                                { label: '4', value: '4' },
                                { label: '5', value: '5' },
                                { label: '6', value: '6' },
                                { label: '7', value: '7' },
                                { label: '8', value: '8' },
                                { label: '9', value: '9' },
                                { label: '10', value: '10' },
                                { label: '11', value: '11' },
                                { label: '12', value: '12' },
                                { label: '13', value: '13' },
                                { label: '14', value: '14' },
                                { label: '15', value: '15' },
                                { label: '16', value: '16' },
                                { label: '17', value: '17' },
                                { label: '18', value: '18' },
                                { label: '19', value: '19' },
                                { label: '20', value: '20' },
                                { label: '21', value: '21' },
                                { label: '22', value: '22' },
                                { label: '23', value: '23' },
                                { label: '24', value: '24' },
                                { label: '25', value: '25' },
                                { label: '26', value: '26' },
                                { label: '27', value: '27' },
                                { label: '28', value: '28' },
                                { label: '29', value: '29' },
                                { label: '30', value: '30' },
                                { label: '31', value: '31' },
                            ],
                        },
                        {
                            key: 'type',
                            items: [
                                { label: 'Weekly', value: 'WEEKLY' },
                                { label: 'Monthly', value: 'MONTHLY' },
                                { label: 'Yearly', value: 'YEARLY' },
                            ],
                        },
                    ]}
                />
            </View>
        </>
    );
}
