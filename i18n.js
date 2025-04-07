import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";
import AsyncStorage from '@react-native-async-storage/async-storage';

const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: async (callback) => {
        try {
            const storedLang = await AsyncStorage.getItem("lang");
            if (storedLang) {
                return callback(storedLang.toLowerCase());
            }

            const locales = RNLocalize.getLocales();
            const deviceLang = locales.length > 0 ? locales[0].languageCode : 'tr';
            return callback(deviceLang);
        } catch (error) {
            callback('tr');
        }
    },
    init: () => { },
    cacheUserLanguage: (lng) => {
        AsyncStorage.setItem("lang", lng.toUpperCase());
    },
};

i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: require("./src/locale/en.json") },
            tr: { translation: require("./src/locale/tr.json") },
        },
        fallbackLng: "tr",
        interpolation: {
            escapeValue: false,
        },
        compatibilityJSON: 'v3',
    });

export default i18n;