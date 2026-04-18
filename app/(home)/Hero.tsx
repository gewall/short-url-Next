"use client"

import Container from "@/components/Container"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import useCharGenerator from "@/lib/hooks/useCharGenerator"
import { Content } from "@/lib/schemas/content"
import { ChevronRight, Link } from "lucide-react"
import { useState } from "react"
import NextLink from "next/link"

interface HeroProps {
  content: Content
}

export default function Hero({ content }: HeroProps) {
  const [url, setUrl] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const { generate, code } = useCharGenerator(6)

  return (
    <Container className="flex flex-col justify-between md:flex-row">
      <div className="my-12 flex flex-col items-start">
        <div className="flex max-w-96 flex-col gap-2">
          <h5 className="text-sm font-light">{content.hero.bridge}</h5>
          <h4 className="text-2xl font-bold" aria-label={content.hero.title}>
            {content.hero.title.split("br")[0]}
            <br />
            {content.hero.title.split("br")[1]}
          </h4>
          <p className="text-md font-light">{content.hero.description}</p>
          <div className="my-2">
            <Button
              variant={"outline"}
              className="border-primary hover:bg-primary/80 hover:text-primary-foreground"
              asChild
            >
              <NextLink href="/login">
                Start Sharing <ChevronRight />
              </NextLink>
            </Button>
          </div>
        </div>
      </div>
      <div className="max-w-90 flex-1">
        <Card className="">
          <CardHeader>
            <CardTitle>Try it!</CardTitle>
            <CardDescription>Enter a URL to shorten it.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <InputGroup>
                <InputGroupInput
                  type="url"
                  required
                  placeholder="Enter your long URL..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <InputGroupAddon>
                  <Link />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault()
                      if (url.includes("https://")) {
                        generate()
                        setError(false)
                      } else {
                        setError(true)
                      }
                    }}
                  >
                    Generate
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              {error && (
                <p className="mt-2 text-sm text-destructive">Invalid URL</p>
              )}
            </form>
            <p className="mt-2 text-sm text-muted-foreground">Result :</p>
            <div className="rounded-md bg-accent p-4">
              {process.env.NEXT_PUBLIC_API_URL}
              {code}
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
