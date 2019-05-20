import { AsyncStorage } from "react-native";

class WatchlistService {
  public async getList() {
    const movieList = await this.getMovietList();
    return movieList.reverse();
  }

  public async isExist(id: string) {
    const movieList = await this.getMovietList();
    const exist = movieList.find(m => m.id === id);
    return exist ? true : false;
  }

  public async add(data: any) {
    const movieList = (await this.getMovietList()).filter(m => m.id !== data.id);
    movieList.push(data);
    await AsyncStorage.setItem("WATCHLIST", JSON.stringify(movieList));
  }

  public async remove(data: any) {
    const movieList = (await this.getMovietList()).filter(m => m.id !== data.id);
    console.log({movieList})
    await AsyncStorage.setItem("WATCHLIST", JSON.stringify(movieList));
  }

  private async getMovietList() {
    const movieListString = await AsyncStorage.getItem("WATCHLIST");
    const movieList: any[] = movieListString ? JSON.parse(movieListString) : [];
    return movieList;
  }
}

export const watchlistService = new WatchlistService();
