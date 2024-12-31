import { useAuth } from "@/context/AuthContext";
import axios from "axios";

const URL = import.meta.env.VITE_URL;
console.log(URL);

// SignUp
export const SignUp = async (userDetails) => {
    try{
        const response = await axios.post(`${URL}/api/auth/signup`, 
            {
                username: userDetails.username,
                email: userDetails.email,
                password: userDetails.password,
                profile_pic: userDetails.profile_pic||null
            },
        );

        return response;
    }
    catch(error){
        console.log('signup error', error);
    }
};

// Signup Check Unique email
export const CheckUniqueEmail = async (email) => {
    // console.log('email', email);
    try{
        const response = await axios.post(`${URL}/api/auth/signup/checkUniqueEmail`, 
            {
                email: email
            },
        );

        return response;
    }
    catch(error){
        console.log('signup unique email error', error);
    }
};

// Signup Check Unique UserName
export const CheckUniqueUsername = async (username) => {
    try{
        const response = await axios.post(`${URL}/api/auth/signup/checkUniqueUsername`, 
            {
                username: username
            },
        );

        return response;
    }
    catch(error){
        console.log('signup unique username error', error);
    }
};

// Login
export const Login = async (email, password) => {
    try{
        const response = await axios.post(`${URL}/api/auth/login`, 
            {
                email: email,
                password: password
            },
        );

        return response;
    }
    catch(error){
        console.log('login error', error);
    }
};
