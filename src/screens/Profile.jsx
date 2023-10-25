import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as SecureStore from "expo-secure-store";
export default function Profile({ navigation }) {

    const logout = async () => {
        const token = await SecureStore.deleteItemAsync("token");
    }

    navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity onPress={() => Alert.alert('Logout', 'Are you sure you want to logout?', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK', onPress: () => {
                        logout();
                        navigation.navigate('Login');
                    }
                }
            ])}>
                <View className="mx-4">
                    <MaterialIcons name="logout" size={29} color="red" />
                </View>
            </TouchableOpacity>
        ),
    })
    return (
        <View className="h-full">
            <Text>Profile</Text>
        </View>
    )
}
