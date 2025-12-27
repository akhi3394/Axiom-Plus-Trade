'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { closeBuyModal } from '@/store/uiSlice';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import Image from 'next/image';
import { Twitter, Globe, MessageCircle } from 'lucide-react';

export function BuyModal() {
    const dispatch = useDispatch();
    const { isBuyModalOpen, selectedToken } = useSelector((state: RootState) => state.ui);

    if (!selectedToken) return null;

    return (
        <Dialog open={isBuyModalOpen} onOpenChange={(open) => !open && dispatch(closeBuyModal())}>
            <DialogContent className="sm:max-w-[425px] border-axiom-border bg-axiom-card text-axiom-text-primary p-0 overflow-hidden gap-0">

                {/* Header */}
                <div className="p-6 pb-4 border-b border-axiom-border/50 bg-gradient-to-b from-axiom-blue/5 to-transparent">
                    <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                            <div className="relative h-16 w-16 overflow-hidden rounded-lg border-2 border-axiom-border shadow-lg">
                                {selectedToken.image ? (
                                    <Image src={selectedToken.image} alt={selectedToken.symbol} fill className="object-cover" />
                                ) : (
                                    <div className="h-full w-full bg-axiom-blue/20 flex items-center justify-center text-axiom-blue font-bold text-xl">
                                        {selectedToken.symbol[0]}
                                    </div>
                                )}
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-bold flex items-center gap-2">
                                    {selectedToken.symbol}
                                    <Badge variant="outline" className="text-[10px] h-5 border-axiom-border/50 text-axiom-text-secondary">SOL</Badge>
                                </DialogTitle>
                                <div className="text-sm text-axiom-text-muted mt-1">{selectedToken.name}</div>

                                <div className="flex gap-2 mt-2">
                                    {selectedToken.socials.twitter && (
                                        <a href={selectedToken.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-axiom-text-secondary hover:text-axiom-blue transition-colors">
                                            <Twitter size={14} />
                                        </a>
                                    )}
                                    {selectedToken.socials.telegram && (
                                        <a href={selectedToken.socials.telegram} target="_blank" rel="noopener noreferrer" className="text-axiom-text-secondary hover:text-axiom-blue transition-colors">
                                            <MessageCircle size={14} />
                                        </a>
                                    )}
                                    {selectedToken.socials.website && (
                                        <a href={selectedToken.socials.website} target="_blank" rel="noopener noreferrer" className="text-axiom-text-secondary hover:text-axiom-blue transition-colors">
                                            <Globe size={14} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-axiom-bg p-3 rounded-md border border-axiom-border/30">
                            <div className="text-xs text-axiom-text-secondary mb-1">Market Cap</div>
                            <div className="text-lg font-mono font-bold text-axiom-green">{formatCurrency(selectedToken.marketCap)}</div>
                        </div>
                        <div className="bg-axiom-bg p-3 rounded-md border border-axiom-border/30">
                            <div className="text-xs text-axiom-text-secondary mb-1">Volume (24h)</div>
                            <div className="text-lg font-mono font-bold text-axiom-blue">{formatCurrency(selectedToken.volume24h)}</div>
                        </div>
                    </div>

                    {/* Bonding Curve */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-axiom-text-muted">Bonding Curve Progress</span>
                            <span className="text-axiom-blue font-bold">{formatNumber(selectedToken.bondingCurveProgress)}%</span>
                        </div>
                        <div className="h-2 w-full bg-axiom-border rounded-full overflow-hidden">
                            <div
                                className="h-full bg-axiom-blue shadow-[0_0_10px_rgba(93,188,255,0.5)] transition-all duration-1000"
                                style={{ width: `${selectedToken.bondingCurveProgress}%` }}
                            />
                        </div>
                        {selectedToken.status === 'final' && (
                            <div className="text-[10px] text-yellow-500 mt-1">⚠️ Final stretch! Bonding curve nearly complete.</div>
                        )}
                    </div>

                    {/* Quick Buy Interface */}
                    <div className="pt-2">
                        <div className="text-sm font-medium mb-3">Quick Buy</div>
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            {['0.1', '0.5', '1.0'].map((amt) => (
                                <Button key={amt} variant="outline" className="border-axiom-border hover:bg-axiom-blue/10 hover:border-axiom-blue hover:text-axiom-blue">
                                    {amt} SOL
                                </Button>
                            ))}
                        </div>
                        <Button variant="axiom" className="w-full text-md py-6 font-bold">
                            Buy {selectedToken.symbol}
                        </Button>
                        <div className="text-center text-[10px] text-axiom-text-muted mt-2">
                            Slippage: Auto (1%) • Priority Fee: 0.001 SOL
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
