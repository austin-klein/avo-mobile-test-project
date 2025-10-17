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
