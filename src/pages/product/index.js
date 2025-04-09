import { Ionicons } from '@expo/vector-icons'
import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, FlatList, Dimensions, useWindowDimensions } from 'react-native'
import product from '../../images/product.jpg'
import ProductItem from './ProductItem';
import ProductAdd from './ProductAdd';
import Input from '../../components/form/input';
import { useTranslation } from 'react-i18next';
import { colors } from '../../utilities/colors';

const ProductPage = () => {
    const [addView, setAddView] = useState(false);
    const [products, setProducts] = useState([
        { id: '1', code: 'C42FJW', title: 'Ariston Çift Kaplı', stock: -10.424, price: '43,45 $', image: product },
        { id: '2', code: 'B39TYH', title: 'Bosch Kombi', stock: 32.510, price: '128,75 $', image: product },
        { id: '3', code: 'D45LKP', title: 'Siemens Sensör', stock: -5.215, price: '15,90 $', image: product },
        { id: '4', code: 'M52KVN', title: 'Tefal Ütü', stock: 18.320, price: '52,25 $', image: product },
        { id: '5', code: 'P23RWT', title: 'Beko Buzdolabı', stock: -2.183, price: '320,10 $', image: product },
        { id: '6', code: 'S61NFG', title: 'Samsung LCD', stock: 7.433, price: '150,00 $', image: product },
        { id: '7', code: 'B39TYH', title: 'Bosch Kombi Uzun İsimli Ürün Test', stock: 32.510, price: '128,75 $', image: product },
        { id: '8', code: 'D45LKP', title: 'Siemens Sensör', stock: -5.215, price: '15,90 $', image: product },
        { id: '9', code: 'M52KVN', title: 'Tefal Ütü', stock: 18.320, price: '52,25 $', image: product },
    ]);
    const { t } = useTranslation();

    const { width } = useWindowDimensions();

    const isTablet = width >= 600;

    const numColumns = isTablet ? 3 : 2;

    const cardWidth = isTablet
        ? (width - (24 + (numColumns - 1) * 12)) / numColumns
        : (width - 36) / 2;

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
                renderItem={({ item, index }) => (
                    <ProductItem
                        item={item}
                        index={index}
                        cardWidth={cardWidth}
                    />
                )}
                keyExtractor={item => item.id}
                numColumns={numColumns}
                key={numColumns} // Sütun sayısı değiştiğinde FlatList'i yeniden render etmek için
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
    filterContainer: {
        flexDirection: 'row',
        padding: 12,
        backgroundColor: 'white',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    searchButton: {
        width: 44,
        height: 44,
        backgroundColor: colors.primary,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    addButton: {
        width: 44,
        height: 44,
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productList: {
        padding: 12,
    },
    row: {
        justifyContent: 'space-between',
    },
});