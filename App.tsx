
import React, { Component } from 'react';
import AppRoute from "./src/app.route";
import navigationService from './src/services/navigation.service';

interface Props { }
export default class App extends Component<Props> {
  render() {
    return (
      <AppRoute
        ref={navigator => {
          navigationService.setTopLevelNavigator(navigator);
        }}
      />
    );
  }
}
