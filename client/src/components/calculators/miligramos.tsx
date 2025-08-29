import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface FormData {
  volumenGastado: number;
  normalidadTitulante: number;
  pmeqAnalito: number;
  factorDilucion: number;
}

export default function Miligramos() {
  const [resultado, setResultado] = useState<{ miligramos: number; formula: string } | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      factorDilucion: 1
    }
  });

  const onSubmit = (data: FormData) => {
    const { volumenGastado, normalidadTitulante, pmeqAnalito, factorDilucion } = data;
    
    const miligramos = (volumenGastado * normalidadTitulante * pmeqAnalito * factorDilucion) / 1000;
    const formula = `(${volumenGastado} mL × ${normalidadTitulante} N × ${pmeqAnalito} mg/meq × ${factorDilucion}) ÷ 1000`;
    
    setResultado({ miligramos, formula });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="volumenGastado">Volumen Gastado (mL)</Label>
          <Input
            id="volumenGastado"
            type="number"
            step="any"
            placeholder="Volumen del titulante"
            {...register("volumenGastado", { 
              required: "Este campo es requerido",
              min: { value: 0.001, message: "El valor debe ser mayor a 0" }
            })}
            data-testid="input-volumen-gastado"
          />
          {errors.volumenGastado && (
            <p className="text-sm text-destructive mt-1">{errors.volumenGastado.message}</p>
          )}
        </div>

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
          <Label htmlFor="pmeqAnalito">Peso Miliequivalente del Analito</Label>
          <Input
            id="pmeqAnalito"
            type="number"
            step="any"
            placeholder="PMEQ del analito"
            {...register("pmeqAnalito", { 
              required: "Este campo es requerido",
              min: { value: 0.001, message: "El valor debe ser mayor a 0" }
            })}
            data-testid="input-pmeq-analito"
          />
          {errors.pmeqAnalito && (
            <p className="text-sm text-destructive mt-1">{errors.pmeqAnalito.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="factorDilucion">Factor de Dilución</Label>
          <Input
            id="factorDilucion"
            type="number"
            step="any"
            placeholder="Factor de dilución (opcional)"
            {...register("factorDilucion", { 
              min: { value: 0.001, message: "El valor debe ser mayor a 0" }
            })}
            data-testid="input-factor-dilucion"
          />
          {errors.factorDilucion && (
            <p className="text-sm text-destructive mt-1">{errors.factorDilucion.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" data-testid="button-calcular-miligramos">
          Calcular Miligramos
        </Button>
      </form>

      {resultado && (
        <Card data-testid="result-miligramos">
          <CardContent className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">Resultado:</h4>
            <p className="text-lg font-bold" data-testid="text-resultado-miligramos">
              Miligramos de Analito: {resultado.miligramos.toFixed(4)} mg
            </p>
            <p className="text-sm text-muted-foreground mt-1" data-testid="text-formula-miligramos">
              {resultado.formula}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
