import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDb from "./db";

import { PORT, IS_PRODUCTION, CLIENT_URL } from "./config";
import rootRouter from "./routes";

import dotenvExtended from "dotenv-extended";
dotenvExtended.load();

connectToDb();

const app: express.Application = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: CLIENT_URL }));
app.use(cookieParser());

rootRouter(app);


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

if(IS_PRODUCTION) {
    app.use(express.static(path.join(__dirname, "client", "build")));

    app.get("*", (req: express.Request, res: express.Response) => {
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"))
    })
}

app.listen(PORT, () => {
    console.log(`Server up on ${ PORT }`)
});