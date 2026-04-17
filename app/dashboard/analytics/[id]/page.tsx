import Container from "@/components/Container"
import { Metadata } from "next"
import Header from "./Header"
import Charts from "./Charts"

interface LinkAnalyticsProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: LinkAnalyticsProps): Promise<Metadata> {
  try {
    const { id } = await params
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/links/${id}`)
    if (!req.ok) {
      throw new Error("Failed to fetch link analytics")
    }
    const res = await req.json()
    const title = res.title
    return {
      title: `Link Analytics - ${title}`,
      description: `View analytics for the short URL ${title}.`,
    }
  } catch {
    return {
      title: "Link Analytics",
      description: "View analytics for the short URL.",
    }
  }
}

export default async function LinkAnalytics({ params }: LinkAnalyticsProps) {
  const { id } = await params
  return (
    <Container className="space-y-4">
      <Header id={id} />

      <Charts id={id} />
    </Container>
  )
}
