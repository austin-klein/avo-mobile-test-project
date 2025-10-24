interface Position {
  symbol: string;
  percentage: number;
  change24h?: string;
  change7d?: string;
}

export interface CurrentToken {
  symbol: string;
  address: string;
  allocation: number;
  riskLevel: 'Low Risk' | 'Medium Risk' | 'High Risk';
  price?: number;
  liquidity?: number;
  marketCap?: number;
  volume24h?: number;
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
  currentTokens: CurrentToken[];
  change24h: string;
  change7d: string;
  protectionLevel: ('Degen' | 'Moderate' | 'Guarded')[];
  performance?: PerformanceData;
}
