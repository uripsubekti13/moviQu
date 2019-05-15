import React, { Component } from 'react'
import { Alert, Button, ActivityIndicator, Text, View, Image, ScrollView, TouchableOpacity, Dimensions, StyleSheet, ImageBackground, AsyncStorage, FlatList } from 'react-native'
import VideoPlayer from 'react-native-video-player';
import { detailRestService } from '../../services/rest';
import { Detail as DetailVM, Files } from '../../services/rest/detail_rest.service';
import { TextTrackType } from 'react-native-video';
import navigationService from '../../services/navigation.service';
import assets from '../../../assets/index';
import * as _ from 'lodash';

interface State {
    id: string | null;
    detail: DetailVM | null;
    loading: boolean;
    files: Files;
    selectedServer?: string;
}
export default class Detail extends Component<any, State> {
    private videoPlayer: any;
    private onStart: any = undefined;

    constructor(props: any) {
        super(props);
        this.state = {
            id: null,
            detail: null,
            loading: false,
            files: {},
            selectedServer: undefined
        }
    }

    async componentWillMount() {
        const id = this.props.navigation.getParam('id');
        try {
            this.setState({ loading: true })
            const detail = await detailRestService.getDetail(id);
            if (detail) {
                if (detail) this.setState({ detail });
                if (detail && detail.files && Object.keys(detail.files).length > 0) {
                    const selectedServer = Object.keys(detail.files)[0]
                    this.setState({ files: detail.files, selectedServer })
                };
            }

        } finally {
            this.setState({ loading: false })
        }
    }


    renderServerItem = ({ item, index }: { item: string, index: number }) => {
        let title = undefined;
        if (item === 'resGD') title = 'Google';
        if (item === 'resOL') title = 'Openload';
        if (item === 'resRV') title = 'Rapidvideo';
        if (!title) return null;
        const active = item === this.state.selectedServer
        return (
            <TouchableOpacity key={index} onPress={() => this.setState({ selectedServer: item })} disabled={active} >
                <View style={{ backgroundColor: active ? 'green' : '#fff', padding: 8, borderRadius: 4, margin: 2 }}>
                    <Text style={{ color: active ? '#fff' : '#000' }}>{title}</Text>
                </View>
            </TouchableOpacity>)

    }

    render() {
        const deviceWidth = Dimensions.get('window').width;
        const { selectedServer, files, detail } = this.state;
        const file = _.get(files, `${selectedServer}[0]`)
        const source = _.get(file, 'cookie') ? { uri: _.get(file, 'file'), headers: { Cookie: _.get(file, 'cookie') } } : { uri: _.get(file, 'file') };
        
        const subtitle = _.get(file, 'subtitle');
        const thumbnail = this.state.detail ? { uri: this.state.detail.poster } : undefined;
        const cover = this.state.detail ? { uri: this.state.detail.poster } : { uri: `https://via.placeholder.com/1600x900` };
        const id = this.props.navigation.getParam('id');
        if (this.state.loading) {
            return (
                <View style={{ backgroundColor: 'rgb(16,15,27)', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontWeight: '500', fontSize: 18 }}>Please Wait ...</Text>
                    <ActivityIndicator size={'large'} color={'#fff'} />
                </View>
            )
        }
        return (
            <ScrollView style={styles.container}>
                {this.state.selectedServer &&
                    <TouchableOpacity onPress={() => navigationService.navigate('Player', { source, subtitle, thumbnail, id, detail })}>
                        {thumbnail && <ImageBackground source={cover} style={{ width: deviceWidth, height: deviceWidth * (9 / 16), justifyContent: 'center', alignItems: 'center' }} >
                            <Image source={assets.images.play} style={{ width: 50, height: 50 }} />
                        </ImageBackground>}
                    </TouchableOpacity>

                }
                <View>
                    <Text style={{ color: '#fff', margin: 10, fontSize: 17, fontWeight: '500' }}>
                        {(this.state.files && Object.keys(this.state.files)).length > 0 ? 'Select Server:' : 'No Sources'}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
                    <FlatList horizontal data={Object.keys(this.state.files)} renderItem={this.renderServerItem} />
                </View>
                <View style={styles.descContainer}>
                    <Text style={[styles.h1, styles.bold]}>{this.state.detail ? this.state.detail.title : ''}</Text>
                    <Text style={[styles.h2, styles.orange]}>{this.state.detail ? this.state.detail.category : ''}</Text>
                    <View style={styles.separator} />
                    <Text style={[styles.h2]}>{this.state.detail ? this.state.detail.description : ''}</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: { backgroundColor: 'rgb(16,15,27)' },
    descContainer: { paddingHorizontal: 10, paddingTop: 10 },
    separator: { height: 0, borderBottomWidth: 1, borderBottomColor: 'grey', marginVertical: 8 },
    h1: {
        fontSize: 17,
        color: '#FFF',
        fontFamily: 'OpenSans-Regular'
    },
    h2: {
        fontSize: 15,
        color: '#FFF',
        fontFamily: 'OpenSans-Regular'
    },
    bold: {
        fontFamily: 'OpenSans-Bold'
    },
    orange: {
        color: 'rgb(255,131,25)'
    }
})