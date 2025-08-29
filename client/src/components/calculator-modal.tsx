import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PesoMiliequivalente from "./calculators/peso-miliequivalente";
import Normalidad from "./calculators/normalidad";
import Miligramos from "./calculators/miligramos";
import Porcentaje from "./calculators/porcentaje";
import Potencial from "./calculators/potencial";
import PesoMolecular from "./calculators/peso-molecular";

interface CalculatorModalProps {
  calculatorType: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const calculatorTitles: Record<string, string> = {
  miliequivalente: "Peso Miliequivalente",
  normalidad: "Normalidad",
  miligramos: "Cálculo de Miligramos",
  porcentaje: "Porcentaje de Analito",
  potencial: "Potencial Eléctrico",
  molecular: "Peso Molecular",
};

export default function CalculatorModal({ calculatorType, isOpen, onClose }: CalculatorModalProps) {
  const renderCalculator = () => {
    switch (calculatorType) {
      case "miliequivalente":
        return <PesoMiliequivalente />;
      case "normalidad":
        return <Normalidad />;
      case "miligramos":
        return <Miligramos />;
      case "porcentaje":
        return <Porcentaje />;
      case "potencial":
        return <Potencial />;
      case "molecular":
        return <PesoMolecular />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="modal-calculator">
        <DialogHeader>
          <DialogTitle data-testid="text-modal-title">
            {calculatorType ? calculatorTitles[calculatorType] : "Calculadora"}
          </DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            data-testid="button-close-modal"
          >
            <X className="w-6 h-6" />
          </button>
        </DialogHeader>
        <div className="py-4">
          {renderCalculator()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
