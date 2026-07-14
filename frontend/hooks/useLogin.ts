'use  client'

import { loginwithCredentials } from "@/lib/services/authServices";
import { useRouter } from "next/router";
//custom hook for 

import { useState } from "react";

export default function useLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter()

    const handleLogin = async () => {
        setError(null)

        if (!email || !password) {
            setError('add both email and password')
            return
        }

        setLoading(true);
        const result = await loginwithCredentials({ email, password })
        setLoading(true);

        if (!result.success) {
            setError(result.error);
            return;
        }

        router.push("/dashboard");
    }

    return {
        email,
        setEmail,
        password,
        setPassword,
        error,
        loading,
        handleLogin,
    };

}