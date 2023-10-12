import DropDownPicker from 'react-native-dropdown-picker';

import React, { useState } from 'react';


export default function Selecter({noti}) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Every Days', value: 'Every Days' },
        { label: 'Every Month(s)', value: 'Every Month(s)' },
        { label: 'Every Year(s)', value: 'Every Year(s)'}
    ]);

    return (
        <DropDownPicker
            className="w-1/2 ml-24 left-full"
            open={open}
            value={value}
            items={items}
            onSelectItem={item => {
                setValue(item.value);
                console.log(item.value);}}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            listMode='MODAL'
            placeholder="Select your Cycle"
        />
    );
}