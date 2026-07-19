//talk o the backend API

import { loginPayload } from "@/types";

export async function loginwithCredentials({ email, password }: loginPayload) {
    try {
        const response = await fetch(`${process.env.NEXTAUTH_SECRET}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })

        });
        if (!response.ok) {
            if (response.status === 401) {
                return { success: false, error: "Invalid email or password." };
            }
            return { success: false, error: "Something went wrong. Please try again." };

        }
        const data = await response.json();
        return { success: true, token: data.token };
    } catch (error) {
        return { success: false, error: "culdnt reach server, Try again later" }
    }
}