import { useEffect, useState } from 'react';

export function useFlashUpdate(value: number | string, correlationId?: string) {
    const [flash, setFlash] = useState<'green' | 'red' | null>(null);
    const [prevValue, setPrevValue] = useState(value);

    useEffect(() => {
        if (value !== prevValue) {
            if (typeof value === 'number' && typeof prevValue === 'number') {
                setFlash(value > prevValue ? 'green' : 'red');
            } else {
                setFlash('green');
            }
            setPrevValue(value);

            const timeout = setTimeout(() => {
                setFlash(null);
            }, 1000); // 1s flash duration (matches CSS transition)

            return () => clearTimeout(timeout);
        }
    }, [value, prevValue, correlationId]);

    return flash;
}
