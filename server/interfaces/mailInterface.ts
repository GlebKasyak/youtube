
export type IMessage =
    (authorEmil: string, authorPassword: string, title: string, message: string) => Promise<void>
