export const barData = {
    labels: ['Ç1', 'Ç2', 'Ç3', 'Ç4'],
    datasets: [{
        data: [13000, 16500, 14250, 19000],
    }],
};

export const lineData = {
    labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz'],
    datasets: [{
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(253, 98, 0, ${opacity})`,
        strokeWidth: 2
    }],
};

export const pieData = [
    {
        name: "Mağaza A",
        population: 35,
        color: "#00385b",
        legendFontColor: "#7F7F7F",
        legendFontSize: 14
    },
    {
        name: "Mağaza B",
        population: 40,
        color: "#fd6200",
        legendFontColor: "#7F7F7F",
        legendFontSize: 14
    },
    {
        name: "Mağaza C",
        population: 25,
        color: "#2196F3",
        legendFontColor: "#7F7F7F",
        legendFontSize: 14
    }
];

export const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 56, 91, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.7,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
        borderRadius: 16
    },
    propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
    }
};