import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Pressable,
  Image,
  Modal,
  ScrollView,
} from 'react-native';

// components
import {Header} from './src/components/Header';
import {NuevoPresupuesto} from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import ListadoGastos from './src/components/ListadoGastos';
import Filtro from './src/components/Filtro';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Tipos
import {HandleGasto, Gasto} from './src/types/types';

// Helpers
import {generarId} from './src/Helper';

const App: React.FC = () => {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState<boolean>(false);
  const [presupuesto, setPresupuesto] = useState<number>(0);
  const [gastos, setGastos] = useState<HandleGasto[]>([]);
  const [modal, setModal] = useState(false);
  const [gasto, setGasto] = useState<HandleGasto | null>(null);
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState<Gasto[]>([]);

  useEffect(() => {
    const obtenerPresupuestoStorage = async () => {
      try {
        const presupuestoStorage =
          (await AsyncStorage.getItem('planificador_presupuesto')) ?? 0;
        if (Number(presupuestoStorage) > 0) {
          setPresupuesto(Number(presupuestoStorage));
          setIsValidPresupuesto(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPresupuestoStorage();
  }, []);

  useEffect(() => {
    if (isValidPresupuesto) {
      const guardarPresupuestoStorage = async () => {
        try {
          await AsyncStorage.setItem(
            'planificador_presupuesto',
            String(presupuesto),
          );
        } catch (error) {
          console.log(error);
        }
      };
      guardarPresupuestoStorage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidPresupuesto]);

  useEffect(() => {
    const obtenerGastosStorage = async () => {
      try {
        const gastosStorage =
          (await AsyncStorage.getItem('planificador_gastos')) ?? [];
        setGastos(gastosStorage ? JSON.parse(String(gastosStorage)) : []);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerGastosStorage();
  }, []);

  useEffect(() => {
    const guardarGastosStorage = async () => {
      try {
        await AsyncStorage.setItem(
          'planificador_gastos',
          JSON.stringify(gastos),
        );
      } catch (error) {
        console.log(error);
      }
    };
    guardarGastosStorage();
  }, [gastos]);

  const handleNuevoPresupuesto = (nuevoPresupuesto: number) => {
    if (nuevoPresupuesto > 0) {
      setIsValidPresupuesto(true);
      setPresupuesto(nuevoPresupuesto);
    } else {
      Alert.alert('Error', 'El presupuesto no puede ser 0 o menor');
    }
  };

  const handleGasto = (nuevoGasto: HandleGasto) => {
    // Validar si todos los campos están llenos
    if (
      [
        nuevoGasto.nombre,
        nuevoGasto.categoria,
        nuevoGasto.cantidad.toString(),
      ].includes('')
    ) {
      Alert.alert('Error', 'Todos los campos deben estar llenos');
      return;
    }

    if (nuevoGasto.id) {
      // Editar gasto existente
      const gastosActualizados = gastos.map(gastoState =>
        gastoState.id === nuevoGasto.id ? nuevoGasto : gastoState,
      );
      setGastos(gastosActualizados);
    } else {
      // Agregar nuevo gasto
      nuevoGasto.id = generarId();
      nuevoGasto.fecha = new Date(Date.now());
      setGastos([...gastos, nuevoGasto]);
    }

    setModal(!modal);
    setGasto(null);
  };

  const mappedGastos: Gasto[] = gastos.map(nuevoGasto => ({
    id: nuevoGasto.id!,
    nombre: nuevoGasto.nombre,
    cantidad: Number(nuevoGasto.cantidad),
    categoria: nuevoGasto.categoria,
    fecha: nuevoGasto.fecha ? new Date(nuevoGasto.fecha) : new Date(), // Asegura que fecha sea un Date
  }));

  const eliminarGasto = (id: string) => {
    Alert.alert(
      'Deseas eliminar este gasto?',
      'Un gasto elminado no se puede recuperar',
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Si, Eliminar',
          onPress: () => {
            const gastosActualizados = gastos.filter(
              gastoState => gastoState.id !== id,
            );

            setGastos(gastosActualizados);
            setModal(!modal);
            setGasto(null);
          },
        },
      ],
    );
  };
  const resetearApp = () => {
    Alert.alert(
      'Deseas resetar la app?',
      'Esto eliminara presupuesto y gastos',
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Si, Eliminar',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              setIsValidPresupuesto(false);
              setPresupuesto(0);
              setGastos([]);
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
    );
  };
  return (
    <View style={styles.contenedor}>
      <ScrollView>
        <View style={styles.header}>
          <Header />
          {!isValidPresupuesto ? (
            <NuevoPresupuesto
              handleNuevoPresupuesto={handleNuevoPresupuesto}
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
            />
          ) : (
            <ControlPresupuesto
              presupuesto={presupuesto}
              gastos={mappedGastos}
              resetearApp={resetearApp}
            />
          )}
        </View>

        {isValidPresupuesto && (
          <>
            <Filtro
              filtro={filtro}
              setFiltro={setFiltro}
              gastos={mappedGastos}
              setGastosFiltrados={setGastosFiltrados}
            />

            <ListadoGastos
              gastos={mappedGastos}
              setModal={setModal}
              setGasto={setGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </>
        )}
      </ScrollView>

      {modal && (
        <Modal
          animationType="slide"
          visible={modal}
          onRequestClose={() => {
            [setModal(!modal), setGasto(null)];
          }}>
          <FormularioGasto
            setModal={setModal}
            handleGasto={handleGasto}
            gasto={gasto}
            setGasto={setGasto}
            eliminarGasto={eliminarGasto}
          />
        </Modal>
      )}

      {isValidPresupuesto && (
        <Pressable style={styles.pressable} onPress={() => setModal(!modal)}>
          <Image
            style={styles.imagen}
            source={require('./src/img/nuevo-gasto.png')}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  header: {
    backgroundColor: '#3B82F6',
    minHeight: 430,
  },
  pressable: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
  imagen: {
    width: 60,
    height: 60,
  },
});

export default App;
