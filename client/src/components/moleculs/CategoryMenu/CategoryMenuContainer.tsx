import React, { useState } from "react";
import { History } from "history";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import CategoryMenu from "./CategoryMenu";

import { getVideosByCategory, actions } from "../../../redux/actions/video.actions";

import { ClickParam } from "../../../typescript/common";
import { AppStateType } from "../../../redux/reducers";

type MapStateToPropsType = {
    categoryType: string | null
}

type MapDispatchToPropsType = {
    getVideosByCategory: (label: string) => void,
    isSearchingAC: (payload: boolean) => void,
    setCategoryTypeAC: (payload: string) => void
}

type CategoryMenuContainerPropsType = MapStateToPropsType & MapDispatchToPropsType;

const CategoryMenuContainer: React.FC<CategoryMenuContainerPropsType> = (
    {
        getVideosByCategory,
        isSearchingAC,
        setCategoryTypeAC,
        categoryType
    }) => {
    const history: History = useHistory();
    const [collapsed, setCollapsed] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    const handleClick = async (e: ClickParam) => {
        if(history.location.pathname !== "/category") history.push("/category");

        if(categoryType !== e.key) {
            isSearchingAC(true);
            await getVideosByCategory(e.key);
            setCategoryTypeAC(e.key);
        }
    };

    const handleChange = () => {
        if(!collapsed) setCollapsed(true);
        setIsVisible(!isVisible);
    };

    return <CategoryMenu
        onClick={ handleClick }
        onChange={ handleChange }
        collapsed={ collapsed }
        setCollapsed={ setCollapsed }
        isVisible={ isVisible }
    />
};

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
    ({ video }: AppStateType): MapStateToPropsType => ({ categoryType: video.categoryType }),
    {
        getVideosByCategory,
        isSearchingAC: actions.isSearchingAC,
        setCategoryTypeAC: actions.setCategoryTypeAC })
(CategoryMenuContainer);
