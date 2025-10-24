import { Agent, PerformanceData } from '@/types/types';

// Helper function to generate performance data
const generatePerformanceData = (
  startValue: number,
  volatility: number,
  trend: number,
  pointCount: number
): { timestamp: string; value: number }[] => {
  const data = [];
  let currentValue = startValue;
  const now = new Date();

  for (let i = pointCount - 1; i >= 0; i--) {
    const randomChange = (Math.random() - 0.5) * volatility;
    const trendChange = trend / pointCount;
    currentValue = currentValue * (1 + randomChange + trendChange);
    currentValue = Math.max(currentValue, startValue * 0.5);

    const date = new Date(now);
    date.setDate(date.getDate() - i);

    data.push({
      timestamp: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: parseFloat(currentValue.toFixed(2)),
    });
  }

  return data;
};

// Helper to create performance data for agents
const createPerformanceData = (basePercentage: number): PerformanceData => ({
  '24h': generatePerformanceData(basePercentage, 0.08, 0.02, 24),
  '7d': generatePerformanceData(basePercentage, 0.06, 0.01, 7),
  '1M': generatePerformanceData(basePercentage, 0.04, 0.015, 30),
  '3M': generatePerformanceData(basePercentage, 0.03, 0.02, 90),
  '1Y': generatePerformanceData(basePercentage, 0.025, 0.025, 52),
  Max: generatePerformanceData(basePercentage, 0.025, 0.03, 100),
  currentValue: basePercentage,
  dataSource: 'Avo AI',
});

