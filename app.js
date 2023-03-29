import Express from "express";
import userController from "./controller/userController.js";

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use("/user/", userController);


app.listen(4000, () => {
    console.log("server running on port 4000");
})