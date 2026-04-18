"use client"

import Link from "next/link"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "./ui/item"

type CardProps = {
  id: string
  title: string
  shortCode: string
  rest?: React.HTMLAttributes<HTMLDivElement>
}

export default function Card({ id, title, shortCode, rest }: CardProps) {
  const shortUrl = `${process.env.NEXT_PUBLIC_API_URL}${shortCode}`
  return (
    <Item variant="outline" {...rest}>
      <ItemContent>
        <ItemTitle aria-label="card title">{title}</ItemTitle>
        <ItemDescription aria-label="card description">
          {shortUrl}
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Link
          href={`/dashboard/analytics/${id}`}
          className="underline"
          aria-label="analytics link"
        >
          Analytics
        </Link>
      </ItemActions>
    </Item>
  )
}
