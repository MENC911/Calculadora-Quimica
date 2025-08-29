import { useState } from "react";
import { Beaker } from "lucide-react";
import CalculatorCard from "@/components/calculator-card";
import CalculatorModal from "@/components/calculator-modal";

export default function Home() {
  const [activeCalculator, setActiveCalculator] = useState<string | null>(null);

  const calculators = [
    {
      id: "miliequivalente",
      title: "Peso Miliequivalente",
      description: "Calcula el peso miliequivalente (pmeq) de una sustancia basado en su peso molecular y número de electrones.",
      icon: "balance"
    },
    {
      id: "normalidad",
      title: "Normalidad",
      description: "Determina la normalidad de una solución usando masa del soluto, pmeq y volumen.",
      icon: "chart"
    },
    {
      id: "miligramos",
      title: "Cálculo de Miligramos",
      description: "Calcula miligramos de analito en titulaciones volumétricas con factores de dilución.",
      icon: "calendar"
    },
    {
      id: "porcentaje",
      title: "Porcentaje de Analito",
      description: "Determina el porcentaje del analito en una muestra mediante análisis volumétrico.",
      icon: "pie-chart"
    },
    {
      id: "potencial",
      title: "Potencial Eléctrico",
      description: "Calcula el potencial de celda usando la ecuación de Nernst y potenciales estándar.",
      icon: "zap"
    },
    {
      id: "molecular",
      title: "Peso Molecular",
      description: "Calcula el peso molecular de compuestos basado en su composición elemental.",
      icon: "flask"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="mb-6">
            <Beaker className="w-16 h-16 mx-auto mb-4 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="title-main">
            Calculadora Química
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100" data-testid="text-subtitle">
            Herramientas interactivas para cálculos en química analítica y electroquímica
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
              Análisis Volumétrico
            </span>
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
              Electroquímica
            </span>
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
              Cálculos Precisos
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="title-calculators">
            Calculadoras Disponibles
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-description">
            Selecciona la herramienta que necesitas para realizar tus cálculos de química analítica
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calculator) => (
            <CalculatorCard
              key={calculator.id}
              {...calculator}
              onOpen={() => setActiveCalculator(calculator.id)}
            />
          ))}
        </div>
      </div>

      {/* Calculator Modal */}
      <CalculatorModal
        calculatorType={activeCalculator}
        isOpen={!!activeCalculator}
        onClose={() => setActiveCalculator(null)}
      />
    </div>
  );
}
