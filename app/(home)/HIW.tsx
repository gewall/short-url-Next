import Container from "@/components/Container"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Content } from "@/lib/schemas/content"

interface HowItWorksProps {
  content: Content
}

export default function HowItWorks({ content }: HowItWorksProps) {
  return (
    <Container className="my-4 flex w-full flex-col items-center gap-2 md:my-8">
      <h5 className="text-2xl font-light">How it works</h5>
      <div className="flex w-full flex-col gap-4 md:flex-row">
        {content?.hiw?.map((feature, index) => (
          <Item key={index} variant={"outline"} data-testid="hiw-list">
            <ItemMedia variant={"default"}>
              <div className="rounded-md bg-secondary px-4 py-2">
                {index + 1}
              </div>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{feature.title}</ItemTitle>
              <ItemDescription>{feature.description}</ItemDescription>
            </ItemContent>
          </Item>
        ))}
      </div>
    </Container>
  )
}
