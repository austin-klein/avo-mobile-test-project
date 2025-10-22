import { Agent } from '@/types/types';

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
    change24h: '34.40%',
    change7d: '20.45%',
    protectionLevel: ['Degen'],
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
    change24h: '12.60%',
    change7d: '45.40%',
    protectionLevel: ['Degen', 'Moderate'],
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
    change24h: '8.15%',
    change7d: '31.22%',
    protectionLevel: ['Moderate', 'Guarded'],
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
    change24h: '2.34%',
    change7d: '18.90%',
    protectionLevel: ['Degen'],
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
    change24h: '5.67%',
    change7d: '12.45%',
    protectionLevel: ['Moderate', 'Guarded'],
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
    change24h: '15.89%',
    change7d: '52.33%',
    protectionLevel: ['Degen', 'Moderate'],
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
    change24h: '3.42%',
    change7d: '22.11%',
    protectionLevel: ['Degen', 'Guarded'],
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
    change24h: '7.23%',
    change7d: '19.87%',
    protectionLevel: ['Degen', 'Moderate', 'Guarded'],
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
