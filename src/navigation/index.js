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
import { useDispatch } from 'react-redux';
import React, { useMemo } from 'react';
import 'react-native-gesture-handler';
import HomePage from '../pages/home';
import AssemblyManualPage from '../pages/assemblyManual';

const Stack = createStackNavigator();

const StackNavigator = () => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const screens = useMemo(() => [
        { name: "AssemblyManual", title: t("assembly_manual"), component: AssemblyManualPage },
        { name: "Calculation", title: t("calculation"), component: CalculationPage },
        { name: "CountSlip", title: t("count_slip"), component: CountSlipPage },
        { name: "Home", title: t("home_page"), component: HomePage },
        { name: "Language", title: t("language_sections"), component: LanguagePage },
        { name: "Product", title: t("products"), component: ProductPage },
        { name: "ProductDetail", title: t("product_detail"), component: ProductDetailPage },
    ], [t, i18n.language]);

    return (
        <ErrorBoundary>
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
                        }}
                    />
                ))}
            </Stack.Navigator>
        </ErrorBoundary>
    );
};

export default StackNavigator;

const styles = StyleSheet.create({
    headerLeft: {
        marginLeft: 10,
        marginRight: 10,
    }
})