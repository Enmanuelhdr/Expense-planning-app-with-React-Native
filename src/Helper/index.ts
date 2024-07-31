export const formatearCantidad = (cantidad: number) => {
  return Number(cantidad).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatearFecha = (fecha: Date): string => {
  const fechaNueva = new Date(fecha);
  const opciones: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  };
  return fechaNueva.toLocaleDateString('es-ES', opciones);
};

export const generarId = () => {
  const random = Math.random().toString(36).substring(2, 11);
  const fecha = Date.now().toString(36);
  return random + fecha;
};
