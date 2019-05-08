import { AsyncStorage } from "react-native";

class StorageService {
  public async getLastTime(id: string) {
    const watchedMovies = await this.getWatchedMovies(id);
    const currentWatchedMovies = watchedMovies.find(wM => wM.id === id);
    const lastTime: number = currentWatchedMovies ? currentWatchedMovies.lastTime : undefined;
    return lastTime;
  }

  public async setLastTime(id: string, lastTime: number) {
    const watchedMovies = await this.getWatchedMovies(id);
    const currentWatchedMovies = watchedMovies.find(wM => wM.id === id);
    if (currentWatchedMovies) {
      currentWatchedMovies.lastTime = lastTime;
    } else {
      watchedMovies.push({ id, lastTime });
    }
    await AsyncStorage.setItem("WATCHED_MOVIES", JSON.stringify(watchedMovies));
  }

  private async getWatchedMovies(id: string) {
    const watchedMoviesString = await AsyncStorage.getItem("WATCHED_MOVIES");
    const watchedMovies: any[] = watchedMoviesString ? JSON.parse(watchedMoviesString) : [];
    return watchedMovies;
  }
}

export const storageService = new StorageService();
