import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
    res.send("All the user");
});

export default userRouter;
