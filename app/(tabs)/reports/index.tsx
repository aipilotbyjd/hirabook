import { Stack } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '~/hooks/useTheme';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

export default function Reports() {
  const { colors } = useTheme();

  const screenWidth = Dimensions.get('window').width;

  // Mock Data
  const barData = {
    labels: ['Week1', 'Week2', 'Week3', 'Week4'],
    datasets: [
      {
        data: [5000, 7000, 6000, 8000],
      },
    ],
  };

  const pieData = [
    {
      name: 'Polishing',
      population: 5000,
      color: '#f39c12',
      legendFontColor: colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Cutting',
      population: 3000,
      color: '#e74c3c',
      legendFontColor: colors.text,
      legendFontSize: 12,
    },
    {
      name: 'Sorting',
      population: 2000,
      color: '#2ecc71',
      legendFontColor: colors.text,
      legendFontSize: 12,
    },
  ];

  return (
    <>
      <Stack.Screen options={{ title: 'Reports' }} />
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Summary Section */}
        <View style={styles.summary}>
          <Text style={[styles.summaryText, { color: colors.text }]}>Total Hours Worked: 120 hours this month.</Text>
          <Text style={[styles.summaryText, { color: colors.text }]}>Total Earnings: ₹20,000 earned.</Text>
          <Text style={[styles.summaryText, { color: colors.text }]}>Total Payments Received: ₹18,000 received.</Text>
        </View>

        {/* Bar Chart */}
        <View style={styles.chartContainer}>
          <Text style={[styles.chartTitle, { color: colors.text }]}>Weekly Income Comparison</Text>
          <BarChart
            data={barData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig(colors.primary, colors.text)}
            verticalLabelRotation={30}
            style={styles.chartStyle}
          />
        </View>

        {/* Pie Chart */}
        <View style={styles.chartContainer}>
          <Text style={[styles.chartTitle, { color: colors.text }]}>Earnings by Work Type</Text>
          <PieChart
            data={pieData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig(colors.primary, colors.text)}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>

        {/* Top Trends */}
        <View style={styles.trends}>
          <Text style={[styles.trendsTitle, { color: colors.text }]}>Top Trends</Text>
          <Text style={[styles.trendItem, { color: colors.text }]}>
            Most profitable week: 6–12 Nov (₹5,000 earned).
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const chartConfig = (primaryColor, textColor) => ({
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => primaryColor,
  labelColor: (opacity = 1) => textColor,
  decimalPlaces: 0,
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
});

const styles = {
  container: 'flex-1 p-4',
  summary: 'mb-6',
  summaryText: 'text-base mb-2',
  chartContainer: 'mb-6',
  chartTitle: 'text-lg font-bold mb-2 text-center',
  chartStyle: 'border-radius-16',
  trends: 'mb-6',
  trendsTitle: 'text-lg font-bold mb-2',
  trendItem: 'text-sm',
};
