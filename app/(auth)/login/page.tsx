import { Separator } from "@/components/ui/separator"

import { Metadata } from "next"
import LoginForm from "./_components/Form"
import Logo from "@/components/Logo"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function Login() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-80 flex-col rounded-md border py-4 shadow-md">
        <div className="flex flex-col items-center">
          <Logo />
          <h1 className="text-2xl font-medium">Login</h1>
          <p className="text-center text-sm font-light text-muted-foreground">
            Login to manage your links and track performance.
          </p>
        </div>
        <Separator className="my-2" />
        <LoginForm />
        <p className="my-2 text-center text-sm text-muted-foreground">
          Don{"'"}t have an account?{" "}
          <a href="/register" className="text-primary">
            Register
          </a>
        </p>
      </div>
    </div>
  )
}
