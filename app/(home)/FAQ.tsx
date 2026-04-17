import Container from "@/components/Container"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Content } from "@/lib/schemas/content"

interface FaqProps {
  content: Content
}

export default function Faq({ content }: FaqProps) {
  return (
    <Container className="my-4 flex flex-col items-center gap-2 md:my-8">
      <h5 className="text-2xl font-light">Frequently Asked Questions</h5>
      <Accordion defaultValue={"item-1"} type="single" collapsible>
        {content.faq?.map((faq, index) => (
          <AccordionItem key={index} value={faq.value} data-testid={"faq-list"}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  )
}
