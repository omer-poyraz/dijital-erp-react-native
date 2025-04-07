import React, { useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { changeLangs } from '../../redux/slices/langSlice'
import { Ionicons } from '@expo/vector-icons'

const LanguagePage = () => {
    const dispatch = useDispatch();
    const currentLang = useSelector(state => state.lang.lang);
    const { t, i18n } = useTranslation();

    const languages = [
        {
            code: 'TR',
            name: 'Türkçe',
            flag: require('../../images/tr.png'),
            description: 'Ana dilinizde uygulamamızı kullanın'
        },
        {
            code: 'EN',
            name: 'English',
            flag: require('../../images/en.png'),
            description: 'Use our application in English'
        }
    ];

    const handleLanguageChange = async (langCode) => {
        try {
            await dispatch(changeLangs(langCode)).unwrap();
            await i18n.changeLanguage(langCode.toLowerCase());

            Alert.alert(
                t('languageChanged'),
                t('languageChangedDescription'),
                [{ text: t('ok') }]
            );
        } catch (error) {
            console.error('Dil değiştirme hatası:', error);
            Alert.alert(t('error'), t('languageChangeError'));
        }
    };

    useEffect(() => {
        if (currentLang) {
            i18n.changeLanguage(currentLang.toLowerCase());
        }
    }, [currentLang]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{t('languageSettings')}</Text>
            </View>

            <View style={styles.languageList}>
                {languages.map((lang) => (
                    <TouchableOpacity
                        key={lang.code}
                        style={[
                            styles.languageOption,
                            currentLang === lang.code && styles.selectedLanguage
                        ]}
                        onPress={() => handleLanguageChange(lang.code)}
                    >
                        <Image source={lang.flag} style={styles.flag} />
                        <View style={styles.languageInfo}>
                            <Text style={styles.languageName}>{lang.name}</Text>
                            <Text style={styles.languageDescription}>{lang.description}</Text>
                        </View>
                        {currentLang === lang.code && (
                            <Ionicons name="checkmark-circle" size={24} color="#00385b" style={styles.checkIcon} />
                        )}
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.infoBox}>
                <Ionicons name="information-circle-outline" size={24} color="#666" />
                <Text style={styles.infoText}>{t('languageChangeInfo')}</Text>
            </View>
        </View>
    );
};

export default LanguagePage;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
    header: { marginBottom: 30 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#00385b', marginBottom: 8 },
    subtitle: { fontSize: 16, color: '#666' },
    languageList: { marginBottom: 30 },
    languageOption: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 2 },
    selectedLanguage: { borderWidth: 2, borderColor: '#00385b', },
    flag: { width: 40, height: 40, borderRadius: 20, marginRight: 16 },
    languageInfo: { flex: 1 },
    languageName: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 4 },
    languageDescription: { color: '#666' },
    checkIcon: { marginLeft: 10 },
    infoBox: { backgroundColor: '#e8f4f8', borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'center' },
    infoText: { fontSize: 14, color: '#666', marginLeft: 10, flex: 1 }
});