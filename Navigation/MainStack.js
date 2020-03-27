import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Main from "./MainNavigation";
import Auth from "./AuthStack";
import LoadingScreen from "../Screens/LoadingScreen";
import TestScreen from "../Screens/test";
import Admin from "./AdminStack";
import DeliveryBoy from "./DeliveryStack";

const swtichNavigator = createSwitchNavigator({
  LoadingScreen,
  Auth,
  Main,
  Admin,
  DeliveryBoy
});
export default createAppContainer(swtichNavigator);
