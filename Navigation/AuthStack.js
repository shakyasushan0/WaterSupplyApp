import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "../Screens/LoginScreen";
import SignupScreen from "../Screens/SignupScreen";

const stackNavigator = createStackNavigator({
  LoginScreen,
  SignupScreen
});

export default createAppContainer(stackNavigator);
