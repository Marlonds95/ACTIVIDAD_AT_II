import React from 'react';
import { Card, Text } from 'react-native-paper';
import { Equipment } from '../screens/HomeScreen/HomeScreen';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigator/StackNavigator';

type DetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Detail'>;

export const EquipmentCardComponent = ({ equipment }: { equipment: Equipment }) => {
    const navigation = useNavigation<DetailScreenNavigationProp>();

    return (
        <Card onPress={() => navigation.navigate('Detail', { equipment })}>
            <Card.Content>
                <Text variant="titleMedium">{equipment.equipo}</Text>
                <Text variant="bodyMedium">Cantidad de Puertos: {equipment.cantidad}</Text>
                <Text variant="bodyMedium">Número de Serie: {equipment.numeroSerie}</Text>
                <Text variant="bodyMedium">Descripción: {equipment.descripcion}</Text>
            </Card.Content>
        </Card>
    );
};
