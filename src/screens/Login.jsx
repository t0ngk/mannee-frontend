import { View, Image, Button, Alert } from "react-native";
import Input from "../components/Input";

export default function Login({ navigation }) {
  return (
    <View className="flex flex-col items-center justify-center content-center my-auto py-52">
      <View className="mb-5">
        <Image
          className="h-20 w-20"
          source={{ uri: "https://cdn.logo.com/hotlink-ok/logo-social.png" }}
        />
      </View>
      <View className="flex flex-col">
        <Input label="Username" placeholder="Your Username" />
        <Input label="Password" placeholder="Your password" />
      </View>
      <View className="border-2 w-80 rounded-md bg-black mt-3">
        <Button
          color="#FFFF"
          title="Login"
          onPress={() => {
            navigation.navigate("MainNavigation");
          }}
        />
      </View>
      <View className="border-[1px] w-80 rounded-md mt-3 top-2/4">
        <Button
          color="#000"
          title="Create Account"
          onPress={() => {
            navigation.navigate("Registor");
          }}
        />
      </View>
    </View>
  );
}
