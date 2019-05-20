import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Discover from "./components/discover/discover.screen";
import Recent from "./components/recent/recent.screen";
import Watchlist from "./components/watchlist/watchlist.screen";
import Profile from "./components/profile/profile.screen";

export default createMaterialBottomTabNavigator(
  {
    Discover,
    Recent,
    Watchlist,
    // Profile
  },
  {
    shifting: false,
    barStyle: { backgroundColor: "#fff" },
    activeTintColor: "rgb(255,0,219)",
    inactiveTintColor: "rgb(181,182,226)"
  }
);
