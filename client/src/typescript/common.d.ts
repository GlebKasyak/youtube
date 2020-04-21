import React, { Dispatch, SetStateAction } from "react";
import { AxiosResponse } from "axios";
import { ValidationRule } from "antd/lib/form";

export type ScrollType = {
    token: string,
    userId: string,
    limit: number,
    page: number
}

export type VideoDurationType = {
    minutes: number,
    seconds: number
}

export interface IResponseDataType {
    message: string,
    success: boolean,
    err?: Error
}

export type AxiosPromise<D> = Promise<AxiosResponse<D>>;

export namespace Handlers {
    type SubmitType = (e: SubmitTypes) => Promise<void> | void;
    type ChangeType = (e: ChangeTypes) => void;
    // type KeyboardType = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    type ClickType = (e: React.MouseEvent<HTMLButtonElement>) => void;

    type SubmitTypes =
        | React.FormEvent<HTMLFormElement>
        | React.KeyboardEvent<HTMLTextAreaElement>
        | React.MouseEvent<HTMLElement, MouseEvent>

    type ChangeTypes =
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
}


export interface ClickParam {
    key: string;
    keyPath: Array<string>;
    item: any;
    domEvent: Event;
}

export type SetStateType<T> = Dispatch<SetStateAction<T>>;


export type FieldsType = {
    labelField: string,
    nameField: string,
    type?: string,
    rules: [ValidationRule],
    iconType: string,
    initialValue?: string
}

