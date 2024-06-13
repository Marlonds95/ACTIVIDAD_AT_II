import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { DetailEquipmentScreen } from '../screens/DetailEquipmentScreen/DetailEquipmentScreen';
import { Equipment } from '../screens/HomeScreen/HomeScreen';
export type RootStackParamList = {
    Home: undefined;
    Detail: { equipment: Equipment };
};

const Stack = createStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Detail'
                component={DetailEquipmentScreen}
                options={{ headerShown: true }}
            />
        </Stack.Navigator>
    );
};
