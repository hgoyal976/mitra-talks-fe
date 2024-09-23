import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: "Unathourized: No token found" });
        }

        const decoded = jwt.verify(token, process.env.JWT_TOKEN);

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized: invalid token" })
        }

        const user = await User.findById(decoded.userID).select("-password");
    ;    if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.log("error in protectedroute", err);
        res.status(500).json({ error: "Internal server error" });
    }
}

export default protectedRoute;