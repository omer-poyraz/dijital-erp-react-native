import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View, FlatList, Dimensions } from 'react-native'
import product from '../../images/product.jpg'
import ProductItem from './ProductItem';
import ProductAdd from './ProductAdd';
import Input from '../../components/form/input';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const ProductPage = () => {
    const [addView, setAddView] = useState(false);
    const [products, setProducts] = useState([
        { id: '1', code: 'C42FJW', title: 'Ariston Çift Kaplı', stock: -10.424, price: '43,45 $', image: product },
        { id: '2', code: 'B39TYH', title: 'Bosch Kombi', stock: 32.510, price: '128,75 $', image: product },
        { id: '3', code: 'D45LKP', title: 'Siemens Sensör', stock: -5.215, price: '15,90 $', image: product },
        { id: '4', code: 'M52KVN', title: 'Tefal Ütü', stock: 18.320, price: '52,25 $', image: product },
        { id: '5', code: 'P23RWT', title: 'Beko Buzdolabı', stock: -2.183, price: '320,10 $', image: product },
        { id: '6', code: 'S61NFG', title: 'Samsung LCD', stock: 7.433, price: '150,00 $', image: product },
        { id: '7', code: 'B39TYH', title: 'Bosch Kombi', stock: 32.510, price: '128,75 $', image: product },
        { id: '8', code: 'D45LKP', title: 'Siemens Sensör', stock: -5.215, price: '15,90 $', image: product },
        { id: '9', code: 'M52KVN', title: 'Tefal Ütü', stock: 18.320, price: '52,25 $', image: product },
    ]);
    const { t } = useTranslation()

    return (
        <View style={styles.page}>
            <View style={styles.filterContainer}>
                <Input
                    placeholder={`${t("search_product")}...`}
                    icon={'search-outline'}
                />
                <TouchableOpacity style={styles.searchButton}>
                    <Ionicons name='search-outline' size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton} onPress={() => setAddView(true)}>
                    <Ionicons name='add' size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={products}
                renderItem={({ item, index }) => <ProductItem item={item} index={index} />}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.productList}
            />

            <ProductAdd
                view={addView}
                setView={setAddView}
            />
        </View>
    );
};

export default ProductPage;

const styles = StyleSheet.create({
    page: { flex: 1, backgroundColor: '#f5f5f5', },
    filterContainer: { flexDirection: 'row', padding: 12, backgroundColor: 'white', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#e0e0e0', },
    inputContainer: { flex: 1, position: 'relative', marginRight: 10, },
    searchInput: { height: 44, borderWidth: 1, borderColor: 'rgb(41, 96, 121)', borderRadius: 8, paddingLeft: 40, fontSize: 15, backgroundColor: '#fff', },
    searchIcon: { zIndex: 3, position: 'absolute', left: 12, top: 12, color: 'rgb(41, 96, 121)', },
    searchButton: { width: 44, height: 44, backgroundColor: 'rgb(41, 96, 121)', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 10, },
    addButton: { width: 44, height: 44, backgroundColor: '#4CAF50', borderRadius: 8, justifyContent: 'center', alignItems: 'center', },
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