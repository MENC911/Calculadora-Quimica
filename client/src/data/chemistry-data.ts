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
  // Aluminio
  "Al3+": {"potencial_estandar": -1.662, "carga": +3},

  // Antimonio
  "SbO+": {"potencial_estandar": +0.581, "carga": +1},

  // Arsénico
  "H2AsO4": {"potencial_estandar": +0.559, "carga": 0},

  // Bario
  "Ba2+": {"potencial_estandar": -2.906, "carga": +2},

  // Bismuto
  "BiO+": {"potencial_estandar": +0.320, "carga": +1},
  "BiCl4-": {"potencial_estandar": +0.16, "carga": -1},

  // Bromo
  "Br2(l)": {"potencial_estandar": +1.065, "carga": 0},
  "Br2(ac)": {"potencial_estandar": +1.087, "carga": 0},
  "BrO3-": {"potencial_estandar": +1.52, "carga": -1},
  "BrO3-_2": {"potencial_estandar": +1.44, "carga": -1},

  // Cadmio
  "Cd2+": {"potencial_estandar": -0.403, "carga": +2},

  // Calcio
  "Ca2+": {"potencial_estandar": -2.866, "carga": +2},

  // Carbono
  "C6H4O2": {"potencial_estandar": +0.699, "carga": 0},
  "CO2": {"potencial_estandar": -0.49, "carga": 0},

  // Cerio
  "Ce4+": {"potencial_estandar": +1.70, "carga": +4},

  // Cloro
  "Cl2": {"potencial_estandar": +1.359, "carga": 0},
  "HClO": {"potencial_estandar": +1.63, "carga": 0},
  "ClO3-": {"potencial_estandar": +1.47, "carga": -1},

  // Cromo
  "Cr3+": {"potencial_estandar": -0.408, "carga": +3},
  "Cr(s)": {"potencial_estandar": -0.744, "carga": 0},
  "Cr2O7^2-": {"potencial_estandar": +1.33, "carga": -2},

  // Cobalto
  "Co2+": {"potencial_estandar": -0.277, "carga": +2},
  "Co3+": {"potencial_estandar": +1.808, "carga": +3},

  // Cobre
  "Cu2+": {"potencial_estandar": +0.337, "carga": +2},
  "Cu+": {"potencial_estandar": +0.153, "carga": +1},
  "Cu(s)": {"potencial_estandar": +0.521, "carga": 0},
  "CuI(s)": {"potencial_estandar": +0.86, "carga": 0},
  "CuI(s)_2": {"potencial_estandar": -0.185, "carga": 0},

  // Flúor
  "F2": {"potencial_estandar": +3.06, "carga": 0},

  // Hidrógeno
  "H+": {"potencial_estandar": 0.000, "carga": +1},

  // Yodo
  "I2(s)": {"potencial_estandar": +0.5355, "carga": 0},
  "I2(ac)": {"potencial_estandar": +0.615, "carga": 0},
  "I3-": {"potencial_estandar": +0.536, "carga": -1},
  "IO3-": {"potencial_estandar": +1.196, "carga": -1},
  "H3IO6": {"potencial_estandar": +1.601, "carga": 0},

  // Hierro
  "Fe2+": {"potencial_estandar": -0.440, "carga": +2},
  "Fe3+": {"potencial_estandar": +0.771, "carga": +3},
  "Fe(CN)6^3-": {"potencial_estandar": +0.36, "carga": -3},

  // Plomo
  "Pb2+": {"potencial_estandar": -0.126, "carga": +2},
  "PbO2": {"potencial_estandar": +1.455, "carga": 0},
  "PbSO4": {"potencial_estandar": -0.350, "carga": 0},

  // Litio
  "Li+": {"potencial_estandar": -3.045, "carga": +1},

  // Magnesio
  "Mg2+": {"potencial_estandar": -2.363, "carga": +2},

  // Manganeso
  "Mn2+": {"potencial_estandar": -1.180, "carga": +2},
  "MnO2": {"potencial_estandar": +1.23, "carga": 0},
  "MnO4-": {"potencial_estandar": +1.51, "carga": -1},
  "MnO4-_2": {"potencial_estandar": +1.695, "carga": -1},
  "MnO4^2-": {"potencial_estandar": +0.564, "carga": -2},

  // Mercurio
  "Hg2^2+": {"potencial_estandar": +0.788, "carga": +2},
  "Hg2+": {"potencial_estandar": +0.920, "carga": +2},
  "Hg2^2+_2": {"potencial_estandar": +0.854, "carga": +2},
  "Hg2Cl2": {"potencial_estandar": +0.268, "carga": 0},
  "Hg2SO4": {"potencial_estandar": +0.615, "carga": 0},

  // Níquel
  "Ni2+": {"potencial_estandar": -0.250, "carga": +2},

  // Nitrógeno
  "N2": {"potencial_estandar": -0.23, "carga": 0},
  "HNO2": {"potencial_estandar": +1.00, "carga": 0},
  "NO3-": {"potencial_estandar": +0.94, "carga": -1},

  // Oxígeno
  "H2O2": {"potencial_estandar": +1.776, "carga": 0},
  "HO2-": {"potencial_estandar": +0.88, "carga": -1},
  "O2": {"potencial_estandar": +1.229, "carga": 0},
  "O2_2": {"potencial_estandar": +0.682, "carga": 0},
  "O3": {"potencial_estandar": +2.07, "carga": 0},

  // Paladio
  "Pd2+": {"potencial_estandar": +0.987, "carga": +2},

  // Platino
  "PtCl4^2-": {"potencial_estandar": +0.755, "carga": -2},
  "PtCl6^2-": {"potencial_estandar": +0.68, "carga": -2},

  // Potasio
  "K+": {"potencial_estandar": -2.925, "carga": +1},

  // Selenio
  "H2SeO3": {"potencial_estandar": +0.740, "carga": 0},
  "SeO4^2-": {"potencial_estandar": +1.15, "carga": -2},

  // Plata
  "Ag+": {"potencial_estandar": +0.799, "carga": +1},
  "AgBr": {"potencial_estandar": +0.073, "carga": 0},
  "AgCl": {"potencial_estandar": +0.222, "carga": 0},
  "Ag(CN)2-": {"potencial_estandar": -0.31, "carga": -1},
  "Ag2CrO4": {"potencial_estandar": +0.446, "carga": 0},
  "AgI": {"potencial_estandar": -0.151, "carga": 0},
  "Ag(S2O3)2^3-": {"potencial_estandar": +0.017, "carga": -3},

  // Sodio
  "Na+": {"potencial_estandar": -2.714, "carga": +1},

  // Azufre
  "S": {"potencial_estandar": +0.141, "carga": 0},
  "H2SO3": {"potencial_estandar": +0.450, "carga": 0},
  "SO4^2-": {"potencial_estandar": +0.172, "carga": -2},
  "S4O6^2-": {"potencial_estandar": +0.08, "carga": -2},
  "S2O8^2-": {"potencial_estandar": +2.01, "carga": -2},

  // Talio
  "Tl+": {"potencial_estandar": -0.336, "carga": +1},
  "Tl3+": {"potencial_estandar": +1.25, "carga": +3},

  // Estaño
  "Sn2+": {"potencial_estandar": -0.136, "carga": +2},
  "Sn4+": {"potencial_estandar": +0.154, "carga": +4},

  // Titanio
  "Ti3+": {"potencial_estandar": -0.369, "carga": +3},
  "TiO^2+": {"potencial_estandar": +0.099, "carga": +2},

  // Uranio
  "UO2^2+": {"potencial_estandar": +0.334, "carga": +2},

  // Vanadio
  "V3+": {"potencial_estandar": -0.255, "carga": +3},
  "VO^2+": {"potencial_estandar": +0.337, "carga": +2},
  "V(OH)4+": {"potencial_estandar": +1.00, "carga": +1},

  // Zinc
  "Zn2+": {"potencial_estandar": -0.763, "carga": +2}
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
