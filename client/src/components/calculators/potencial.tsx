import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { compuestos } from "@/data/chemistry-data";

interface FormData {
  especieQuimica: string;
  concentracion: number;
  temperatura: number;
}

export default function Potencial() {
  const [resultado, setResultado] = useState<{ potencial: number; potencialEstandar: number; especie: string; temp: number; conc: number } | null>(null);
  const [selectedEspecie, setSelectedEspecie] = useState<string>("");
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    defaultValues: {
      temperatura: 298.15
    }
  });

  const onSubmit = (data: FormData) => {
    const { especieQuimica, concentracion, temperatura } = data;
    
    if (!especieQuimica || !compuestos[especieQuimica]) {
      return;
    }
    
    const datos = compuestos[especieQuimica];
    const R = 8.314; // J/(mol·K)
    const F = 96485; // C/mol
    const n = Math.abs(datos.carga) || 1;
    
    // Ecuación de Nernst: E = E° - (RT/nF) * ln(C)
    const potencial = datos.potencial_estandar - (R * temperatura / (n * F)) * Math.log(concentracion);
    
    setResultado({ 
      potencial, 
      potencialEstandar: datos.potencial_estandar,
      especie: especieQuimica,
      temp: temperatura,
      conc: concentracion
    });
  };

  const handleEspecieChange = (value: string) => {
    setSelectedEspecie(value);
    setValue("especieQuimica", value);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="especieQuimica">Especie Química</Label>
          <Select value={selectedEspecie} onValueChange={handleEspecieChange}>
            <SelectTrigger data-testid="select-especie-quimica">
              <SelectValue placeholder="Seleccione una especie" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(compuestos).map(([especie, datos]) => (
                <SelectItem key={especie} value={especie}>
                  {especie} (E° = {datos.potencial_estandar} V)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <input type="hidden" {...register("especieQuimica", { required: "Seleccione una especie" })} />
          {errors.especieQuimica && (
            <p className="text-sm text-destructive mt-1">{errors.especieQuimica.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="concentracion">Concentración (M)</Label>
          <Input
            id="concentracion"
            type="number"
            step="any"
            placeholder="Concentración molar"
            {...register("concentracion", { 
              required: "Este campo es requerido",
              min: { value: 0.0001, message: "El valor debe ser mayor a 0" }
            })}
            data-testid="input-concentracion"
          />
          {errors.concentracion && (
            <p className="text-sm text-destructive mt-1">{errors.concentracion.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="temperatura">Temperatura (K)</Label>
          <Input
            id="temperatura"
            type="number"
            step="any"
            placeholder="Temperatura"
            {...register("temperatura", { 
              required: "Este campo es requerido",
              min: { value: 0.1, message: "El valor debe ser mayor a 0" }
            })}
            data-testid="input-temperatura"
          />
          {errors.temperatura && (
            <p className="text-sm text-destructive mt-1">{errors.temperatura.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" data-testid="button-calcular-potencial">
          Calcular Potencial
        </Button>
      </form>

      {resultado && (
        <Card data-testid="result-potencial">
          <CardContent className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">Resultado:</h4>
            <p className="text-lg font-bold" data-testid="text-resultado-potencial">
              Potencial: {resultado.potencial.toFixed(4)} V
            </p>
            <p className="text-sm" data-testid="text-potencial-estandar">
              <strong>Potencial Estándar:</strong> {resultado.potencialEstandar} V
            </p>
            <p className="text-sm text-muted-foreground mt-1" data-testid="text-formula-potencial">
              Ecuación de Nernst aplicada a {resultado.temp} K y {resultado.conc} M
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
