import React, { useEffect, useState } from 'react';
import { View, FlatList, ImageBackground } from 'react-native';
import { Avatar, IconButton, Modal, Portal, Text, FAB } from 'react-native-paper';
import { styles } from '../../theme/styles';
import { EquipmentCardComponent } from '../../components/EquipmentCardComponent';
import { NewEquipmentComponent } from '../../components/NewEquipmentComponent';
import { onValue, ref, push } from 'firebase/database';
import { dbRealTime } from '../../configs/firebaseConfig';

// Interface - Equipment
export interface Equipment {
    id: string;
    equipo: string;
    cantidad: string;
    numeroSerie: string;
    descripcion: string;
}

export const HomeScreen= () => {
    // Hook useState: lista de equipos
    const [equipments, setEquipments] = useState<Equipment[]>([]);

    // Hook useState: mostrar u ocultar el modal del equipo
    const [showModalEquipment, setShowModalEquipment] = useState<boolean>(false);

    // Función para acceder a la data
    const getAllEquipments = () => {
        // Referencia a la BDD - tabla
        const dbRef = ref(dbRealTime, 'equipments');
        // Consultamos a la BDD
        onValue(dbRef, (snapshot) => {
            // Capturar la data
            const data = snapshot.val();
            // CONTROLAR QUE LA DATA TENGA INFORMACIÓN
            if (!data) return;
            // Obtener keys de los equipos
            const getKeys = Object.keys(data);
            // Crear un arreglo para almacenar los equipos de la BDD
            const listEquipments: Equipment[] = [];
            getKeys.forEach((key) => {
                const value = { ...data[key], id: key };
                listEquipments.push(value);
            });
            // Almacenar en el arreglo del hook
            setEquipments(listEquipments);
        });
    };

    useEffect(() => {
        getAllEquipments();
    }, []);

    return (
        <>
         <ImageBackground source={require('../../../assets/images/4.jpg')} style={styles.backgroundImage}>
            <View style={styles.rootHome}>
                <View style={styles.header}>
                <Text variant='bodyLarge'>Equipos Networiking</Text>
                    <View>
                        
                    </View>
                    <View style={styles.iconEnd}>
                        <IconButton
                            icon="plus"
                            size={30}
                            onPress={() => setShowModalEquipment(true)}
                        />
                    </View>
                </View>
                <View>
                    <FlatList
                    style={styles.flatListContainer}
                        data={equipments}
                        renderItem={({ item }) => <EquipmentCardComponent equipment={item} />}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
            <Portal>
                <Modal visible={showModalEquipment} contentContainerStyle={styles.modal}>
                    <NewEquipmentComponent
                        showModalEquipment={showModalEquipment}
                        setShowModalEquipment={setShowModalEquipment}
                    />
                </Modal>
            </Portal>
            </ImageBackground>
        </>
    );
};


