import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { compuestos } from "@/data/chemistry-data";

interface FormData {
  concentracion1: number;
  volumen1: number;
  concentracion2: number;
  volumen2: number;
}

interface EspecieSeleccionada {
  nombre: string;
  potencial: number;
  carga: number;
}

interface ResultadoPotencial {
  potencial: number;
  especieRed: EspecieSeleccionada;
  especieOx: EspecieSeleccionada;
  numElectrones: number;
  pmeqRed: number;
  pmeqOx: number;
  concRed: number;
  volRed: number;
  concOx: number;
  volOx: number;
}

export default function Potencial() {
  const [especie1, setEspecie1] = useState<EspecieSeleccionada | null>(null);
  const [especie2, setEspecie2] = useState<EspecieSeleccionada | null>(null);
  const [resultado, setResultado] = useState<ResultadoPotencial | null>(null);
  const [error, setError] = useState<string>("");
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    defaultValues: {
      concentracion1: 1.0,
      volumen1: 50.0,
      concentracion2: 1.0,
      volumen2: 50.0
    }
  });

  const seleccionarEspecie = (compuesto: string) => {
    const datos = compuestos[compuesto];
    const nuevaEspecie: EspecieSeleccionada = {
      nombre: compuesto,
      potencial: datos.potencial_estandar,
      carga: datos.carga
    };

    if (!especie1) {
      setEspecie1(nuevaEspecie);
    } else if (!especie2 && compuesto !== especie1.nombre) {
      setEspecie2(nuevaEspecie);
    }
  };

  const limpiarSeleccion = () => {
    setEspecie1(null);
    setEspecie2(null);
    setResultado(null);
    setError("");
    reset();
  };

  const onSubmit = (data: FormData) => {
    if (!especie1 || !especie2) {
      setError("Debe seleccionar dos especies químicas");
      return;
    }

    setError("");

    try {
      const { concentracion1, volumen1, concentracion2, volumen2 } = data;

      // Determinar cuál es reductora y cuál oxidante basado en potencial estándar
      let especieRed: EspecieSeleccionada;
      let especieOx: EspecieSeleccionada;
      let concRed: number;
      let volRed: number;
      let concOx: number;
      let volOx: number;

      if (especie1.potencial > especie2.potencial) {
        especieRed = especie2;
        especieOx = especie1;
        concRed = concentracion2;
        volRed = volumen2;
        concOx = concentracion1;
        volOx = volumen1;
      } else {
        especieRed = especie1;
        especieOx = especie2;
        concRed = concentracion1;
        volRed = volumen1;
        concOx = concentracion2;
        volOx = volumen2;
      }

      const numElectrones = Math.abs(especieRed.carga - especieOx.carga) || 1;
      const pmeqRed = concRed * volRed;
      const pmeqOx = concOx * volOx;

      if (pmeqOx === 0) {
        setError("El volumen o concentración de la especie oxidada no puede ser cero");
        return;
      }

      if ((pmeqRed - pmeqOx) <= 0) {
        setError("La cantidad de especie reductora debe ser mayor que la oxidante");
        return;
      }

      // Fórmula: E = E° - (0.0592/n) * log10((pmeqRed - pmeqOx)/pmeqOx)
      const potencial = especieRed.potencial - (0.0592 / numElectrones) * Math.log10((pmeqRed - pmeqOx) / pmeqOx);

      setResultado({
        potencial,
        especieRed,
        especieOx,
        numElectrones,
        pmeqRed,
        pmeqOx,
        concRed,
        volRed,
        concOx,
        volOx
      });

    } catch (error) {
      setError("Error en el cálculo: " + String(error));
    }
  };

  const getButtonColor = (potencial: number) => {
    return potencial < 0 ? "bg-red-100 hover:bg-red-200 text-red-800 border-red-300" : 
           "bg-green-100 hover:bg-green-200 text-green-800 border-green-300";
  };

  const compuestosOrdenados = Object.entries(compuestos).sort(([, a], [, b]) => 
    b.potencial_estandar - a.potencial_estandar
  );

  return (
    <div className="space-y-6">
      {/* Selección de Especies */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className={especie1 ? "border-blue-300 bg-blue-50" : ""}>
            <CardContent className="p-4">
              <h4 className="font-semibold text-blue-600 mb-2">🟦 Especie 1</h4>
              {especie1 ? (
                <div className="space-y-1">
                  <p className="font-medium">{especie1.nombre}</p>
                  <p className="text-sm">E°: {especie1.potencial} V</p>
                  <p className="text-sm">Carga: {especie1.carga}</p>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Ninguna selección</p>
              )}
            </CardContent>
          </Card>

          <Card className={especie2 ? "border-red-300 bg-red-50" : ""}>
            <CardContent className="p-4">
              <h4 className="font-semibold text-red-600 mb-2">🟥 Especie 2</h4>
              {especie2 ? (
                <div className="space-y-1">
                  <p className="font-medium">{especie2.nombre}</p>
                  <p className="text-sm">E°: {especie2.potencial} V</p>
                  <p className="text-sm">Carga: {especie2.carga}</p>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Ninguna selección</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Parámetros */}
      {(especie1 || especie2) && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-blue-600">Parámetros Especie 1:</h4>
              <div>
                <Label htmlFor="concentracion1">Concentración (N)</Label>
                <Input
                  id="concentracion1"
                  type="number"
                  step="any"
                  disabled={!especie1}
                  {...register("concentracion1", { 
                    required: "Campo requerido",
                    min: { value: 0.001, message: "Debe ser mayor a 0" }
                  })}
                  data-testid="input-concentracion1"
                />
                {errors.concentracion1 && (
                  <p className="text-sm text-destructive mt-1">{errors.concentracion1.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="volumen1">Volumen (mL)</Label>
                <Input
                  id="volumen1"
                  type="number"
                  step="any"
                  disabled={!especie1}
                  {...register("volumen1", { 
                    required: "Campo requerido",
                    min: { value: 0.001, message: "Debe ser mayor a 0" }
                  })}
                  data-testid="input-volumen1"
                />
                {errors.volumen1 && (
                  <p className="text-sm text-destructive mt-1">{errors.volumen1.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-red-600">Parámetros Especie 2:</h4>
              <div>
                <Label htmlFor="concentracion2">Concentración (N)</Label>
                <Input
                  id="concentracion2"
                  type="number"
                  step="any"
                  disabled={!especie2}
                  {...register("concentracion2", { 
                    required: "Campo requerido",
                    min: { value: 0.001, message: "Debe ser mayor a 0" }
                  })}
                  data-testid="input-concentracion2"
                />
                {errors.concentracion2 && (
                  <p className="text-sm text-destructive mt-1">{errors.concentracion2.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="volumen2">Volumen (mL)</Label>
                <Input
                  id="volumen2"
                  type="number"
                  step="any"
                  disabled={!especie2}
                  {...register("volumen2", { 
                    required: "Campo requerido",
                    min: { value: 0.001, message: "Debe ser mayor a 0" }
                  })}
                  data-testid="input-volumen2"
                />
                {errors.volumen2 && (
                  <p className="text-sm text-destructive mt-1">{errors.volumen2.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              type="submit" 
              disabled={!especie1 || !especie2}
              className="bg-green-600 hover:bg-green-700"
              data-testid="button-calcular-potencial"
            >
              ⚡ Calcular Potencial
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={limpiarSeleccion}
              data-testid="button-limpiar-seleccion"
            >
              ♻ Limpiar Selección
            </Button>
          </div>

          {error && (
            <div className="p-3 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
              ❌ {error}
            </div>
          )}
        </form>
      )}

      {/* Lista de Compuestos */}
      <div>
        <h4 className="font-semibold mb-4">📋 Lista de Compuestos Disponibles:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 max-h-80 overflow-y-auto border rounded p-4">
          {compuestosOrdenados.map(([compuesto, datos]) => (
            <Button
              key={compuesto}
              variant="outline"
              size="sm"
              onClick={() => seleccionarEspecie(compuesto)}
              className={`text-left h-auto p-2 ${getButtonColor(datos.potencial_estandar)}`}
              data-testid={`button-compuesto-${compuesto}`}
            >
              <div className="w-full">
                <div className="font-medium text-xs">{compuesto}</div>
                <div className="text-xs">E°: {datos.potencial_estandar} V</div>
                <div className="text-xs">Carga: {datos.carga}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Resultados */}
      {resultado && (
        <Card data-testid="result-potencial">
          <CardContent className="p-6 bg-muted">
            <h3 className="text-lg font-bold mb-4 text-blue-600">⚡ Resultados del Cálculo</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 p-4 rounded border">
                <h4 className="font-semibold text-blue-600 mb-2">Especie Reductora</h4>
                <div className="space-y-1 text-sm">
                  <p><strong>Compuesto:</strong> {resultado.especieRed.nombre}</p>
                  <p><strong>Potencial estándar (E°):</strong> {resultado.especieRed.potencial} V</p>
                  <p><strong>Concentración:</strong> {resultado.concRed} N</p>
                  <p><strong>Volumen:</strong> {resultado.volRed} mL</p>
                  <p><strong>pmeq:</strong> {resultado.pmeqRed.toFixed(4)}</p>
                  <p><strong>Carga:</strong> {resultado.especieRed.carga}</p>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded border">
                <h4 className="font-semibold text-red-600 mb-2">Especie Oxidante</h4>
                <div className="space-y-1 text-sm">
                  <p><strong>Compuesto:</strong> {resultado.especieOx.nombre}</p>
                  <p><strong>Potencial estándar (E°):</strong> {resultado.especieOx.potencial} V</p>
                  <p><strong>Concentración:</strong> {resultado.concOx} N</p>
                  <p><strong>Volumen:</strong> {resultado.volOx} mL</p>
                  <p><strong>pmeq:</strong> {resultado.pmeqOx.toFixed(4)}</p>
                  <p><strong>Carga:</strong> {resultado.especieOx.carga}</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded border">
              <h4 className="font-semibold text-green-600 mb-2">Detalles del Cálculo</h4>
              <div className="space-y-1 text-sm">
                <p><strong>Electrones transferidos (n):</strong> {resultado.numElectrones}</p>
                <p><strong>Ecuación:</strong> E = E° - (0.0592/n) × log[(pmeq_Red - pmeq_Ox)/pmeq_Ox]</p>
                <p><strong>Cálculo:</strong> E = {resultado.especieRed.potencial} - (0.0592/{resultado.numElectrones}) × log[({resultado.pmeqRed.toFixed(4)}-{resultado.pmeqOx.toFixed(4)})/{resultado.pmeqOx.toFixed(4)}]</p>
              </div>
              <h3 className="text-lg font-bold mt-3 text-orange-600" data-testid="text-resultado-potencial">
                Potencial calculado: {resultado.potencial.toFixed(4)} V
              </h3>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}