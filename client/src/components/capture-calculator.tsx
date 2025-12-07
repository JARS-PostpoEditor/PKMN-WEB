import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  pokeBalls, 
  statusConditions, 
  statusMultipliers, 
  calculateCaptureProbability,
  type StatusCondition,
  type PokeBall
} from "@shared/schema";
import { Target, Heart, Zap, CircleDot, Moon, Waves, Timer, RefreshCw } from "lucide-react";

const statusIcons: Record<StatusCondition, string> = {
  none: "---",
  sleep: "SLP",
  freeze: "FRZ",
  paralysis: "PAR",
  burn: "BRN",
  poison: "PSN"
};

const statusColors: Record<StatusCondition, string> = {
  none: "bg-muted text-muted-foreground",
  sleep: "bg-blue-500 text-white",
  freeze: "bg-cyan-400 text-white",
  paralysis: "bg-yellow-500 text-black",
  burn: "bg-orange-500 text-white",
  poison: "bg-purple-500 text-white"
};

function getBallMultiplier(
  ball: PokeBall,
  conditions: {
    isFirstTurn: boolean;
    isNightOrCave: boolean;
    isWaterEncounter: boolean;
    isPreviouslyCaught: boolean;
    turnCount: number;
    defenderIsWaterOrBug: boolean;
  }
): number {
  if (!ball.special) return ball.multiplier;

  switch (ball.special) {
    case "first_turn":
      return conditions.isFirstTurn ? 5.0 : 1.0;
    case "night_cave":
      return conditions.isNightOrCave ? 3.0 : 1.0;
    case "water_encounter":
      return conditions.isWaterEncounter ? 3.5 : 1.0;
    case "repeat":
      return conditions.isPreviouslyCaught ? 3.5 : 1.0;
    case "over_time":
      const timerMult = Math.min(4.0, 1 + (conditions.turnCount * 0.3));
      return Math.round(timerMult * 10) / 10;
    case "water_bug":
      return conditions.defenderIsWaterOrBug ? 3.5 : 1.0;
    default:
      return ball.multiplier;
  }
}

