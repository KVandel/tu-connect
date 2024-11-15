import {Metadata} from "next";
import signUpImage from '@/assets/signup-image.jpg'
import Image from "next/image";
import Link from "next/link";
import SignUpForm from "@/app/(auth)/signup/SignUpForm";

export const metadata: Metadata ={
    title: "Sign Up",
}
export default function page(){
    return <main className="flex h-screen items-center justify-center p-5 ">
        <div className="flex h-full max-h-[40rem] w-full max-w-[64 rem] rounded-2xl overflow-hidden bg-card shadow-2xl">
<div className="md:w-1/2 w-full space-y-10 overflow-auto p-10 ">
 <div className='space-y-1 text-center '>
    <h1 className='text-2xl font-bold'>SignUp to <br/> TU CONNECT</h1>
     <p className='text-muted-foreground'>A place where we can truly be us!</p>
 </div>
    <div className =' space-y-5'>
        <SignUpForm />
        <Link href='/login' className='block text-center hover:underline' >
            Already have an account? Login
        </Link>
    </div>
</div>
            <Image src={signUpImage} alt='something' className='w-1/2 object-cover hidden rounded-2xl md:block '/>
        </div>

    </main>
}