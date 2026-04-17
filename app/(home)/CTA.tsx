import Container from "@/components/Container"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"
import Link from "next/link"

export default function CTA() {
  return (
    <Container className="my-8 flex justify-center">
      <Item
        variant="default"
        className="w-140 rounded-sm bg-primary text-primary-foreground"
      >
        <ItemContent>
          <ItemTitle className="font-semibold" aria-label="cta-title">
            Create your link now
          </ItemTitle>
          <ItemDescription
            className="font-light text-primary-foreground"
            aria-label="cta-description"
          >
            Simple, fast, and ready in seconds.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button asChild>
            <Link aria-label="cta-login" href="/login">
              Click here!
            </Link>
          </Button>
        </ItemActions>
      </Item>
    </Container>
  )
}
