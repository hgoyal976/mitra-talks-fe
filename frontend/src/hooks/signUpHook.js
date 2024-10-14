import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignUp=()=>{
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const signup = async ({fullName,userName, password, confirmPassword, gender }) => {
        const success = handleInputError({fullName,userName, password, confirmPassword, gender });
        if(!success) return;
        setLoading(true);
        try{
            const res = await fetch("/api/auth/signup", 
               { method : "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({fullName,userName, password, confirmPassword, gender })
               }

            );
            const data = await res.json();
            console.log("signup :::", data);
            if(data.error){
                throw new Error(data.error);
            }
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);

        } catch(err){
            toast.error(err.message);
console.log(err);
        } finally {
            setLoading(false);
        }
    }
return {loading, signup};
}
export default useSignUp;

function handleInputError ({fullName,userName, password, confirmPassword, gender }){
    if(!fullName || !userName || !password || !confirmPassword || !gender){
        toast.error("Please fill all the field");
        return false;
    }

    if(password !== confirmPassword){
        toast.error("Passwords do not match");
        return false;
    }

    if(password.length < 6){
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}