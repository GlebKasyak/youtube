import React from "react";
import { Avatar, Card, Col } from "antd";
import Icons from "./../../../utils/icons";
import showConfirm from "../../../utils/showConfirm";
import { setAvatar } from "../../../utils/helpers";

import "./style.scss";

import { IUser } from "../../../typescript/user";

type UserCardPropsType = {
    user: IUser,
    onClick: () => void
};

const UserCard: React.FC<UserCardPropsType> = ({ user, onClick }) => (
    <Col xs={24} sm={12} lg={8} className="user-card" >
        <Card
            className="user-card__card"
            actions={[
                <Icons.SettingOutlined key="setting" />,
                <Icons.DeleteOutlined
                    key="delete"
                    onClick={ () => showConfirm(onClick) }
                />,
            ]}
        >
            <Card.Meta
                avatar={ <Avatar src={ setAvatar(user.image!) } /> }
                title={ `${ user.firstName } ${ user.secondName }` }
                description={ user.email }
            />
        </Card>
    </Col>
);

export default UserCard;