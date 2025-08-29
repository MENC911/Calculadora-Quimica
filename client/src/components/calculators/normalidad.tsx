import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface FormData {
  masaSoluto: number;
  pmeq: number;
  volumenSolucion: number;
}

export default function Normalidad() {
  const [resultado, setResultado] = useState<{ normalidad: number; formula: string } | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const { masaSoluto, pmeq, volumenSolucion } = data;
    
    const normalidad = masaSoluto / (pmeq * volumenSolucion);
    const formula = `${masaSoluto} g ÷ (${pmeq} g/meq × ${volumenSolucion} L) = ${normalidad.toFixed(4)} N`;
    
    setResultado({ normalidad, formula });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="masaSoluto">Masa del Soluto (g)</Label>
          <Input
            id="masaSoluto"
            type="number"
            step="any"
            placeholder="Masa en gramos"
            {...register("masaSoluto", { 
              required: "Este campo es requerido",
              min: { value: 0.001, message: "El valor debe ser mayor a 0" }
            })}
            data-testid="input-masa-soluto"
          />
          {errors.masaSoluto && (
            <p className="text-sm text-destructive mt-1">{errors.masaSoluto.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="pmeq">Peso Miliequivalente (g/meq)</Label>
          <Input
            id="pmeq"
            type="number"
            step="any"
            placeholder="PMEQ en g/meq"
            {...register("pmeq", { 
              required: "Este campo es requerido",
              min: { value: 0.001, message: "El valor debe ser mayor a 0" }
            })}
            data-testid="input-pmeq"
          />
          {errors.pmeq && (
            <p className="text-sm text-destructive mt-1">{errors.pmeq.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="volumenSolucion">Volumen de Solución (L)</Label>
          <Input
            id="volumenSolucion"
            type="number"
            step="any"
            placeholder="Volumen en litros"
            {...register("volumenSolucion", { 
              required: "Este campo es requerido",
              min: { value: 0.001, message: "El valor debe ser mayor a 0" }
            })}
            data-testid="input-volumen-solucion"
          />
          {errors.volumenSolucion && (
            <p className="text-sm text-destructive mt-1">{errors.volumenSolucion.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" data-testid="button-calcular-normalidad">
          Calcular Normalidad
        </Button>
      </form>

      {resultado && (
        <Card data-testid="result-normalidad">
          <CardContent className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">Resultado:</h4>
            <p className="text-lg font-bold" data-testid="text-resultado-normalidad">
              Normalidad: {resultado.normalidad.toFixed(4)} N
            </p>
            <p className="text-sm text-muted-foreground mt-1" data-testid="text-formula-normalidad">
              {resultado.formula}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
