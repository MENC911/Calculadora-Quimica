import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface FormData {
  normalidadTitulante: number;
  volumenTitulante: number;
  pmeqMuestra: number;
  pesoMuestra: number;
  usarDilucion: boolean;
  aforo: number;
  alicuota: number;
}

export default function Porcentaje() {
  const [resultado, setResultado] = useState<{ porcentaje: number; formula: string; formulaGeneral: string } | null>(null);
  const [usarDilucion, setUsarDilucion] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    watch, 
    setValue,
    setError,
    clearErrors
  } = useForm<FormData>({
    defaultValues: {
      usarDilucion: false,
      aforo: 100,
      alicuota: 10
    }
  });

  // Observadores
  const watchUsarDilucion = watch("usarDilucion");
  const watchAforo = watch("aforo");

  const onSubmit = (data: FormData) => {
    const { normalidadTitulante, volumenTitulante, pmeqMuestra, pesoMuestra, usarDilucion, aforo, alicuota } = data;

    // Validación extra por seguridad
    if (usarDilucion && Number(alicuota) > Number(aforo)) {
      setError("alicuota", { type: "manual", message: "La alícuota no puede ser mayor al aforo" });
      return;
    }

    let porcentaje: number;
    let formula: string;
    let formulaGeneral: string;

    if (usarDilucion) {
      const factorDilucion = aforo / alicuota;
      porcentaje = (normalidadTitulante * volumenTitulante * pmeqMuestra * factorDilucion * 100) / pesoMuestra;
      formula = `(${normalidadTitulante} N × ${volumenTitulante} mL × ${pmeqMuestra} mg/meq × (${aforo}/${alicuota}) × 100) ÷ ${pesoMuestra} g`;
      formulaGeneral = "Porcentaje (%) = (N × V × PMEq × (aforo / alícuota) × 100) ÷ pesoMuestra (g)";
    } else {
      porcentaje = (normalidadTitulante * volumenTitulante * pmeqMuestra * 100) / pesoMuestra;
      formula = `(${normalidadTitulante} N × ${volumenTitulante} mL × ${pmeqMuestra} mg/meq × 100) ÷ ${pesoMuestra} g`;
      formulaGeneral = "Porcentaje (%) = (N × V × PMEq × 100) ÷ pesoMuestra (g)";
    }

    setResultado({ porcentaje, formula, formulaGeneral });
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

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="usarDilucion"
              checked={usarDilucion}
              onCheckedChange={(checked) => {
                setUsarDilucion(checked);
                setValue("usarDilucion", checked);
                // limpiar errores previos relacionados
                clearErrors(["aforo", "alicuota"]);
              }}
              data-testid="switch-usar-dilucion"
            />
            <Label htmlFor="usarDilucion">¿Usar factor de dilución?</Label>
          </div>
          
          {usarDilucion && (
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
                    required: usarDilucion ? "Este campo es requerido" : false,
                    min: { value: 0.0001, message: "El valor debe ser mayor a 0" },
                    validate: (val) => {
                      // Si no se usa dilución, no validar la comparación
                      if (!watchUsarDilucion) return true;
                      const af = Number(watchAforo) || 0;
                      return Number(val) <= af || "La alícuota no puede ser mayor al aforo";
                    }
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

            {/* Fórmula general usada (sin sustituir valores) */}
            <div className="mt-3 p-2 border rounded bg-gray-100 text-sm" data-testid="text-formula-general">
              <h4 className="font-semibold text-gray-700 mb-1">📐 Fórmula general usada</h4>
              <p>{resultado.formulaGeneral}</p>
            </div>

            {resultado.porcentaje > 100 && (
              <p className="text-sm text-red-600 font-semibold mt-2" data-testid="text-advertencia">
                ⚠️ El resultado es mayor a 100%.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
