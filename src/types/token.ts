export interface Token {
    id: string;
    symbol: string;
    name: string;
    image: string;
    marketCap: number;
    volume24h: number; // Volume in last 24h (or appropriate timeframe)
    liquidity?: number;
    createdAt: number; // Timestamp
    socials: {
        twitter?: string;
        telegram?: string;
        website?: string;
    };
    bondingCurveProgress: number; // Percentage 0-100
    status: 'new' | 'final' | 'migrated';
    // Additional UI state (can be separated mostly)
    isHot?: boolean;
}

export interface TokenSocketUpdate {
    id: string;
    marketCap?: number;
    volume24h?: number;
    bondingCurveProgress?: number;
    status?: 'new' | 'final' | 'migrated';
}
