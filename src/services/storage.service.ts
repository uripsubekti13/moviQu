import { AsyncStorage } from "react-native";

class StorageService {
  public async getLastTime(id: string) {
    const watchedMovies = await this.getWatchedMovies();
    const currentWatchedMovies = watchedMovies.find(wM => wM.id === id);
    const lastTime: number = currentWatchedMovies ? currentWatchedMovies.lastTime : undefined;
    return lastTime;
  }

  public async setLastTime(id: string, lastTime: number) {
    const watchedMovies = await this.getWatchedMovies();
    const currentWatchedMovies = watchedMovies.find(wM => wM.id === id);
    if (currentWatchedMovies) {
      currentWatchedMovies.lastTime = lastTime;
    } else {
      watchedMovies.push({ id, lastTime });
    }
    await AsyncStorage.setItem("WATCHED_MOVIES", JSON.stringify(watchedMovies));
  }

  public async getList() {
    const movieList = await this.getMovietList();
    return movieList.reverse();
  }

  public async setList(data: any) {
    const movieList = (await this.getMovietList()).filter(m => m.id !== data.id);
    movieList.push(data);
    await AsyncStorage.setItem("MOVIE_LIST", JSON.stringify(movieList));
  }

  private async getMovietList() {
    const movieListString = await AsyncStorage.getItem("MOVIE_LIST");
    const movieList: any[] = movieListString ? JSON.parse(movieListString) : [];
    return movieList;
  }

  private async getWatchedMovies() {
    const watchedMoviesString = await AsyncStorage.getItem("WATCHED_MOVIES");
    const watchedMovies: any[] = watchedMoviesString ? JSON.parse(watchedMoviesString) : [];
    return watchedMovies;
  }
}

export const storageService = new StorageService();
