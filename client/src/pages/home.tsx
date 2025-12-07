import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Swords, Grid3X3, Calculator, Sparkles } from "lucide-react";

interface HomeProps {
  onNavigate: (tab: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const features = [
    {
      id: "capture",
      title: "Capture Calculator",
      description: "Calculate the probability of catching any wild Pokémon based on HP, status, and Poké Ball used.",
      icon: Target,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      id: "damage",
      title: "Damage Calculator",
      description: "Compute damage ranges and type effectiveness for any move against any defending Pokémon.",
      icon: Swords,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      id: "types",
      title: "Type Chart",
      description: "Interactive type effectiveness chart showing all matchups between the 18 Pokémon types.",
      icon: Grid3X3,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Sparkles className="h-4 w-4" />
          Free Pokémon Battle Tools
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-display tracking-tight">
          Pokémon Calculators
        </h1>
        <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
          Professional-grade tools for trainers. Calculate capture rates, predict damage output, 
          and master type matchups with our comprehensive calculator suite.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card 
            key={feature.id}
            className="group hover-elevate cursor-pointer transition-all"
            onClick={() => onNavigate(feature.id)}
            data-testid={`card-feature-${feature.id}`}
          >
            <CardHeader className="pb-4">
              <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <CardTitle className="text-xl font-display">{feature.title}</CardTitle>
              <CardDescription className="font-body">{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full"
                data-testid={`button-open-${feature.id}`}
              >
                Open Calculator
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Calculator className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-semibold font-display mb-2">
                Accurate Battle Mechanics
              </h3>
              <p className="text-muted-foreground font-body">
                Our calculators use the official formulas from mainline Pokémon games. 
                Get precise capture probabilities and damage ranges based on Generation 5+ mechanics.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold font-display text-primary">18</div>
          <div className="text-sm text-muted-foreground font-body">Pokémon Types</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold font-display text-primary">12</div>
          <div className="text-sm text-muted-foreground font-body">Poké Ball Types</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold font-display text-primary">6</div>
          <div className="text-sm text-muted-foreground font-body">Status Conditions</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold font-display text-primary">324</div>
          <div className="text-sm text-muted-foreground font-body">Type Matchups</div>
        </Card>
      </div>

      <div className="text-center text-sm text-muted-foreground font-body pt-4 border-t">
        <p>
          Built for trainers who want to optimize their gameplay. 
          Based on research from Bulbapedia and Smogon.
        </p>
      </div>
    </div>
  );
}