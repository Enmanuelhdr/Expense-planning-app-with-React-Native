import React from 'react';
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';

import {NuevoPresupuestoProps} from '../types/types';
import {globalStyles} from '../styles';

export const NuevoPresupuesto: React.FC<NuevoPresupuestoProps> = ({
  handleNuevoPresupuesto,
  presupuesto,
  setPresupuesto,
}) => {
  const handlePresupuestoChange = (text: string) => {
    const numericValue = parseFloat(text);
    if (!isNaN(numericValue) || text === '') {
      setPresupuesto(numericValue);
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Definir presupuesto</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="Agrega tu presupuesto: Ej. 300"
        style={styles.input}
        value={presupuesto ? presupuesto.toString() : ''}
        onChangeText={handlePresupuestoChange}
      />
      <Pressable
        style={styles.boton}
        onPress={() => handleNuevoPresupuesto(presupuesto)}>
        <Text style={styles.botonTexto}>Agregar presupuesto</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },
  label: {
    textAlign: 'center',
    fontSize: 24,
    color: '#3B82F6',
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 30,
  },
  boton: {
    marginTop: 30,
    backgroundColor: '#1048A4',
    padding: 10,
    borderRadius: 10,
  },
  botonTexto: {
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
