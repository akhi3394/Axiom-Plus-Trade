import { Token, TokenSocketUpdate } from "@/types/token";

type Listener = (data: unknown) => void;

class MockSocketService {
    private listeners: Record<string, Listener[]> = {};
    private tokens: Token[] = [];
    private intervals: NodeJS.Timeout[] = [];

    constructor() {
        this.tokens = this.generateInitialTokens();
    }

    // Generate dummy data
    private generateInitialTokens(): Token[] {
        return Array.from({ length: 30 }).map((_, i) => ({
            id: `token-${i}`,
            symbol: `BLK${i}`,
            name: `BlockToken ${i}`,
            image: "", // Placeholder or use a service
            marketCap: 10000 + Math.random() * 500000,
            volume24h: 5000 + Math.random() * 20000,
            createdAt: Date.now() - Math.random() * 3600000, // up to 1h ago
            socials: {
                twitter: Math.random() > 0.5 ? "https://x.com" : undefined,
                telegram: Math.random() > 0.5 ? "https://t.me" : undefined,
                website: Math.random() > 0.5 ? "https://web.com" : undefined,
            },
            bondingCurveProgress: Math.random() * 100,
            status: i < 10 ? 'new' : i < 20 ? 'final' : 'migrated',
        }));
    }

    connect() {
        console.log("Mock Socket Connected");

        // Simulate init
        setTimeout(() => {
            this.emit('init', this.tokens);
        }, 500);

        // Simulate price updates
        const updateInterval = setInterval(() => {
            const updates = this.tokens.map(t => {
                if (Math.random() > 0.7) { // 30% chance to update
                    const change = (Math.random() - 0.5) * 0.05; // +/- 5%
                    const newMc = Math.max(0, t.marketCap * (1 + change));
                    t.marketCap = newMc;
                    return { id: t.id, marketCap: newMc };
                }
                return null;
            }).filter(Boolean) as TokenSocketUpdate[];

            if (updates.length > 0) {
                this.emit('update', updates);
            }
        }, 2000); // Every 2s

        // Simulate new token
        const newPairInterval = setInterval(() => {
            if (Math.random() > 0.8) {
                const newToken: Token = {
                    id: `token-new-${Date.now()}`,
                    symbol: `NEW${Math.floor(Math.random() * 100)}`,
                    name: `New Coin ${Date.now()}`,
                    image: "",
                    marketCap: 5000,
                    volume24h: 0,
                    createdAt: Date.now(),
                    socials: { twitter: "x" },
                    bondingCurveProgress: 0,
                    status: 'new'
                };
                this.tokens.unshift(newToken);
                this.emit('new_token', newToken);
            }
        }, 15000);

        this.intervals.push(updateInterval, newPairInterval);
    }

    disconnect() {
        this.intervals.forEach(clearInterval);
        this.intervals = [];
    }

    on(event: string, callback: Listener) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    off(event: string, callback: Listener) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event].filter(l => l !== callback);
    }

    private emit(event: string, data: unknown) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(cb => cb(data));
        }
    }
}

export const mockSocket = new MockSocketService();
