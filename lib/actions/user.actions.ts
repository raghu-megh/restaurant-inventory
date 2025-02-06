'use server';

import { signInFormSchema } from "../constants/validators";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

//Sign in the user with credentials
export async function signInWithCredentials(prevState: unknown, formData: FormData) {
    try {
const user = signInFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password')});
    } 

}