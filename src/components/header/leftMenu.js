import React from 'react'
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { changeStatusLeftMenu, closeLeftMenu } from '../../redux/slices/leftMenuSlice'
import { closeJobAndHold, openJobAndHold } from '../../redux/slices/jobAndHoldSlice'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Ionicons } from '@expo/vector-icons'
import logo from '../../images/logo2.png'

const LeftMenu = () => {
    const dispatch = useDispatch()
    const navigate = useNavigation()
    const isShow = useSelector(state => state.leftMenu.isOpen)
    const { t } = useTranslation()

    const { width } = useWindowDimensions();

    const isTablet = width >= 600;

    const leftMenuWidth = isTablet ? '45%' : '80%';

    const LeftMenuItem = ({ icon, text, funct }) => {
        return (
            <TouchableOpacity style={style.leftMenuItem} onPress={funct}>
                <Ionicons name={icon} size={20} style={style.leftMenuItemIcon} />
                <Text style={style.leftMenuItemText}>{text}</Text>
            </TouchableOpacity>
        )
    }

    const closeModal = () => {
        dispatch(closeLeftMenu())
        dispatch(closeJobAndHold())
    }

    const holderModal = async () => {
        await dispatch(closeLeftMenu())
        await dispatch(openJobAndHold())
    }

    return (
        <View style={[style.leftMenu, isShow ? { display: 'flex' } : { display: 'none' }]}>
            <View style={[style.left, { width: leftMenuWidth }]}>
                <View style={style.leftTop}>
                    <Image source={logo} style={style.logo} />
                    <TouchableOpacity style={style.closeBtn} onPress={() => dispatch(changeStatusLeftMenu())}>
                        <Ionicons name='close' size={28} style={style.close} />
                    </TouchableOpacity>
                </View>
                <ScrollView style={style.leftMenus}>
                    <Text style={style.leftMenuLabel}>{t("products")}</Text>
                    <LeftMenuItem icon='home-outline' text={t("home_page")} funct={() => { navigate.navigate("Home"); closeModal() }} />
                    <LeftMenuItem icon='calculator-outline' text={t("calculation")} funct={() => { navigate.navigate("Calculation"); closeModal() }} />
                    <LeftMenuItem icon='barcode-outline' text={t("count_slip_crop")} funct={() => { navigate.navigate("CountSlip"); closeModal() }} />
                    <LeftMenuItem icon='grid-outline' text={t("products")} funct={() => { navigate.navigate("Product"); closeModal() }} />
                    <LeftMenuItem icon='egg-outline' text={t("job_holder_info")} funct={holderModal} />
                    <LeftMenuItem icon='construct-outline' text={t("assembly_manual")} funct={() => { navigate.navigate("AssemblyManual"); closeModal() }} />

                    <View style={style.space30}></View>
                    <Text style={style.leftMenuLabel}>{t("products2")}</Text>
                    <LeftMenuItem icon='grid-outline' text={`${t("product")} A`} funct={() => { navigate.navigate("ProductDetail"); closeModal() }} />
                    <LeftMenuItem icon='grid-outline' text={`${t("product")} B`} funct={() => { navigate.navigate("ProductDetail"); closeModal() }} />
                    <LeftMenuItem icon='grid-outline' text={`${t("product")} C`} funct={() => { navigate.navigate("ProductDetail"); closeModal() }} />
                    <LeftMenuItem icon='grid-outline' text={`${t("product")} D`} funct={() => { navigate.navigate("ProductDetail"); closeModal() }} />
                    <LeftMenuItem icon='grid-outline' text={`${t("product")} E`} funct={() => { navigate.navigate("ProductDetail"); closeModal() }} />

                    <View style={style.space30}></View>
                    <Text style={style.leftMenuLabel}>{t("settings2")}</Text>

                    <LeftMenuItem icon='person-outline' text={t("my_account")} />
                    <LeftMenuItem icon='language-outline' text={t("language_sections")} funct={() => { navigate.navigate("Language"); closeModal() }} />
                    <LeftMenuItem icon='log-out-outline' text={t("logout")} />
                </ScrollView>
            </View>

            <TouchableOpacity style={style.space} onPress={() => dispatch(changeStatusLeftMenu())}></TouchableOpacity>
        </View>
    )
}

export default LeftMenu

const style = StyleSheet.create({
    space30: { width: '100%', height: 30 },
    leftMenu: { width: '100%', height: '100%', backgroundColor: 'rgba(21, 86, 117, 0.4)', position: 'absolute', top: Platform.OS === "ios" ? 163 : 64, left: 0, zIndex: 1, },
    left: { backgroundColor: 'rgb(240, 240, 240)', paddingHorizontal: 20, height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 2, borderTopRightRadius: 20, borderBottomRightRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, },
    leftTop: { display: 'flex', paddingTop: 20, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', width: '100%', height: 70, },
    leftMenus: { marginTop: 20, marginBottom: 100 },
    leftMenuLabel: { fontSize: 12, color: 'rgb(41, 96, 121)', fontWeight: 'bold', marginBottom: 10 },
    leftMenuItem: { display: 'flex', paddingVertical: 10, flexDirection: 'row', alignItems: 'center' },
    leftMenuItemIcon: { color: 'rgb(41, 96, 121)', marginLeft: 10 },
    leftMenuItemText: { fontSize: 16, marginLeft: 10, color: 'rgb(41, 96, 121)' },
    space: { width: '20%', height: '100%', position: 'absolute', top: 0, left: '80%', zIndex: 2, },
    logo: { width: 200, objectFit: 'contain', tintColor: 'rgb(41, 96, 121)' },
    closeBtn: { borderWidth: 1, borderRadius: '50%', borderColor: 'rgb(41, 96, 121)', padding: 5 },
    close: { color: '#rgb(41, 96, 121)', },
})