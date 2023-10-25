import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Image } from "react-native";
import Login from "./src/screens/Login";
import AuthNavigation from "./src/router/AuthenNavigation";
import { ColorContextProvider } from "./src/stores/colorContext";
import { IconContextProvider } from "./src/stores/iconContext";

export default function App() {
  return (
    <IconContextProvider>
      <ColorContextProvider>
        <AuthNavigation />
      </ColorContextProvider>
    </IconContextProvider>
  );
}
