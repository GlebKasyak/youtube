import { useState, useCallback, useEffect } from "react";
import axios, { CancelToken, CancelTokenSource } from "axios";

import { GetVideosDataType } from "../typescript/video";


type UseVideoReturnType = [boolean, boolean, () => {}];
type CbType = (data: GetVideosDataType) => any;

const useVideo = (cb: CbType, isSearching: boolean, userId: string, length: number): UseVideoReturnType => {
    const limit: number = 3;
    const [page, setPage] = useState(Math.ceil(length / limit) + 1);
    const [prevPage, setPrevPage] = useState(Math.ceil(length / limit));
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);

    const data: GetVideosDataType = { userId, limit, page };

    const fetchData = useCallback(async (token: CancelToken) => {
        try {
            if(!length) {
                const response = await cb({ token, ...data });

                if(response.length) {
                    setPrevPage(prevPage + 1);
                    setPage(page + 1);
                } else {
                    setHasMore(false);
                }
            }

            setIsLoading(false);
        } catch (err) {
            console.log(err)
        }

    }, [cb, limit, page, prevPage, userId]);


    const handleScroll = async () => {
        if(page > prevPage) {
            const response = await cb(data);

            setPrevPage(page);
            setPage(page + 1);

            !response.length && setHasMore(false);
        }
    };

    useEffect(() => {
        const signal: CancelTokenSource = axios.CancelToken.source();
        if(!isSearching && userId) fetchData(signal.token);

        return function cleanup() {
            signal.cancel("Api is being canceled");
        }
    }, [fetchData, userId, isSearching]);

    return [isLoading, hasMore, handleScroll];
};

export default useVideo;