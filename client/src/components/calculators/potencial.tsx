import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { compuestos, acidosComunes } from "@/data/chemistry-data";

interface FormData {
  concentracionRed: number;
  volumenRed: number;
  concentracionOx: number;
  volumenOx: number;
  medio: "acido" | "basico" | "neutro";
  acidoSeleccionado?: string;
  concAcido?: number;
  volAcido?: number;
}

interface EspecieSeleccionada {
  nombre: string;
  potencial: number;
  electrones: number;
}

interface ResultadoPotencial {
  antesPE: number;
  enPE: number;
  especieRed: string;
  especieOx: string;
  numElectronesRed: number;
  numElectronesOx: number;
  medio: string;
  acidoUtilizado?: string;
  sustitucionAntes: string;
  sustitucionEnPE: string;
  formulaAntes?: string;
  formulaEnPE?: string;
}

export default function Potencial() {
  const [busquedaRed, setBusquedaRed] = useState("");
  const [busquedaOx, setBusquedaOx] = useState("");
  const [especieRed, setEspecieRed] = useState<EspecieSeleccionada | null>(null);
  const [especieOx, setEspecieOx] = useState<EspecieSeleccionada | null>(null);
  const [resultado, setResultado] = useState<ResultadoPotencial | null>(null);
  const [error, setError] = useState("");

  const { register, handleSubmit, watch, reset } = useForm<FormData>({
    defaultValues: {
      concentracionRed: 1.0,
      volumenRed: 50.0,
      concentracionOx: 1.0,
      volumenOx: 50.0,
      medio: "acido",
      acidoSeleccionado: "H+",
      concAcido: 1.0,
      volAcido: 50.0
    }
  });

  const watchedValues = watch();

  const seleccionarEspecieRed = (compuesto: string) => {
    const datos = compuestos[compuesto];
    setEspecieRed({ nombre: compuesto, potencial: datos.potencial_estandar, electrones: datos.electrones });
  };

  const seleccionarEspecieOx = (compuesto: string) => {
    const datos = compuestos[compuesto];
    setEspecieOx({ nombre: compuesto, potencial: datos.potencial_estandar, electrones: datos.electrones });
  };

  const limpiar = () => {
    setEspecieRed(null);
    setEspecieOx(null);
    setResultado(null);
    setError("");
    reset();
  };

  const onSubmit = (data: FormData) => {
    if (!especieRed || !especieOx) { setError("Debe seleccionar Reductor y Oxidante"); return; }

    const nRed = especieRed.electrones;
    const nOx = especieOx.electrones;

    // Obtener coeficientes si existen
    const coefRed = compuestos[especieRed.nombre].coeficiente || 1;
    const coefOx = compuestos[especieOx.nombre].coeficiente || 1;

    // Factores de ácido
    let factorRed = 1, factorOx = 1;
    if (data.medio === "acido" && data.acidoSeleccionado && data.concAcido && data.volAcido) {
      const acido = acidosComunes[data.acidoSeleccionado];
      if (acido) factorRed = factorOx = acido.protones;
    }

    const meqRed = data.concentracionRed * data.volumenRed;
    const meqOx = data.concentracionOx * data.volumenOx;

    
    // Nernst Antes del PE
    let antesPE = 0;
    let sustitucionAntes = "";
    let mlTotal = 0;
    if (data.medio === "acido" && data.acidoSeleccionado && data.concAcido && data.volAcido) {
      mlTotal = data.volumenRed + data.volumenOx + data.volAcido;
    } else {
      mlTotal = data.volumenRed + data.volumenOx;
    }

    if (meqRed > meqOx) {
      // Sobra Reductor
      const ratioAntes = (meqRed - meqOx) / meqOx;
      const ratioBase = (meqRed-meqOx)/mlTotal;
      if (coefRed > 1) {
        const ratioCoef = Math.pow(ratioBase, coefRed);
        antesPE = especieRed.potencial - (0.0592 / nRed) * Math.log10(ratioCoef / ratioBase);
        sustitucionAntes = `E = ${especieRed.potencial.toFixed(3)} - (0.0592/${nRed}) × log((${data.concentracionRed}×${data.volumenRed}/${mlTotal} - ${data.concentracionOx}×${data.volumenOx}/${mlTotal})^${coefRed} / (${data.concentracionOx}×${data.volumenOx}/${mlTotal}))`;
      }else {
        antesPE = especieRed.potencial - (0.0592 / nRed) * Math.log10(ratioAntes);
        sustitucionAntes = `E = ${especieRed.potencial.toFixed(3)} - (0.0592/${nRed}) × log((${data.concentracionRed} - ${data.concentracionOx}) / ${data.concentracionOx})`;
      }
    } else if (meqOx > meqRed) {
      // Sobra Oxidante
      const ratioAntes = meqOx/(meqOx-meqRed);
      //const ratioBase = (meqRed-meqOx)/mlTotal;
      if (coefOx > 1) {
        //const ratioCoef = Math.pow(ratioBase, coefOx);
        const numerador = Math.pow(meqRed/mlTotal, coefOx);
        const denominador = (meqOx-meqRed)/mlTotal;
        antesPE = especieOx.potencial - (0.0592 / nOx) * Math.log10(numerador / denominador);
        sustitucionAntes = `E = ${especieOx.potencial.toFixed(3)} - (0.0592/${nOx}) × log((${data.concentracionRed}×${data.volumenRed}/${mlTotal})^${coefOx} / (${meqOx}-${meqRed}/${mlTotal}))`;
      } else {
        antesPE = especieOx.potencial - (0.0592 / nOx) * Math.log10(ratioAntes);
        sustitucionAntes = `E = ${especieOx.potencial.toFixed(3)} - (0.0592/${nOx}) × log((${meqOx}) / (${meqOx} - ${meqRed}))`;
      }
      
    } else {
      // En el PE
      antesPE = (nRed * especieRed.potencial + nOx * especieOx.potencial) / (nRed + nOx);
      sustitucionAntes =  `E = (${nRed}×${especieRed.potencial.toFixed(3)} + ${nOx}×${especieOx.potencial.toFixed(3)}) / (${nRed} + ${nOx})`;
    }

    
    // Nernst en PE
    const enPE = (nRed * especieRed.potencial + nOx * especieOx.potencial) / (nRed  + nOx );
    const sustitucionEnPE = `E = (${nRed}×${especieRed.potencial.toFixed(3)} + ${nOx}×${especieOx.potencial.toFixed(3)}) / (${nRed} + ${nOx})`;

    // Formulas sin sustitución
    const formulaAntes = `E = E°_Red - (0.0592 / nRed) × log([Red]/[Ox])`;
    const formulaEnPE = `SE = (nRed × E°_Red + nOx × E°_Ox) / (nRed + nOx)`;


    setResultado({
      antesPE: isNaN(antesPE) ? especieRed.potencial : antesPE,
      enPE: isNaN(enPE) ? (especieRed.potencial + especieOx.potencial)/2 : enPE,
      especieRed: especieRed.nombre,
      especieOx: especieOx.nombre,
      numElectronesRed: nRed,
      numElectronesOx: nOx,
      medio: data.medio,
      acidoUtilizado: data.medio === "acido" ? data.acidoSeleccionado : undefined,
      sustitucionAntes: sustitucionAntes,
      sustitucionEnPE: `E = (${nRed}×${especieRed.potencial.toFixed(3)} + ${nOx}×${especieOx.potencial.toFixed(3)}) / (${nRed} + ${nOx})`,
      formulaAntes,
      formulaEnPE
    });
  };


  const compuestosFiltradosRed = Object.entries(compuestos)
    .filter(([compuesto]) => compuesto.toLowerCase().includes(busquedaRed.toLowerCase()))
    .slice(0, 10);

  const compuestosFiltradosOx = Object.entries(compuestos)
    .filter(([compuesto]) => compuesto.toLowerCase().includes(busquedaOx.toLowerCase()))
    .slice(0, 10);

  const getButtonColor = (potencial: number, seleccionado: boolean) =>
    seleccionado
      ? "bg-yellow-300 text-yellow-900 font-bold"
      : potencial < 0
        ? "bg-red-100 hover:bg-red-200 text-red-800"
        : "bg-green-100 hover:bg-green-200 text-green-800";

  return (
    <Card className="p-4 w-full max-w-3xl mx-auto mt-6">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <Label>Reductor:</Label>
            <Input value={busquedaRed} onChange={(e) => setBusquedaRed(e.target.value)} placeholder="Buscar Reductor..." />
            <div className="flex flex-wrap gap-2 mt-1">
              {compuestosFiltradosRed.map(([compuesto]) => (
                <Button
                  key={compuesto}
                  type="button"
                  className={getButtonColor(compuestos[compuesto].potencial_estandar, especieRed?.nombre === compuesto)}
                  onClick={() => seleccionarEspecieRed(compuesto)}
                >
                  {compuesto}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label>Oxidante:</Label>
            <Input value={busquedaOx} onChange={(e) => setBusquedaOx(e.target.value)} placeholder="Buscar Oxidante..." />
            <div className="flex flex-wrap gap-2 mt-1">
              {compuestosFiltradosOx.map(([compuesto]) => (
                <Button
                  key={compuesto}
                  type="button"
                  className={getButtonColor(compuestos[compuesto].potencial_estandar, especieOx?.nombre === compuesto)}
                  onClick={() => seleccionarEspecieOx(compuesto)}
                >
                  {compuesto}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <div>
              <Label>Concentración Reductor (N):</Label>
              <Input type="number" step="0.00001" {...register("concentracionRed", { valueAsNumber: true })} />
              <Label>Volumen Reductor (mL):</Label>
              <Input type="number" step="0.00001" {...register("volumenRed", { valueAsNumber: true })} />
            </div>
            <div>
              <Label>Concentración Oxidante (N):</Label>
              <Input type="number" step="0.00001" {...register("concentracionOx", { valueAsNumber: true })} />
              <Label>Volumen Oxidante (mL):</Label>
              <Input type="number" step="0.00001" {...register("volumenOx", { valueAsNumber: true })} />
            </div>
          </div>

          <div>
            <Label>Medio:</Label>
            <select {...register("medio")}>
              <option value="acido">Ácido</option>
              <option value="basico">Básico</option>
              <option value="neutro">Neutro</option>
            </select>
          </div>

          {watchedValues.medio === "acido" && (
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div>
                <Label>Ácido:</Label>
                <select {...register("acidoSeleccionado")}>
                  {Object.entries(acidosComunes).map(([key, acido]) => (
                    <option key={key} value={key}>{acido.nombre} ({acido.protones} H+)</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Concentración ácido:</Label>
                <Input type="number" step="0.01" {...register("concAcido", { valueAsNumber: true })} />
              </div>
              <div>
                <Label>Volumen ácido (mL):</Label>
                <Input type="number" step="0.1" {...register("volAcido", { valueAsNumber: true })} />
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-4">
            <Button type="submit">Calcular Potencial</Button>
            <Button type="button" variant="destructive" onClick={limpiar}>Limpiar</Button>
          </div>
        </form>

        {error && <p className="text-red-600 mt-4">{error}</p>}

        {resultado && (
          <div className="mt-6 space-y-4 p-4 bg-slate-50 rounded-lg">
            <h2 className="text-lg font-bold border-b pb-2">Resultados:</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <p className="font-semibold text-xs text-blue-700">Reductor Seleccionado</p>
                  <p className="text-sm font-bold text-blue-900">{resultado.especieRed} ({resultado.numElectronesRed} e⁻)</p>
                </div>

                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <p className="font-semibold text-xs text-blue-700">Oxidante Seleccionado</p>
                  <p className="text-sm font-bold text-blue-900">{resultado.especieOx} ({resultado.numElectronesOx} e⁻)</p>
                </div>

                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <p className="font-semibold text-xs text-green-700">Medio</p>
                  <p className="text-sm font-bold text-green-900">
                    {resultado.medio === "acido" ? `Ácido (${resultado.acidoUtilizado})` :
                      resultado.medio === "basico" ? "Básico" : "Neutro"}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="font-semibold text-sm text-blue-700">Potencial Electrico</p>
                  <p className="text-lg font-bold text-blue-900">{resultado.antesPE.toFixed(3)} V</p>
                  <p className="text-xs text-gray-600 break-words">{resultado.sustitucionAntes}</p>
                </div>

                <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
                  <p className="font-semibold text-sm text-yellow-700">Fórmula general Potencial Electrico</p>
                  <p className="text-xs text-gray-600 break-words">{resultado.formulaAntes}</p>
                </div>

                <div className="p-3 bg-green-50 rounded border border-green-300 shadow-md">
                  <p className="font-semibold text-sm text-green-700">En el Punto de Equivalencia</p>
                  <p className="text-xl font-bold text-green-900">{resultado.enPE.toFixed(3)} V</p>
                  <p className="text-xs text-gray-600 break-words">{resultado.sustitucionEnPE}</p>
                </div>

                <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
                  <p className="font-semibold text-sm text-yellow-700">Fórmula general En el PE</p>
                  <p className="text-xs text-gray-600 break-words">{resultado.formulaEnPE}</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </CardContent>
    </Card>
  );
}
