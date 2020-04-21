import { Application } from "express";

import { default as userRouter } from './user.router';
import { default as videoRouter } from './video.router';
import { default as subscribeRouter } from './subscribe.router';
import { default as commentRouter } from './comment.router';
import { default as likeRouter } from './like.router';
import { default as mailRouter } from './mail.router';

const rootRouter = (app: Application) => {
    app.use("/api/user", userRouter);
    app.use("/api/video", videoRouter);
    app.use("/api/subscribe", subscribeRouter);
    app.use("/api/comment", commentRouter);
    app.use("/api/like", likeRouter);

    app.use("/api/mail", mailRouter);
};

export default rootRouter;