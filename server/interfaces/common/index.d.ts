import { IUserDocument } from "../userIinterface";
import { File } from "./MulterInterface";

declare global {
    namespace Express {
        interface Request {
            user: IUserDocument,
            token: string,
            name: string,
            thumbnail: any,
            files: {
                [fieldname: string]: File[]
            }
        }
    }
}

export type DecodedDataType = {
    userId: string;
    iat: number;
}