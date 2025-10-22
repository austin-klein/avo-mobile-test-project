interface Position {
  symbol: string;
  percentage: number;
  change24h?: string;
  change7d?: string;
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
}
