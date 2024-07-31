import React from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native';

export const Header: React.FC = () => {
  return (
    <SafeAreaView>
      <Text style={styles.texto}>Planificador de gastos</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  texto: {
    textAlign: 'center',
    fontSize: 35,
    color: '#FFF',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    paddingTop: 20,
  },
});
