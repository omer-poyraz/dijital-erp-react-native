import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { changeStatusJobAndHold } from '../../redux/slices/jobAndHoldSlice'
import { Ionicons } from '@expo/vector-icons'
import SelectBox from '../form/selectBox'
import { useTranslation } from 'react-i18next'

const JobAndHold = () => {
    const dispatch = useDispatch()
    const isShow = useSelector(state => state.jobAndHold.isOpen)
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState(null);
    const [open3, setOpen3] = useState(false);
    const [value3, setValue3] = useState(null);
    const [items, setItems] = useState([
        { label: 'Merkez İşyeri', value: '1' },
        { label: 'Şube 1', value: '2' },
        { label: 'Şube 2', value: '3' },
        { label: 'Şube 3', value: '4' }
    ]);
    const { t } = useTranslation()

    const { width } = useWindowDimensions();

    const isTablet = width >= 600;

    const popupWidth = isTablet ? '45%' : '80%';

    useEffect(() => {
        if (open) {
            setOpen2(false);
            setOpen3(false);
        }
    }, [open]);

    useEffect(() => {
        if (open2) {
            setOpen(false);
            setOpen3(false);
        }
    }, [open2]);

    useEffect(() => {
        if (open3) {
            setOpen(false);
            setOpen2(false);
        }
    }, [open3]);

    return (
        <View style={[style.page, isShow ? { display: 'flex' } : { display: 'none' }]}>
            <View style={[style.popup, { width: popupWidth }]}>
                <View style={style.popupHeader}>
                    <View>
                        <Text style={style.popupTitle}>{t("job_holder_info")}</Text>
                        <Text style={style.popupSubTitle}>{t("job_holder_info_desc")}</Text>
                    </View>
                    <TouchableOpacity style={style.closeBtn} onPress={() => dispatch(changeStatusJobAndHold())}>
                        <Ionicons name='close' size={20} style={style.close} />
                    </TouchableOpacity>
                </View>
                <View style={style.content}>
                    <SelectBox
                        style={style}
                        icon='business-outline'
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        label={t("select_company")}
                        zIndex={3000}
                    />
                    <SelectBox
                        style={style}
                        icon='business-outline'
                        open={open2}
                        value={value2}
                        items={items}
                        setOpen={setOpen2}
                        setValue={setValue2}
                        setItems={setItems}
                        label={t("select_factory")}
                        zIndex={2000}
                    />
                    <SelectBox
                        style={style}
                        icon='business-outline'
                        open={open3}
                        value={value3}
                        items={items}
                        setOpen={setOpen3}
                        setValue={setValue3}
                        setItems={setItems}
                        label={t("select_holder")}
                        zIndex={1000}
                    />
                    <View style={style.buttons}>
                        <TouchableOpacity style={style.falseBtn} onPress={() => dispatch(changeStatusJobAndHold())}>
                            <Text style={style.falseBtnText}>{t("close")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.trueBtn}>
                            <Text style={style.trueBtnText}>{t("select")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default JobAndHold

const style = StyleSheet.create({
    page: { backgroundColor: 'rgba(21, 86, 117, 0.4)', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 999, },
    popup: { height: 400, padding: 20, backgroundColor: 'rgb(240, 240, 240)', borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, },
    popupHeader: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center', },
    popupTitle: { fontSize: 16, fontWeight: 'bold', color: 'rgb(41, 96, 121)', },
    popupSubTitle: { color: 'rgb(41, 96, 121)', fontSize: 12, marginTop: 5, },
    closeBtn: { borderWidth: 1, borderRadius: 20, borderColor: 'rgb(41, 96, 121)', padding: 5 },
    close: { color: 'rgb(41, 96, 121)', },
    content: { width: '100%', height: '80%', marginTop: 10, position: 'relative' },
    selectBox: { width: '100%', position: 'relative' },
    inputLabel: { color: 'rgb(41, 96, 121)', fontSize: 12, marginBottom: 5, },
    selectContainer: { position: 'relative', marginBottom: 10, height: 50, },
    inputIcon: { position: 'absolute', top: 15, left: 8, zIndex: 1001 },
    dropdown: { borderColor: 'rgb(41, 96, 121)', borderRadius: 10, paddingLeft: 35, backgroundColor: 'transparent', height: 50 },
    dropdownText: { fontSize: 14, color: 'rgb(41, 96, 121)' },
    dropdownContainer: { borderColor: 'rgb(41, 96, 121)', backgroundColor: '#FFFFFF' },
    buttons: { width: '100%', height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', bottom: 0, left: 0, paddingHorizontal: 20 },
    trueBtn: { backgroundColor: 'rgb(41, 96, 121)', width: '48%', height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
    trueBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    falseBtn: { backgroundColor: '#fd6200', width: '48%', height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
    falseBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
})