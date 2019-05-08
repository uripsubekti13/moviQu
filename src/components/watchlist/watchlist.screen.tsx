import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { TabBarIcon } from '../../shared/component';

export default class Watchlist extends Component {
    static navigationOptions = {
        tabBarIcon: TabBarIcon('clock')
    }
    render() {
        return (
            <View>
                <Text> Watchlist </Text>
            </View>
        )
    }
}