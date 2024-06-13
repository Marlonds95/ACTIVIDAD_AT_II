import React, { useEffect, useState } from 'react';
import { View,ImageBackground} from 'react-native';
import { Button, Divider, Text, TextInput } from 'react-native-paper';
import { styles } from '../../theme/styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Equipment } from '../HomeScreen/HomeScreen';
import { ref, remove, update } from 'firebase/database';
import { dbRealTime } from '../../configs/firebaseConfig';

export const DetailEquipmentScreen: React.FC = () => {
    // Hook para capturar los parámetros mediante navegación
    const route = useRoute();
    const navigation = useNavigation();
    const { equipment } = route.params as { equipment: Equipment };

    // Hook useState: manipular el formulario
    const [editFormEquipment, setEditFormEquipment] = useState<Equipment>({
        id: '',
        equipo: '',
        cantidad: '',
        numeroSerie: '',
        descripcion: ''
    });

    // Hook useEffect: Mostrar la información recibida en el formulario
    useEffect(() => {
        setEditFormEquipment(equipment);
    }, [equipment]);

    // Función: cambiar los datos del formulario
    const handlerSetValues = (key: string, value: string) => {
        setEditFormEquipment({ ...editFormEquipment, [key]: value });
    };

    // Función actualizar la data del equipo
    const handlerUpdateEquipment = async () => {
        // Referencia a la BDD - tabla
        const dbRef = ref(dbRealTime, 'equipments/' + editFormEquipment.id);
        // Actualizar data
        await update(dbRef, { ...editFormEquipment });
        navigation.goBack();
    };

    // Función eliminar la data del equipo
    const handlerDeleteEquipment = async () => {
        // Referencia a la BDD - tabla
        const dbRef = ref(dbRealTime, 'equipments/' + editFormEquipment.id);
        // Eliminar data
        await remove(dbRef);
        navigation.goBack();
    };

    return (
        
        
        <View style={styles.rootDetail}>
            <ImageBackground source={require('../../../assets/images/4.jpg')} style={styles.backgroundImage}></ImageBackground>
            <Text variant='headlineMedium'>Editar Item</Text>
            <View>
                <Text variant='headlineSmall'> {editFormEquipment.equipo}</Text>
                <Divider />
            </View>
            <View>
                <Text variant='bodyLarge'>Cantidad de Puertos: </Text>
                <TextInput
                    keyboardType='numeric'
                    value={editFormEquipment.cantidad}
                    onChangeText={(value) => handlerSetValues('cantidad', value)}
                />
                <Divider />
            </View>
            <View>
                <Text variant='bodyLarge'>Número de Serie: {editFormEquipment.numeroSerie}</Text>
                <TextInput
                    value={editFormEquipment.numeroSerie}
                    onChangeText={(value) => handlerSetValues('numeroSerie', value)}
                />
                <Divider />
            </View>
            <View style={{ gap: 20 }}>
                <Text style={styles.textDetail}>Descripción</Text>
                <TextInput
                    value={editFormEquipment.descripcion}
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={(value) => handlerSetValues('descripcion', value)}
                />
            </View>
            <Button
                mode='contained'
                icon='update'
                onPress={handlerUpdateEquipment}>Actualizar</Button>
            <Button
                mode='contained'
                icon='delete'
                onPress={handlerDeleteEquipment}>Eliminar</Button>
        </View>
        
    );
};
