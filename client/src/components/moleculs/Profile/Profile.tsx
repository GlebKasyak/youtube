import React, { useState } from "react";
import { connect } from "react-redux";
import { Drawer, List, Avatar, Divider, Col, Row, Typography, Button } from "antd";

import { DescriptionItem, UploadButton } from "./../../";

import { removeUser } from "../../../redux/actions/user.actions";
import showConfirm from "../../../utils/showConfirm";
import { timeFromNow, setAvatar } from "../../../utils/helpers";
import "./style.scss";

import { storageKeys } from "../../../utils/constants";
import { AppStateType } from "../../../redux/reducers";
import { IUser } from "../../../typescript/user";

type MapStateToPropsType = {
    user: IUser,
    token: string
}

type MapDispatchToPropsType = {
    removeUser: (token: string) => void
}

type ProfileComponentPropsType = MapStateToPropsType & MapDispatchToPropsType;

const ProfileComponent: React.FC<ProfileComponentPropsType> = ({ user, token, removeUser }) =>  {
    const [visible, setVisible] = useState(false);

    const handleClick = () => {
        removeUser(token);
        localStorage.removeItem(storageKeys.isAuth);
        localStorage.removeItem(storageKeys.userInfo);
        localStorage.removeItem(storageKeys.isRememberMe);
    };

    return (
        <div className="profile" >
            <List
                className="profile__list"
                dataSource={ [user] }
                bordered
                renderItem={item => (
                    <List.Item
                        key={ item._id }
                        onClick={ () => setVisible(!visible) }
                    >
                        <List.Item.Meta
                            className="profile__meta"
                            avatar={ <Avatar src={ setAvatar(item.image!) } /> }
                            title={ <span className="profile__name">{ item.firstName }</span> }
                        />
                    </List.Item>
                )}
            />
            <Drawer
                className="drawer"
                width={450}
                placement="left"
                onClose={ () => setVisible(false) }
                visible={ visible }
            >
                <Typography.Title level={4} >User Profile</Typography.Title>
                <p className="drawer__section" >Personal</p>
                <Row>
                    <Col md={12} xs={24} >
                        <DescriptionItem title="The first name" content={ user.firstName } />
                    </Col>
                    <Col md={12} xs={24} >
                        <DescriptionItem title="The second name" content={ user.secondName } />
                    </Col>
                </Row>
                <Row>
                    <Col md={12} xs={24} >
                        <DescriptionItem title="Register date" content={ timeFromNow(user.createdAt!) } />
                    </Col>
                </Row>
                <Row>
                    <Col md={12} xs={24} className="drawer__avatar" >
                        <DescriptionItem title="Avatar" />
                        <div className="profile-avatar-wrapper" >
                            <img src={ setAvatar(user.image!) } alt={ user.firstName } className="profile-avatar" />
                        </div>
                        <UploadButton text="Update image" />
                    </Col>
                </Row>
                <Divider />
                <p className="drawer__section" >Contacts</p>
                <Row>
                    <Col md={12} xs={24} >
                        <DescriptionItem title="Email" content={ user.email } />
                    </Col>
                </Row>
                <Button
                    onClick={ () => showConfirm(handleClick) }
                    className="drawer__remove-btn"
                    type="danger"
                    icon="delete"
                >
                    Remove account
                </Button>
            </Drawer>
        </div>
    );
};

const mapStateToProps = ({ user }: AppStateType): MapStateToPropsType => ({
    token: user.token,
    user: user.user
});

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
    mapStateToProps,
    { removeUser })
(ProfileComponent);