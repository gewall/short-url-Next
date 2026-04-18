"use client"

import { LogIn } from "lucide-react"
import Container from "./Container"
import Logo from "./Logo"
import { Button } from "./ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Spinner } from "./ui/spinner"

export default function LPNavbar() {
  const [apiStatus, setApiStatus] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    ;(async () => {
      try {
        const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}health`)
        if (req.ok) {
          setApiStatus(true)
        } else {
          setApiStatus(false)
        }
        setLoading(false)
      } catch {
        setApiStatus(false)
        setLoading(false)
      }
    })()
  }, [])
  return (
    <nav className="">
      <Container className="flex items-center justify-between">
        <div>
          <Logo />
        </div>
        <div className="flex items-center gap-2">
          {loading && <Spinner className="text-primary" />}
          {!apiStatus && !loading && (
            <span className="text-sm text-destructive">API is down</span>
          )}
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
