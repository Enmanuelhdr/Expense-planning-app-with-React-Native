export interface Gasto {
  id: string; // Cambié a string para que coincida con el tipo de id en HandleGasto
  cantidad: number;
  nombre: string;
  categoria: string;
  fecha: Date;
}

export interface NuevoPresupuestoProps {
  handleNuevoPresupuesto: (nuevoPresupuesto: number) => void;
  presupuesto: number;
  setPresupuesto: (presupuesto: number) => void;
}

export interface ControlPresupuestoProps {
  presupuesto: number;
  gastos: Gasto[];
  resetearApp: () => void;
}

export interface ListadoGastosProps {
  setGasto: (gasto: HandleGasto) => void;
  setModal: (visible: boolean) => void;
  gastos: Gasto[];
  filtro: string;
  gastosFiltrados: Gasto[];
}

export interface GastoProps {
  setModal: (visible: boolean) => void;
  setGasto: (gasto: HandleGasto) => void;
  gasto: Gasto;
}

export interface HandleGasto {
  id?: string;
  nombre: string;
  cantidad: number;
  categoria: string;
  fecha?: Date;
}

export interface FomularioGastoProps {
  handleGasto: (gasto: HandleGasto) => void;
  setModal: (visible: boolean) => void;
  setGasto: (gasto: HandleGasto | null) => void;
  gasto: HandleGasto | null;
  eliminarGasto: (id: string) => void;
}

export interface FiltroProps {
  filtro: string;
  setFiltro: (filtro: string) => void;
  gastos: Gasto[]; // Cambié a Gasto[] para reflejar que es una lista de gastos
  setGastosFiltrados: (gastosFiltrados: Gasto[]) => void; // Cambié a Gasto[] para reflejar que es una lista de gastos
}
