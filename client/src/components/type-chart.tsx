import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TypeBadge } from "@/components/type-badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { pokemonTypes, typeChart, type PokemonType } from "@shared/schema";
import { Grid3X3, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const multiplierColors: Record<number, string> = {
  0: "bg-gray-800 text-gray-400",
  0.25: "bg-red-900 text-red-300",
  0.5: "bg-red-700 text-red-100",
  1: "bg-muted text-muted-foreground",
  2: "bg-green-600 text-white",
  4: "bg-green-500 text-white",
};

const multiplierLabels: Record<number, string> = {
  0: "0",
  0.25: "¼",
  0.5: "½",
  1: "1",
  2: "2",
  4: "4",
};

export function TypeChart() {
  const [selectedAttackType, setSelectedAttackType] = useState<PokemonType | null>(null);
  const [selectedDefenseType, setSelectedDefenseType] = useState<PokemonType | null>(null);
  const [mobileAttackType, setMobileAttackType] = useState<PokemonType>("fire");

  return (
    <div className="space-y-6">
      <div className="hidden lg:block">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-display">
              <Grid3X3 className="h-5 w-5 text-primary" />
              Type Effectiveness Chart
            </CardTitle>
            <p className="text-sm text-muted-foreground font-body mt-2">
              Click any cell to see details. Rows are attacking types, columns are defending types.
            </p>
          </CardHeader>
          <CardContent>
            <ScrollArea className="w-full">
              <div className="min-w-[900px]">
                <div className="grid" style={{ gridTemplateColumns: `80px repeat(${pokemonTypes.length}, 48px)` }}>
                  <div className="h-12 flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  {pokemonTypes.map((defType) => (
                    <div 
                      key={`header-${defType}`}
                      className={cn(
                        "h-12 flex items-center justify-center cursor-pointer transition-all",
                        selectedDefenseType === defType && "bg-muted rounded-t-lg"
                      )}
                      onClick={() => setSelectedDefenseType(selectedDefenseType === defType ? null : defType)}
                      data-testid={`header-def-${defType}`}
                    >
                      <TypeBadge type={defType} size="sm" className="text-[10px] px-1.5 py-0.5" />
                    </div>
                  ))}

                  {pokemonTypes.map((atkType) => (
                    <>
                      <div
                        key={`row-${atkType}`}
                        className={cn(
                          "h-12 flex items-center justify-center cursor-pointer transition-all",
                          selectedAttackType === atkType && "bg-muted rounded-l-lg"
                        )}
                        onClick={() => setSelectedAttackType(selectedAttackType === atkType ? null : atkType)}
                        data-testid={`header-atk-${atkType}`}
                      >
                        <TypeBadge type={atkType} size="sm" className="text-[10px] px-1.5 py-0.5" />
                      </div>
                      {pokemonTypes.map((defType) => {
                        const multiplier = typeChart[atkType][defType];
                        const isHighlighted = 
                          (selectedAttackType === atkType) || 
                          (selectedDefenseType === defType) ||
                          (selectedAttackType === atkType && selectedDefenseType === defType);

                        return (
                          <div
                            key={`${atkType}-${defType}`}
                            className={cn(
                              "h-12 w-12 flex items-center justify-center text-sm font-bold transition-all cursor-pointer",
                              multiplierColors[multiplier],
                              isHighlighted && "ring-2 ring-primary ring-inset scale-105 z-10 rounded-md"
                            )}
                            onClick={() => {
                              setSelectedAttackType(atkType);
                              setSelectedDefenseType(defType);
                            }}
                            title={`${atkType} → ${defType}: ×${multiplier}`}
                            data-testid={`cell-${atkType}-${defType}`}
                          >
                            {multiplierLabels[multiplier]}
                          </div>
                        );
                      })}
                    </>
                  ))}
                </div>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {(selectedAttackType || selectedDefenseType) && (
              <div className="mt-6 p-4 rounded-xl bg-muted/50 animate-fade-in-scale">
                <div className="flex flex-wrap items-center gap-3">
                  {selectedAttackType && (
                    <>
                      <TypeBadge type={selectedAttackType} size="lg" />
                      <span className="text-muted-foreground">attacks</span>
                    </>
                  )}
                  {selectedDefenseType && (
                    <>
                      {selectedAttackType && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
                      <TypeBadge type={selectedDefenseType} size="lg" />
                    </>
                  )}
                  {selectedAttackType && selectedDefenseType && (
                    <>
                      <span className="text-muted-foreground mx-2">=</span>
                      <span className={cn(
                        "text-2xl font-bold font-display px-3 py-1 rounded-lg",
                        multiplierColors[typeChart[selectedAttackType][selectedDefenseType]]
                      )}>
                        ×{typeChart[selectedAttackType][selectedDefenseType]}
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-4 gap-4 mt-6">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className={cn("w-8 h-8 rounded-md flex items-center justify-center font-bold text-sm", multiplierColors[0])}>0</div>
              <div>
                <div className="font-semibold text-sm font-display">No Effect</div>
                <div className="text-xs text-muted-foreground font-body">Immune</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className={cn("w-8 h-8 rounded-md flex items-center justify-center font-bold text-sm", multiplierColors[0.5])}>½</div>
              <div>
                <div className="font-semibold text-sm font-display">Not Very Effective</div>
                <div className="text-xs text-muted-foreground font-body">Half damage</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className={cn("w-8 h-8 rounded-md flex items-center justify-center font-bold text-sm", multiplierColors[1])}>1</div>
              <div>
                <div className="font-semibold text-sm font-display">Normal</div>
                <div className="text-xs text-muted-foreground font-body">Standard damage</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className={cn("w-8 h-8 rounded-md flex items-center justify-center font-bold text-sm", multiplierColors[2])}>2</div>
              <div>
                <div className="font-semibold text-sm font-display">Super Effective</div>
                <div className="text-xs text-muted-foreground font-body">Double damage</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="lg:hidden space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-display">
              <Grid3X3 className="h-5 w-5 text-primary" />
              Type Effectiveness
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium uppercase tracking-wide">
                Select Attack Type
              </label>
              <Select value={mobileAttackType} onValueChange={(v) => setMobileAttackType(v as PokemonType)}>
                <SelectTrigger data-testid="select-mobile-attack-type" className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pokemonTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      <div className="flex items-center gap-2">
                        <TypeBadge type={type} size="sm" />
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-2 mb-4">
                <TypeBadge type={mobileAttackType} size="lg" />
                <span className="text-muted-foreground font-body">attacks...</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {pokemonTypes.map((defType) => {
                  const multiplier = typeChart[mobileAttackType][defType];
                  return (
                    <div
                      key={defType}
                      className={cn(
                        "aspect-square rounded-lg flex flex-col items-center justify-center gap-1 transition-transform hover:scale-105",
                        multiplierColors[multiplier]
                      )}
                      data-testid={`mobile-cell-${mobileAttackType}-${defType}`}
                    >
                      <span className="text-lg font-bold">{multiplierLabels[multiplier]}</span>
                      <span className="text-[10px] uppercase tracking-wide opacity-80">{defType}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <div className={cn("w-6 h-6 rounded flex items-center justify-center font-bold text-xs", multiplierColors[0])}>0</div>
              <div className="text-xs font-body">No Effect</div>
            </div>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <div className={cn("w-6 h-6 rounded flex items-center justify-center font-bold text-xs", multiplierColors[0.5])}>½</div>
              <div className="text-xs font-body">Not Effective</div>
            </div>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <div className={cn("w-6 h-6 rounded flex items-center justify-center font-bold text-xs", multiplierColors[1])}>1</div>
              <div className="text-xs font-body">Normal</div>
            </div>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2">
              <div className={cn("w-6 h-6 rounded flex items-center justify-center font-bold text-xs", multiplierColors[2])}>2</div>
              <div className="text-xs font-body">Super Effective</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}