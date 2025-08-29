import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface FormData {
  volumenGastado: number;
  normalidadTitulante: number;
  pmeqAnalito: number;
  usarDilucion: boolean;
  aforo: number;
  alicuota: number;
}

export default function Miligramos() {
  const [resultado, setResultado] = useState<{ miligramos: number; formula: string } | null>(null);
  const [usarDilucion, setUsarDilucion] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    defaultValues: {
      usarDilucion: false,
      aforo: 100,
      alicuota: 10
    }
  });

  const watchUsarDilucion = watch("usarDilucion");

  const onSubmit = (data: FormData) => {
    const { volumenGastado, normalidadTitulante, pmeqAnalito, usarDilucion, aforo, alicuota } = data;
    
    let miligramos: number;
    let formula: string;
    
    if (usarDilucion) {
      // Fórmula con dilución: mg = (N × mL × pmeq × (aforo/alícuota) × 1000)
      const factorDilucion = aforo / alicuota;
      miligramos = (normalidadTitulante * volumenGastado * pmeqAnalito * factorDilucion * 1000);
      formula = `(${normalidadTitulante} N × ${volumenGastado} mL × ${pmeqAnalito} mg/meq × (${aforo}/${alicuota}) × 1000)`;
    } else {
      // Fórmula sin dilución: mg = (N × mL × pmeq)
      miligramos = (normalidadTitulante * volumenGastado * pmeqAnalito);
      formula = `(${normalidadTitulante} N × ${volumenGastado} mL × ${pmeqAnalito} mg/meq)`;
    }
    
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

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="usarDilucion"
              checked={watchUsarDilucion}
              onCheckedChange={(checked) => setUsarDilucion(checked)}
              {...register("usarDilucion")}
              data-testid="switch-usar-dilucion"
            />
            <Label htmlFor="usarDilucion">¿Usar factor de dilución?</Label>
          </div>
          
          {watchUsarDilucion && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="aforo">Aforo (mL)</Label>
                <Input
                  id="aforo"
                  type="number"
                  step="any"
                  placeholder="Volumen de aforo"
                  {...register("aforo", { 
                    required: watchUsarDilucion ? "Este campo es requerido" : false,
                    min: { value: 0.001, message: "El valor debe ser mayor a 0" }
                  })}
                  data-testid="input-aforo"
                />
                {errors.aforo && (
                  <p className="text-sm text-destructive mt-1">{errors.aforo.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="alicuota">Alícuota (mL)</Label>
                <Input
                  id="alicuota"
                  type="number"
                  step="any"
                  placeholder="Volumen de alícuota"
                  {...register("alicuota", { 
                    required: watchUsarDilucion ? "Este campo es requerido" : false,
                    min: { value: 0.001, message: "El valor debe ser mayor a 0" }
                  })}
                  data-testid="input-alicuota"
                />
                {errors.alicuota && (
                  <p className="text-sm text-destructive mt-1">{errors.alicuota.message}</p>
                )}
              </div>
            </div>
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
