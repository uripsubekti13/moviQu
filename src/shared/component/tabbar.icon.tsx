import * as React from "react";

import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import * as IconMoonConfig from "../../../assets/fonts/selection.json"
const Icon = createIconSetFromIcoMoon(IconMoonConfig)

const tabBarIcon = (name: string) => ({tintColor}: {tintColor: string}) => {
    return (
        <Icon style={{backgroundColor: 'transparent', fontSize: 22, color: tintColor}} name={name} />
    )
}

export default tabBarIcon