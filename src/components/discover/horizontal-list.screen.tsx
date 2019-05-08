import React, { Component } from 'react'
import { Text, View, FlatList, Image, TouchableOpacity, ImageBackground } from 'react-native'
import navigationService from '../../services/navigation.service';
import { Movie } from '../../services/rest/discover_rest.service';
import { QUALITY } from './quality-color';
import * as _ from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
const wrapTitle = (title: string) => {
    const maxLength = 35;
    if (title.length <= maxLength) return title
    return title.substr(0, maxLength -1) + '...';
}
interface Props {
    data: Movie[];
    title: string;
    onSeeAll?: () => void;
}
export default class HorizontalList extends Component<Props> {


    renderItem = ({ item, index }: { item: Movie, index: number }) => {
        return (
            <TouchableOpacity key={index} onPress={() => navigationService.navigate('Detail', { id: item.id })}>
                <View style={{ marginHorizontal: 5 }}>
                    <ImageBackground source={{ uri: item.poster }} style={{ height: 200, width: 130 }} imageStyle={{ borderRadius: 7 }} resizeMethod={'scale'} >
                        <View style={{ flex: 0.7, flexDirection: 'column' }}>
                            <View style={{ height: 20, flexDirection: 'row' }}>
                                <View style={{ flex: 2 * item.quality.length / 5, backgroundColor: _.get(QUALITY, item.quality, '#00c67d'), padding: 3, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 7 }}><Text style={{ color: '#fff', fontWeight: '600', fontSize: 12 }}>{item.quality}</Text></View>
                                <View style={{ flex: 2 }} />
                                <View style={{ flex: 1, backgroundColor: '#e85804', padding: 3, justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 7 }}><Text style={{ color: '#fff', fontWeight: '600', fontSize: 12 }}>{item.rating}</Text></View>
                            </View>
                            <View style={{ height: 140 }} />
                            <View style={{ height: 40 }}>
                                <LinearGradient
                                    colors={['rgba(0,0,0,0)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.8)']}
                                    style={{ height: '100%', width: '100%', borderBottomLeftRadius: 7, borderBottomRightRadius: 7 }}
                                >
                                    <Text style={{ textAlign: 'center', color: '#fff', fontSize: 14, fontWeight: '500' }}>{wrapTitle(item.title)}</Text>
                                </LinearGradient>
                            </View>
                        </View>
                    </ImageBackground>
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