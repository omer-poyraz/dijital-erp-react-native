import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

const SelectBox = ({ style, icon, zIndex = 1000, open, value, items, setOpen, setValue, setItems, label }) => {
    return (
        <View style={[style.selectBox, { zIndex: zIndex }]}>
            <Text style={style.inputLabel}>{label}</Text>
            <View style={[style.selectContainer, { zIndex: zIndex }]}>
                <Ionicons
                    name={icon}
                    size={20}
                    style={style.inputIcon}
                    color="rgb(41, 96, 121)"
                />
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder={label}
                    style={style.dropdown}
                    textStyle={style.dropdownText}
                    dropDownContainerStyle={style.dropdownContainer}
                    zIndex={zIndex}
                    zIndexInverse={6000 - zIndex}
                    listMode="SCROLLVIEW"
                />
            </View>
        </View>
    )
}

export default SelectBox