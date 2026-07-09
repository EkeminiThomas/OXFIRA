// "use client";

// import { useEffect } from "react";
// import { useSession, signIn, signOut } from "next-auth/react";
// import { useAuthStore } from "../store/useAuthStore";


// export function useAuth() {
//     const { data: session, status } = useSession();
//     const { user, isAuthenticated, setUser, clearUser } = useAuthStore();

//     useEffect(() => {
//         if (status === "authenticated" && session?.user) {
//             setUser({
//                 id: session.user.id as string,
//                 name: session.user.name,
//                 email: session.user.email,
//                 image: session.user.image,
//             });
//         } else if (status === "unauthenticated") {
//             clearUser();
//         }
//     }, [status, session, setUser, clearUser]);

//     return {
//         user,
//         isAuthenticated,
//         isLoading: status === "loading",
//         loginWithGoogle: () => signIn("google", { callbackUrl: "/dashboard" }),
//         loginWithFacebook: () => signIn("facebook", { callbackUrl: "/dashboard" }),
//         loginWithCredentials: (email: string, password: string) =>
//             signIn("credentials", { email, password, redirect: false }),
//         logout: () => signOut(),
//     };
// }