import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

// Estilos
import {globalStyles} from '../styles';

// Tipos
import {FomularioGastoProps} from '../types/types';

const FormularioGasto: React.FC<FomularioGastoProps> = ({
  setModal,
  handleGasto,
  gasto,
  setGasto,
  eliminarGasto,
}) => {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');
  const [id, setId] = useState('');
  const [fecha, setFecha] = useState<Date>();

  useEffect(() => {
    if (gasto?.nombre) {
      setNombre(gasto.nombre);
      setCantidad(String(gasto.cantidad));
      setCategoria(gasto.categoria);
      setId(gasto.id!);
      setFecha(gasto.fecha);
    }
  }, [gasto]);

  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.contenedorBotones}>
        <Pressable
          onLongPress={() => {
            setModal(false);
            setGasto(null);
          }}
          style={[styles.btn, styles.btnCancelar]}>
          <Text style={styles.btnTexto}>Cancelar</Text>
        </Pressable>
        {!!id && (
          <Pressable
            onLongPress={() => {
              eliminarGasto(id);
            }}
            style={[styles.btn, styles.btnEliminar]}>
            <Text style={styles.btnTexto}>Eliminar</Text>
          </Pressable>
        )}
      </View>
      <View style={styles.formulario}>
        <Text style={styles.titulo}>
          {' '}
          {gasto?.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}
        </Text>
        <View style={styles.campo}>
          <Text style={styles.label}>Nombre Gasto:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del gasto. ej Comida"
            value={nombre}
            onChangeText={setNombre}
          />
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>Cantidad Gasto:</Text>
          <TextInput
            style={styles.input}
            placeholder="Cantidad del gasto. ej 300"
            keyboardType="numeric"
            value={cantidad}
            onChangeText={setCantidad}
          />
        </View>
        <View style={styles.campo}>
          <Text style={styles.label}>Caegoria Gasto:</Text>
          <Picker
            style={styles.input}
            selectedValue={categoria}
            onValueChange={value => {
              setCategoria(value);
            }}>
            <Picker.Item label="-- Seleccione --" value="" />
            <Picker.Item label="Ahorro" value="ahorro" />
            <Picker.Item label="Comida" value="comida" />
            <Picker.Item label="Casa" value="casa" />
            <Picker.Item label="Gastos varios" value="gastos" />
            <Picker.Item label="Ocio" value="ocio" />
            <Picker.Item label="Salud" value="salud" />
            <Picker.Item label="suscripciones" value="suscripciones" />
          </Picker>
        </View>
        <Pressable
          onPress={() => {
            handleGasto({
              nombre,
              cantidad: Number(cantidad),
              categoria,
              id,
              fecha,
            });
          }}
          style={styles.submitBtn}>
          <Text style={styles.submitBtnTexto}>
            {gasto?.nombre ? 'Guardar cambios gasto' : 'Agregar gasto'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#1E40AF',
    flex: 1,
  },
  contenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    padding: 10,
    marginTop: 30,
    marginHorizontal: 10,
    borderRadius: 10,
    flex: 1,
  },
  btnEliminar: {
    backgroundColor: 'red',
  },
  btnCancelar: {
    backgroundColor: '#DB2777',
  },
  btnTexto: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  formulario: {
    ...globalStyles.contenedor,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 28,
    marginBottom: 30,
    color: '#64748B',
  },
  campo: {
    marginVertical: 10,
  },
  label: {
    color: '#64748B',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  submitBtn: {
    backgroundColor: '#3B82F6',
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  submitBtnTexto: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default FormularioGasto;
