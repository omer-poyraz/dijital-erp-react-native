import React from 'react'
import { Text, View } from 'react-native';

const StatusTag = ({ durum }) => {
    let bgColor, textColor, label;

    switch (durum) {
        case true:
        case 'Aktif':
        case 'active':
            bgColor = 'rgba(76, 175, 80, 0.15)';
            textColor = '#2e7d32';
            label = 'Aktif';
            break;
        case false:
        case 'Kapalı':
        case 'inactive':
            bgColor = 'rgba(244, 67, 54, 0.15)';
            textColor = '#d32f2f';
            label = 'Kapalı';
            break;
        default:
            bgColor = 'rgba(255, 193, 7, 0.15)';
            textColor = '#f57c00';
            label = 'Bekliyor';
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
                {label}
            </Text>
        </View>
    );
};

export default StatusTag