import {observable} from 'mobx'

class RecentStore {
    @observable public recents: any[] = []
}

export const recentStore = new RecentStore()