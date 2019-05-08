import { createNavigationContainer, createStackNavigator } from "react-navigation";
import Tabs from "./tab.route";
import Search from "./components/search/search.screen";
import Detail from "./components/detail/detail.screen"
import Player from "./components/player/player.screen"

const RootStack = createStackNavigator({
    Tabs,
    Search,
    Detail,
    Player
}, {
    defaultNavigationOptions: {
        header: null
    }
});

const AppRoute = createNavigationContainer(RootStack);

export default AppRoute;
