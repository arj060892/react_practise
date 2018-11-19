import LoginScreen from "../src/app/pages/Login.js";
import RegisterScreen from "../src/app/pages/Register.js";
import { createStackNavigator } from "react-navigation";

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
    }
  },
  {
    initialRouteName: "Login"
  }
);
export default AppStackNavigator;
