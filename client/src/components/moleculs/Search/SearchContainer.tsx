import React, { useState, useEffect } from "react";
import { History } from "history";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import Search from "./Search";

import { searchVideos, actions } from "../../../redux/actions/video.actions";
import "./style.scss";

import { AppStateType } from "../../../redux/reducers";
import { Handlers } from "../../../typescript/common";

type MapDispatchToPropsType = {
    searchVideos: (text: string) => void,
    isSearchingAC: (payload: boolean) => void
}

type SearchContainerPropsType = MapDispatchToPropsType;

const SearchContainer: React.FC<SearchContainerPropsType> = (
    {
        searchVideos,
        isSearchingAC
    }) => {
    const history: History = useHistory();
    const [prevValue, setPrevValue] = useState<string | null>(null);
    const [value, setValue] = useState("");

    const fetchData = async () => {
        setPrevValue(value);

        isSearchingAC(true);
        if(history.location.pathname !== "/result") history.push("/result");

        await searchVideos(value.trim());
    };

    const handleSubmit: Handlers.SubmitType = e => {
        e.preventDefault();
        fetchData();
    };

    useEffect(() => {
        if(history.location.pathname !== "/result") setPrevValue(null);
    }, [history.location.pathname]);

    return <Search
        onSubmit={ handleSubmit }
        value={ value }
        onChange={ ({ target }) => setValue(target.value) }
        prevValue={ prevValue! }
    />
};

export default connect<{}, MapDispatchToPropsType, {}, AppStateType>(null,
    { searchVideos, isSearchingAC: actions.isSearchingAC })
(SearchContainer);

