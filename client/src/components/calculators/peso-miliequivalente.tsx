import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface FormData {
  pesoMolecular: number;
  numElectrones: number;
}

export default function PesoMiliequivalente() {
  const [resultado, setResultado] = useState<{ pmeq: number; formula: string; formulaGeneral: string; } | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const { pesoMolecular, numElectrones } = data;
    
    if (numElectrones === 0) {
      return;
    }

    const pmeq = pesoMolecular / (numElectrones * 1000);
    const formulaGeneral = "PMeq = PM / (n × 1000)";
    const formula = `${pesoMolecular} g/mol ÷ (${numElectrones} X 1000) equivalentes = ${pmeq.toFixed(4)} g/meq`;

    setResultado({ pmeq, formula, formulaGeneral });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="pesoMolecular">Peso Molecular (g/mol)</Label>
          <Input
            id="pesoMolecular"
            type="number"
            step="any"
            placeholder="Ingrese el peso molecular"
            {...register("pesoMolecular", { 
              required: "Este campo es requerido",
              min: { value: 0.001, message: "El valor debe ser mayor a 0" }
            })}
            data-testid="input-peso-molecular"
          />
          {errors.pesoMolecular && (
            <p className="text-sm text-destructive mt-1">{errors.pesoMolecular.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="numElectrones">Factor de equivalencia</Label>
          <Input
            id="numElectrones"
            type="number"
            min="1"
            placeholder="Factor de equivalencia"
            {...register("numElectrones", { 
              required: "Este campo es requerido",
              min: { value: 1, message: "Debe ser al menos 1 electrón" }
            })}
            data-testid="input-num-electrones"
          />
          {errors.numElectrones && (
            <p className="text-sm text-destructive mt-1">{errors.numElectrones.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" data-testid="button-calcular-miliequivalente">
          Calcular Peso Miliequivalente
        </Button>
      </form>

      {resultado && (
        <Card data-testid="result-miliequivalente">
          <CardContent className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">Resultado:</h4>
            <p className="text-lg font-bold" data-testid="text-resultado-pmeq">
              Peso Miliequivalente: {resultado.pmeq.toFixed(4)} g/meq
            </p>
            <p className="text-sm text-muted-foreground mt-1" data-testid="text-formula-pmeq">
              {resultado.formula}
            </p>
            <p className="text-sm text-muted-foreground mt-1" data-testid="text-formula-general-pmeq">
              {resultado.formulaGeneral}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
