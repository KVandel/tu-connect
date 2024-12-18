import { Metadata } from "next";
import LoginForm from "@/app/(auth)/login/LoginForm";
import Link from "next/link";
import loginImage from "@/assets/login-image.jpg";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <h1 className="text-center  text-3xl font-bold">
            Login To
            <br /> <span className="text-blue-700">K-CONNECT</span>
          </h1>
          <div className="space-y-5">
            {/*<GoogleSignInButton />*/}
            {/*<div className="flex items-center gap-3">*/}
            {/*  <div className="flex-1 h-px bg-muted" />*/}
            {/*  <span>OR</span>*/}
            {/*  <div className="flex-1 h-px bg-muted" />*/}
            {/*</div>*/}
            <LoginForm />
            <Link href="/signup" className="block text-center hover: underline">
              Don&apos;t have an account? SignUp
            </Link>
          </div>
        </div>
        <Image
          src={loginImage}
          alt="things"
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
}
