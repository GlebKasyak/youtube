import React from "react";
import { History } from "history";
import { useHistory, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Menu, Button } from "antd";
import {
    HomeOutlined,
    TeamOutlined,
    UploadOutlined,
    LoginOutlined,
    SaveOutlined,
    PlaySquareOutlined,
    ContactsOutlined
} from "@ant-design/icons";

import "./style.scss";
import { logout } from "../../redux/actions/user.actions";

import { storageKeys } from "../../utils/constants";
import { AppStateType } from "../../redux/reducers";

import { Profile, Search, CollapsedMenu } from "./../";

type MapStateToPropsType = {
    token: string
}

type MapDispatchToPropsType = {
    logout: (token: string) => void
}

type NavBarPropsType = MapStateToPropsType & MapDispatchToPropsType;

const NavBar: React.FC<NavBarPropsType> = ({ logout, token }) => {
    const history: History = useHistory();
    const { pathname } = history.location;

    const authData = localStorage.getItem(storageKeys.isAuth);
    const userInfoData = localStorage.getItem(storageKeys.userInfo);

    let navigationsLinks = authData && JSON.parse(authData)
        ? (
            <div className="navbar-wrapper">
                <Menu
                    mode="horizontal"
                    theme="dark"
                    className="navbar navbar--left"
                    defaultSelectedKeys={ [pathname] }
                    selectedKeys={ [pathname] }
                >
                    <Menu.Item key="/" className="navbar__item" >
                        <NavLink exact to="/" >
                            <HomeOutlined />
                            Home
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/about-us" className="navbar__item" >
                        <NavLink to="/about-us" >
                            <TeamOutlined  />
                            About us
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/video/upload" className="navbar__item" >
                        <NavLink to="/video/upload" >
                            <UploadOutlined />
                            Upload
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/subscription" className="navbar__item" >
                        <NavLink to="/subscription" >
                            <PlaySquareOutlined  />
                            Subscription
                        </NavLink>
                    </Menu.Item>
                    { userInfoData && JSON.parse(userInfoData).role === "admin" &&
                        <Menu.Item key="/users" className="navbar__item" >
                            <NavLink to="/users" >
                                <ContactsOutlined  />
                                Users
                            </NavLink>
                        </Menu.Item>
                    }
                    <Menu.Item key="/logout" >
                        <Button
                            type="danger"
                            className="btn"
                            icon="logout"
                            onClick={ () => {
                                logout(token);
                                localStorage.removeItem(storageKeys.isAuth);
                                localStorage.removeItem(storageKeys.userInfo);
                            } }
                        >
                            Logout
                        </Button>
                    </Menu.Item>
                </Menu>
                <Search />
                <Profile />
                <CollapsedMenu />
            </div>)
        : (
            <Menu
                mode="horizontal"
                theme="dark"
                className="navbar navbar--right"
                defaultSelectedKeys={ [pathname] }
                selectedKeys={ [pathname] }
            >
                <Menu.Item key="/login" className="navbar__item" >
                    <NavLink to="/login" >
                        <LoginOutlined  />
                        Login
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="/register" className="navbar__item" >
                    <NavLink to="/register" >
                        <SaveOutlined />
                        Register
                    </NavLink>
                </Menu.Item>
            </Menu>
        );

    return (
        <>{ navigationsLinks }</>
    )
};


export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
    ({ user }: AppStateType): MapStateToPropsType => ({ token: user.token }),
    { logout })
(NavBar);