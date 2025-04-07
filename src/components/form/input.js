import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

const Input = ({ placeholder, icon }) => {
    return (
        <View style={styles.inputContainer}>
            <Ionicons name={icon} size={20} style={styles.searchIcon} />
            <TextInput
                placeholder={placeholder}
                style={styles.searchInput}
                placeholderTextColor="#666"
            />
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    inputContainer: { flex: 1, position: 'relative', marginRight: 10, },
    searchIcon: { zIndex: 3, position: 'absolute', left: 12, top: 12, color: 'rgb(41, 96, 121)', },
    searchInput: { height: 44, borderWidth: 1, borderColor: 'rgb(41, 96, 121)', borderRadius: 8, paddingLeft: 40, fontSize: 15, backgroundColor: '#fff', },
})