// Chemical Elements Periodic Table (ETP)
export const ETP: Record<string, number> = {
    "H" : 1.0079, "He": 4.0026,"Li": 6.941,"Be": 9.0122,"B": 10.811,"C": 12.0107,"N": 14.0067,"O": 15.9994,"F": 18.9984,"Ne": 20.1797,"Na": 22.9897,
    "Mg": 24.305,"Al": 26.9815,"Si": 28.0855,"P": 30.9738,"S": 32.065,"Cl": 35.453,"K": 39.0983,"Ar": 39.948, "Ca": 40.078, "Sc": 44.9559, "Ti": 47.867,
    "V": 50.9415, "Cr": 51.9961,"Mn": 54.938,"Fe": 55.845,"Ni": 58.6934,"Co": 58.9332,"Cu": 63.546,"Zn": 65.39,"Ga": 69.723,"Ge": 72.64,"As": 74.9216,
    "Se": 78.96,"Br": 79.904,"Kr": 83.8, "Rb": 85.4678,"Sr": 87.62,"Y": 88.9059,"Zr": 91.224,"Nb": 92.9064,"Mo": 95.94,"Tc": 98,"Ru": 101.07,
    "Rh": 102.9055,"Pd": 106.42,"Ag": 107.8682,"Cd": 112.411,"In": 114.818,"Sn": 118.71,"Sb": 121.76,"I": 126.9045,"Te": 127.6,"Xe": 131.293,
    "Cs": 132.9055,"Ba": 137.327,"La": 138.9055,"Ce": 140.116,"Pr": 140.9077,"Nd": 144.24,"Pm": 145,"Sm": 150.36,"Eu": 151.964,"Gd": 157.25,
    "Tb": 158.9253,"Dy": 162.5,"Ho": 164.9303,"Er": 167.259,"Tm": 168.9342,"Yb": 173.04,"Lu": 174.967,"Hf": 178.49,"Ta": 180.9479,"W": 183.84,
    "Re": 186.207,"Os": 190.23,"Ir": 192.217,"Pt": 195.078,"Au": 196.9665,"Hg": 200.59,"Tl": 204.3833,"Pb": 207.2,"Bi": 208.9804,"Po": 209,"At": 210,
    "Rn": 222,"Fr": 223,"Ra": 226,"Ac": 227,"Pa": 231.0359,"Th": 232.0381,"Np": 237,"U": 238.0289,"Am": 243,"Pu": 244,"Cm": 247,"Bk" :247,"Cf": 251,
    "Es" :252,"Fm" :257,"Md" :258,"No": 259,"Rf" :261,"Lr" :262,"Db": 262,"Bh": 270.9292,"Sg" :270.4869,"Mt" :278.1309,"Hs" :275.3816,"Rg" :272,
    "Cn": 277,"Fl": 298.187,"Lv": 293,"Mc": 288,"Ts": 294,"Og": 294
};

// Electrochemical Compounds Data
export interface ElectrochemicalCompound {
  potencial_estandar: number;
  electrones: number;
  carga: number;
  coeficiente?: number;
}

