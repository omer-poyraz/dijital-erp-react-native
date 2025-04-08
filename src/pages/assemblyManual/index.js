import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import ProjectTable from './projectTable';

const AssemblyManualPage = () => {
    return (
        <SafeAreaView style={styles.page}>
            <ScrollView>
                <ProjectTable />
            </ScrollView>
        </SafeAreaView>
    );
};

export default AssemblyManualPage;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
});