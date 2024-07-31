import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';

import {globalStyles} from '../styles';
import {ControlPresupuestoProps} from '../types/types';
import {formatearCantidad} from '../Helper';

import {AnimatedCircularProgress} from 'react-native-circular-progress';

const ControlPresupuesto: React.FC<ControlPresupuestoProps> = ({
  presupuesto,
  gastos,
  resetearApp,
}) => {
  const [disponible, setDisponible] = useState<number>(0);
  const [gastado, setGastado] = useState<number>(0);
  const [porcentaje, setPorcentaje] = useState<number>(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => Number(gasto.cantidad) + total,
      0,
    );

    const totalDisponible = presupuesto - totalGastado;

    const porcentajeGastado = (totalGastado / presupuesto) * 100;
    setTimeout(() => {
      setPorcentaje(porcentajeGastado);
    }, 500);
    setDisponible(totalDisponible);
    setGastado(totalGastado);
  }, [gastos, presupuesto]);

  return (
    <View style={styles.contenedor}>
      <View style={styles.grafica}>
        <AnimatedCircularProgress
          size={300}
          width={20}
          fill={porcentaje}
          tintColor="#3B82F6"
          lineCap="round"
          rotation={360}
          backgroundColor="#F5F5F5">
          {() => (
            <View style={styles.contenidoGrafica}>
              <Text style={styles.porcentajeGrafica}>
                {porcentaje.toFixed(2)}%
              </Text>
              <Text style={styles.porcentajeGraficaTitulo}>Gastado</Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>
      <View style={styles.contenedorTexto}>
        <Pressable onLongPress={() => resetearApp()} style={styles.boton}>
          <Text style={styles.textoBoton}>Reiniciar App</Text>
        </Pressable>
        <Text style={styles.valor}>
          <Text style={styles.label}>Presupuesto: </Text>
          {formatearCantidad(presupuesto)}
        </Text>
        <Text style={styles.valor}>
          <Text style={styles.label}>Disponible: </Text>
          {formatearCantidad(disponible)}
        </Text>
        <Text style={styles.valor}>
          <Text style={styles.label}>Gastado: </Text>
          {formatearCantidad(gastado)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },
  grafica: {
    alignItems: 'center',
  },
  contenidoGrafica: {
    alignItems: 'center',
  },
  porcentajeGrafica: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  boton: {
    backgroundColor: '#db2777',
    padding: 10,
    marginBottom: 40,
    borderRadius: 5,
  },
  textoBoton: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  porcentajeGraficaTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#64748B',
  },
  contenedorTexto: {
    marginTop: 50,
  },
  valor: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: '700',
    color: '#3B82F6',
  },
});

export default ControlPresupuesto;
