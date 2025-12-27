import { Token } from "@/types/token";
import { useDispatch } from "react-redux";
import { openBuyModal } from "@/store/uiSlice";
import { formatCurrency, formatTimeAgo } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { useFlashUpdate } from "@/hooks/useFlashUpdate";
import { Globe, MessageCircle, Twitter } from "lucide-react";
import Image from "next/image";
import { Button } from "../atoms/Button";

interface TokenRowProps {
    token: Token;
    onClick?: () => void;
}

export function TokenRow({ token, onClick }: TokenRowProps) {
    const dispatch = useDispatch();
    const textFlash = useFlashUpdate(token.marketCap);

    return (
        <div
            className="group relative flex items-center justify-between p-2 hover:bg-axiom-card/50 rounded-md cursor-pointer transition-colors border-b border-axiom-border/50 last:border-0"
            onClick={onClick}
        >
            {/* Left: Identity */}
            <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-md bg-axiom-card border border-axiom-border">
                    {token.image ? (
                        <Image
                            src={token.image}
                            alt={token.symbol}
                            fill
                            className="object-cover"
                            sizes="40px"
                        />
                    ) : (
                        <div className="h-full w-full bg-axiom-blue/20" />
                    )}
                </div>

                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-axiom-text-primary">{token.symbol}</span>
                        <span className="text-xs text-axiom-text-muted">{token.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-axiom-text-secondary">
                        <span>{formatTimeAgo(token.createdAt)}</span>
                        {/* Socials */}
                        <div className="flex gap-1 ml-1">
                            {token.socials.twitter && <Twitter size={10} className="hover:text-axiom-blue transition-colors" />}
                            {token.socials.telegram && <MessageCircle size={10} className="hover:text-axiom-blue transition-colors" />}
                            {token.socials.website && <Globe size={10} className="hover:text-axiom-blue transition-colors" />}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Metrics & Actions */}
            <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-2">
                    <span className={cn(
                        "font-mono font-medium text-sm transition-colors duration-500",
                        textFlash === 'green' ? "text-axiom-green" : textFlash === 'red' ? "text-axiom-red" : "text-axiom-blue"
                    )}>
                        {formatCurrency(token.marketCap)}
                    </span>
                </div>
                <div className="flex items-center justify-end gap-2 w-full">
                    <span className="text-xs text-axiom-text-muted">Vol: {formatCurrency(token.volume24h)}</span>
                </div>
            </div>

            {/* Hover Action: Quick Buy (Overlay or Replace) */}
            <div className="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="axiom" size="xs" className="h-6" onClick={(e) => {
                    e.stopPropagation();
                    dispatch(openBuyModal(token));
                }}>
                    Buy
                </Button>
            </div>
        </div>
    );
}
