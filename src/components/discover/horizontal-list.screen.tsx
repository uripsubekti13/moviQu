import React, { Component } from 'react'
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import navigationService from '../../services/navigation.service';
import { Movie } from '../../services/rest/discover_rest.service';

interface Props {
    data: Movie[];
    title: string;
    onSeeAll?: () => void;
}
export default class HorizontalList extends Component<Props> {
    renderItem = ({ item, index }: { item: Movie, index: number }) => {
        return (
            <TouchableOpacity onPress={() => navigationService.navigate('Detail', {id: item.id})}>
                <View key={index} style={{ marginHorizontal: 5 }}>
                    <Image source={{uri: item.poster}} style={{ height: 200, width: 130, borderRadius: 7 }} resizeMethod={'scale'} />
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View>
                <View style={{ borderBottomColor: 'rgba(0,0,0,0.1)', borderBottomWidth: 1, marginHorizontal: 10, marginTop: 10 }} />
                <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Bold' }}>{this.props.title}</Text>
                        </View>
                        <View style={{ flex: 0.3, alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 16, fontFamily: 'OpenSans-Semibold', color: "rgb(255,0,219)" }}>See All</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <FlatList
                        horizontal
                        data={this.props.data}
                        renderItem={this.renderItem}
                    />
                </View>

            </View>
        )
    }
}