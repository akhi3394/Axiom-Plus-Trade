import { Token } from "@/types/token"
import { TokenRow } from "../molecules/TokenRow"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Settings2, Filter } from "lucide-react"
import { Button } from "../atoms/Button"
import { Skeleton } from "../atoms/Skeleton"

interface TokenListProps {
    title: string;
    tokens: Token[];
    loading?: boolean;
}

export function TokenList({ title, tokens, loading }: TokenListProps) {
    return (
        <div className="flex flex-col h-full bg-axiom-bg/50 border-r border-axiom-border/30 last:border-0 min-w-[320px] lg:flex-1">
            <div className="flex items-center justify-between p-3 border-b border-axiom-border/30 bg-axiom-bg sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${title.includes('New') ? 'bg-axiom-green' : title.includes('Final') ? 'bg-indigo-500' : 'bg-blue-500'}`} />
                    <h2 className="text-sm font-bold text-axiom-text-primary uppercase tracking-wide">{title}</h2>
                    <span className="text-xs text-axiom-text-muted bg-axiom-card px-1.5 rounded">{tokens.length}</span>
                </div>

                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-axiom-text-muted hover:text-white">
                        <Filter size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-axiom-text-muted hover:text-white">
                        <Settings2 size={14} />
                    </Button>
                </div>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-2 space-y-1">
                    {loading ? (
                        Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="flex gap-4 p-2">
                                <Skeleton className="h-10 w-10 rounded-md" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-3 w-1/2" />
                                </div>
                            </div>
                        ))
                    ) : tokens.length === 0 ? (
                        <div className="p-8 text-center text-axiom-text-muted text-sm">
                            No tokens found
                        </div>
                    ) : (
                        tokens.map(token => (
                            <TokenRow key={token.id} token={token} />
                        ))
                    )}
                </div>
            </ScrollArea>
        </div>
    )
}
