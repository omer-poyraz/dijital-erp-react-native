import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import product from '../../images/product.jpg'
import { useTranslation } from 'react-i18next';

const ProductDetailPage = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { t } = useTranslation();

    const productInfo = route.params?.item || {
        id: '1',
        code: 'C42FJW',
        title: 'Ariston Çift Kaplı Kombi',
        stock: 15,
        price: '4.350,00 ₺',
        image: product
    };

    const [selectedColor, setSelectedColor] = useState(t('color_white'));
    const [selectedSize, setSelectedSize] = useState(t('size_standard'));
    const [activeTab, setActiveTab] = useState('description');
    const [quantity, setQuantity] = useState(1);

    const similarProducts = [
        { id: '2', title: 'Bosch Kombi', price: '3.780,00 ₺', image: product },
        { id: '3', title: 'Siemens Sensör', price: '480,00 ₺', image: product },
        { id: '4', title: 'Tefal Ütü', price: '1.250,00 ₺', image: product },
    ];

    const specifications = [
        { name: t('spec_brand'), value: 'Ariston' },
        { name: t('spec_model'), value: 'Pro Plus 24kW' },
        { name: t('spec_capacity'), value: '24kW' },
        { name: t('spec_dimensions'), value: '70cm x 40cm x 30cm' },
        { name: t('spec_weight'), value: '32 kg' },
        { name: t('spec_warranty'), value: t('spec_warranty_value', { years: 2 }) },
        { name: t('spec_origin'), value: t('spec_origin_value_italy') },
        { name: t('spec_energy_class'), value: 'A++' }
    ];

    const colors = [
        t('color_white'),
        t('color_grey'),
        t('color_black')
    ];

    const sizes = [
        t('size_compact'),
        t('size_standard'),
        t('size_large')
    ];

    const reviews = [
        { id: 1, user: 'Ahmet Y.', rating: 4.5, comment: t('review_comment_1'), date: '12.03.2025' },
        { id: 2, user: 'Mehmet K.', rating: 5, comment: t('review_comment_2'), date: '05.02.2025' },
        { id: 3, user: 'Ayşe S.', rating: 4, comment: t('review_comment_3'), date: '18.01.2025' }
    ];

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Ionicons key={`star-${i}`} name="star" size={16} color="#FFC107" />);
        }

        if (halfStar) {
            stars.push(<Ionicons key="star-half" name="star-half" size={16} color="#FFC107" />);
        }

        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<Ionicons key={`star-empty-${i}`} name="star-outline" size={16} color="#FFC107" />);
        }

        return stars;
    };

    useEffect(() => {
        navigation.setOptions({
            title: productInfo.title || t('product_detail')
        });
    }, [navigation, productInfo.title, t]);

    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

    return (
        <ScrollView style={styles.page}>
            <View style={styles.imageContainer}>
                <Image source={productInfo.image} style={styles.productImage} />
            </View>

            <View style={styles.productHeader}>
                <Text style={styles.productTitle}>{productInfo.title}</Text>
                <Text style={styles.productCode}>{t('product_code')}: {productInfo.code}</Text>

                <View style={styles.priceRow}>
                    <Text style={styles.productPrice}>{productInfo.price}</Text>
                    <View style={styles.stockContainer}>
                        <Text style={[
                            styles.stockText,
                            { color: productInfo.stock > 0 ? '#43a047' : '#e53935' }
                        ]}>
                            {productInfo.stock > 0
                                ? t('in_stock', { count: productInfo.stock })
                                : t('out_of_stock')
                            }
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.variationContainer}>
                <Text style={styles.sectionTitle}>{t('options')}</Text>

                <Text style={styles.variationLabel}>{t('color')}</Text>
                <View style={styles.colorOptions}>
                    {colors.map(color => (
                        <TouchableOpacity
                            key={color}
                            style={[
                                styles.colorOption,
                                selectedColor === color && styles.selectedOption
                            ]}
                            onPress={() => setSelectedColor(color)}
                        >
                            <Text style={selectedColor === color ? styles.selectedOptionText : styles.optionText}>
                                {color}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.variationLabel}>{t('size')}</Text>
                <View style={styles.sizeOptions}>
                    {sizes.map(size => (
                        <TouchableOpacity
                            key={size}
                            style={[
                                styles.sizeOption,
                                selectedSize === size && styles.selectedOption
                            ]}
                            onPress={() => setSelectedSize(size)}
                        >
                            <Text style={selectedSize === size ? styles.selectedOptionText : styles.optionText}>
                                {size}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.variationLabel}>{t('quantity')}</Text>
                <View style={styles.quantitySelector}>
                    <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
                        <Ionicons name="remove" size={20} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
                        <Ionicons name="add" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.tabContainer}>
                <View style={styles.tabsHeader}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'description' && styles.activeTab]}
                        onPress={() => setActiveTab('description')}
                    >
                        <Text style={[styles.tabText, activeTab === 'description' && styles.activeTabText]}>
                            {t('description')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'specifications' && styles.activeTab]}
                        onPress={() => setActiveTab('specifications')}
                    >
                        <Text style={[styles.tabText, activeTab === 'specifications' && styles.activeTabText]}>
                            {t('technical_specifications')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'reviews' && styles.activeTab]}
                        onPress={() => setActiveTab('reviews')}
                    >
                        <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>
                            {t('reviews')}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.tabContent}>
                    {activeTab === 'description' && (
                        <View>
                            <Text style={styles.descriptionText}>
                                {t('product_description_p1')}
                            </Text>
                            <Text style={styles.descriptionText}>
                                {t('product_description_p2')}
                            </Text>
                            <Text style={styles.descriptionText}>
                                {t('product_description_p3')}
                            </Text>
                        </View>
                    )}

                    {activeTab === 'specifications' && (
                        <View style={styles.specificationsList}>
                            {specifications.map((spec, index) => (
                                <View key={index} style={styles.specificationRow}>
                                    <Text style={styles.specName}>{spec.name}</Text>
                                    <Text style={styles.specValue}>{spec.value}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {activeTab === 'reviews' && (
                        <View>
                            <View style={styles.reviewsSummary}>
                                <Text style={styles.averageRating}>4.5</Text>
                                <View style={styles.starsRow}>
                                    {renderStars(4.5)}
                                </View>
                                <Text style={styles.reviewCount}>
                                    {t('review_count', { count: reviews.length })}
                                </Text>
                            </View>

                            {reviews.map(review => (
                                <View key={review.id} style={styles.reviewItem}>
                                    <View style={styles.reviewHeader}>
                                        <Text style={styles.reviewUser}>{review.user}</Text>
                                        <Text style={styles.reviewDate}>{review.date}</Text>
                                    </View>
                                    <View style={styles.starsRow}>
                                        {renderStars(review.rating)}
                                    </View>
                                    <Text style={styles.reviewComment}>{review.comment}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </View>

            <View style={styles.similarProducts}>
                <Text style={styles.sectionTitle}>{t('similar_products')}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {similarProducts.map(item => (
                        <TouchableOpacity key={item.id} style={styles.similarProductCard}>
                            <Image source={item.image} style={styles.similarProductImage} />
                            <Text style={styles.similarProductTitle} numberOfLines={1}>{item.title}</Text>
                            <Text style={styles.similarProductPrice}>{item.price}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.bottomPadding} />
        </ScrollView>
    );
};

export default ProductDetailPage;

const styles = StyleSheet.create({
    page: { flex: 1, backgroundColor: '#f5f5f5', },
    imageContainer: { width: '100%', height: 200, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', padding: 15, },
    productImage: { width: '100%', height: '100%', borderRadius: 10, resizeMode: 'cover', },
    productHeader: { backgroundColor: 'white', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee', },
    productTitle: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 5, },
    productCode: { fontSize: 14, color: '#666', marginBottom: 10, },
    priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, },
    productPrice: { fontSize: 24, fontWeight: 'bold', color: 'rgb(41, 96, 121)', },
    stockContainer: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, backgroundColor: '#f0f0f0', },
    stockText: { fontSize: 14, fontWeight: '500', },
    variationContainer: { backgroundColor: 'white', padding: 15, marginTop: 10, },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15, },
    variationLabel: { fontSize: 16, fontWeight: '500', color: '#444', marginBottom: 10, marginTop: 15, },
    colorOptions: { flexDirection: 'row', marginBottom: 15, },
    colorOption: { paddingVertical: 8, paddingHorizontal: 16, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, marginRight: 10, },
    sizeOptions: { flexDirection: 'row', marginBottom: 15, },
    sizeOption: { paddingVertical: 8, paddingHorizontal: 16, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, marginRight: 10, },
    selectedOption: { borderColor: 'rgb(41, 96, 121)', backgroundColor: 'rgb(41, 96, 121)', },
    optionText: { color: '#333', },
    selectedOptionText: { color: '#fff', fontWeight: '500', },
    quantitySelector: { flexDirection: 'row', alignItems: 'center', marginTop: 5, },
    quantityButton: { width: 40, height: 40, backgroundColor: 'rgb(41, 96, 121)', borderRadius: 5, justifyContent: 'center', alignItems: 'center', },
    quantityText: { paddingHorizontal: 20, fontSize: 18, fontWeight: '500', },
    actionButtons: { flexDirection: 'row', padding: 15, backgroundColor: 'white', marginTop: 10, },
    addToCartButton: { flex: 1, backgroundColor: '#fd6200', borderRadius: 5, paddingVertical: 12, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 8, },
    favoriteButton: { width: 50, justifyContent: 'center', alignItems: 'center', marginLeft: 10, borderWidth: 1, borderColor: 'rgb(41, 96, 121)', borderRadius: 5, },
    tabContainer: { marginTop: 10, backgroundColor: 'white', },
    tabsHeader: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee', },
    tab: { flex: 1, paddingVertical: 15, justifyContent: 'center', alignItems: 'center', },
    activeTab: { borderBottomWidth: 2, borderBottomColor: 'rgb(41, 96, 121)', },
    tabText: { fontSize: 14, color: '#666', },
    activeTabText: { color: 'rgb(41, 96, 121)', fontWeight: '600', },
    tabContent: { padding: 15, },
    descriptionText: { fontSize: 14, lineHeight: 22, color: '#444', marginBottom: 15, },
    specificationsList: { marginBottom: 10, },
    specificationRow: { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee', },
    specName: { flex: 1, fontSize: 14, color: '#666', },
    specValue: { flex: 2, fontSize: 14, color: '#333', fontWeight: '500', },
    reviewsSummary: { alignItems: 'center', marginBottom: 20, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#eee', },
    averageRating: { fontSize: 36, fontWeight: 'bold', color: '#333', marginBottom: 5, },
    starsRow: { flexDirection: 'row', marginBottom: 5, },
    reviewCount: { color: '#666', },
    reviewItem: { marginBottom: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#eee', },
    reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, },
    reviewUser: { fontSize: 16, fontWeight: '500', color: '#333', },
    reviewDate: { color: '#888', },
    reviewComment: { fontSize: 14, color: '#444', marginTop: 5, },
    similarProducts: { marginTop: 10, backgroundColor: 'white', padding: 15, },
    similarProductCard: { width: 150, marginRight: 15, padding: 10, borderWidth: 1, borderColor: '#eee', borderRadius: 8, },
    similarProductImage: { width: '100%', height: 100, resizeMode: 'contain', marginBottom: 10, },
    similarProductTitle: { fontSize: 14, fontWeight: '500', color: '#333', marginBottom: 5, },
    similarProductPrice: { fontSize: 16, fontWeight: 'bold', color: 'rgb(41, 96, 121)', },
    bottomPadding: { height: 30, },
});