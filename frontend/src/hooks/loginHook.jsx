import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async ({ userName, password }) => {
        const success = handleInputError({ userName, password });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" }, // it tells server that the body of the request contains JSON data
                body: JSON.stringify({ userName, password }),
            })
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, login };
}
export default useLogin;

function handleInputError({ userName, password }) {
    if (!userName || !password) {
        toast.error("Please fill all the field");
        return false;
    }
    return true;
}