import { useEffect, useState } from 'react';
import { mockSocket } from '@/services/mockSocket';
import { Token, TokenSocketUpdate } from '@/types/token';

export function useTokenSocket() {
    const [isConnected, setIsConnected] = useState(false);
    const [tokens, setTokens] = useState<Token[]>([]);

    useEffect(() => {
        mockSocket.connect();
        setIsConnected(true);

        const handleInit = (data: unknown) => {
            setTokens(data as Token[]);
        };

        const handleUpdate = (data: unknown) => {
            const updates = data as TokenSocketUpdate[];
            setTokens(prev => prev.map(t => {
                const update = updates.find(u => u.id === t.id);
                if (update) {
                    return { ...t, ...update };
                }
                return t;
            }));
        };

        const handleNewToken = (data: unknown) => {
            const newToken = data as Token;
            setTokens(prev => [newToken, ...prev]);
        };

        mockSocket.on('init', handleInit);
        mockSocket.on('update', handleUpdate);
        mockSocket.on('new_token', handleNewToken);

        return () => {
            mockSocket.disconnect();
            mockSocket.off('init', handleInit);
            mockSocket.off('update', handleUpdate);
            mockSocket.off('new_token', handleNewToken);
            setIsConnected(false);
        };
    }, []);

    return { tokens, isConnected };
}
