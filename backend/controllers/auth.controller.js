import bcrypt from "bcryptjs"
import User from "../models/user.model.js";
import generateTokenAndCookies from "../utils/generateToken.js";


export const signup = async (req, res) => {
    try {

        console.log(req.body);
        const { fullName, userName, password, confirmPassword, gender, profilePic } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "confirm password is not matching" });
        }

        const user = await User.findOne({ userName });
        if (user) {
            return res.status(400).json({ error: "userName already exists" })
        }

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const salt = await bcrypt.genSalt(10); // here 10 is implying level of encrypiton.
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic: profilePic === "male" ? boyProfilePic : girlProfilePic,
        })

        if (newUser) {
            generateTokenAndCookies(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic

            })
        } else {
            res.status(400).json({ error: "Invalied user data" });
        }


    } catch (err) {
        console.log("error in signup controller", err.message);
        res.status(500).json({ error: "Internal server error" });
    }

}

export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        const user = await User.findOne({ userName });
        const isMatch = await bcrypt.compare(password, user?.password || "");

        console.log("checking::::", user, isMatch);

        if (!user || !isMatch) {
            res.status(404).json({ error: "username or password is incorrect" });
        }
        generateTokenAndCookies(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic
        })
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }

}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "loged out succesfully" })
    } catch {
        res.status(500).json({ error: "Internal server error" });
    }

}