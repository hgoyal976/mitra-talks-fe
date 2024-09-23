import express from "express"
import dotenv from "dotenv"
import AuthRoutes from "../backend/routes/auth.routes.js"
import MessageRoutes from "../backend/routes/message.routes.js"
import UserRoutes from "../backend/routes/user.routes.js"
import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";
const app = express();

dotenv.config();
const port = process.env.PORT || 5001;

app.use(express.json()); // to convert the upcoming req in to json format
// app.get("/", (req, res) => {
//     res.send("hello from meloni team!")
// })
app.use(cookieParser());
app.use("/api/auth", AuthRoutes);
app.use("/api/messages", MessageRoutes);
app.use("/api/users", UserRoutes);


app.listen(port, () => {
    connectToMongoDB();
    console.log(`server is running on port ${port}`);
})