export const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Bandit',
    role: 'Wallet Tracker Agent',
    topPositions: [
      {
        symbol: 'SOL',
        percentage: 97.5,
      },
      {
        symbol: '$BTC',
        percentage: 2.5,
      },
    ],
    currentTokens: [
      {
        symbol: 'Solana',
        address: 'So111•••11112',
        allocation: 56.79,
        riskLevel: 'Low Risk',
        price: 0.000293,
        liquidity: 34266.97,
        marketCap: 293155.49,
        volume24h: 242787.96,
      },
      {
        symbol: 'Wigger',
        address: 'G4k4d•••qpump',
        allocation: 30.09,
        riskLevel: 'Medium Risk',
        price: 0.000156,
        liquidity: 18950.32,
        marketCap: 125430.15,
        volume24h: 87654.32,
      },
    ],
    change24h: '34.40%',
    change7d: '20.45%',
    protectionLevel: ['Degen'],
    performance: createPerformanceData(44.47),
  },
  {
    id: '2',
    name: 'Bunny',
    role: 'Wallet Tracker Agent',
    topPositions: [
      {
        symbol: 'SOL',
        percentage: 47.5,
      },
      {
        symbol: '$ETH',
        percentage: 29.8,
      },
      {
        symbol: 'BNB',
        percentage: 22.7,
      },
    ],
    currentTokens: [
      {
        symbol: 'Solana',
        address: 'So111•••11112',
        allocation: 47.5,
        riskLevel: 'Low Risk',
        price: 0.000293,
        liquidity: 34266.97,
        marketCap: 293155.49,
        volume24h: 242787.96,
      },
      {
        symbol: 'Ethereum',
        address: 'ETH1•••xxxxx',
        allocation: 29.8,
        riskLevel: 'Low Risk',
        price: 0.000542,
        liquidity: 52150.43,
        marketCap: 485230.22,
        volume24h: 356789.12,
      },
    ],
    change24h: '12.60%',
    change7d: '45.40%',
    protectionLevel: ['Degen', 'Moderate'],
    performance: createPerformanceData(38.92),
  },
  {
    id: '3',
    name: 'Maverick',
    role: 'KOL Tracker Agent',
    topPositions: [
      {
        symbol: '$ETH',
        percentage: 65.2,
      },
      {
        symbol: 'AVAX',
        percentage: 34.8,
      },
    ],
    currentTokens: [
      {
        symbol: 'Ethereum',
        address: 'ETH1•••xxxxx',
        allocation: 65.2,
        riskLevel: 'Low Risk',
        price: 0.000542,
        liquidity: 52150.43,
        marketCap: 485230.22,
        volume24h: 356789.12,
      },
      {
        symbol: 'Avalanche',
        address: 'AVAX•••yyyyy',
        allocation: 34.8,
        riskLevel: 'Medium Risk',
        price: 0.000378,
        liquidity: 28950.75,
        marketCap: 210567.89,
        volume24h: 145623.45,
      },
    ],
    change24h: '8.15%',
    change7d: '31.22%',
    protectionLevel: ['Moderate', 'Guarded'],
    performance: createPerformanceData(35.67),
  },
  {
    id: '4',
    name: 'Cipher',
    role: 'Wallet Tracker Agent',
    topPositions: [
      {
        symbol: 'SOL',
        percentage: 35.0,
      },
      {
        symbol: 'NEAR',
        percentage: 28.5,
      },
      {
        symbol: '$FTT',
        percentage: 20.3,
      },
      {
        symbol: 'RENDER',
        percentage: 16.2,
      },
    ],
    currentTokens: [
      {
        symbol: 'Solana',
        address: 'So111•••11112',
        allocation: 35.0,
        riskLevel: 'Low Risk',
        price: 0.000293,
        liquidity: 34266.97,
        marketCap: 293155.49,
        volume24h: 242787.96,
      },
      {
        symbol: 'NEAR Protocol',
        address: 'NEAR•••zzzzz',
        allocation: 28.5,
        riskLevel: 'Medium Risk',
        price: 0.000421,
        liquidity: 31420.68,
        marketCap: 267340.55,
        volume24h: 189456.72,
      },
    ],
    change24h: '2.34%',
    change7d: '18.90%',
    protectionLevel: ['Degen'],
    performance: createPerformanceData(32.15),
  },
  {
    id: '5',
    name: 'Nova',
    role: 'Wallet Tracker Agent',
    topPositions: [
      {
        symbol: 'BTC',
        percentage: 55.7,
      },
      {
        symbol: '$ETH',
        percentage: 26.1,
      },
      {
        symbol: 'LINK',
        percentage: 18.2,
      },
    ],
    currentTokens: [
      {
        symbol: 'Bitcoin',
        address: 'BTC1•••aaaaa',
        allocation: 55.7,
        riskLevel: 'Low Risk',
        price: 0.000892,
        liquidity: 67890.12,
        marketCap: 892340.56,
        volume24h: 623450.89,
      },
      {
        symbol: 'Ethereum',
        address: 'ETH1•••xxxxx',
        allocation: 26.1,
        riskLevel: 'Low Risk',
        price: 0.000542,
        liquidity: 52150.43,
        marketCap: 485230.22,
        volume24h: 356789.12,
      },
    ],
    change24h: '5.67%',
    change7d: '12.45%',
    protectionLevel: ['Moderate', 'Guarded'],
    performance: createPerformanceData(41.23),
  },
  {
    id: '6',
    name: 'Phoenix',
    role: 'Wallet Tracker Agent',
    topPositions: [
      {
        symbol: 'DOGE',
        percentage: 42.1,
      },
      {
        symbol: 'SHIB',
        percentage: 31.8,
      },
      {
        symbol: 'PEPE',
        percentage: 15.6,
      },
      {
        symbol: 'FLOKI',
        percentage: 10.5,
      },
    ],
    currentTokens: [
      {
        symbol: 'Dogecoin',
        address: 'DOGE•••bbbbb',
        allocation: 42.1,
        riskLevel: 'Medium Risk',
        price: 0.000187,
        liquidity: 19340.22,
        marketCap: 145670.5,
        volume24h: 98765.43,
      },
      {
        symbol: 'Shiba Inu',
        address: 'SHIB•••ccccc',
        allocation: 31.8,
        riskLevel: 'High Risk',
        price: 0.000042,
        liquidity: 8920.55,
        marketCap: 45230.75,
        volume24h: 32145.89,
      },
    ],
    change24h: '15.89%',
    change7d: '52.33%',
    protectionLevel: ['Degen', 'Moderate'],
    performance: createPerformanceData(47.82),
  },
  {
    id: '7',
    name: 'Apex',
    role: 'Wallet Tracker Agent',
    topPositions: [
      {
        symbol: 'MATIC',
        percentage: 48.3,
      },
      {
        symbol: 'ATOM',
        percentage: 35.2,
      },
      {
        symbol: 'ICP',
        percentage: 16.5,
      },
    ],
    currentTokens: [
      {
        symbol: 'Polygon',
        address: 'MATIC•••ddddd',
        allocation: 48.3,
        riskLevel: 'Low Risk',
        price: 0.000621,
        liquidity: 45230.78,
        marketCap: 350120.44,
        volume24h: 267890.23,
      },
      {
        symbol: 'Cosmos',
        address: 'ATOM•••eeeee',
        allocation: 35.2,
        riskLevel: 'Medium Risk',
        price: 0.000456,
        liquidity: 32450.91,
        marketCap: 245670.33,
        volume24h: 178934.56,
      },
    ],
    change24h: '3.42%',
    change7d: '22.11%',
    protectionLevel: ['Degen', 'Guarded'],
    performance: createPerformanceData(36.54),
  },
  {
    id: '8',
    name: 'Vortex',
    role: 'KOL Tracker Agent',
    topPositions: [
      {
        symbol: '$XRP',
        percentage: 52.9,
      },
      {
        symbol: 'ADA',
        percentage: 37.4,
      },
      {
        symbol: 'ALGO',
        percentage: 9.7,
      },
    ],
    currentTokens: [
      {
        symbol: 'Ripple',
        address: 'XRP1•••fffff',
        allocation: 52.9,
        riskLevel: 'Low Risk',
        price: 0.000758,
        liquidity: 54320.44,
        marketCap: 425120.89,
        volume24h: 312450.67,
      },
      {
        symbol: 'Cardano',
        address: 'ADA1•••ggggg',
        allocation: 37.4,
        riskLevel: 'Medium Risk',
        price: 0.000634,
        liquidity: 41230.55,
        marketCap: 298340.22,
        volume24h: 214567.89,
      },
    ],
    change24h: '7.23%',
    change7d: '19.87%',
    protectionLevel: ['Degen', 'Moderate', 'Guarded'],
    performance: createPerformanceData(39.71),
  },
];

