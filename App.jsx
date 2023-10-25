import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Image } from "react-native";
import Login from "./src/screens/Login";
import AuthNavigation from "./src/router/AuthenNavigation";
import { createContext } from "react";
import { SubConProvider } from "./src/context/subcon";

export default function App() {
  return (
    <SubConProvider>
      < AuthNavigation />
    </SubConProvider>
  );
}
