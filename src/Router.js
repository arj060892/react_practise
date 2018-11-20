import LoginScreen from "../src/app/pages/Login.js";
import RegisterScreen from "../src/app/pages/Register.js";
import { createStackNavigator } from "react-navigation";
import DashboardScreen from "./app/pages/Dashboard.js";

const AppStackNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    },
    Register: {
      screen: RegisterScreen
    } ,
       Dashboard: {
      screen: DashboardScreen,
      navigationOptions: {
        header: null
      }
    },
  },
  {
    initialRouteName: "Login"
  }
);
export default AppStackNavigator;
