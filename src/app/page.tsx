'use client';

import { useTokenSocket } from "@/hooks/useTokenSocket";
import { TokenList } from "@/components/organisms/TokenList";
import { FilterPopover } from "@/components/molecules/FilterPopover";
import { BuyModal } from "@/components/organisms/BuyModal";

export default function Home() {
  const { tokens, isConnected } = useTokenSocket();

  const newPairs = tokens.filter(t => t.status === 'new');
  const finalStretch = tokens.filter(t => t.status === 'final');
  const migrated = tokens.filter(t => t.status === 'migrated');

  return (
    <main className="flex min-h-screen flex-col bg-axiom-bg text-axiom-text-primary overflow-hidden">
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b border-axiom-border bg-axiom-bg px-4 z-20 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-axiom-blue rounded-md flex items-center justify-center text-black font-bold">A</div>
            <h1 className="text-xl font-bold tracking-tight text-white hidden sm:block">Axiom <span className="text-axiom-blue">Pulse</span></h1>
          </div>

          <div className="flex items-center gap-2 text-xs bg-axiom-card px-2 py-1 rounded-full border border-axiom-border">
            <div className={`h-2 w-2 rounded-full ${isConnected ? 'bg-axiom-green shadow-[0_0_8px_rgba(20,241,149,0.5)]' : 'bg-red-500 animate-pulse'}`} />
            <span className="text-axiom-text-muted">{isConnected ? 'Live' : 'Connecting...'}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FilterPopover />
        </div>
      </header>

      {/* Main Content - 3 Column Layout */}
      <div className="flex flex-1 overflow-x-auto overflow-y-hidden snap-x snap-mandatory">
        <div className="min-w-[320px] w-full lg:w-1/3 h-full snap-start border-r border-axiom-border/30">
          <TokenList title="New Pairs" tokens={newPairs} loading={!isConnected} />
        </div>
        <div className="min-w-[320px] w-full lg:w-1/3 h-full snap-start border-r border-axiom-border/30">
          <TokenList title="Final Stretch" tokens={finalStretch} loading={!isConnected} />
        </div>
        <div className="min-w-[320px] w-full lg:w-1/3 h-full snap-start">
          <TokenList title="Migrated" tokens={migrated} loading={!isConnected} />
        </div>
      </div>
      <BuyModal />
    </main>
  );
}
