import { Agent } from '@/types/types';

export const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'UNI',
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
  },
  {
    id: '2',
    name: 'AVX',
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
