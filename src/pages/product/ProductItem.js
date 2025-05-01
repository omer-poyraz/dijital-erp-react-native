import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../utilities/colors';

const ProductItem = ({ item, index, cardWidth }) => {
    const navigate = useNavigation()

    return (
        <TouchableOpacity
            style={[styles.productCard, { width: cardWidth }]}
            onPress={() => navigate.navigate("ProductDetail", { item })}
        >
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={styles.productCode}>{item.code}</Text>
                <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={[styles.productStock, item.stock < 0 ? styles.negativeStock : styles.positiveStock]}>
                    {item.stock.toLocaleString('tr-TR')}
                </Text>
                <Text style={styles.productPrice}>{item.price}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    productCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 12,
        padding: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    productImage: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
        borderRadius: 4,
        marginBottom: 8,
    },
    productInfo: {
        padding: 4,
    },
    productCode: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
    },
    productTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    productStock: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
    },
    negativeStock: {
        color: '#e53935',
    },
    positiveStock: {
        color: '#43a047',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primary,
    },
});