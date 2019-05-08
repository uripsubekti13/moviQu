import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { TabBarIcon } from '../../shared/component';

export default class Upcoming extends Component {
    static navigationOptions = {
        tabBarIcon: TabBarIcon('calender')
    }
    render() {
        return (
            <View>
                <Text> Upcoming </Text>
            </View>
        )
    }
}