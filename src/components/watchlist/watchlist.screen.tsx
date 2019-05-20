import React, { Component } from 'react'
import { Text, View, ScrollView, FlatList, Image, Dimensions } from 'react-native'
import { TabBarIcon } from '../../shared/component';
import { ListItem, Container } from 'native-base';
import { observer } from "mobx-react";
import { watchlistStore } from './watchlist.store';
import navigationService from '../../services/navigation.service';
import { watchlistService } from '../../services/watchlist.service';
import { Ads } from '../../shared/component/ads';

@observer
export default class Watchlist extends Component<any, any> {
    static navigationOptions = {
        tabBarIcon: TabBarIcon('clock'),
        tabBarOnPress: async ({ navigation, defaultHandler }: { navigation: any, defaultHandler: any }) => {
            const list: any[] = await watchlistService.getList();
            watchlistStore.watchlist = list;
            defaultHandler()
        },
    }

    constructor(props: any) {
        super(props);
    }

    renderItem = ({ item, index }: { item: any, index: number }) => {
        console.log(this.props.navigation.getParam('list'))
        return (
            <ListItem key={index} onPress={() => navigationService.navigate('Detail', { id: item.id })} >
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View>
                        <Image source={{ uri: item.poster }} style={{ width: 69, height: 69 }} />
                    </View>
                    <View style={{ flexWrap: 'wrap', paddingHorizontal: 10 }}>
                        <Text style={{ fontWeight: '500', color: '#000', fontSize: 15, width: '70%' }}>{item.title}</Text>
                        <Text style={{ fontSize: 11 }}>{`[${item.quality}]`} - {item.country}</Text>
                        <Text style={{ fontSize: 11 }}>{`Rating: ${item.rating}/10`}</Text>
                    </View>
                </View>
            </ListItem>
        )
    }
    render() {
        return (
            <Container>
                <ScrollView>
                    <View style={{ paddingHorizontal: 5 }}>
                        <View style={{ marginTop: 15, flexDirection: 'row', flex: 1 }}>
                            <View style={{ flex: 3 }}>
                                <Text
                                    style={{
                                        fontSize: 28,
                                        color: 'rgb(56,57,82)',
                                        fontFamily: 'OpenSans-Bold'
                                    }}
                                > Watchlist </Text>
                            </View>
                        </View>
                        {watchlistStore.watchlist.length > 0 ? <FlatList
                            data={watchlistStore.watchlist}
                            extraData={watchlistStore.watchlist}
                            renderItem={this.renderItem}
                        /> : <View style={{ paddingTop: Dimensions.get('window').height / 2 - 70, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>Empty</Text>
                            </View>}
                    </View>
                    <View style={{ height: 10 }} />
                </ScrollView>
                <Ads />
            </Container>
        )
    }
}