export function CaptureCalculator() {
  const [maxHP, setMaxHP] = useState(100);
  const [currentHP, setCurrentHP] = useState(50);
  const [baseCatchRate, setBaseCatchRate] = useState(45);
  const [selectedBall, setSelectedBall] = useState<PokeBall>(pokeBalls[0]);
  const [status, setStatus] = useState<StatusCondition>("none");
  const [level, setLevel] = useState(50);

  const [isFirstTurn, setIsFirstTurn] = useState(true);
  const [isNightOrCave, setIsNightOrCave] = useState(false);
  const [isWaterEncounter, setIsWaterEncounter] = useState(false);
  const [isPreviouslyCaught, setIsPreviouslyCaught] = useState(false);
  const [turnCount, setTurnCount] = useState(1);
  const [defenderIsWaterOrBug, setDefenderIsWaterOrBug] = useState(false);

  const effectiveBallMultiplier = useMemo(() => {
    return getBallMultiplier(selectedBall, {
      isFirstTurn,
      isNightOrCave,
      isWaterEncounter,
      isPreviouslyCaught,
      turnCount,
      defenderIsWaterOrBug
    });
  }, [selectedBall, isFirstTurn, isNightOrCave, isWaterEncounter, isPreviouslyCaught, turnCount, defenderIsWaterOrBug]);

  const result = useMemo(() => {
    return calculateCaptureProbability({
      maxHP,
      currentHP,
      baseCatchRate,
      ballMultiplier: effectiveBallMultiplier,
      statusMultiplier: statusMultipliers[status],
      level
    });
  }, [maxHP, currentHP, baseCatchRate, effectiveBallMultiplier, status, level]);

  const hpPercentage = (currentHP / maxHP) * 100;

  const showConditions = selectedBall.special !== undefined && selectedBall.special !== null;
  const relevantCondition = selectedBall.special;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-display">
              <Target className="h-5 w-5 text-primary" />
              Wild Pokémon
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="level" className="text-sm font-medium uppercase tracking-wide">
                  Level
                </Label>
                <Input
                  id="level"
                  type="number"
                  min={1}
                  max={100}
                  value={level}
                  onChange={(e) => setLevel(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
                  data-testid="input-level"
                  className="h-12 text-base font-body"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="catchRate" className="text-sm font-medium uppercase tracking-wide">
                  Base Catch Rate
                </Label>
                <Input
                  id="catchRate"
                  type="number"
                  min={3}
                  max={255}
                  value={baseCatchRate}
                  onChange={(e) => setBaseCatchRate(Math.min(255, Math.max(3, parseInt(e.target.value) || 3)))}
                  data-testid="input-catch-rate"
                  className="h-12 text-base font-body"
                />
                <p className="text-xs text-muted-foreground">3 (Legendary) to 255 (Common)</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <Label className="text-sm font-medium uppercase tracking-wide">
                  HP Status
                </Label>
                <div className="flex items-center gap-2 text-sm font-body">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="font-semibold">{currentHP}</span>
                  <span className="text-muted-foreground">/</span>
                  <span>{maxHP}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="relative">
                  <div className="h-4 w-full rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-300"
                      style={{ 
                        width: `${hpPercentage}%`,
                        backgroundColor: hpPercentage > 50 ? '#22c55e' : hpPercentage > 25 ? '#eab308' : '#ef4444'
                      }}
                    />
                  </div>
                </div>
                <Slider
                  value={[currentHP]}
                  onValueChange={([value]) => setCurrentHP(value)}
                  min={1}
                  max={maxHP}
                  step={1}
                  data-testid="slider-current-hp"
                  className="py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxHP" className="text-xs text-muted-foreground">Max HP</Label>
                  <Input
                    id="maxHP"
                    type="number"
                    min={1}
                    max={999}
                    value={maxHP}
                    onChange={(e) => {
                      const newMax = Math.max(1, parseInt(e.target.value) || 1);
                      setMaxHP(newMax);
                      if (currentHP > newMax) setCurrentHP(newMax);
                    }}
                    data-testid="input-max-hp"
                    className="h-10 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentHP" className="text-xs text-muted-foreground">Current HP</Label>
                  <Input
                    id="currentHP"
                    type="number"
                    min={1}
                    max={maxHP}
                    value={currentHP}
                    onChange={(e) => setCurrentHP(Math.min(maxHP, Math.max(1, parseInt(e.target.value) || 1)))}
                    data-testid="input-current-hp"
                    className="h-10 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium uppercase tracking-wide">
                Status Condition
              </Label>
              <div className="flex flex-wrap gap-2">
                {statusConditions.map((s) => (
                  <Badge
                    key={s}
                    variant={status === s ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${status === s ? statusColors[s] : ""}`}
                    onClick={() => setStatus(s)}
                    data-testid={`badge-status-${s}`}
                  >
                    {statusIcons[s]} {s !== "none" && `×${statusMultipliers[s]}`}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <Label htmlFor="waterBug" className="text-sm font-body cursor-pointer flex items-center gap-2">
                <Waves className="h-4 w-4 text-blue-500" />
                Water or Bug Type
              </Label>
              <Switch 
                id="waterBug" 
                checked={defenderIsWaterOrBug} 
                onCheckedChange={setDefenderIsWaterOrBug}
                data-testid="switch-water-bug"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-display">
              <CircleDot className="h-5 w-5 text-primary" />
              Poké Ball
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {pokeBalls.map((ball) => (
                <div
                  key={ball.id}
                  onClick={() => setSelectedBall(ball)}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all hover-elevate ${
                    selectedBall.id === ball.id 
                      ? "border-primary bg-primary/5" 
                      : "border-border bg-card"
                  }`}
                  data-testid={`card-ball-${ball.id}`}
                >
                  <div className="font-semibold text-sm font-display">{ball.name}</div>
                  <div className="text-xs text-muted-foreground mt-1 font-body">{ball.description}</div>
                </div>
              ))}
            </div>

            {showConditions && (
              <div className="space-y-3 pt-4 border-t animate-fade-in-scale">
                <Label className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  Ball Conditions
                </Label>
                
                {relevantCondition === "first_turn" && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <Label htmlFor="firstTurn" className="text-sm font-body cursor-pointer flex items-center gap-2">
                      <Timer className="h-4 w-4 text-orange-500" />
                      First Turn of Battle
                    </Label>
                    <Switch 
                      id="firstTurn" 
                      checked={isFirstTurn} 
                      onCheckedChange={setIsFirstTurn}
                      data-testid="switch-first-turn"
                    />
                  </div>
                )}

                {relevantCondition === "night_cave" && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <Label htmlFor="nightCave" className="text-sm font-body cursor-pointer flex items-center gap-2">
                      <Moon className="h-4 w-4 text-indigo-500" />
                      Night or in a Cave
                    </Label>
                    <Switch 
                      id="nightCave" 
                      checked={isNightOrCave} 
                      onCheckedChange={setIsNightOrCave}
                      data-testid="switch-night-cave"
                    />
                  </div>
                )}

                {relevantCondition === "water_encounter" && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <Label htmlFor="waterEnc" className="text-sm font-body cursor-pointer flex items-center gap-2">
                      <Waves className="h-4 w-4 text-blue-500" />
                      Surfing or Fishing
                    </Label>
                    <Switch 
                      id="waterEnc" 
                      checked={isWaterEncounter} 
                      onCheckedChange={setIsWaterEncounter}
                      data-testid="switch-water-encounter"
                    />
                  </div>
                )}

                {relevantCondition === "repeat" && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <Label htmlFor="repeat" className="text-sm font-body cursor-pointer flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 text-green-500" />
                      Previously Caught Species
                    </Label>
                    <Switch 
                      id="repeat" 
                      checked={isPreviouslyCaught} 
                      onCheckedChange={setIsPreviouslyCaught}
                      data-testid="switch-repeat"
                    />
                  </div>
                )}

                {relevantCondition === "water_bug" && (
                  <div className="p-3 rounded-lg bg-blue-500/10 text-sm font-body">
                    <span className="text-blue-600 dark:text-blue-400">
                      Net Ball is effective against Water or Bug types. Toggle above if applicable.
                    </span>
                  </div>
                )}

                {relevantCondition === "over_time" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="turnCount" className="text-sm font-body flex items-center gap-2">
                        <Timer className="h-4 w-4 text-purple-500" />
                        Turn Count
                      </Label>
                      <span className="text-sm font-semibold">Turn {turnCount}</span>
                    </div>
                    <Slider
                      value={[turnCount]}
                      onValueChange={([value]) => setTurnCount(value)}
                      min={1}
                      max={10}
                      step={1}
                      data-testid="slider-turn-count"
                      className="py-2"
                    />
                    <p className="text-xs text-muted-foreground">
                      Timer Ball: ×{Math.min(4.0, 1 + (turnCount * 0.3)).toFixed(1)} multiplier at turn {turnCount}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-card to-muted/30">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-display">
              <Zap className="h-5 w-5 text-primary" />
              Capture Probability
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center animate-fade-in-scale">
              <div 
                className="text-6xl font-bold font-display"
                style={{ 
                  color: result.probability >= 75 ? '#22c55e' : 
                         result.probability >= 50 ? '#eab308' : 
                         result.probability >= 25 ? '#f97316' : '#ef4444'
                }}
                data-testid="text-capture-probability"
              >
                {result.probability.toFixed(1)}%
              </div>
              <p className="text-muted-foreground mt-2 font-body">
                {result.probability >= 75 ? "Very likely to catch!" :
                 result.probability >= 50 ? "Good chance!" :
                 result.probability >= 25 ? "Keep trying..." :
                 "This will be tough!"}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-body">
                <span>Catch Chance</span>
                <span className="font-semibold">{result.probability.toFixed(1)}%</span>
              </div>
              <Progress 
                value={result.probability} 
                className="h-4"
                data-testid="progress-capture"
              />
            </div>

            <div className="space-y-3 pt-4 border-t">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Formula Breakdown
              </h4>
              {result.breakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <span className="text-sm font-body">{item.label}</span>
                  <span className="font-semibold font-body">
                    {item.label === "Ball Multiplier" ? `×${effectiveBallMultiplier}` : item.effect}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between py-2 bg-muted/50 rounded-lg px-3 mt-2">
                <span className="text-sm font-semibold font-body">Modified Catch Rate</span>
                <span className="font-bold font-display">{result.modifiedCatchRate.toFixed(2)}/255</span>
              </div>
            </div>

            {selectedBall.special && (
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-sm font-body">
                  <strong>{selectedBall.name}:</strong>{" "}
                  {effectiveBallMultiplier === selectedBall.multiplier 
                    ? `Condition met! Using ×${effectiveBallMultiplier} multiplier.`
                    : `Condition not met. Using ×${effectiveBallMultiplier} multiplier.`
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-xs text-muted-foreground space-y-2 font-body">
              <p><strong>Formula:</strong> (3×MaxHP - 2×CurrentHP) / (3×MaxHP) × CatchRate × Ball × Status</p>
              <p><strong>Probability:</strong> ModifiedRate / 255 × 100%</p>
              <p className="text-xs opacity-75">Based on Generation 3+ capture mechanics</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}