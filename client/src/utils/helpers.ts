import moment from "moment";
import defaultAvatar from "./../images/default_avatar.png";
import { SERVER_URL } from "./constants";

export const timeFromNow = (time: string): string =>
    moment(time).startOf("hour").fromNow();

export const setAvatar = (image: string): string => {
    if(image) {
        return `${ SERVER_URL }/${ image }`
    }

    return defaultAvatar
};

export const shortenStringLength = (string: string): string => {
    if(window.innerWidth < 1200 && string.length > 30) {
        return string.substring(0, 30) + "...";
    }

    return string;
};