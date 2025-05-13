import { changeStatusLeftMenu } from '../redux/slices/leftMenuSlice';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, TouchableOpacity } from 'react-native';
import ProductDetailPage from '../pages/productDetail';
import ErrorBoundary from '../utilities/errorBoundary';
import CalculationPage from '../pages/calculation';
import CountSlipPage from '../pages/countSlip';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import LanguagePage from '../pages/language';
import ProductPage from '../pages/product';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import 'react-native-gesture-handler';
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import AssemblyManualPage from '../pages/assemblyManual';
import TechnicalDrawingPage from '../pages/technicalDrawing';
import { checkAuthState } from '../redux/slices/loginSlice';
import AssemblyManualDetailPage from '../pages/assemblyManual/assemblyManualModal';
import TechnicalDrawingDetailPage from '../pages/technicalDrawing/technicalDrawingModal';
import AssemblySuccessDetailPage from '../pages/assemblyManual/assemblySuccessModal';
import TechnicalDrawingSuccessDetailPage from '../pages/technicalDrawing/technicalDrawingSuccessModal';
import AssemblyFailureDetailPage from '../pages/assemblyManual/assemblyFailureModal';
import TechnicalDrawingFailureDetailPage from '../pages/technicalDrawing/technicalDrawingFailureModal';
import CMMDetailPage from '../pages/cmm/cmmModal';
import CMMSuccessDetailPage from '../pages/cmm/cmmSuccessModal';
import CMMFailureDetailPage from '../pages/cmm/cmmFailureModal';
import CMMPage from '../pages/cmm';

const Stack = createStackNavigator();

const AuthStack = () => {
    const { t } = useTranslation();

    return (
        <Stack.Navigator
            screenOptions={{
                gestureEnabled: false,
                headerShown: true,
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#00385b',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    elevation: 3,
                },
                headerTintColor: '#fff',
            }}
        >
            <Stack.Screen
                name="Login"
                component={LoginPage}
                options={{ headerShown: false, gestureEnabled: false, }}
            />
            <Stack.Screen
                name="Language"
                component={LanguagePage}
                options={{
                    title: t("language_sections"),
                    gestureEnabled: false,
                }}
            />
            <Stack.Screen
                name="AssemblyManualDetail"
                component={AssemblyManualDetailPage}
                options={{
                    gestureEnabled: false,
                }}
            />
            <Stack.Screen
                name="AssemblySuccessDetail"
                component={AssemblySuccessDetailPage}
                options={{
                    gestureEnabled: false,
                }}
            />
            <Stack.Screen
                name="AssemblyFailureDetail"
                component={AssemblyFailureDetailPage}
                options={{
                    gestureEnabled: false,
                }}
            />
            <Stack.Screen
                name="TechnicalDrawingDetail"
                component={TechnicalDrawingDetailPage}
                options={{
                    gestureEnabled: false,
                }}
            />
            <Stack.Screen
                name="TechnicalDrawingSuccessDetail"
                component={TechnicalDrawingSuccessDetailPage}
                options={{
                    gestureEnabled: false,
                }}
            />
            <Stack.Screen
                name="TechnicalDrawingFailureDetail"
                component={TechnicalDrawingFailureDetailPage}
                options={{
                    gestureEnabled: false,
                }}
            />
            <Stack.Screen
                name="CMMDetail"
                component={CMMDetailPage}
                options={{
                    gestureEnabled: false,
                }}
            />
            <Stack.Screen
                name="CMMSuccessDetail"
                component={CMMSuccessDetailPage}
                options={{
                    gestureEnabled: false,
                }}
            />
            <Stack.Screen
                name="CMMFailureDetail"
                component={CMMFailureDetailPage}
                options={{
                    gestureEnabled: false,
                }}
            />
        </Stack.Navigator>
    );
};

const AppStack = () => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const screens = useMemo(() => [
        { name: "Home", title: t("home_page"), component: HomePage },
        { name: "AssemblyManual", title: t("assembly_manual"), component: AssemblyManualPage },
        { name: "TechnicalDrawing", title: t("technical_drawing"), component: TechnicalDrawingPage },
        { name: "Calculation", title: t("calculation"), component: CalculationPage },
        { name: "CountSlip", title: t("count_slip"), component: CountSlipPage },
        { name: "Language", title: t("language_sections"), component: LanguagePage },
        { name: "Product", title: t("products"), component: ProductPage },
        { name: "ProductDetail", title: t("product_detail"), component: ProductDetailPage },
        { name: "AssemblyManualDetail", title: t("product_detail"), component: AssemblyManualDetailPage },
        { name: "AssemblySuccessDetail", title: t("product_detail"), component: AssemblySuccessDetailPage },
        { name: "AssemblyFailureDetail", title: t("product_detail"), component: AssemblyFailureDetailPage },
        { name: "TechnicalDrawingDetail", title: t("product_detail"), component: TechnicalDrawingDetailPage },
        { name: "TechnicalDrawingSuccessDetail", title: t("product_detail"), component: TechnicalDrawingSuccessDetailPage },
        { name: "TechnicalDrawingFailureDetail", title: t("product_detail"), component: TechnicalDrawingFailureDetailPage },
        { name: "CMM", title: t("cmm"), component: CMMPage },
        { name: "CMMDetail", title: t("cmm_detail"), component: CMMDetailPage },
        { name: "CMMSuccessDetail", title: t("cmm_detail"), component: CMMSuccessDetailPage },
        { name: "CMMFailureDetail", title: t("cmm_detail"), component: CMMFailureDetailPage },
    ], [t, i18n.language]);

    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: true,
                headerTitleAlign: 'left',
                gestureEnabled: true,
                animationEnabled: true,
                headerLeft: () => (
                    <TouchableOpacity
                        style={styles.headerLeft}
                        onPress={() => dispatch(changeStatusLeftMenu())}
                    >
                        <Ionicons name="menu" size={28} color="#fff" />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity style={styles.headerLeft}>
                        <Ionicons name="calculator" size={28} color="#fff" />
                    </TouchableOpacity>
                ),
                headerStyle: {
                    backgroundColor: '#00385b',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    elevation: 3,
                },
                headerLeftContainerStyle: { paddingBottom: 10, },
                headerRightContainerStyle: { paddingBottom: 10, },
                headerTitleContainerStyle: { paddingBottom: 10, },
                headerTintColor: '#fff',
                cardStyleInterpolator: ({ current }) => ({
                    cardStyle: {
                        opacity: current.progress,
                    }
                })
            }}
        >
            {screens.map(({ name, title, component }) => (
                <Stack.Screen
                    key={name}
                    name={name}
                    component={component}
                    options={{
                        title: title,
                        gestureEnabled: false,
                    }}
                />
            ))}
        </Stack.Navigator>
    );
};

const StackNavigator = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.login?.isLoggedIn);

    useEffect(() => {
        dispatch(checkAuthState());
    }, [dispatch]);

    return (
        <ErrorBoundary>
            {isLoggedIn ? <AppStack /> : <AuthStack />}
        </ErrorBoundary>
    );
};

export default StackNavigator;

const styles = StyleSheet.create({
    headerLeft: {
        marginLeft: 10,
        marginRight: 15,
    }
});