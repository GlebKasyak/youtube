import { VideoDurationType } from "../typescript/common";

export const videoCardLayouts = {
    defaultLayouts: {
        lg: 6,
        md: 8,
        xs: 24
   },
    detailPage: {
        xl: 12,
        lg: 12,
        md: 8,
        sm: 12,
        xs: 24
    }
};

export const VideoAccess = [
    { value: 0, label: "Private"},
    { value: 1, label: "Public"}
];

export const Category = [
    { label: "Film & Animation" },
    { label: "Autos & Vehicles" },
    { label: "Music"},
    { label: "Pets & Animals" },
    { label: "Sports" },
    { label: "Scientific" }
];

export const getVideoDuration = (duration: number): VideoDurationType => {
    const minutes: number = Math.floor(duration / 60);
    const seconds: number = Math.floor(duration - minutes * 60);

    return { minutes, seconds };
};