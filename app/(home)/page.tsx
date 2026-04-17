import { Metadata } from "next"
import Hero from "./Hero"
import { content } from "@/lib/lpcontent"
import Features from "./Features"
import HowItWorks from "./HIW"
import Faq from "./FAQ"
import CTA from "./CTA"

export const metadata: Metadata = {
  title: "Shortle | Short URL",
  description:
    "Shortle is a simple URL shortener that makes your links shorter and easier to share.",
  openGraph: {
    title: "Shortle | Short URL",
    description:
      "Shortle is a simple URL shortener that makes your links shorter and easier to share.",
    url: "",
    siteName: "Shortle",
    images: [],
    locale: "id_ID",
    type: "website",
  },
}

export default function Home() {
  return (
    <div>
      <Hero content={content} />
      <Features content={content} />
      <HowItWorks content={content} />
      <Faq content={content} />
      <CTA />
    </div>
  )
}
