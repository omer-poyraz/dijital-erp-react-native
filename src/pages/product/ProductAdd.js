import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Input from '../../components/form/input'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'

const ProductAdd = ({ view, setView }) => {
    const { t } = useTranslation();

    return (
        <View style={[styles.page, { display: view ? 'flex' : 'none' }]}>
            <View style={styles.popup}>
                <View style={styles.popupHeader}>
                    <View>
                        <Text style={styles.popupTitle}>Ürün Ekle</Text>
                        <Text style={styles.popupSubTitle}>Yeni ürün ekleyebilirsiniz.</Text>
                    </View>
                    <TouchableOpacity style={styles.closeBtn} onPress={() => setView(false)}>
                        <Ionicons name='close' size={20} style={styles.close} />
                    </TouchableOpacity>
                </View>
                <View style={styles.formItem}>
                    <Text style={styles.formLabel}></Text>
                    <Input placeholder={t("product_name")} icon="file-tray-stacked-outline" />
                </View>
                <View style={styles.formItem}>
                    <Text style={styles.formLabel}></Text>
                    <Input placeholder={t("product_code")} icon="qr-code-outline" />
                </View>
                <View style={styles.formItem}>
                    <Text style={styles.formLabel}></Text>
                    <Input placeholder={t("price")} icon="cash-outline" />
                </View>
                <View style={styles.formItem}>
                    <Text style={styles.formLabel}></Text>
                    <Input placeholder={t("product_description")} icon="browsers-outline" />
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.falseBtn} onPress={() => setView(false)}>
                        <Text style={styles.falseBtnText}>{t("close")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.trueBtn}>
                        <Text style={styles.trueBtnText}>{t("add")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ProductAdd

const styles = StyleSheet.create({
    page: { backgroundColor: 'rgba(21, 86, 117, 0.4)', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 999, },
    popup: { width: '80%', height: 420, display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', padding: 20, backgroundColor: 'rgb(240, 240, 240)', borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, },
    popupHeader: { display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', width: '100%', height: 70, },
    popupTitle: { fontSize: 20, fontWeight: 'bold', color: 'rgb(41, 96, 121)', },
    popupSubTitle: { color: 'rgb(41, 96, 121)', fontSize: 12, marginTop: 5, },
    closeBtn: { borderWidth: 1, borderRadius: 20, borderColor: 'rgb(41, 96, 121)', padding: 5 },
    close: { color: 'rgb(41, 96, 121)', },
    formItem: { width: '100%', marginBottom: 30, },
    formLabel: { fontSize: 12, color: 'rgb(41, 96, 121)', marginBottom: 10, },
    buttons: { width: '100%', height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, paddingHorizontal: 20 },
    trueBtn: { backgroundColor: 'rgb(41, 96, 121)', width: '48%', height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
    trueBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    falseBtn: { backgroundColor: '#fd6200', width: '48%', height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
    falseBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
})