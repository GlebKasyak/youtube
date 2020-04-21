import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { Empty } from "antd";

import { AppStateType } from "../../redux/reducers";
import { IUser } from "../../typescript/user";
import { ScrollType } from "../../typescript/common";
import { Preloader } from "../../components";
import UsersPage from "./UsersPage";

import { getUsers, removeUserById, actions } from "../../redux/actions/user.actions";

type MapStateToPropsType = {
    userId: string,
    token: string,
    users: Array<IUser>,
}

type MapDispatchToPropsType = {
    getUsers: (data: ScrollType) => any,
    removeUserById: (token: string, userId: string, email: string) => any,
    clearUsersListAC: () => void
}

type UsersPageContainerPropsType = MapStateToPropsType & MapDispatchToPropsType;

const UsersPageContainer: React.FC<UsersPageContainerPropsType> = (
    {
        getUsers,
        userId,
        token,
        users,
        removeUserById,
        clearUsersListAC
    }): JSX.Element => {

    const limit = 5;
    const [page, setPage] = useState(Math.ceil(users.length / limit) + 1);
    const [prevPage, setPrevPage] = useState(Math.ceil(users.length / limit));
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);

    const data: ScrollType = {
        userId,
        token,
        limit,
        page
    };

    const fetchData = useCallback( async () => {
        if(!users.length && page === 1 && !!token) {
            const response = await getUsers(data);

            setPrevPage(page);
            setPage(page + 1);

            !response.length && setHasMore(false);
        }

        setIsLoading(false);
    }, [getUsers, prevPage, page, users.length]);

    const handleScroll = async () => {
        if(page > prevPage) {
            const response = await getUsers(data);

            setPrevPage(page);
            setPage(page + 1);

            !response.length && setHasMore(false);
        }
    };

    useEffect(() => {
        if(!!token) fetchData();
    }, [fetchData, token]);


    const handleClick = async (id: string, email: string) => {
        await removeUserById(token, id, email);

        setIsLoading(true);
        clearUsersListAC();

        await getUsers({
            userId,
            token,
            limit,
            page: 1
        });

        setPage(2);
        setPrevPage(1);
        setHasMore(true);
        setIsLoading(false);
    };

    if(isLoading) return <Preloader text="Users are loading... Please wait!" />;
    if(!users.length) return <Empty description="User list is empty" />;

    return <UsersPage
        users={ users }
        onClick={ handleClick }
        setNextPage={ handleScroll }
        hasMore={ hasMore }
    />
};

const mapStateToProps = ({ user }: AppStateType): MapStateToPropsType => ({
    users: user.users,
    userId: user.user._id,
    token: user.token
});


export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
    mapStateToProps,
    { getUsers, removeUserById, clearUsersListAC: actions.clearUsersListAC })
(UsersPageContainer);