export const compuestos: Record<string, ElectrochemicalCompound> = {
  // Aluminio
  "Al3+": {"potencial_estandar": -1.662, "electrones": 3, "carga": +3},

  // Antimonio
  "SbO+": {"potencial_estandar": +0.581, "electrones": 4, "carga": +1},

  // Arsénico
  "H2AsO4": {"potencial_estandar": +0.559, "electrones": 2, "carga": -1},

  // Bario
  "Ba2+": {"potencial_estandar": -2.906, "electrones": 2, "carga": +2},

  // Bismuto
  "BiO+": {"potencial_estandar": +0.320, "electrones": 3, "carga": +1},
  "BiCl4-": {"potencial_estandar": +0.16, "electrones": 3, "carga": -1},

  // Bromo
  "Br2(l)": {"potencial_estandar": +1.065, "electrones": 2, "carga": 0},
  "Br2(ac)": {"potencial_estandar": +1.087, "electrones": 2, "carga": 0},
  "BrO3-": {"potencial_estandar": +1.52, "electrones": 5, "carga": -1},
  "BrO3- PEs: +1.44": {"potencial_estandar": +1.44, "electrones": 6, "carga": -1},

  // Cadmio
  "Cd2+": {"potencial_estandar": -0.403, "electrones": 2, "carga": +2},

  // Calcio
  "Ca2+": {"potencial_estandar": -2.866, "electrones": 2, "carga": +2},

  // Carbono
  "C6H4O2": {"potencial_estandar": +0.699, "electrones": 2, "carga": 0},
  "CO2": {"potencial_estandar": -0.49, "electrones": 2, "carga": 0},

  // Cerio
  "Ce4+": {"potencial_estandar": +1.70, "electrones": 1, "carga": +4},

  // Cloro
  "Cl2": {"potencial_estandar": +1.359, "electrones": 2, "carga": 0},
  "HClO": {"potencial_estandar": +1.63, "electrones": 1, "carga": 0},
  "ClO3-": {"potencial_estandar": +1.47, "electrones": 5, "carga": -1},

  // Cromo
  "Cr3+": {"potencial_estandar": -0.408, "electrones": 1, "carga": +3},
  "Cr(s)": {"potencial_estandar": -0.744, "electrones": 3, "carga": 0},
  "Cr2O7^2-": {"potencial_estandar": +1.33, "electrones": 6, "carga": -2, "coeficiente": 2},

  // Cobalto
  "Co2+": {"potencial_estandar": -0.277, "electrones": 2, "carga": +2},
  "Co3+": {"potencial_estandar": +1.808, "electrones": 1, "carga": +3},

  // Cobre
  "Cu2+": {"potencial_estandar": +0.337, "electrones": 2, "carga": +2},
  "Cu2+ PEs: +0.153": {"potencial_estandar": +0.153, "electrones": 1, "carga": +1},
  "Cu(s)": {"potencial_estandar": +0.521, "electrones": 1, "carga": 0},
  "Cu2+ PEs: +0.86": {"potencial_estandar": +0.86, "electrones": 1, "carga": 0},
  "CuI(s)": {"potencial_estandar": -0.185, "electrones": 1, "carga": 0},

  // Flúor
  "F2": {"potencial_estandar": +3.06, "electrones": 2, "carga": 0},

  // Hidrógeno
  "H+": {"potencial_estandar": 0.000, "electrones": 2, "carga": +1},

  // Yodo
  "I2(s)": {"potencial_estandar": +0.5355, "electrones": 2, "carga": 0},
  "I2(ac)": {"potencial_estandar": +0.615, "electrones": 2, "carga": 0},
  "I3-": {"potencial_estandar": +0.536, "electrones": 2, "carga": -1},
  "ICl2-": {"potencial_estandar": +1.052, "electrones": 1, "carga": -1},
  "IO3- PEs=+1.196": {"potencial_estandar": +1.196, "electrones": 5, "carga": -1},
  "IO3- PEs=+1.178": {"potencial_estandar": +1.178, "electrones": 5, "carga": -1},
  "IO3- PEs=+1.240": {"potencial_estandar": +1.240, "electrones": 4, "carga": -1},
  "H5IO6": {"potencial_estandar": +1.601, "electrones": 2, "carga": 0},

  // Hierro
  "Fe2+": {"potencial_estandar": -0.440, "electrones": 2, "carga": +2},
  "Fe3+": {"potencial_estandar": +0.771, "electrones": 1, "carga": +3},
  "Fe(CN)6^3-": {"potencial_estandar": +0.36, "electrones": 1, "carga": -3},

  // Plomo
  "Pb2+": {"potencial_estandar": -0.126, "electrones": 2, "carga": +2},
  "PbO2": {"potencial_estandar": +1.455, "electrones": 2, "carga": 0},
  "PbSO4": {"potencial_estandar": -0.350, "electrones": 2, "carga": 0},

  // Litio
  "Li+": {"potencial_estandar": -3.045, "electrones": 1, "carga": +1},

  // Magnesio
  "Mg2+": {"potencial_estandar": -2.363, "electrones": 2, "carga": +2},

  // Manganeso
  "Mn2+": {"potencial_estandar": -1.180, "electrones": 2, "carga": +2},
  "Mn3+": {"potencial_estandar": +1.51, "electrones": 1, "carga": +3},
  "MnO2": {"potencial_estandar": +1.23, "electrones": 2, "carga": 0},
  "MnO4- PEs: +1.51": {"potencial_estandar": +1.51, "electrones": 5, "carga": -1},
  "MnO4- PEs: +1.695": {"potencial_estandar": +1.695, "electrones": 3, "carga": -1},
  "MnO4- PEs: +0.564": {"potencial_estandar": +0.564, "electrones": 1, "carga": -2},

  // Mercurio
  "Hg2^2+": {"potencial_estandar": +0.788, "electrones": 2, "carga": +2},
  "2Hg2+": {"potencial_estandar": +0.920, "electrones": 2, "carga": +2},
  "Hg2+": {"potencial_estandar": +0.854, "electrones": 2, "carga": +2},
  "Hg2Cl2": {"potencial_estandar": +0.268, "electrones": 2, "carga": 0},
  "Hg2SO4": {"potencial_estandar": +0.615, "electrones": 2, "carga": 0},

  // Níquel
  "Ni2+": {"potencial_estandar": -0.250, "electrones": 2, "carga": +2},

  // Nitrógeno
  "N2": {"potencial_estandar": -0.23, "electrones": 4, "carga": 0},
  "HNO2": {"potencial_estandar": +1.00, "electrones": 1, "carga": 0},
  "NO3-": {"potencial_estandar": +0.94, "electrones": 2, "carga": -1},

  // Oxígeno
  "H2O2": {"potencial_estandar": +1.776, "electrones": 2, "carga": 0},
  "HO2-": {"potencial_estandar": +0.88, "electrones": 2, "carga": -1},
  "O2": {"potencial_estandar": +1.229, "electrones": 4, "carga": 0},
  "O2 PE: +0.682": {"potencial_estandar": +0.682, "electrones": 2, "carga": -2},
  "O3": {"potencial_estandar": +2.07, "electrones": 2, "carga": 0},

  // Paladio
  "Pd2+": {"potencial_estandar": +0.987, "electrones": 2, "carga": +2},

  // Platino
  "PtCl4^2-": {"potencial_estandar": +0.755, "electrones": 2, "carga": -2},
  "PtCl6^2-": {"potencial_estandar": +0.68, "electrones": 2, "carga": -2},

  // Potasio
  "K+": {"potencial_estandar": -2.925, "electrones": 1, "carga": +1},

  // Selenio
  "H2SeO3": {"potencial_estandar": +0.740, "electrones": 4, "carga": 0},
  "SeO4^2-": {"potencial_estandar": +1.15, "electrones": 2, "carga": -2},

  // Plata
  "Ag+": {"potencial_estandar": +0.799, "electrones": 1, "carga": +1},
  "AgBr": {"potencial_estandar": +0.073, "electrones": 1, "carga": 0},
  "AgCl": {"potencial_estandar": +0.222, "electrones": 1, "carga": 0},
  "Ag(CN)2-": {"potencial_estandar": -0.31, "electrones": 1, "carga": -1},
  "Ag2CrO4": {"potencial_estandar": +0.446, "electrones": 2, "carga": 0},
  "AgI": {"potencial_estandar": -0.151, "electrones": 1, "carga": 0},
  "Ag(S2O3)2^3-": {"potencial_estandar": +0.017, "electrones": 1, "carga": -3},

  // Sodio
  "Na+": {"potencial_estandar": -2.714, "electrones": 1, "carga": +1},

  // Azufre
  "S": {"potencial_estandar": +0.141, "electrones": 2, "carga": 0},
  "H2SO3": {"potencial_estandar": +0.450, "electrones": 4, "carga": 0},
  "SO4^2-": {"potencial_estandar": +0.172, "electrones": 2, "carga": -2},
  "S4O6^2-": {"potencial_estandar": +0.08, "electrones": 2, "carga": -2},
  "S2O8^2-": {"potencial_estandar": +2.01, "electrones": 2, "carga": -2},

  // Talio
  "Tl+": {"potencial_estandar": -0.336, "electrones": 1, "carga": +1},
  "Tl3+": {"potencial_estandar": +1.25, "electrones": 2, "carga": +3},

  // Estaño
  "Sn2+": {"potencial_estandar": -0.136, "electrones": 2, "carga": +2},
  "Sn4+": {"potencial_estandar": +0.154, "electrones": 2, "carga": +4},

  // Titanio
  "Ti3+": {"potencial_estandar": -0.369, "electrones": 1, "carga": +3},
  "TiO^2+": {"potencial_estandar": +0.099, "electrones": 1, "carga": +2},

  // Uranio
  "UO2^2+": {"potencial_estandar": +0.334, "electrones": 2, "carga": +2},

  // Vanadio
  "V3+": {"potencial_estandar": -0.255, "electrones": 1, "carga": +3},
  "VO^2+": {"potencial_estandar": +0.337, "electrones": 1, "carga": +2},
  "V(OH)4+": {"potencial_estandar": +1.00, "electrones": 1, "carga": +1},

  // Zinc
  "Zn2+": {"potencial_estandar": -0.763, "electrones": 2, "carga": +2}
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

//Acidos//
export const acidosComunes: Record<string, Acido> = {
  "H+": { nombre: "H+", protones: 1, carga: +1 },
  "H2SO4": { nombre: "H2SO4", protones: 2, carga: 0 },
  "HCl": { nombre: "HCl", protones: 1, carga: 0 },
  "HNO3": { nombre: "HNO3", protones: 1, carga: 0 },
  "H3PO4": { nombre: "H3PO4", protones: 3, carga: 0 },
  "CH3COOH": { nombre: "CH3COOH", protones: 1, carga: 0 }
};

export interface Acido {
  nombre: string;
  protones: number;
  carga: number;
}

export interface ElectrochemicalCompound {
  potencial_estandar: number;
  electrones: number;
  carga: number;
}

