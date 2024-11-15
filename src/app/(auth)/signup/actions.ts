'use server'
import {signUpSchema, SignUpValues} from "@/lib/validation";
import {generateIdFromEntropySize} from "lucia";
import {hash} from '@node-rs/argon2'
import prisma from "@/lib/prisma";
import {cookies} from "next/headers";
import {lucia} from "@/lib/auth";
import {redirect} from "next/navigation";
import {isRedirectError} from "next/dist/client/components/redirect";



export async function signUp(
    credentials: SignUpValues

): Promise<{error : string}> {
    try {
        const {username,email, password} = signUpSchema.parse(credentials);

        const passwordHash = await hash (password,{
            memoryCost : 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        })

        const userId = generateIdFromEntropySize(10);

        const existingUsername =  await prisma.user.findFirst({where:{
                username:{
                    equals: username,
                    mode: "insensitive"
                }
            }})
        if (existingUsername) {
            return {error: "Username already exist"};
        }
        const existingEmail =  await prisma.user.findFirst({where:{
                email:{
                    equals: email,
                    mode: "insensitive"
                }
            }})
        if (existingEmail) {
            return {error: "Email already exist"};
        }

        await prisma.user.create({
            data:{
                id: userId,
                username,
                displayName: username,
                email,
                passwordHash
            }
        })

        const session = await lucia.createSession(userId,{})
        const sessionCookie = lucia.createSessionCookie(session.id);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,

        );

        return redirect('/');



    }catch (error){
        if(isRedirectError(error)) throw error;
        console.error(error)
        return {
            error: " Something went wrong. Try again later",
        }
    }


}