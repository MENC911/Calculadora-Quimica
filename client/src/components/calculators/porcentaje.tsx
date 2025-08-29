import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface FormData {
  mgAnalito: number;
  pesoMuestra: number;
}

export default function Porcentaje() {
  const [resultado, setResultado] = useState<{ porcentaje: number; formula: string } | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const { mgAnalito, pesoMuestra } = data;
    
    const porcentaje = (mgAnalito / (pesoMuestra * 1000)) * 100;
    const formula = `(${mgAnalito} mg ÷ ${pesoMuestra * 1000} mg muestra) × 100`;
    
    setResultado({ porcentaje, formula });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="mgAnalito">Miligramos de Analito</Label>
          <Input
            id="mgAnalito"
            type="number"
            step="any"
            placeholder="mg de analito calculados"
            {...register("mgAnalito", { 
              required: "Este campo es requerido",
              min: { value: 0, message: "El valor debe ser mayor o igual a 0" }
            })}
            data-testid="input-mg-analito"
          />
          {errors.mgAnalito && (
            <p className="text-sm text-destructive mt-1">{errors.mgAnalito.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="pesoMuestra">Peso de la Muestra (g)</Label>
          <Input
            id="pesoMuestra"
            type="number"
            step="any"
            placeholder="Peso de la muestra"
            {...register("pesoMuestra", { 
              required: "Este campo es requerido",
              min: { value: 0.001, message: "El valor debe ser mayor a 0" }
            })}
            data-testid="input-peso-muestra"
          />
          {errors.pesoMuestra && (
            <p className="text-sm text-destructive mt-1">{errors.pesoMuestra.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" data-testid="button-calcular-porcentaje">
          Calcular Porcentaje
        </Button>
      </form>

      {resultado && (
        <Card data-testid="result-porcentaje">
          <CardContent className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">Resultado:</h4>
            <p className="text-lg font-bold" data-testid="text-resultado-porcentaje">
              Porcentaje de Analito: {resultado.porcentaje.toFixed(4)} %
            </p>
            <p className="text-sm text-muted-foreground mt-1" data-testid="text-formula-porcentaje">
              {resultado.formula}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
