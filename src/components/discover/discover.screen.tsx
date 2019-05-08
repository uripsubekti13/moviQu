import React, { Component } from 'react'
import { Text, View, ScrollView, Alert, TouchableOpacity } from 'react-native'
import { TabBarIcon } from '../../shared/component';
import HorizontalList from './horizontal-list.screen';
import { discoverRestService } from '../../services/rest';
import { Movie } from '../../services/rest/discover_rest.service';
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import * as IconMoonConfig from "../../../assets/fonts/selection.json"
import navigationService from '../../services/navigation.service';
const Icon = createIconSetFromIcoMoon(IconMoonConfig)

interface State {
    featured: Movie[],
    latest: Movie[],
    year: Movie[],
}
export default class Discover extends Component<any, State> {
    static navigationOptions = {
        tabBarIcon: TabBarIcon('discover')
    }

    constructor(props: any) {
        super(props);
        this.state = {
            featured: [],
            latest: [],
            year: [],
        }
    }

    async componentWillMount() {
        const { featured, latest, year } = await discoverRestService.getFirstData();
        if (featured && featured.length > 0) this.setState({ featured })
        if (latest && latest.length > 0) this.setState({ latest })
        if (year && year.length > 0) this.setState({ year })
    }

    render() {
        const { featured, latest, year } = this.state
        return (
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
                            > Discover </Text>
                        </View>
                        <TouchableOpacity onPress={() => navigationService.navigate('Search')}>
                            <View style={{ justifyContent: 'center', alignContent: 'flex-end', marginHorizontal: 10 }}>
                                <Icon style={{ backgroundColor: 'transparent', fontSize: 27, color: 'rgb(56,57,82)', marginTop: 6 }} name={'search'} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    {featured.length > 0 && <HorizontalList data={featured} title={'Featured Movies'} />}
                    {latest.length > 0 && <HorizontalList data={latest} title={'Latest Movies'} />}
                    {year.length > 0 && <HorizontalList data={year} title={'Year Movies'} />}
                </View>
                <View style={{ height: 10 }} />
            </ScrollView>
        )
    }
}