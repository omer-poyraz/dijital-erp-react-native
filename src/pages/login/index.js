import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Dimensions, TextInput, Alert, Animated } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../components/form/input'
import { colors } from '../../utilities/colors'
import { loginData, resetLoginSuccess } from '../../redux/slices/loginSlice'

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const fadeAnim = useRef(new Animated.Value(0)).current
    const scaleAnim = useRef(new Animated.Value(0)).current

    const dispatch = useDispatch()
    const navigation = useNavigation()
    const { t } = useTranslation()
    const { width } = Dimensions.get('window')
    const isTablet = width >= 600

    const { status, error, isLoggedIn, loginSuccess } = useSelector(state => state.login)
    const loading = status === 'loading'

    useEffect(() => {
        if (status === 'failed' && error) {
            Alert.alert(t('error'), error);
        }
    }, [status, error, t]);

    useEffect(() => {
        if (isLoggedIn && loginSuccess) {
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 400,
                        useNativeDriver: true,
                    }),
                    Animated.spring(scaleAnim, {
                        toValue: 1,
                        friction: 4,
                        useNativeDriver: true,
                    })
                ]),
                Animated.delay(800),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                })
            ]).start(() => {
                dispatch(resetLoginSuccess());
                navigation.navigate('Home');
            });
        } else {
            fadeAnim.setValue(0);
            scaleAnim.setValue(0);
        }
    }, [loginSuccess, isLoggedIn, navigation, fadeAnim, scaleAnim, dispatch]);

    const handleLogin = () => {
        if (!username || !password) {
            Alert.alert(t('error'), 'Kullanıcı adı ve şifre gereklidir.');
            return;
        }

        const data = { userName: username, password: password };

        dispatch(loginData({ data: data }));
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={[styles.loginCard, isTablet && styles.tabletCard]}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../images/product.jpg')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Text style={styles.appTitle}>Dijital ERP</Text>
                        <Text style={styles.appSubtitle}>{t('welcome_back')}</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Input
                                placeholder={t('username')}
                                value={username}
                                onChangeText={setUsername}
                                icon="mail-outline"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <View style={styles.searchInputContainer}>
                                <Ionicons
                                    name="lock-closed-outline"
                                    size={20}
                                    style={styles.searchIcon}
                                />
                                <TextInput
                                    placeholder={t('password')}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                    style={styles.searchInput}
                                    placeholderTextColor="#666"
                                />
                                <TouchableOpacity
                                    onPress={() => setShowPassword(!showPassword)}
                                    style={styles.eyeIcon}
                                >
                                    <Ionicons
                                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                        size={20}
                                        color={colors.primary}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.optionsRow}>
                            <TouchableOpacity
                                style={styles.checkboxContainer}
                                onPress={() => setRememberMe(!rememberMe)}
                            >
                                <View style={[
                                    styles.checkbox,
                                    rememberMe && styles.checkboxChecked
                                ]}>
                                    {rememberMe && (
                                        <Ionicons name="checkmark" size={16} color="#fff" />
                                    )}
                                </View>
                                <Text style={styles.checkboxLabel}>{t('remember_me')}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Text style={styles.forgotPassword}>{t('forgot_password')}</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                            onPress={handleLogin}
                            disabled={loading}
                        >
                            {loading ? (
                                <View style={styles.loadingContainer}>
                                    <Ionicons name="sync" size={24} color="#fff" style={styles.spinner} />
                                    <Text style={styles.loginButtonText}>{t('loading')}</Text>
                                </View>
                            ) : (
                                <Text style={styles.loginButtonText}>{t('login')}</Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.footerContainer}>
                            <TouchableOpacity
                                style={styles.languageButton}
                                onPress={() => navigation.navigate('Language')}
                            >
                                <Ionicons name="language-outline" size={20} color={colors.primary} />
                                <Text style={styles.languageText}>{t('change_language')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <Animated.View
                style={[
                    styles.successOverlay,
                    { opacity: fadeAnim }
                ]}
                pointerEvents="none"
            >
                <Animated.View
                    style={[
                        styles.successIconContainer,
                        { transform: [{ scale: scaleAnim }] }
                    ]}
                >
                    <Ionicons name="checkmark-circle" size={80} color="#fff" />
                    <Text style={styles.successText}>{t('login_successful')}</Text>
                </Animated.View>
            </Animated.View>
        </KeyboardAvoidingView>
    )
}

export default LoginPage

const styles = StyleSheet.create({
    // Mevcut stilleriniz
    container: { flex: 1, backgroundColor: '#f5f5f5', },
    scrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20, },
    loginCard: { width: '100%', maxWidth: 420, backgroundColor: 'white', borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5, overflow: 'hidden', },
    tabletCard: { maxWidth: 480, },
    logoContainer: { alignItems: 'center', paddingVertical: 30, backgroundColor: 'rgba(41, 96, 121, 0.05)', borderBottomWidth: 1, borderBottomColor: 'rgba(41, 96, 121, 0.1)', },
    logo: { width: 80, height: 80, objectFit: 'cover', borderRadius: 40, },
    appTitle: { fontSize: 24, fontWeight: 'bold', color: colors.primary, marginTop: 16, },
    appSubtitle: { width: '70%', fontSize: 16, textAlign: 'center', color: '#666', marginTop: 8, },
    formContainer: { padding: 24, },
    inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, backgroundColor: '#fff', paddingHorizontal: 12, },
    inputIcon: { marginRight: 10, },
    input: { flex: 1, height: 50, color: '#333', fontSize: 16, },
    rightIcon: { padding: 8, },
    inputContainer: { marginBottom: 20, },
    searchInputContainer: { flex: 1, position: 'relative', },
    searchIcon: { zIndex: 3, position: 'absolute', left: 12, top: 12, color: 'rgb(41, 96, 121)', },
    searchInput: { height: 44, borderWidth: 1, borderColor: 'rgb(41, 96, 121)', borderRadius: 8, paddingLeft: 40, paddingRight: 40, fontSize: 15, backgroundColor: '#fff', },
    eyeIcon: { position: 'absolute', right: 12, top: 12, zIndex: 3, },
    optionsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, },
    checkboxContainer: { flexDirection: 'row', alignItems: 'center', },
    checkbox: { width: 22, height: 22, borderRadius: 4, borderWidth: 2, borderColor: colors.primary, marginRight: 8, justifyContent: 'center', alignItems: 'center', },
    checkboxChecked: { backgroundColor: colors.primary, },
    checkboxLabel: { color: '#555', fontSize: 14, },
    forgotPassword: { color: colors.primary, fontSize: 14, fontWeight: '500', },
    loginButton: { backgroundColor: colors.primary, height: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 20, },
    loginButtonDisabled: { opacity: 0.7, },
    loginButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold', },
    loadingContainer: { flexDirection: 'row', alignItems: 'center', },
    spinner: { marginRight: 10, transform: [{ rotate: '0deg' }], animationName: 'spin', animationDuration: '1s', animationIterationCount: 'infinite', animationTimingFunction: 'linear', },
    footerContainer: { alignItems: 'center', paddingTop: 10, },
    languageButton: { flexDirection: 'row', alignItems: 'center', padding: 10, },
    languageText: { color: colors.primary, marginLeft: 8, fontSize: 14, },
    successOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 56, 91, 0.9)', justifyContent: 'center', alignItems: 'center', zIndex: 1000, },
    successIconContainer: { alignItems: 'center', justifyContent: 'center', },
    successText: { color: 'white', fontSize: 18, fontWeight: 'bold', marginTop: 16, },
});