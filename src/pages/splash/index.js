import React, { useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import ErrorBoundary from '../utilities/errorBoundary';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();

const StackNavigator = () => {
    const screens = useMemo(() => [
        { name: "Home", title: "Ana Sayfa", component: HomePage },
    ], []);

    return (
        <ErrorBoundary>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={({ navigation }) => ({
                    headerShown: true,
                    headerTitleAlign: 'left',
                    gestureEnabled: true,
                    animationEnabled: true,
                    headerLeft: () => (
                        <TouchableOpacity 
                            style={styles.headerLeft}
                            onPress={() => navigation.openDrawer()}
                        >
                            <Ionicons name="menu" size={28} color="#fff" />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity style={styles.headerLeft}>
                            <Ionicons name="calculator" size={26} color="#fff" />
                        </TouchableOpacity>
                    ),
                    headerStyle: {
                        backgroundColor: '#2196F3',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 3,
                        elevation: 3,
                    },
                    headerTintColor: '#fff',
                    cardStyleInterpolator: ({ current }) => ({
                        cardStyle: {
                            opacity: current.progress,
                        }
                    })
                })}
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