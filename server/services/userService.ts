import { User } from "../models";
import { ILogin, IUserDocument } from "../interfaces/userIinterface";
import { File } from "../interfaces/common/MulterInterface";
import { createFolder, setFolderPath, removeFolder } from "../utils/helpers";

type GetUsersProps = {
    userId: string,
    limit: number,
    page: number
}

export default class UserService {
    constructor() {}

    static login = async (email: string, password: string): Promise<ILogin> => {
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();

        return { user, token };
    };

    static register = async (email: string, password: string, body: IUserDocument ): Promise<IUserDocument> => {
        const user = await User.create(body);

        //create folder in uploads
        try {
            await createFolder(`uploads/${ email }`);
            await createFolder(setFolderPath(email, "images"));
            await createFolder(setFolderPath(email, "video"));
            await createFolder(setFolderPath(email, "thumbnails"));
        } catch (err) {
            throw new Error(`Error. Folder is not created. ${ err.message }`)
        }

        if(!user) {
            throw new Error("Error: can nit create user");
        }

        return user;
    };

    static uploadImage = async (file: File, email: string): Promise<IUserDocument>  => {
        try {
            const update = { image: file.path.substring(file.path.indexOf("uploads")) };

            const user = await User.findOneAndUpdate({ email }, update, { new: true });
            if(!user) throw new Error("Image change error!");

            return user;
        } catch (err) {
            throw new Error(err.message);
        }
    };

    static removeUser = async (userId: string, email: string) => {
        try {
            const user = await User.findOneAndRemove({ _id: userId });
            if(!user) throw new Error;
            await user.remove();

            await removeFolder(`uploads/${ email }`);
        } catch (err) {
            throw new Error(err.message);
        }
    };

    static getUsers = async (data: GetUsersProps): Promise<IUserDocument[]> => {
        try {
            return await User.find({ _id: { $ne: data.userId } })
                .skip(Number(data.limit) * (Number(data.page) - 1))
                .limit(Number(data.limit));

        } catch (err) {
            throw new Error(err.message);
        }
    };

}

