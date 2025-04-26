import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ActivityIndicator, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProjectTable from './projectTable';
import { colors } from '../../utilities/colors';
import { fetchTechnicalDrawingGetAll } from '../../redux/slices/technicalDrawingGetAllSlice';

const TechnicalDrawingPage = () => {
    const { status } = useSelector(state => state.technicalDrawingGetAll);
    const isLoading = status === 'loading';
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTechnicalDrawingGetAll());
    }, [dispatch])

    return (
        <SafeAreaView style={styles.page}>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <ScrollView>
                    <ProjectTable />
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default TechnicalDrawingPage;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});