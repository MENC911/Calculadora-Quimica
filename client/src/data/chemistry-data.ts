// Chemical Elements Periodic Table (ETP)
export const ETP: Record<string, number> = {
  "H": 1.0079, "He": 4.0026, "Li": 6.941, "Be": 9.0122, "B": 10.811, "C": 12.0107, "N": 14.0067, "O": 15.9994, "F": 18.9984, "Ne": 20.1797, "Na": 22.9897,
  "Mg": 24.305, "Al": 26.9815, "Si": 28.0855, "P": 30.9738, "S": 32.065, "Cl": 35.453, "K": 39.0983, "Ar": 39.948, "Ca": 40.078, "Sc": 44.9559, "Ti": 47.867,
  "V": 50.9415, "Cr": 51.9961, "Mn": 54.938, "Fe": 55.845, "Ni": 58.6934, "Co": 58.9332, "Cu": 63.546, "Zn": 65.39, "Ga": 69.723, "Ge": 72.64, "As": 74.9216,
  "Se": 78.96, "Br": 79.904, "Kr": 83.8, "Rb": 85.4678, "Sr": 87.62, "Y": 88.9059, "Zr": 91.224, "Nb": 92.9064, "Mo": 95.94, "Tc": 98, "Ru": 101.07,
  "Rh": 102.9055, "Pd": 106.42, "Ag": 107.8682, "Cd": 112.411, "In": 114.818, "Sn": 118.71, "Sb": 121.76, "I": 126.9045, "Te": 127.6, "Xe": 131.293
};

// Electrochemical Compounds Data
export interface ElectrochemicalCompound {
  potencial_estandar: number;
  carga: number;
}

export const compuestos: Record<string, ElectrochemicalCompound> = {
  "Ag+": {"potencial_estandar": +0.799, "carga": +1},
  "Cu2+": {"potencial_estandar": +0.337, "carga": +2},
  "Fe3+": {"potencial_estandar": +0.771, "carga": +3},
  "Zn2+": {"potencial_estandar": -0.763, "carga": +2},
  "H+": {"potencial_estandar": 0.000, "carga": +1},
  "Cl2": {"potencial_estandar": +1.359, "carga": 0},
  "Br2(l)": {"potencial_estandar": +1.065, "carga": 0},
  "I2(s)": {"potencial_estandar": +0.5355, "carga": 0}
};

// Parse chemical formula to get element counts
export function parseFormula(formula: string): Record<string, number> {
  const elementos: Record<string, number> = {};
  const regex = /([A-Z][a-z]?)(\d*)/g;
  let match;
  
  while ((match = regex.exec(formula)) !== null) {
    const elemento = match[1];
    const cantidad = parseInt(match[2]) || 1;
    elementos[elemento] = (elementos[elemento] || 0) + cantidad;
  }
  
  return elementos;
}
