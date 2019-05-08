import CONSTANT from "../../config/app.const";
import * as _ from "lodash";

export interface Movie {
  id: string;
  title: string;
  quality: string;
  rating: string;
  country: string;
  poster: string;
}

export class SearchRestService {
  public async search(query: string): Promise<Array<Movie>> {
    const headers = CONSTANT.REQ_HEADER;
    const response = await fetch(`${CONSTANT.BASE_URL}/api_v4/search/${encodeURI(query)}`, { headers });
    const data = await response.json();
    const result = data.map(this.movieMapper)
    return result;
  }

  private movieMapper = (m: any, i: number) => {
    return {
      id: m.id,
      title: m.video_title,
      quality: m.video_quality,
      rating: m.video_rating,
      country: m.video_country,
      poster: m.video_thumbnail,
    };
  };
}
