import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const { width } = Dimensions.get('window');

const ProductItem = ({ item, index }) => {
    const navigate = useNavigation()

    return (
        <TouchableOpacity
            style={styles.productCard}
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
    container: { flex: 1, backgroundColor: '#f5f5f5', },
    filterContainer: { flexDirection: 'row', padding: 12, backgroundColor: 'white', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#e0e0e0', },
    inputContainer: { flex: 1, position: 'relative', marginRight: 10, },
    searchInput: { height: 44, borderWidth: 1, borderColor: 'rgb(41, 96, 121)', borderRadius: 8, paddingLeft: 40, fontSize: 15, backgroundColor: '#fff', },
    searchIcon: { position: 'absolute', left: 12, top: 12, color: 'rgb(41, 96, 121)', },
    searchButton: { width: 44, height: 44, backgroundColor: 'rgb(41, 96, 121)', borderRadius: 8, justifyContent: 'center', alignItems: 'center', },
    productList: { padding: 8, },
    row: { justifyContent: 'space-between', },
    productCard: { width: (width - 36) / 2, backgroundColor: '#fff', borderRadius: 8, marginBottom: 12, padding: 10, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, },
    productImage: { width: '100%', height: 120, resizeMode: 'contain', borderRadius: 4, marginBottom: 8, },
    productInfo: { padding: 4, },
    productCode: { fontSize: 12, color: '#666', marginBottom: 2, },
    productTitle: { fontSize: 15, fontWeight: 'bold', color: '#333', marginBottom: 4, },
    productStock: { fontSize: 14, fontWeight: '500', marginBottom: 4, },
    negativeStock: { color: '#e53935', },
    positiveStock: { color: '#43a047', },
    productPrice: { fontSize: 16, fontWeight: 'bold', color: 'rgb(41, 96, 121)', },
});