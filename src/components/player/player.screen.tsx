import React, { Component } from 'react'
import { Text, View, StyleSheet, AsyncStorage, Alert, ActivityIndicator } from 'react-native'
import { TabBarIcon } from '../../shared/component';
import Orientation from 'react-native-orientation-locker';
import KeepAwake from 'react-native-keep-awake';
import VideoPlayer from 'react-native-video-player';
import { TextTrackType } from 'react-native-video';
import { storageService } from '../../services/storage.service';
import * as _ from "lodash";

export default class Player extends Component<any, any> {
    private videoPlayer: any;
    private onStart: any = undefined;

    constructor(props: any) {
        super(props);
        this.state = {
            source: undefined,
            subtitle: undefined,
            thumbnail: undefined,
            currentTime: 0,
            lastTime: 0,
            lastTimeLoaded: false,
            duration: 100,
            paused: false,
            opacity: 0
        }
    }

    async componentWillMount() {
        const id = this.props.navigation.getParam('id');
        const lastTime = await storageService.getLastTime(id)
        if (lastTime) {
            this.setState({ lastTime })
        }
        const source = this.props.navigation.getParam('source');
        const subtitle = this.props.navigation.getParam('subtitle');
        const thumbnail = this.props.navigation.getParam('thumbnail');
        this.setState({ source, subtitle, thumbnail });
        Orientation.lockToLandscape();
        KeepAwake.activate();

    }

    onProgress = (event: any) => {
        const { currentTime } = event;
        this.setState({ currentTime })
    }

    onLoadStart = () => {
        this.setState({ opacity: 1 });
    }


    onBuffer = ({ isBuffering }: { isBuffering: boolean }) => {
        this.setState({ opacity: isBuffering ? 1 : 0 });
    }

    componentWillUnmount() {
        const id = this.props.navigation.getParam('id');
        Orientation.unlockAllOrientations();
        KeepAwake.deactivate();
        const lastTime: number = this.state.currentTime
        storageService.setLastTime(id, lastTime)
        this.setState({ source: undefined, subtitle: undefined, header: undefined, thumbnail: undefined });
    }

    onLoad = (e: any) => {
        const { lastTimeLoaded, lastTime } = this.state;
        if (!lastTimeLoaded && lastTime !== 0 && lastTime !== e.duration) {
            this.setState({ paused: true })
            Alert.alert('moviQu', `Lanjutkan ke ${lastTime}`, [
                { text: 'Tidak', onPress: () => this.setState({ paused: false }) },
                { text: 'Lanjutkan', onPress: () => this.loadLastTime(lastTime) }
            ])
        }
        this.setState({ opacity: 0 });
    }

    loadLastTime = (lastTime: number) => {
        this.videoPlayer.seek(lastTime);
        this.setState({ lastTimeLoaded: true, paused: false })
    }

    onError = (e: any) => {
        Alert.alert('Error', `${_.get(e, 'error.errorException')}\n${_.get(e, 'error.errorString')}`)
    }

    render() {
        return (
            <View style={{ backgroundColor: '#000' }}>
                <VideoPlayer
                    autoplay={true}
                    ref={(v: any) => this.videoPlayer = v}
                    endWithThumbnail
                    onError={this.onError}
                    onStart={this.onStart}
                    thumbnail={this.state.thumbnail}
                    textTracks={[{
                        title: "Indonesia",
                        language: "id",
                        type: TextTrackType.SRT,
                        uri: this.state.subtitle
                    }]}
                    selectedTextTrack={{
                        type: "title",
                        value: "Indonesia"
                    }}
                    onLoad={this.onLoad}
                    onLoadStart={this.onLoadStart}
                    onBuffer={this.onBuffer}
                    video={this.state.source}
                    onProgress={this.onProgress}
                    paused={this.state.paused}
                    style={{ height: '100%', paddingHorizontal: 10 }}
                />
                <ActivityIndicator
                    animating
                    size="large"
                    color={'#fff'}
                    style={[styles.activityIndicator, { opacity: this.state.opacity }]}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    activityIndicator: {
        position: 'absolute',
        top: 130,
        left: 70,
        right: 70,
        height: 50,
    }
})