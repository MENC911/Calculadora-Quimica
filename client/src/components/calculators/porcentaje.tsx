import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface FormData {
  normalidadTitulante: number;
  volumenTitulante: number;
  pmeqMuestra: number;
  pesoMuestra: number;
}

export default function Porcentaje() {
  const [resultado, setResultado] = useState<{ porcentaje: number; formula: string } | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const { normalidadTitulante, volumenTitulante, pmeqMuestra, pesoMuestra } = data;
    
    // Fórmula: (N × mL × pmeq × 100) ÷ gramos_muestra
    const porcentaje = (normalidadTitulante * volumenTitulante * pmeqMuestra * 100) / pesoMuestra;
    const formula = `(${normalidadTitulante} N × ${volumenTitulante} mL × ${pmeqMuestra} mg/meq × 100) ÷ ${pesoMuestra} g`;
    
    setResultado({ porcentaje, formula });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="normalidadTitulante">Normalidad del Titulante</Label>
          <Input
            id="normalidadTitulante"
            type="number"
            step="any"
            placeholder="Normalidad"
            {...register("normalidadTitulante", { 
              required: "Este campo es requerido",
              min: { value: 0.001, message: "El valor debe ser mayor a 0" }
            })}
            data-testid="input-normalidad-titulante"
          />
          {errors.normalidadTitulante && (
            <p className="text-sm text-destructive mt-1">{errors.normalidadTitulante.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="volumenTitulante">Volumen Titulante (mL)</Label>
          <Input
            id="volumenTitulante"
            type="number"
            step="any"
            placeholder="Volumen del titulante"
            {...register("volumenTitulante", { 
              required: "Este campo es requerido",
              min: { value: 0.001, message: "El valor debe ser mayor a 0" }
            })}
            data-testid="input-volumen-titulante"
          />
          {errors.volumenTitulante && (
            <p className="text-sm text-destructive mt-1">{errors.volumenTitulante.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="pmeqMuestra">Peso Miliequivalente de la Muestra</Label>
          <Input
            id="pmeqMuestra"
            type="number"
            step="any"
            placeholder="PMEQ de la muestra"
            {...register("pmeqMuestra", { 
              required: "Este campo es requerido",
              min: { value: 0.001, message: "El valor debe ser mayor a 0" }
            })}
            data-testid="input-pmeq-muestra"
          />
          {errors.pmeqMuestra && (
            <p className="text-sm text-destructive mt-1">{errors.pmeqMuestra.message}</p>
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
