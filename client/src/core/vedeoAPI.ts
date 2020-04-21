import instance from "./api";

import { UploadVideoPropsType, IVideoData, GetVideosDataType } from "../typescript/video";

export class VideoAPI {

    static uploadFile({ type, file, token }: UploadVideoPropsType) {
      const formData: FormData = new FormData();
      formData.append(type, file);

      return instance.post("/video", formData, {
          headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${ token }`
          }
      } )
    };

    static addVideo(data: IVideoData, token: string) {
        return instance.post("/video/add", data, {
            headers: { Authorization: `Bearer ${ token }` }
        });
    };

    static getVideos(data: GetVideosDataType) {
        return instance.get(`/video?limit=${ data.limit }&page=${ data.page }`, { cancelToken: data.token })
    };

    static getVideoDetail(id: string) {
       return instance.get(`/video/detail/${ id }`);
    };

    static getSubscriptionVideos(data: GetVideosDataType) {
        return instance.get(`/video/subscription-videos?limit=${ data.limit }&page=${ data.page }&userFrom=${ data.userId }`,
            { cancelToken: data.token });
    };

    static searchVideos(text: string) {
        return instance.post("/video/search", { text });
    };

    static setViewVideo(videoId: { videoId: string }) {
        return instance.post("/video/view", videoId);
    };

    static getVideosByCategory(label: { label: string }) {
        return instance.post("/video/search-by-category", label);
    };
}