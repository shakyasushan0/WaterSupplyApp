import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Main from "./MainNavigation";
import Auth from "./AuthStack";
import LoadingScreen from "../Screens/LoadingScreen";

const swtichNavigator = createSwitchNavigator({
  LoadingScreen,
  Auth,
  Main
});
export default createAppContainer(swtichNavigator);
