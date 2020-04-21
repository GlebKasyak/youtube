export interface UserState {
    user: IUser,
    token: string,
    users: Array<IUser>
}

export interface IUser {
    firstName: string,
    secondName: string,
    email: string,
    password?: string,
    _id: string,
    role?: string,
    image?: string,
    createdAt?: string,
    updatedAt?: string,
    isAuth?: boolean
}

export type LoginDataType = {
    email: string,
    password: string,
    captcha?: string
}

export type RegisterDataType = {
    firstName: string,
    secondName: string,
    email: string,
    password: string,
}


