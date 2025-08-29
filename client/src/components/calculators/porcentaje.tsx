import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface FormData {
  mgAnalito: number;
  pesoMuestra: number;
  usarDilucion: boolean;
  normalidadTitulante: number;
  volumenTitulante: number;
  pmeqMuestra: number;
  aforo: number;
  alicuota: number;
}

export default function Porcentaje() {
  const [resultado, setResultado] = useState<{ porcentaje: number; formula: string } | null>(null);
  const [usarDilucion, setUsarDilucion] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    defaultValues: {
      usarDilucion: false,
      aforo: 100,
      alicuota: 10
    }
  });

  const onSubmit = (data: FormData) => {
    const { mgAnalito, pesoMuestra, usarDilucion, normalidadTitulante, volumenTitulante, pmeqMuestra, aforo, alicuota } = data;
    
    let porcentaje: number;
    let formula: string;
    
    if (usarDilucion) {
      // Fórmula con dilución: (N × mL × pmeq × (aforo/alícuota) × 100) ÷ gramos_muestra
      porcentaje = (normalidadTitulante * volumenTitulante * pmeqMuestra * (aforo / alicuota) * 100) / pesoMuestra;
      formula = `(${normalidadTitulante} N × ${volumenTitulante} mL × ${pmeqMuestra} mg/meq × (${aforo}/${alicuota}) × 100) ÷ ${pesoMuestra} g`;
    } else {
      // Fórmula simple: (mg analito ÷ mg muestra) × 100
      porcentaje = (mgAnalito / (pesoMuestra * 1000)) * 100;
      formula = `(${mgAnalito} mg ÷ ${pesoMuestra * 1000} mg muestra) × 100`;
    }
    
    setResultado({ porcentaje, formula });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="usarDilucion"
              checked={usarDilucion}
              onCheckedChange={(checked) => {
                setUsarDilucion(checked);
                setValue("usarDilucion", checked);
              }}
              data-testid="switch-usar-dilucion-porcentaje"
            />
            <Label htmlFor="usarDilucion">¿Usar factor de dilución?</Label>
          </div>
        </div>

        {!usarDilucion ? (
          // Campos para cálculo simple
          <>
            <div>
              <Label htmlFor="mgAnalito">Miligramos de Analito</Label>
              <Input
                id="mgAnalito"
                type="number"
                step="any"
                placeholder="mg de analito calculados"
                {...register("mgAnalito", { 
                  required: !usarDilucion ? "Este campo es requerido" : false,
                  min: { value: 0, message: "El valor debe ser mayor o igual a 0" }
                })}
                data-testid="input-mg-analito"
              />
              {errors.mgAnalito && (
                <p className="text-sm text-destructive mt-1">{errors.mgAnalito.message}</p>
              )}
            </div>
          </>
        ) : (
          // Campos para cálculo con dilución
          <>
            <div>
              <Label htmlFor="normalidadTitulante">Normalidad del Titulante</Label>
              <Input
                id="normalidadTitulante"
                type="number"
                step="any"
                placeholder="Normalidad"
                {...register("normalidadTitulante", { 
                  required: usarDilucion ? "Este campo es requerido" : false,
                  min: { value: 0.001, message: "El valor debe ser mayor a 0" }
                })}
                data-testid="input-normalidad-titulante-porcentaje"
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
                  required: usarDilucion ? "Este campo es requerido" : false,
                  min: { value: 0.001, message: "El valor debe ser mayor a 0" }
                })}
                data-testid="input-volumen-titulante-porcentaje"
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
                  required: usarDilucion ? "Este campo es requerido" : false,
                  min: { value: 0.001, message: "El valor debe ser mayor a 0" }
                })}
                data-testid="input-pmeq-muestra-porcentaje"
              />
              {errors.pmeqMuestra && (
                <p className="text-sm text-destructive mt-1">{errors.pmeqMuestra.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="aforo">Aforo (mL)</Label>
                <Input
                  id="aforo"
                  type="number"
                  step="any"
                  placeholder="Volumen de aforo"
                  {...register("aforo", { 
                    required: usarDilucion ? "Este campo es requerido" : false,
                    min: { value: 0.001, message: "El valor debe ser mayor a 0" }
                  })}
                  data-testid="input-aforo-porcentaje"
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
                    required: usarDilucion ? "Este campo es requerido" : false,
                    min: { value: 0.001, message: "El valor debe ser mayor a 0" }
                  })}
                  data-testid="input-alicuota-porcentaje"
                />
                {errors.alicuota && (
                  <p className="text-sm text-destructive mt-1">{errors.alicuota.message}</p>
                )}
              </div>
            </div>
          </>
        )}

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
