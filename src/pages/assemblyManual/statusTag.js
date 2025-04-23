import React from 'react'
import { Text, View } from 'react-native';

const StatusTag = ({ durum }) => {
    let bgColor, textColor;

    switch (durum) {
        case true:
            bgColor = 'rgba(76, 175, 80, 0.15)';
            textColor = '#2e7d32';
            break;
        case false:
            bgColor = 'rgba(244, 67, 54, 0.15)';
            textColor = '#d32f2f';
            break;
        default:
            bgColor = 'rgba(255, 193, 7, 0.15)';
            textColor = '#f57c00';
    }

    return (
        <View style={{
            backgroundColor: bgColor,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 4,
            marginTop: 15,
            alignSelf: 'flex-start'
        }}>
            <Text style={{
                color: textColor,
                fontWeight: 'bold',
                fontSize: 12
            }}>
                {durum}
            </Text>
        </View>
    );
};

export default StatusTag
