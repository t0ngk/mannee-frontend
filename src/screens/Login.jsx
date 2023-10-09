import { View, Button } from "react-native";
import Input from "../components/Input";

export default function Login() {
  return (
    <View className="flex-1 items-center justify-between">
      <View>
        <Input label="Username" />
        <Input label="Password" />
      </View>
      <View>
        <Button title="Login" />
      </View>
    </View>
  );
}
