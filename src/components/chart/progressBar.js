import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ progress, totalDays, remainingDays }) => {
    const clampedProgress = Math.min(Math.max(progress, 0), 100);
    const { t } = useTranslation()
    let barColor;
    let textColor;

    if (remainingDays < 0) {
        barColor = '#d32f2f';
        textColor = '#d32f2f';
    } else if (clampedProgress >= 90) {
        barColor = '#f57c00';
        textColor = '#f57c00';
    } else if (clampedProgress >= 70) {
        barColor = '#ffc107';
        textColor = '#ffc107';
    } else {
        barColor = '#4caf50';
        textColor = '#4caf50';
    }

    return (
        <View style={styles.container}>
            <View style={styles.progressInfo}>
                <Text style={[styles.daysText, { color: textColor }]}>
                    {remainingDays < 0
                        ? `${Math.abs(remainingDays)} ${t("day_delay")}`
                        : `${remainingDays} ${t("day_left")}`}
                </Text>
                <Text style={styles.percentageText}>
                    {`${Math.round(clampedProgress)}%`}
                </Text>
            </View>
            <View style={styles.progressBarContainer}>
                <View
                    style={[
                        styles.progressBar,
                        { width: `${clampedProgress}%`, backgroundColor: barColor }
                    ]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { width: '100%', paddingHorizontal: 2, },
    progressInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2, },
    daysText: { fontSize: 10, fontWeight: '600', },
    percentageText: { fontSize: 10, color: '#555', },
    progressBarContainer: { height: 8, backgroundColor: '#e0e0e0', borderRadius: 4, overflow: 'hidden', },
    progressBar: { height: '100%', }
});

export default ProgressBar;