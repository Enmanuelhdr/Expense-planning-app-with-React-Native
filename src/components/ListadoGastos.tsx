import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

// tipos
import {ListadoGastosProps} from '../types/types';

// Components
import Gasto from './Gasto';

const ListadoGastos: React.FC<ListadoGastosProps> = ({
  gastos,
  setModal,
  setGasto,
  filtro,
  gastosFiltrados,
}) => {
  const mostrarGastos =
    filtro === '' || filtro === ' ' ? gastos : gastosFiltrados;
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Gastos</Text>

      {mostrarGastos.length === 0 ? (
        <Text style={styles.noGastos}>No Hay gastos</Text>
      ) : (
        mostrarGastos.map(gasto => (
          <Gasto
            key={gasto.id}
            gasto={gasto}
            setModal={setModal}
            setGasto={setGasto}
          />
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    marginTop: 30,
    marginBottom: 100,
  },
  titulo: {
    color: '#64748B',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 20,
  },
  noGastos: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
  },
});

export default ListadoGastos;
