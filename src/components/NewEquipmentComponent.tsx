import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, IconButton, TextInput, Text } from 'react-native-paper';
import { styles } from '../theme/styles';
import { ref, push } from 'firebase/database';
import { dbRealTime } from '../configs/firebaseConfig';

interface NewEquipmentComponentProps {
    showModalEquipment: boolean;
    setShowModalEquipment: (value: boolean) => void;
}

export const NewEquipmentComponent: React.FC<NewEquipmentComponentProps> = ({ showModalEquipment, setShowModalEquipment }) => {
    const [newEquipment, setNewEquipment] = useState({
        equipo: '',
        cantidad: '',
        numeroSerie: '',
        descripcion: ''
    });

    const handlerSetValues = (key: string, value: string) => {
        setNewEquipment({ ...newEquipment, [key]: value });
    };

    const handlerAddEquipment = async () => {
        const dbRef = ref(dbRealTime, 'equipments');
        await push(dbRef, newEquipment);
        setShowModalEquipment(false);
        setNewEquipment({ equipo: '', cantidad: '', numeroSerie: '', descripcion: '' });
    };

    return (
        <View style={styles.modal}>
            <View style={styles.header}>
            <Text variant='headlineMedium'>Nuevo Equipo</Text>
                    <View style={styles.iconEnd}>
                        <IconButton
                            icon='close-circle-outline'
                            size={30}
                            onPress={() => setShowModalEquipment(false)} />
                    </View>

                    </View>
            <TextInput
                label="Equipo"
                value={newEquipment.equipo}
                onChangeText={(value) => handlerSetValues('equipo', value)}
            />
            <TextInput
                label="Cantidad Puertos"
                keyboardType='numeric'
                value={newEquipment.cantidad}
                onChangeText={(value) => handlerSetValues('cantidad', value)}
            />
            <TextInput
                label="Número de Serie"
                value={newEquipment.numeroSerie}
                onChangeText={(value) => handlerSetValues('numeroSerie', value)}
            />
            <TextInput
                label="Descripción"
                value={newEquipment.descripcion}
                multiline={true}
                numberOfLines={3}
                onChangeText={(value) => handlerSetValues('descripcion', value)}
            />
            <Button mode="contained" onPress={handlerAddEquipment}>
                Agregar
            </Button>
        </View>
    );
};