export type LogType = 'INFO' | 'SUCCESS';

export interface AgentLog {
  id: string;
  timestamp: string;
  type: LogType;
  message: string;
}

export const mockAgentLogs: AgentLog[] = [
  {
    id: '1',
    timestamp: 'less than a minute ago',
    type: 'INFO',
    message: 'Starting portfolio rebalance for 8e9dc20f-69bf-4ca8-bf96-f10eb634ff89',
  },
  {
    id: '2',
    timestamp: 'less than a minute ago',
    type: 'SUCCESS',
    message: 'Successfully retrieved portfolio data',
  },
  {
    id: '3',
    timestamp: 'less than a minute ago',
    type: 'SUCCESS',
    message: 'Agent gathered market data for with 38 tokens',
  },
  {
    id: '4',
    timestamp: 'less than a minute ago',
    type: 'INFO',
    message:
      'The agent has filtered to 10 curated tokens with ≥1% allocation (from 38 total tokens)',
  },
  {
    id: '5',
    timestamp: 'less than a minute ago',
    type: 'SUCCESS',
    message:
      'Successfully generated protection specific portfolio allocations: Degen: 8 tokens, Moderate: 3 to',
  },
  {
    id: '6',
    timestamp: 'less than a minute ago',
    type: 'INFO',
    message: 'Degen: Sold 1,552,038.718 btc (26,109,103.169 → 24,557,064.451)',
  },
  {
    id: '7',
    timestamp: 'less than a minute ago',
    type: 'INFO',
    message: 'Degen: Sold 0.305 SOL (12.107 → 11.803)',
  },
  {
    id: '8',
    timestamp: 'less than a minute ago',
    type: 'INFO',
    message: 'Moderate: Sold 0.305 SOL (12.107 → 11.803)',
  },
  {
    id: '9',
    timestamp: 'less than a minute ago',
    type: 'INFO',
    message: 'Guarded: Sold 0.305 SOL (12.107 → 11.803)',
  },
  {
    id: '10',
    timestamp: 'less than a minute ago',
    type: 'SUCCESS',
    message: 'Agent appropriately calculated current risk based portfolio return values',
  },
  {
    id: '11',
    timestamp: 'less than a minute ago',
    type: 'SUCCESS',
    message: 'Successfully stored current risk based portfolio return values to the data warehouse',
  },
  {
    id: '12',
    timestamp: 'less than a minute ago',
    type: 'SUCCESS',
    message: 'Successfully calculated intervals returns',
  },
  {
    id: '13',
    timestamp: 'less than a minute ago',
    type: 'SUCCESS',
    message: 'Successfully updated portfolio database with new allocations',
  },
  {
    id: '14',
    timestamp: 'less than a minute ago',
    type: 'SUCCESS',
    message: 'Portfolio rebalance completed successfully for 8e9dc20f-69bf-4ca8-bf96-f10eb634ff89',
  },
  {
    id: '15',
    timestamp: '5 minutes ago',
    type: 'SUCCESS',
    message: 'Portfolio rebalance completed successfully for 8e9dc20f-69bf-4ca8-bf96-f10eb634ff89',
  },
  {
    id: '16',
    timestamp: '5 minutes ago',
    type: 'SUCCESS',
    message: 'Successfully updated portfolio database with new allocations',
  },
  {
    id: '17',
    timestamp: '5 minutes ago',
    type: 'SUCCESS',
    message: 'Successfully calculated intervals returns',
  },
  {
    id: '18',
    timestamp: '5 minutes ago',
    type: 'SUCCESS',
    message: 'Successfully stored current risk based portfolio return values to the data warehouse',
  },
  {
    id: '19',
    timestamp: '5 minutes ago',
    type: 'SUCCESS',
    message: 'Agent appropriately calculated current risk based portfolio return values',
  },
  {
    id: '20',
    timestamp: '5 minutes ago',
    type: 'SUCCESS',
    message:
      'Successfully generated protection specific portfolio allocations: Degen: 8 tokens, Guarded',
  },
];
