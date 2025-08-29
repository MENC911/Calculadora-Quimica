import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ETP, parseFormula } from "@/data/chemistry-data";

interface FormData {
  formulaQuimica: string;
}

interface ResultadoMolecular {
  pesoTotal: number;
  elementos: Record<string, { cantidad: number; pesoElemento: number; pesoAtomico: number }>;
}

export default function PesoMolecular() {
  const [resultado, setResultado] = useState<ResultadoMolecular | null>(null);
  const [error, setError] = useState<string>("");
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const { formulaQuimica } = data;
    setError("");
    
    try {
      const elementos = parseFormula(formulaQuimica.trim());
      let pesoTotal = 0;
      const elementosDetalle: Record<string, { cantidad: number; pesoElemento: number; pesoAtomico: number }> = {};
      
      for (const [elemento, cantidad] of Object.entries(elementos)) {
        if (!ETP[elemento]) {
          setError(`Elemento ${elemento} no encontrado en la tabla periódica`);
          return;
        }
        
        const pesoAtomico = ETP[elemento];
        const pesoElemento = pesoAtomico * cantidad;
        pesoTotal += pesoElemento;
        
        elementosDetalle[elemento] = {
          cantidad,
          pesoElemento,
          pesoAtomico
        };
      }
      
      setResultado({
        pesoTotal,
        elementos: elementosDetalle
      });
      
    } catch (error) {
      setError("Error al analizar la fórmula química. Verifique el formato.");
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="formulaQuimica">Fórmula Química</Label>
          <Input
            id="formulaQuimica"
            type="text"
            placeholder="Ej: H2SO4, NaCl, CaCO3"
            {...register("formulaQuimica", { 
              required: "Este campo es requerido",
              pattern: {
                value: /^[A-Z][a-z]?(\d*[A-Z][a-z]?\d*)*$/,
                message: "Formato de fórmula química inválido"
              }
            })}
            data-testid="input-formula-quimica"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Ingrese la fórmula usando símbolos estándar (H, O, N, etc.)
          </p>
          {errors.formulaQuimica && (
            <p className="text-sm text-destructive mt-1">{errors.formulaQuimica.message}</p>
          )}
          {error && (
            <p className="text-sm text-destructive mt-1">{error}</p>
          )}
        </div>

        <Button type="submit" className="w-full" data-testid="button-calcular-molecular">
          Calcular Peso Molecular
        </Button>
      </form>

      {resultado && (
        <Card data-testid="result-molecular">
          <CardContent className="p-4 bg-muted">
            <h4 className="font-semibold mb-2">Resultado:</h4>
            <p className="text-lg font-bold" data-testid="text-resultado-molecular">
              Peso Molecular: {resultado.pesoTotal.toFixed(4)} g/mol
            </p>
            <div className="mt-2 text-sm" data-testid="desglose-elementos">
              <h5 className="font-medium mb-1">Desglose por elementos:</h5>
              {Object.entries(resultado.elementos).map(([elemento, datos]) => (
                <div key={elemento} className="text-muted-foreground">
                  {elemento}: {datos.pesoAtomico} × {datos.cantidad} = {datos.pesoElemento.toFixed(4)} g/mol
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
