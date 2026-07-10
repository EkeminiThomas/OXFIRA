import 'server-only';
import { SignJWT } from "jose"
import { cookies } from 'next/headers';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);



type sessionPayload = {
    userId: string;
    expiresAt: Date;
}

export async function createSession(userId: string) {

    //create a session
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt({ userId, expiresAt })

    //store the creted session in a HTTP-secure cookie
    cookies().set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
    })
}


export async function encrypt(payload: sessionPayload) {
    return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(encodedKey)

}

export async function decrypt(string: string | undefined = '') {

}