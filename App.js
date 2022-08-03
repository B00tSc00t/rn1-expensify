import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";

import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import LoginScreen from "./screens/LoginScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import ExpensesOverview from "./screens/ExpenseOverview";
import SignupScreen from "./screens/SignupScreen";
import { GlobalStyles } from "./constants/styles";
import IconButton from "./components/UI/IconButton";
import News from "./screens/AllScreens";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();
import ExpensesContextProvider from "./store/expenses-context";
import { Colors } from "./constants/styles";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useContext, useEffect, useState } from "react";

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="News"
        component={News}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ManageExpense"
        component={ManageExpense}
        options={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer independent={true}>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <AppLoading />;
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}

// export default function App() {
//   return (
//     <>
//       <StatusBar style="light" />
//       <AuthContextProvider>
//         <Root />
//       </AuthContextProvider>
//       <ExpensesContextProvider>
//         <NavigationContainer independent={true}>
//           <Stack.Navigator
//             screenOptions={{
//               headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
//               headerTintColor: "white",
//             }}
//           >
//             <Stack.Screen
//               name="ExpensesOverview"
//               component={ExpensesOverview}
//               options={{ headerShown: false }}
//             />
//             <Stack.Screen
//               name="ManageExpense"
//               component={ManageExpense}
//               options={{
//                 presentation: "modal",
//               }}
//             />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </ExpensesContextProvider>
//     </>
//   );
// }
