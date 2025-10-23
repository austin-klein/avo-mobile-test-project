import { ThemedText } from '@/components/themed-text';
import { PerformanceData } from '@/types/types';
import React, { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Defs, Line, LinearGradient, Path, Stop, Text as SvgText } from 'react-native-svg';

type TimePeriod = '24h' | '7d' | '1M' | '3M' | '1Y' | 'Max';

const PERIODS: TimePeriod[] = ['24h', '7d', '1M', '3M', '1Y', 'Max'];

interface PerformanceGraphProps {
  data?: PerformanceData;
  protectionLevel?: string;
}

export const PerformanceGraph: React.FC<PerformanceGraphProps> = ({ data, protectionLevel }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('7d');

  if (!data) {
    return (
      <View style={styles.container}>
        <ThemedText style={styles.noDataText}>No performance data available</ThemedText>
      </View>
    );
  }

  const performanceData = data[selectedPeriod];
  const values = performanceData.map((p) => p.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue;

  // Chart dimensions
  const width = Dimensions.get('window').width - 32;
  const height = 240;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Generate path for the line chart
  const generatePath = () => {
    if (values.length === 0) return '';

    let pathData = '';

    values.forEach((value, index) => {
      const x = (index / (values.length - 1)) * chartWidth + padding.left;
      const y = height - padding.bottom - ((value - minValue) / range) * chartHeight;

      if (index === 0) {
        pathData += `M ${x} ${y}`;
      } else {
        pathData += ` L ${x} ${y}`;
      }
    });

    return pathData;
  };

  // Generate path for the gradient fill
  const generateFillPath = () => {
    if (values.length === 0) return '';

    let pathData = '';

    values.forEach((value, index) => {
      const x = (index / (values.length - 1)) * chartWidth + padding.left;
      const y = height - padding.bottom - ((value - minValue) / range) * chartHeight;

      if (index === 0) {
        pathData += `M ${x} ${y}`;
      } else {
        pathData += ` L ${x} ${y}`;
      }
    });

    // Close the path for fill
    pathData += ` L ${padding.left + chartWidth} ${height - padding.bottom}`;
    pathData += ` L ${padding.left} ${height - padding.bottom}`;
    pathData += ' Z';

    return pathData;
  };

  // Generate Y-axis labels
  const yAxisLabels = 5;
  const yAxisLines = [];
  for (let i = 0; i <= yAxisLabels; i++) {
    const value = minValue + (range / yAxisLabels) * i;
    const y = height - padding.bottom - (i / yAxisLabels) * chartHeight;

    yAxisLines.push(
      <SvgText key={`y-label-${i}`} x={40} y={y + 4} fontSize='11' fill='#666' textAnchor='end'>
        {value.toFixed(1)}%
      </SvgText>
    );

    // Grid lines
    if (i > 0) {
      yAxisLines.push(
        <Line
          key={`grid-${i}`}
          x1={padding.left}
          y1={y}
          x2={width - padding.right}
          y2={y}
          stroke='rgba(255, 255, 255, 0.05)'
          strokeWidth='1'
          strokeDasharray='4,4'
        />
      );
    }
  }

  // Get X-axis labels (every nth point to avoid crowding)
  const labelFrequency = Math.ceil(values.length / 4);
  const xAxisLabels = [];
  for (let i = 0; i < values.length; i += labelFrequency) {
    const x = (i / (values.length - 1)) * chartWidth + padding.left;
    xAxisLabels.push(
      <SvgText
        key={`x-label-${i}`}
        x={x}
        y={height - padding.bottom + 20}
        fontSize='11'
        fill='#666'
        textAnchor='middle'>
        {performanceData[i].timestamp}
      </SvgText>
    );
  }

  const currentValue = data.currentValue.toFixed(2);
  const previousValue = values[0];
  const change = ((data.currentValue - previousValue) / previousValue) * 100;
  const isPositive = change >= 0;

  return (
    <View style={styles.container}>
      {/* Current Value Display */}
      <View style={styles.headerContainer}>
        <View>
          <ThemedText style={styles.valueLabel}>Current Performance</ThemedText>
          <View style={styles.currentValueContainer}>
            <ThemedText style={styles.currentValue}>{currentValue}%</ThemedText>
            <ThemedText style={[styles.changeValue, { color: isPositive ? '#00D084' : '#FF5757' }]}>
              {isPositive ? '+' : ''}
              {change.toFixed(2)}%
            </ThemedText>
          </View>
        </View>
      </View>

      {/* Chart */}
      <View style={styles.chartContainer}>
        <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <Defs>
            <LinearGradient id='chartGradient' x1='0%' y1='0%' x2='0%' y2='100%'>
              <Stop offset='0%' stopColor={isPositive ? '#00D084' : '#FF5757'} stopOpacity='0.3' />
              <Stop
                offset='100%'
                stopColor={isPositive ? '#00D084' : '#FF5757'}
                stopOpacity='0.02'
              />
            </LinearGradient>
          </Defs>

          {/* Y-Axis */}
          <Line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={height - padding.bottom}
            stroke='rgba(255, 255, 255, 0.1)'
            strokeWidth='1'
          />

          {/* X-Axis */}
          <Line
            x1={padding.left}
            y1={height - padding.bottom}
            x2={width - padding.right}
            y2={height - padding.bottom}
            stroke='rgba(255, 255, 255, 0.1)'
            strokeWidth='1'
          />

          {/* Grid and Labels */}
          {yAxisLines}
          {xAxisLabels}

          {/* Gradient Fill */}
          <Path d={generateFillPath()} fill='url(#chartGradient)' />

          {/* Line Chart */}
          <Path
            d={generatePath()}
            fill='none'
            stroke={isPositive ? '#00D084' : '#FF5757'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </Svg>
      </View>

      {/* Data Source */}
      <View style={styles.sourceContainer}>
        <ThemedText style={styles.sourceLabel}>
          Protection Level:{' '}
          <ThemedText style={styles.sourceBold}>{protectionLevel || 'Degen'}</ThemedText>
        </ThemedText>
        <ThemedText style={styles.dataSource}>Data source: {data.dataSource}</ThemedText>
      </View>

      {/* Period Selector */}
      <View style={styles.periodContainer}>
        {PERIODS.map((period) => (
          <Pressable
            key={period}
            style={[styles.periodButton, selectedPeriod === period && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod(period)}>
            <ThemedText
              style={[
                styles.periodButtonText,
                selectedPeriod === period && styles.periodButtonTextActive,
              ]}>
              {period}
            </ThemedText>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 16,
    padding: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  headerContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  valueLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  currentValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  currentValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    paddingTop: 12,
  },
  changeValue: {
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 4,
  },
  chartContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  sourceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 16,
  },
  sourceLabel: {
    fontSize: 12,
    color: '#888',
  },
  sourceBold: {
    color: '#4D7CFF',
    fontWeight: '600',
  },
  dataSource: {
    fontSize: 11,
    color: '#666',
  },
  periodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 12,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
  },
  periodButtonActive: {
    borderColor: '#4D7CFF',
    backgroundColor: 'rgba(77, 124, 255, 0.1)',
  },
  periodButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  periodButtonTextActive: {
    color: '#fff',
  },
  noDataText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    paddingVertical: 32,
  },
});
