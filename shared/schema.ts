import { z } from "zod";

export const pokemonTypes = [
  "normal", "fire", "water", "electric", "grass", "ice",
  "fighting", "poison", "ground", "flying", "psychic", "bug",
  "rock", "ghost", "dragon", "dark", "steel", "fairy"
] as const;

export type PokemonType = typeof pokemonTypes[number];

export const statusConditions = ["none", "sleep", "freeze", "paralysis", "burn", "poison"] as const;
export type StatusCondition = typeof statusConditions[number];

export const statusMultipliers: Record<StatusCondition, number> = {
  none: 1.0,
  sleep: 2.5,
  freeze: 2.5,
  paralysis: 1.5,
  burn: 1.5,
  poison: 1.5
};

export interface PokeBall {
  id: string;
  name: string;
  multiplier: number;
  description: string;
  special?: string;
}

export const pokeBalls: PokeBall[] = [
  { id: "pokeball", name: "Poké Ball", multiplier: 1.0, description: "Standard catch rate" },
  { id: "greatball", name: "Great Ball", multiplier: 1.5, description: "1.5× catch rate" },
  { id: "ultraball", name: "Ultra Ball", multiplier: 2.0, description: "2× catch rate" },
  { id: "masterball", name: "Master Ball", multiplier: 255, description: "100% catch rate" },
  { id: "netball", name: "Net Ball", multiplier: 3.5, description: "3.5× for Water/Bug types", special: "water_bug" },
  { id: "duskball", name: "Dusk Ball", multiplier: 3.0, description: "3× at night or in caves", special: "night_cave" },
  { id: "quickball", name: "Quick Ball", multiplier: 5.0, description: "5× on first turn", special: "first_turn" },
  { id: "timerball", name: "Timer Ball", multiplier: 4.0, description: "Up to 4× over time", special: "over_time" },
  { id: "repeatball", name: "Repeat Ball", multiplier: 3.5, description: "3.5× for previously caught", special: "repeat" },
  { id: "diveball", name: "Dive Ball", multiplier: 3.5, description: "3.5× while surfing/fishing", special: "water_encounter" },
  { id: "luxuryball", name: "Luxury Ball", multiplier: 1.0, description: "Increases friendship gain" },
  { id: "premierball", name: "Premier Ball", multiplier: 1.0, description: "Commemorative ball" }
];

export const typeChart: Record<PokemonType, Record<PokemonType, number>> = {
  normal: { normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 0.5, ghost: 0, dragon: 1, dark: 1, steel: 0.5, fairy: 1 },
  fire: { normal: 1, fire: 0.5, water: 0.5, electric: 1, grass: 2, ice: 2, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 2, rock: 0.5, ghost: 1, dragon: 0.5, dark: 1, steel: 2, fairy: 1 },
  water: { normal: 1, fire: 2, water: 0.5, electric: 1, grass: 0.5, ice: 1, fighting: 1, poison: 1, ground: 2, flying: 1, psychic: 1, bug: 1, rock: 2, ghost: 1, dragon: 0.5, dark: 1, steel: 1, fairy: 1 },
  electric: { normal: 1, fire: 1, water: 2, electric: 0.5, grass: 0.5, ice: 1, fighting: 1, poison: 1, ground: 0, flying: 2, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 0.5, dark: 1, steel: 1, fairy: 1 },
  grass: { normal: 1, fire: 0.5, water: 2, electric: 1, grass: 0.5, ice: 1, fighting: 1, poison: 0.5, ground: 2, flying: 0.5, psychic: 1, bug: 0.5, rock: 2, ghost: 1, dragon: 0.5, dark: 1, steel: 0.5, fairy: 1 },
  ice: { normal: 1, fire: 0.5, water: 0.5, electric: 1, grass: 2, ice: 0.5, fighting: 1, poison: 1, ground: 2, flying: 2, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 2, dark: 1, steel: 0.5, fairy: 1 },
  fighting: { normal: 2, fire: 1, water: 1, electric: 1, grass: 1, ice: 2, fighting: 1, poison: 0.5, ground: 1, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dragon: 1, dark: 2, steel: 2, fairy: 0.5 },
  poison: { normal: 1, fire: 1, water: 1, electric: 1, grass: 2, ice: 1, fighting: 1, poison: 0.5, ground: 0.5, flying: 1, psychic: 1, bug: 1, rock: 0.5, ghost: 0.5, dragon: 1, dark: 1, steel: 0, fairy: 2 },
  ground: { normal: 1, fire: 2, water: 1, electric: 2, grass: 0.5, ice: 1, fighting: 1, poison: 2, ground: 1, flying: 0, psychic: 1, bug: 0.5, rock: 2, ghost: 1, dragon: 1, dark: 1, steel: 2, fairy: 1 },
  flying: { normal: 1, fire: 1, water: 1, electric: 0.5, grass: 2, ice: 1, fighting: 2, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 2, rock: 0.5, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 1 },
  psychic: { normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 2, poison: 2, ground: 1, flying: 1, psychic: 0.5, bug: 1, rock: 1, ghost: 1, dragon: 1, dark: 0, steel: 0.5, fairy: 1 },
  bug: { normal: 1, fire: 0.5, water: 1, electric: 1, grass: 2, ice: 1, fighting: 0.5, poison: 0.5, ground: 1, flying: 0.5, psychic: 2, bug: 1, rock: 1, ghost: 0.5, dragon: 1, dark: 2, steel: 0.5, fairy: 0.5 },
  rock: { normal: 1, fire: 2, water: 1, electric: 1, grass: 1, ice: 2, fighting: 0.5, poison: 1, ground: 0.5, flying: 2, psychic: 1, bug: 2, rock: 1, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 1 },
  ghost: { normal: 0, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 2, bug: 1, rock: 1, ghost: 2, dragon: 1, dark: 0.5, steel: 1, fairy: 1 },
  dragon: { normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 2, dark: 1, steel: 0.5, fairy: 0 },
  dark: { normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 0.5, poison: 1, ground: 1, flying: 1, psychic: 2, bug: 1, rock: 1, ghost: 2, dragon: 1, dark: 0.5, steel: 1, fairy: 0.5 },
  steel: { normal: 1, fire: 0.5, water: 0.5, electric: 0.5, grass: 1, ice: 2, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 2, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 2 },
  fairy: { normal: 1, fire: 0.5, water: 1, electric: 1, grass: 1, ice: 1, fighting: 2, poison: 0.5, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 2, dark: 2, steel: 0.5, fairy: 1 }
};

