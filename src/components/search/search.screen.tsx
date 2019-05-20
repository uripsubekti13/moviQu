import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native'
import * as IconMoonConfig from "../../../assets/fonts/selection.json"
import navigationService from '../../services/navigation.service';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import { Input, Item, Container, Content, ListItem, Col } from "native-base";
import { searchRestService } from '../../services/rest';
import { Movie } from '../../services/rest/search_rest.service.js';
import { Ads } from '../../shared/component/ads.js';

const Icon = createIconSetFromIcoMoon(IconMoonConfig)

interface State {
    query: string;
    result: Movie[]
}
export default class Search extends Component<any, State> {
    private inputSearch: any;

    constructor(props: any) {
        super(props);
        this.state = {
            query: '',
            result: []
        }
    }

    componentDidMount() {
        setTimeout(() => {
            if (this.inputSearch) this.inputSearch._root.focus();
        }, 1000)
    };

    onSearch = async () => {
        const { query } = this.state;
        const result = await searchRestService.search(query);
        if (result && result.length > 0) this.setState({ result })
    }

    renderItem = ({ item, index }: { item: Movie, index: number }) => {
        return (
            <ListItem key={index} onPress={() => navigationService.navigate('Detail', { id: item.id })}>
                <View>
                    <Image source={{ uri: item.poster }} style={{ width: 69, height: 69 }} />
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={{ fontWeight: '500', color: '#000', fontSize: 15, width: '70%' }}>{item.title}</Text>
                    <Text style={{ fontSize: 11 }}>{`[${item.quality}]`} - {item.country}</Text>
                    <Text style={{ fontSize: 11 }}>{`Rating: ${item.rating}/10`}</Text>
                </View>
            </ListItem>
        )
    }

    render() {
        return (
            <Container>
                <Content>
                    <Item regular>
                        <Input
                            ref={s => this.inputSearch = s}
                            placeholder='Search'
                            onChangeText={query => this.setState({ query })}
                            returnKeyType={"search"}
                            onSubmitEditing={this.onSearch}
                        />
                        <TouchableOpacity onPress={this.onSearch}>
                            <Icon style={{ backgroundColor: 'transparent', fontSize: 27, color: 'rgb(56,57,82)', marginRight: 10 }} name={'search'} />
                        </TouchableOpacity>
                    </Item>
                    <FlatList
                        data={this.state.result}
                        keyExtractor={m => m.id}
                        renderItem={this.renderItem}
                    />
                </Content>
                <Ads />
            </Container>
        )
    }
}