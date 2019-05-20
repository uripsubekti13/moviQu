import React, { Component } from "react";
import { View } from "react-native";
import { AdMobBanner } from "react-native-admob";
import  CONSTANT  from "../../config/app.const";

export class Ads extends Component {
  render() {
    return (
      <View style={{ backgroundColor: "transparent" }}>
        <AdMobBanner
          adSize={"smartBannerPortrait"}
          adUnitID={CONSTANT.ADS_UNIT_ID}
          testDevices={[AdMobBanner.simulatorId]}
          onAdFailedToLoad={(error: any) => console.log(error)}
        />
      </View>
    );
  }
}
