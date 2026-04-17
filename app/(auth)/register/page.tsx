import { Separator } from "@/components/ui/separator"

import { Metadata } from "next"
import RegisterForm from "./_components/Form"
import Logo from "@/components/Logo"

export const metadata: Metadata = {
  title: "Register",
  description: "Register to your account",
}

export default function Register() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-80 flex-col rounded-md border py-4 shadow-md">
        <div className="flex flex-col items-center">
          <Logo />
          <h1 className="text-2xl font-medium">Register</h1>
          <p className="text-center text-sm font-light text-muted-foreground">
            Register to manage your links and track performance.
          </p>
        </div>
        <Separator className="my-2" />
        <RegisterForm />
        <p className="my-2 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a href="/login" className="text-primary">
            Login
          </a>
        </p>
      </div>
    </div>
  )
}
