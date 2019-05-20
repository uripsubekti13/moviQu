import {observable} from 'mobx'

class WatchlistStore {
    @observable public watchlist: any[] = []
}

export const watchlistStore = new WatchlistStore()