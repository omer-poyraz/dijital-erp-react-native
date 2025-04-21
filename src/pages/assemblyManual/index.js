import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ActivityIndicator, View } from 'react-native';
import { useSelector } from 'react-redux';
import ProjectTable from './projectTable';
import { colors } from '../../utilities/colors';

const AssemblyManualPage = () => {
    const { status } = useSelector(state => state.assemblyManualGetAll);
    const isLoading = status === 'loading';

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

export default AssemblyManualPage;

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