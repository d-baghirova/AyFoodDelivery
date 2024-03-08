import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PasswordInput from "./src/components/PasswordInput";
import Login from "./src/screens/Login";
import RootNavigation from "./src/navigation/Index";
import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./src/context/AuthContext";
import { useAuth } from "./src/context/AuthContext";
import UserProvider from "./src/context/UserContext";
import CartProvider from "./src/context/CartContext";

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <CartProvider>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </CartProvider>
      </UserProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
