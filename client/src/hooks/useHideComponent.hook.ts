import { useState, useEffect } from "react";
import { storageKeys } from "../utils/constants";

export default () => {
    const [hidden, setHidden] = useState(true);
    const authData = localStorage.getItem(storageKeys.isAuth)!;
    const isAuth = JSON.parse(authData);

    useEffect(() => {
        isAuth ? setHidden(false) : setHidden(true);
    }, [isAuth]);


    return hidden;
};