import { strict } from "assert"
import jwt from "jsonwebtoken"

const generateTokenAndCookies = (userID, res) => {

    const token = jwt.sign({ userID }, process.env.JWT_TOKEN, {
        expiresIn: "15d",
    })

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //MS
        httpOnly: true, //prevent XSS attacks cross-site encrypting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development",
    })
}

export default generateTokenAndCookies;

//Xss attacks -> to inject malicious script in to webpages. it can steal users data from cookies, session storage data. httponly flag makes cookie unaccesable to js running in browser
//CSRF attacks -> i have opened a banksite, they trick user to visit malicious website and then uses user data to make request from original server. Set the SameSite attribute on cookies to prevent sending cookies with cross-origin requests.