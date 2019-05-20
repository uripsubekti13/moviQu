
import React, { Component } from 'react';
import { Root } from "native-base";
import AppRoute from "./src/app.route";
import navigationService from './src/services/navigation.service';

interface Props { }
export default class App extends Component<Props> {
  render() {
    return (
      <Root>
        <AppRoute
          ref={navigator => {
            navigationService.setTopLevelNavigator(navigator);
          }}
        />
      </Root>
    );
  }
}
