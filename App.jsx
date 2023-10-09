import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import Login from "./src/screens/Login";


export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-neutral-100">
      <Login />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
