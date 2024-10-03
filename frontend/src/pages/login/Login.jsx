import { useState } from "react";
import "./login.css"
import { Link } from "react-router-dom";
import useLogin from "../../hooks/loginHook";

function Login() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { loading, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login({ userName, password });
    }

    return <div className="flex flex-col items-center justify-center min-w-96 mx-auto ">
        <div style={{ width: "352px", height: "auto", border: "1px solid #898989", backdropFilter: "blur(10px)", paddingBottom: "20px" }}>
            <h1 style={{ textAlign: "center", margin: "20px", fontSize: "30px" }}> Login <span className="app-name" >Mitra Talks</span></h1>
            <form onSubmit={handleSubmit}>
                <div className="username-div">
                    <label>Username</label>
                    <input className="login-input" onChange={(e) => { setUserName(e.target.value) }} placeholder="Enter Username" type="text" value={userName}></input>
                </div>
                <div className="username-div">
                    <label>Password</label>
                    <input className="login-input" onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter Password" type="password" value={password}></input>
                </div>
                <div style={{ textAlign: "center", margin: "10px" }}>

                    <Link to="/signup" >{"Don't"} have an account?</Link>

                </div>

                <div style={{ textAlign: "center" }}>
                    <button
                        disabled={loading}
                        type="submit" style={{ padding: "3px 15px", border: "1px solid #898989" }}>{loading ? <span className="loading loading-spinner"></span> : "Login"}</button>
                </div>
            </form>
        </div>


    </div>
}

export default Login;