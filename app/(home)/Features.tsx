import Container from "@/components/Container"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Content } from "@/lib/schemas/content"

interface FeaturesProps {
  content: Content
}

export default function Features({ content }: FeaturesProps) {
  return (
    <Container className="my-4 flex w-full flex-col items-center gap-2 md:my-8">
      <h5 className="text-2xl font-light">Features</h5>
      <div className="flex w-full flex-col gap-2 md:flex-row">
        {content?.features?.map((feature, index) => (
          <Item key={index} variant={"outline"} data-testid={"features-list"}>
            <ItemMedia variant={"icon"}>{feature.icon}</ItemMedia>
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
