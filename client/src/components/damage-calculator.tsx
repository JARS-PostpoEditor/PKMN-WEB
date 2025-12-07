import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { TypeBadge } from "@/components/type-badge";
import { 
  pokemonTypes, 
  calculateDamage,
  type PokemonType,
  type DamageInput
} from "@shared/schema";
import { Swords, Shield, Zap, Target, TrendingDown, TrendingUp, Minus } from "lucide-react";

export function DamageCalculator() {
  const [attackerLevel, setAttackerLevel] = useState(50);
  const [attackStat, setAttackStat] = useState(100);
  const [defenseStat, setDefenseStat] = useState(100);
  const [movePower, setMovePower] = useState(80);
  const [moveType, setMoveType] = useState<PokemonType>("normal");
  const [attackerType1, setAttackerType1] = useState<PokemonType>("normal");
  const [attackerType2, setAttackerType2] = useState<PokemonType | "none">("none");
  const [defenderType1, setDefenderType1] = useState<PokemonType>("normal");
  const [defenderType2, setDefenderType2] = useState<PokemonType | "none">("none");
  const [isCritical, setIsCritical] = useState(false);
  const [itemMultiplier, setItemMultiplier] = useState(1.0);

  const attackerTypes: PokemonType[] = [attackerType1];
  if (attackerType2 !== "none") attackerTypes.push(attackerType2);

  const hasStab = attackerTypes.includes(moveType);

  const result = useMemo(() => {
    const atkTypes: PokemonType[] = [attackerType1];
    if (attackerType2 !== "none") atkTypes.push(attackerType2);
    
    const defTypes: PokemonType[] = [defenderType1];
    if (defenderType2 !== "none") defTypes.push(defenderType2);

    return calculateDamage({
      level: attackerLevel,
      power: movePower,
      attack: attackStat,
      defense: defenseStat,
      attackerTypes: atkTypes,
      defenderTypes: defTypes,
      moveType,
      critical: isCritical,
      weather: "none",
      itemMultiplier
    });
  }, [attackerLevel, attackStat, defenseStat, movePower, moveType, attackerType1, attackerType2, defenderType1, defenderType2, isCritical, itemMultiplier]);

  const getEffectivenessIcon = () => {
    if (result.typeEffectiveness === 0) return <Minus className="h-5 w-5" />;
    if (result.typeEffectiveness < 1) return <TrendingDown className="h-5 w-5" />;
    if (result.typeEffectiveness > 1) return <TrendingUp className="h-5 w-5" />;
    return <Minus className="h-5 w-5" />;
  };

  const getEffectivenessColor = () => {
    if (result.typeEffectiveness === 0) return "text-muted-foreground";
    if (result.typeEffectiveness < 1) return "text-blue-500";
    if (result.typeEffectiveness > 1) return "text-red-500";
    return "text-foreground";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-display">
              <Swords className="h-5 w-5 text-primary" />
              Attacker
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="atkLevel" className="text-sm font-medium uppercase tracking-wide">
                  Level
                </Label>
                <Input
                  id="atkLevel"
                  type="number"
                  min={1}
                  max={100}
                  value={attackerLevel}
                  onChange={(e) => setAttackerLevel(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
                  data-testid="input-attacker-level"
                  className="h-12 text-base font-body"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="atkStat" className="text-sm font-medium uppercase tracking-wide">
                  Attack / Sp.Atk
                </Label>
                <Input
                  id="atkStat"
                  type="number"
                  min={1}
                  max={999}
                  value={attackStat}
                  onChange={(e) => setAttackStat(Math.max(1, parseInt(e.target.value) || 1))}
                  data-testid="input-attack-stat"
                  className="h-12 text-base font-body"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium uppercase tracking-wide">
                Attacker Types
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <Select value={attackerType1} onValueChange={(v) => setAttackerType1(v as PokemonType)}>
                  <SelectTrigger data-testid="select-attacker-type1" className="h-12">
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
                <Select value={attackerType2} onValueChange={(v) => setAttackerType2(v as PokemonType | "none")}>
                  <SelectTrigger data-testid="select-attacker-type2" className="h-12">
                    <SelectValue placeholder="None" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
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
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-display">
              <Target className="h-5 w-5 text-primary" />
              Move
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="movePower" className="text-sm font-medium uppercase tracking-wide">
                  Base Power
                </Label>
                <Input
                  id="movePower"
                  type="number"
                  min={0}
                  max={300}
                  value={movePower}
                  onChange={(e) => setMovePower(Math.max(0, parseInt(e.target.value) || 0))}
                  data-testid="input-move-power"
                  className="h-12 text-base font-body"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium uppercase tracking-wide">
                  Move Type
                </Label>
                <Select value={moveType} onValueChange={(v) => setMoveType(v as PokemonType)}>
                  <SelectTrigger data-testid="select-move-type" className="h-12">
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className={`flex items-center justify-between p-3 rounded-lg ${hasStab ? "bg-green-500/10 border border-green-500/30" : "bg-muted/50"}`}>
                <span className="text-sm font-body">STAB Bonus</span>
                <Badge 
                  variant={hasStab ? "default" : "secondary"} 
                  className={hasStab ? "bg-green-600" : ""}
                  data-testid="badge-stab-status"
                >
                  {hasStab ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <Label htmlFor="crit" className="text-sm font-body cursor-pointer">Critical Hit</Label>
                <Switch 
                  id="crit" 
                  checked={isCritical} 
                  onCheckedChange={setIsCritical}
                  data-testid="switch-critical"
                />
              </div>
            </div>
            
            {hasStab && (
              <p className="text-xs text-muted-foreground font-body">
                STAB (Same Type Attack Bonus) is active because your move type matches one of the attacker's types.
              </p>
            )}

            <div className="space-y-2">
              <Label htmlFor="itemMult" className="text-sm font-medium uppercase tracking-wide">
                Item Multiplier
              </Label>
              <Select value={itemMultiplier.toString()} onValueChange={(v) => setItemMultiplier(parseFloat(v))}>
                <SelectTrigger data-testid="select-item-multiplier" className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">None (×1.0)</SelectItem>
                  <SelectItem value="1.1">Type-boosting (×1.1)</SelectItem>
                  <SelectItem value="1.2">Expert Belt (×1.2)</SelectItem>
                  <SelectItem value="1.3">Life Orb (×1.3)</SelectItem>
                  <SelectItem value="1.5">Choice Item (×1.5)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-display">
              <Shield className="h-5 w-5 text-primary" />
              Defender
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="defStat" className="text-sm font-medium uppercase tracking-wide">
                Defense / Sp.Def
              </Label>
              <Input
                id="defStat"
                type="number"
                min={1}
                max={999}
                value={defenseStat}
                onChange={(e) => setDefenseStat(Math.max(1, parseInt(e.target.value) || 1))}
                data-testid="input-defense-stat"
                className="h-12 text-base font-body"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium uppercase tracking-wide">
                Defender Types
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <Select value={defenderType1} onValueChange={(v) => setDefenderType1(v as PokemonType)}>
                  <SelectTrigger data-testid="select-defender-type1" className="h-12">
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
                <Select value={defenderType2} onValueChange={(v) => setDefenderType2(v as PokemonType | "none")}>
                  <SelectTrigger data-testid="select-defender-type2" className="h-12">
                    <SelectValue placeholder="None" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
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
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-card to-muted/30">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-display">
              <Zap className="h-5 w-5 text-primary" />
              Damage Output
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-6 rounded-xl bg-muted/50">
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2 font-body">
                  Min Damage
                </div>
                <div 
                  className="text-5xl font-bold font-display text-foreground"
                  data-testid="text-damage-min"
                >
                  {result.min}
                </div>
              </div>
              <div className="text-center p-6 rounded-xl bg-muted/50">
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2 font-body">
                  Max Damage
                </div>
                <div 
                  className="text-5xl font-bold font-display text-foreground"
                  data-testid="text-damage-max"
                >
                  {result.max}
                </div>
              </div>
            </div>

            <div className={`flex items-center justify-center gap-3 p-4 rounded-xl ${
              result.typeEffectiveness === 0 ? "bg-muted" :
              result.typeEffectiveness < 1 ? "bg-blue-500/10" :
              result.typeEffectiveness > 1 ? "bg-red-500/10" : "bg-muted/50"
            }`}>
              <span className={getEffectivenessColor()}>
                {getEffectivenessIcon()}
              </span>
              <span className={`font-semibold font-display ${getEffectivenessColor()}`} data-testid="text-effectiveness">
                {result.effectivenessLabel}
              </span>
            </div>

            <div className="text-center p-4 rounded-xl border bg-card">
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1 font-body">
                Estimated Hits to KO (at 100 HP)
              </div>
              <div className="text-3xl font-bold font-display" data-testid="text-hits-to-ko">
                {result.hitsToKO === Infinity ? "∞" : result.hitsToKO}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Formula Breakdown
              </h4>
              {result.breakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <span className="text-sm font-body">{item.label}</span>
                  <span className="font-semibold font-body">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-xs text-muted-foreground space-y-2 font-body">
              <p><strong>Formula:</strong> ((2×Level/5 + 2) × Power × Atk/Def) / 50 + 2) × Modifiers</p>
              <p><strong>Modifiers:</strong> STAB × Type × Crit × Item × Random (0.85-1.0)</p>
              <p className="text-xs opacity-75">Based on Generation 5+ damage mechanics</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}