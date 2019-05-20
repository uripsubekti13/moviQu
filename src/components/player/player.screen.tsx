import React, { Component } from 'react'
import { Text, View, StyleSheet, AsyncStorage, Alert, ActivityIndicator } from 'react-native'
import { TabBarIcon } from '../../shared/component';
import Orientation from 'react-native-orientation-locker';
import KeepAwake from 'react-native-keep-awake';
import VideoPlayer from 'react-native-video-player';
import { TextTrackType } from 'react-native-video';
import { storageService } from '../../services/storage.service';
import * as _ from "lodash";
import { recentStore } from '../recent/recent.store';

export default class Player extends Component<any, any> {

    private videoPlayer: any = undefined;
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
            opacity: 0,
            detail: null,
            first: true
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
        const detail = this.props.navigation.getParam('detail');
        this.setState({ source, subtitle, thumbnail, detail });
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

    async componentWillUnmount() {
        const id = this.props.navigation.getParam('id');
        Orientation.unlockAllOrientations();
        KeepAwake.deactivate();
        const lastTime: number = this.state.currentTime
        storageService.setLastTime(id, lastTime);
        recentStore.recents = await storageService.getList();
        this.setState({ source: undefined, subtitle: undefined, header: undefined, thumbnail: undefined });
        this.videoPlayer = undefined;
    }

    secondToMinutes(value: number) {
        const hours = Math.floor(value / 3600);
        const minutes = Math.floor((value - (hours * 3600)) / 60);
        const seconds = Math.floor(value - (hours * 3600) - (minutes * 60));
        const hh = (hours < 10) ? `0${hours.toString()}` : hours.toString();
        const mm = (minutes < 10) ? `0${minutes.toString()}` : minutes.toString();
        const ss = (seconds < 10) ? `0${seconds.toString()}` : seconds.toString();
        return hh + ':' + mm + ':' + ss;
    }

    onLoad = (e: any) => {
        const { lastTimeLoaded, lastTime } = this.state;
        storageService.setList(this.state.detail);
        if (!lastTimeLoaded && lastTime !== 0 && lastTime !== e.duration && !this.state.first) {
            this.setState({ paused: true })
            Alert.alert('moviQu', `Lanjutkan ke ${this.secondToMinutes(lastTime)}`, [
                { text: 'Tidak', onPress: () => this.setState({ paused: false }) },
                { text: 'Lanjutkan', onPress: () => this.loadLastTime(lastTime) }
            ])
        }
        this.setState({ opacity: 0, first: false });
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
                    // autoplay={true}
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
                {this.state.opacity === 1 &&
                    <ActivityIndicator
                        animating
                        size="large"
                        color={'#fff'}
                        style={[styles.activityIndicator, { opacity: this.state.opacity }]}
                    />}
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