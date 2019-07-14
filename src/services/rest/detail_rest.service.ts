import CONSTANT from "../../config/app.const";
import base64 from "react-native-base64";

export interface Detail {
  id: string;
  title: string;
  poster: string;
  category: string;
  trailer: string;
  country: string;
  description: string;
  quality: string;
  rating: string;
  drive?: string;
  subtitle?: string;
  files?: Files
  cookie?: string;
}

export interface Files {
  resGD?: File[],
  resOL?: File[],
  resRV?: File[]
};

export interface File {
  cookie?: string;
  file: string;
  label: string
  subtitle: string
}

export class DetailRestService {
  public async getDetail(id: string): Promise<Detail | null> {
    const response = await fetch(`${CONSTANT.BASE_URL}/detail/${id}`);
    const data = await response.json();
    if (!data || data.length === 0) {
      return null;
    }
    const d = data[0];
    const driveSource = d.video_source !== "none" ? JSON.parse(base64.decode(d.video_source)) : [];
    if (d.video_drive && d.video_sub) {
      driveSource.push({ file: d.video_drive, subtitle: d.video_sub, label: "GOOGLE" });
    }
    const files = await (await fetch(CONSTANT.FILE_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(driveSource)
    })).json();
    let result = {
      id: d.id,
      title: d.video_title,
      poster: d.video_thumbnail,
      category: d.category_name,
      trailer: d.video_trailer,
      country: d.video_country,
      description: d.video_description,
      quality: d.video_quality,
      rating: d.video_rating,
      files
    };
    // if (driveSource && driveSource.length > 0) {
    //   result = await this.getActive(driveSource, result);
    // }
    return result;
  }

  // async getActive(driveSource: any[], result: any) {
  //   for (let i = 0; i < driveSource.length; i++) {
  //     const drive = driveSource[i].file.replace("sahimar-", "");
  //     const subtitle = driveSource[i].subtitle;
  //     if (drive) {
  //       const { sources, cookie } = await this.getDrive(drive);
  //       if (sources && cookie) {
  //         result = Object.assign(result, { drive, sources, cookie, subtitle });
  //         return result;
  //       }
  //     }
  //   }
  //   return result;
  // }

  // async getDrive(id: string): Promise<Drive> {
  //   const response = await fetch(`${CONSTANT.DRIVE_BASE_URL}/${id}`);
  //   return await response.json();
  // }
}
