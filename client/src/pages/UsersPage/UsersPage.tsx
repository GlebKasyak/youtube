import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Row }from "antd";

import { IUser } from "../../typescript/user";
import { Preloader, UserCard, EmptyComponent } from "../../components";

type UsersPagePropsType = {
    users: Array<IUser>,
    onClick: (id: string, email: string) => Promise<void>,
    setNextPage: () => void,
    hasMore: boolean,
};

const UsersPage: React.FC<UsersPagePropsType> = (
    {
        users,
        onClick,
        setNextPage,
        hasMore,
    }) => (
    <div className="container">
        <Row className="user-page" >
            <InfiniteScroll
                next={ setNextPage }
                hasMore={ hasMore }
                loader={ <Preloader text="Loading..." modificator="scroll-loader" /> }
                dataLength={ users.length }
            >
                { !!users.length
                    ? users.map((user: IUser) =>
                        <UserCard
                            user={ user }
                            onClick={ onClick.bind(null, user._id, user.email) }
                            key={ user._id }
                        /> )
                    : <EmptyComponent description="Users list is empty" />
                }
            </InfiniteScroll>
        </Row>
    </div>
);

export default UsersPage;
