import { useState } from "react";
import "./signup.css"
import { Link } from "react-router-dom";
import useSignUp from "../../hooks/signUpHook";

function Signup() {

    const [inputs, setInputs] = useState({
        fullName: "",
        userName: "",
        password: "",
        confirmPassword: "",
        gender: "",
    })

    const { loading, signup } = useSignUp();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs);
        await signup(inputs)
    }

    return <div className="flex flex-col items-center justify-center min-w-96 mx-auto ">
        <div style={{ width: "352px", height: "auto", border: "1px solid #898989", backdropFilter: "blur(10px)", paddingBottom: "20px" }}>

            <h1 style={{ textAlign: "center", margin: "20px", fontSize: "30px" }}> Signup <span className="app-name" >Mitra Talks</span></h1>
            <form onSubmit={handleSubmit}>
                <div className="username-div">
                    <label>Fullname</label>
                    <input onChange={(e) => {
                        setInputs({ ...inputs, fullName: e.target.value })
                    }} className="signup-input" placeholder="Enter Fullname" type="text" value={inputs.fullName}></input>
                </div>
                <div className="username-div">
                    <label>Username</label>
                    <input onChange={(e) => {
                        setInputs({ ...inputs, userName: e.target.value })
                    }} className="signup-input" placeholder="Enter username" type="text" value={inputs.userName}></input>
                </div>
                <div className="username-div">
                    <label>Password</label>
                    <input onChange={(e) => {
                        setInputs({ ...inputs, password: e.target.value })
                    }} className="signup-input" placeholder="Enter Password" type="password" value={inputs.password}></input>
                </div>
                <div className="username-div">
                    <label>Confirm Password</label>
                    <input onChange={(e) => {
                        setInputs({ ...inputs, confirmPassword: e.target.value })
                    }} className="signup-input" placeholder="Confirm Password" type="password" value={inputs.confirmPassword}></input>
                </div>
                <div style={{ display: "flex", flexDirection: "row", marginTop: "10px" }} className="username-div">
                    <label>
                        <input onChange={(e) => {
                            setInputs({ ...inputs, gender: e.target.value })
                        }} type="radio" value="Male" checked={inputs.gender === "Male"} />
                        Male
                    </label>
                    <label>
                        <input onChange={(e) => {
                            setInputs({ ...inputs, gender: e.target.value })
                        }} type="radio" value="Female" checked={inputs.gender === "Female"} />
                        Female
                    </label>

                </div>
                <div style={{ textAlign: "center", margin: "10px" }}>

                    <Link to="/login" >{"Already"} have an account?</Link>

                </div>
                <div style={{ textAlign: "center" }}>
                    <button
                        disabled={loading}
                        type="submit" style={{ padding: "3px 15px", border: "1px solid #898989" }}>{loading ? <span className="loading loading-spinner"></span> : "Sign up"}</button>
                </div>
            </form>
        </div>


    </div>
}

export default Signup;