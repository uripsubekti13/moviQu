import React, { Component } from 'react'
import { Text, View, ScrollView, FlatList, Image, Dimensions } from 'react-native'
import { TabBarIcon } from '../../shared/component';
import { storageService } from '../../services/storage.service';
import { ListItem, Container } from 'native-base';
import { observer } from "mobx-react";
import { recentStore } from './recent.store';
import navigationService from '../../services/navigation.service';
import { Ads } from '../../shared/component/ads';

@observer
export default class Recent extends Component<any, any> {
    static navigationOptions = {
        tabBarIcon: TabBarIcon('calender'),
        tabBarOnPress: async ({ navigation, defaultHandler }: { navigation: any, defaultHandler: any }) => {
            const list: any[] = await storageService.getList();
            recentStore.recents = list;
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
        console.log(recentStore.recents)
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
                                > Recent </Text>
                            </View>
                        </View>
                        {recentStore.recents.length > 0 ? <FlatList
                            data={recentStore.recents}
                            extraData={recentStore.recents}
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