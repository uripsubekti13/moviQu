import CONSTANT from "../../config/app.const";
import * as _ from "lodash";

export interface Discover {
  featured: Movie[];
  latest: Movie[];
  year: Movie[];
}

export interface Movie {
  id: string;
  title: string;
  quality: string;
  rating: string;
  country: string;
  poster: string;
}

export class DiscoverRestService {
  public async getFirstData(): Promise<Discover> {
    const headers = CONSTANT.REQ_HEADER;
    const response = await fetch(`${CONSTANT.BASE_URL}/api_v4/first_data`, { headers });
    const data = await response.json();
    const featured = data.featured.map(this.movieMapper);
    const latest = data.latest.map(this.movieMapper);
    const year = data.year.map(this.movieMapper);
    const result = {
      featured,
      latest,
      year
    };
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
