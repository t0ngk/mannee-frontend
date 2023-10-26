import { View, Text, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as SecureStore from "expo-secure-store";
import { useUser } from '../stores/userContext';
export default function Profile({ navigation }) {

    const logout = async () => {
        const token = await SecureStore.deleteItemAsync("token");
    }

    const { user } = useUser();

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
        <View className="flex-1 flex justify-center items-center">
            <Image
            className="rounded border-2 border-gray-400"
                source={{ uri: `https://github.com/identicons/${user.username}.png` }}
                style={{ width: 300, height: 300, borderRadius: 200 }}
            />
            <Text className="text-4xl">{user.username}</Text>
        </View>
    )
}
