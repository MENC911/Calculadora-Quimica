import { Scale, BarChart, Calendar, PieChart, Zap, Beaker } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CalculatorCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  onOpen: () => void;
}

const iconMap = {
  balance: Scale,
  chart: BarChart,
  calendar: Calendar,
  "pie-chart": PieChart,
  zap: Zap,
  flask: Beaker,
};

export default function CalculatorCard({ title, description, icon, onOpen }: CalculatorCardProps) {
  const IconComponent = iconMap[icon as keyof typeof iconMap] || Beaker;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200" data-testid={`card-calculator-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
            <IconComponent className="w-6 h-6 text-primary-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-card-foreground" data-testid={`text-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {title}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4" data-testid={`text-description-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {description}
        </p>
        <Button 
          onClick={onOpen} 
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          data-testid={`button-open-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          Abrir Calculadora
        </Button>
      </CardContent>
    </Card>
  );
}
