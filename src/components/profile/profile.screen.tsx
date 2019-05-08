import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { TabBarIcon } from '../../shared/component';

export default class Profile extends Component {
    static navigationOptions = {
        tabBarIcon: TabBarIcon('user')
    }
    render() {
        return (
            <View>
                <Text> Profile </Text>
            </View>
        )
    }
}