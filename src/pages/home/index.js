import React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { barData, chartConfig, lineData, pieData } from '../../utilities/chartData';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');
const chartWidth = width - 80;

const HomePage = () => {
    const { t } = useTranslation();

    return (
        <ScrollView style={style.page}>
            <View style={style.chartContainer}>
                <Text style={style.chartTitle}>{t("quarterly_earnings")}</Text>
                <BarChart
                    style={style.chart}
                    data={barData}
                    width={chartWidth}
                    height={220}
                    chartConfig={chartConfig}
                    verticalLabelRotation={0}
                    fromZero={true}
                    showValuesOnTopOfBars={true}
                    yAxisLabel="₺"
                    yAxisSuffix="K"
                />
            </View>

            <View style={style.chartContainer}>
                <Text style={style.chartTitle}>{t("monthly_sales_trend")}</Text>
                <LineChart
                    style={style.chart}
                    data={lineData}
                    width={chartWidth}
                    height={220}
                    chartConfig={chartConfig}
                    bezier
                />
            </View>

            <View style={style.chartContainer}>
                <Text style={style.chartTitle}>{t("sales_distribution")}</Text>
                <PieChart
                    style={style.chart}
                    data={pieData}
                    width={chartWidth}
                    height={220}
                    chartConfig={chartConfig}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"0"}
                    center={[10, 0]}
                    absolute
                />
            </View>
        </ScrollView>
    );
};

export default HomePage;

const style = StyleSheet.create({
    page: { flex: 1, backgroundColor: '#f5f5f5', padding: 10, },
    chartContainer: { backgroundColor: 'white', margin: 10, padding: 10, borderRadius: 10, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, },
    chartTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10, color: '#333', textAlign: 'center' },
    chart: { marginVertical: 8, borderRadius: 10 }
});