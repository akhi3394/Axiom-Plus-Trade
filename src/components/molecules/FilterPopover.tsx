import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "../atoms/Button"
import { Settings2 } from "lucide-react"

export function FilterPopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-axiom-card border-axiom-border hover:bg-axiom-card/80 text-axiom-text-primary">
                    <Settings2 size={16} />
                    <span>Display</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-56 bg-axiom-card border-axiom-border">
                <div className="space-y-2">
                    <h4 className="font-medium leading-none text-axiom-text-primary">View Settings</h4>
                    <p className="text-xs text-axiom-text-muted">Customize your trading view.</p>
                    {/* Toggles would go here */}
                    <div className="pt-2 border-t border-axiom-border/50">
                        <div className="text-xs text-axiom-text-secondary py-1">Columns</div>
                        {/* Mock toggles */}
                        <div className="flex items-center justify-between text-sm py-1 font-medium text-axiom-text-muted hover:text-white cursor-pointer transition-colors">
                            <span>New Pairs</span>
                            <div className="h-4 w-4 rounded border border-axiom-muted bg-axiom-blue/50 flex items-center justify-center text-[10px]">✓</div>
                        </div>
                        <div className="flex items-center justify-between text-sm py-1 font-medium text-axiom-text-muted hover:text-white cursor-pointer transition-colors">
                            <span>Final Stretch</span>
                            <div className="h-4 w-4 rounded border border-axiom-muted bg-axiom-blue/50 flex items-center justify-center text-[10px]">✓</div>
                        </div>
                        <div className="flex items-center justify-between text-sm py-1 font-medium text-axiom-text-muted hover:text-white cursor-pointer transition-colors">
                            <span>Migrated</span>
                            <div className="h-4 w-4 rounded border border-axiom-muted bg-axiom-blue/50 flex items-center justify-center text-[10px]">✓</div>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
