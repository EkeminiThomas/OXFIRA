'use client'

import { loginwithCredentials } from "@/lib/services/authServices";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null | undefined>(null);
  const [loading, setLoading] = useState(false);


  const router = useRouter();

  const handleLogin = async () => {
    setError(null);

    if (!email || !password) {
      setError('add both email and password');
      return;
    }

    setLoading(true);

    try {
      const result = await loginwithCredentials({ email, password });

      if (!result.success) {
        setError(result.error);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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