import { type PokemonType } from "@shared/schema";
import { cn } from "@/lib/utils";

const typeColors: Record<PokemonType, string> = {
  normal: "bg-pokemon-normal",
  fire: "bg-pokemon-fire",
  water: "bg-pokemon-water",
  electric: "bg-pokemon-electric",
  grass: "bg-pokemon-grass",
  ice: "bg-pokemon-ice",
  fighting: "bg-pokemon-fighting",
  poison: "bg-pokemon-poison",
  ground: "bg-pokemon-ground",
  flying: "bg-pokemon-flying",
  psychic: "bg-pokemon-psychic",
  bug: "bg-pokemon-bug",
  rock: "bg-pokemon-rock",
  ghost: "bg-pokemon-ghost",
  dragon: "bg-pokemon-dragon",
  dark: "bg-pokemon-dark",
  steel: "bg-pokemon-steel",
  fairy: "bg-pokemon-fairy",
};

interface TypeBadgeProps {
  type: PokemonType;
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}

export function TypeBadge({ type, size = "md", className, onClick, selected }: TypeBadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-xs",
    lg: "px-4 py-1.5 text-sm",
  };

  return (
    <span
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      data-testid={`badge-type-${type}`}
      className={cn(
        typeColors[type],
        sizeClasses[size],
        "rounded-md font-semibold uppercase tracking-wide text-white shadow-sm inline-flex items-center justify-center",
        onClick && "cursor-pointer transition-transform hover:scale-105",
        selected && "ring-2 ring-white ring-offset-2 ring-offset-background",
        className
      )}
    >
      {type}
    </span>
  );
}