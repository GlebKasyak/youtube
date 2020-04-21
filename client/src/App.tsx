import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { BackTop } from "antd";

import { AppStateType } from "./redux/reducers";

import "./styles/App.scss";

import {
    Home,
    About,
    UploadVideoPage,
    DetailVideoPage,
    SubscriptionPage,
    UsersPage,
    ResultsPage,
    CategoryPage,
    Page404 } from "./pages";
import { Message, NavBar, ToBottom } from "./components";
import { LoginForm, RegisterForm } from "./modules";

import { Auth, DoNotAuth } from "./hoc";
import { storageKeys } from "./utils/constants";
import { getAuthUserData } from "./redux/actions/user.actions";

type MapStateToPropsType = {
    isAuth?: boolean,
}

type MapDispatchToPropsType = {
    getAuthUserData: (token: string) => void
}

type AppPropsType = MapStateToPropsType & MapDispatchToPropsType;

let App: React.FC<AppPropsType> = ({ isAuth, getAuthUserData }) => {
    let toBottom = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const authData = localStorage.getItem(storageKeys.isAuth);

        if(!!authData && JSON.parse(authData)) {
            const authData = localStorage.getItem(storageKeys.userInfo);

            if (authData) {
                const data = JSON.parse(authData);
                getAuthUserData(data.token);
            }
        }
    }, [isAuth, getAuthUserData]);

    return (
      <div className={"app " + (isAuth ? "app--active" : "app--not-active")} >
        <NavBar />
        <ToBottom bottom={ toBottom } />
        <Switch>
            <Route exact path="/" component={ DoNotAuth(Home) } />
            <Route path="/about-us" component={ DoNotAuth(About) } />
            <Route path="/video/upload" component={ DoNotAuth(UploadVideoPage) } />
            <Route path="/video/:videoId" component={ DoNotAuth(DetailVideoPage) } />
            <Route path="/subscription" component={ DoNotAuth(SubscriptionPage) } />
            <Route path="/users" component={ DoNotAuth(UsersPage) } />
            <Route path="/result" component={ DoNotAuth(ResultsPage) } />
            <Route path="/category" component={ DoNotAuth(CategoryPage) } />

            <Route path="/login" component={ Auth(LoginForm) } />
            <Route path="/register" component={ Auth(RegisterForm) } />

            <Route path="*" component={ DoNotAuth(Page404) } />
        </Switch>
        <Message />
        <BackTop />
        <div ref={ toBottom } />

      </div>
    );
};

const mapStateToProps = ({ user }: AppStateType) => ({
    isAuth: user.user.isAuth,
});


export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
    mapStateToProps,
    { getAuthUserData })
(App);
