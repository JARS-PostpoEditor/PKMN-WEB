import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Home } from "@/pages/home";
import { CaptureCalculator } from "@/components/capture-calculator";
import { DamageCalculator } from "@/components/damage-calculator";
import { TypeChart } from "@/components/type-chart";
import { Target, Swords, Grid3X3, Home as HomeIcon, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

type TabId = "home" | "capture" | "damage" | "types";

interface Tab {
  id: TabId;
  label: string;
  icon: typeof HomeIcon;
}

const tabs: Tab[] = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "capture", label: "Capture", icon: Target },
  { id: "damage", label: "Damage", icon: Swords },
  { id: "types", label: "Types", icon: Grid3X3 },
];

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabId>("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home onNavigate={(tab) => setActiveTab(tab as TabId)} />;
      case "capture":
        return <CaptureCalculator />;
      case "damage":
        return <DamageCalculator />;
      case "types":
        return <TypeChart />;
      default:
        return <Home onNavigate={(tab) => setActiveTab(tab as TabId)} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div 
              className="flex items-center gap-3 cursor-pointer" 
              onClick={() => setActiveTab("home")}
              data-testid="link-logo"
            >
              <div className="relative w-10 h-10">
                <Circle className="w-10 h-10 text-primary fill-primary" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white border-2 border-primary" />
                </div>
              </div>
              <span className="font-bold text-xl font-display hidden sm:block">
                Pokémon Calc
              </span>
            </div>

            <nav className="flex items-center gap-1 md:gap-2">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "gap-2 rounded-full px-3 md:px-4",
                    activeTab === tab.id && "shadow-sm"
                  )}
                  data-testid={`button-tab-${tab.id}`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden md:inline">{tab.label}</span>
                </Button>
              ))}
            </nav>

            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div key={activeTab} className="animate-fade-in-scale">
          {renderContent()}
        </div>
      </main>

      <footer className="border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground font-body">
            <div className="flex items-center gap-2">
              <Circle className="w-5 h-5 text-primary fill-primary" />
              <span>Pokémon Calculators</span>
            </div>
            <p>
              Formulas based on Bulbapedia research. Not affiliated with Nintendo or The Pokémon Company.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="pokemon-calc-theme">
        <TooltipProvider>
          <AppContent />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;