export interface CaptureInput {
  maxHP: number;
  currentHP: number;
  baseCatchRate: number;
  ballMultiplier: number;
  statusMultiplier: number;
  level: number;
}

export interface CaptureResult {
  probability: number;
  hpFactor: number;
  modifiedCatchRate: number;
  breakdown: {
    label: string;
    value: number;
    effect: string;
  }[];
}

export interface DamageInput {
  level: number;
  power: number;
  attack: number;
  defense: number;
  attackerTypes: PokemonType[];
  defenderTypes: PokemonType[];
  moveType: PokemonType;
  critical: boolean;
  weather: "none" | "sun" | "rain" | "sandstorm" | "hail";
  itemMultiplier: number;
}

export interface DamageResult {
  min: number;
  max: number;
  typeEffectiveness: number;
  effectivenessLabel: string;
  hitsToKO: number;
  breakdown: {
    label: string;
    value: number | string;
  }[];
}

export function calculateCaptureProbability(input: CaptureInput): CaptureResult {
  const { maxHP, currentHP, baseCatchRate, ballMultiplier, statusMultiplier } = input;
  
  const hpFactor = (3 * maxHP - 2 * currentHP) / (3 * maxHP);
  const modifiedRate = hpFactor * baseCatchRate * ballMultiplier * statusMultiplier;
  
  let probability: number;
  if (modifiedRate >= 255 || ballMultiplier >= 255) {
    probability = 100;
  } else {
    probability = Math.min(100, Math.max(0, (modifiedRate / 255) * 100));
  }

  return {
    probability: Math.round(probability * 100) / 100,
    hpFactor: Math.round(hpFactor * 1000) / 1000,
    modifiedCatchRate: Math.round(modifiedRate * 100) / 100,
    breakdown: [
      { label: "HP Factor", value: hpFactor, effect: `×${hpFactor.toFixed(3)}` },
      { label: "Base Catch Rate", value: baseCatchRate, effect: `${baseCatchRate}/255` },
      { label: "Ball Multiplier", value: ballMultiplier, effect: `×${ballMultiplier}` },
      { label: "Status Multiplier", value: statusMultiplier, effect: `×${statusMultiplier}` }
    ]
  };
}

export function calculateDamage(input: DamageInput): DamageResult {
  const { level, power, attack, defense, attackerTypes, defenderTypes, moveType, critical, itemMultiplier } = input;
  
  let typeEffectiveness = 1;
  for (const defType of defenderTypes) {
    typeEffectiveness *= typeChart[moveType]?.[defType] ?? 1;
  }

  const hasStab = attackerTypes.includes(moveType);
  const stabMultiplier = hasStab ? 1.5 : 1;
  const critMultiplier = critical ? 1.5 : 1;

  const baseDamage = Math.floor(((2 * level / 5 + 2) * power * (attack / defense)) / 50) + 2;
  
  const minRoll = 0.85;
  const maxRoll = 1.0;
  
  const min = Math.floor(baseDamage * stabMultiplier * typeEffectiveness * critMultiplier * itemMultiplier * minRoll);
  const max = Math.floor(baseDamage * stabMultiplier * typeEffectiveness * critMultiplier * itemMultiplier * maxRoll);

  let effectivenessLabel = "Normal";
  if (typeEffectiveness === 0) effectivenessLabel = "No Effect";
  else if (typeEffectiveness === 0.25) effectivenessLabel = "×0.25 Not Very Effective";
  else if (typeEffectiveness === 0.5) effectivenessLabel = "×0.5 Not Very Effective";
  else if (typeEffectiveness === 2) effectivenessLabel = "×2 Super Effective";
  else if (typeEffectiveness === 4) effectivenessLabel = "×4 Super Effective";

  const avgDamage = (min + max) / 2;
  const hitsToKO = avgDamage > 0 ? Math.ceil(100 / (avgDamage / 1)) : Infinity;

  return {
    min,
    max,
    typeEffectiveness,
    effectivenessLabel,
    hitsToKO,
    breakdown: [
      { label: "Base Power", value: power },
      { label: "Attack/Defense", value: `${attack}/${defense}` },
      { label: "STAB", value: stabMultiplier === 1.5 ? "×1.5" : "×1.0" },
      { label: "Type Effectiveness", value: `×${typeEffectiveness}` },
      { label: "Critical Hit", value: critMultiplier === 1.5 ? "×1.5" : "×1.0" },
      { label: "Item Bonus", value: `×${itemMultiplier}` }
    ]
  };
}

export const users = {} as any;
export const insertUserSchema = z.object({ username: z.string(), password: z.string() });
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = { id: string; username: string; password: string };