import { LogIn } from "lucide-react"
import Container from "./Container"
import Logo from "./Logo"
import { Button } from "./ui/button"
import Link from "next/link"

export default function LPNavbar() {
  return (
    <nav className="">
      <Container className="flex items-center justify-between">
        <div>
          <Logo />
        </div>
        <div>
          <Button variant="outline" asChild>
            <Link href="/login">
              <LogIn className="text-primary" />
              Login
            </Link>
          </Button>
        </div>
      </Container>
    </nav>
  )
}
