interface Position {
  symbol: string;
  percentage: number;
  change24h?: string;
  change7d?: string;
}

export interface PerformanceDataPoint {
  timestamp: string;
  value: number;
}

export interface PerformanceData {
  '24h': PerformanceDataPoint[];
  '7d': PerformanceDataPoint[];
  '1M': PerformanceDataPoint[];
  '3M': PerformanceDataPoint[];
  '1Y': PerformanceDataPoint[];
  Max: PerformanceDataPoint[];
  currentValue: number;
  dataSource: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  topPositions: Position[];
  change24h: string;
  change7d: string;
  protectionLevel: ('Degen' | 'Moderate' | 'Guarded')[];
  performance?: PerformanceData;
}
