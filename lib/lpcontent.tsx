import { Content } from "./schemas/content"
import { BrushCleaning, Rocket, ChartLine } from "lucide-react"

export const content: Content = {
  hero: {
    title: "Simplify Your Links.br Strengthen Your Reach.",
    description:
      "Turn long, messy URLs into clean, shareable links. Built for performance, designed for clarity.",
    bridge: "Start sharing with purpose.",
  },
  features: [
    {
      title: "Clean & Simple Links",
      description: "No more long and ugly URLs. Make everything look neat.",
      bridge: "",
      icon: <BrushCleaning />,
    },
    {
      title: "Fast & Instant",
      description: "Generate your short link in seconds. No setup needed.",
      bridge: "",
      icon: <Rocket />,
    },
    {
      title: "Track Performance",
      description: "See how many people clicked your link, anytime.",
      bridge: "",
      icon: <ChartLine />,
    },
  ],
  hiw: [
    {
      title: "Paste your link",
      description: "Drop your long URL.",
      bridge: "",
    },
    {
      title: "Generate",
      description: "We shorten it instantly.",
      bridge: "",
    },
    {
      title: "Share & Track",
      description: "Copy and share your new, clean link.",
      bridge: "",
    },
  ],
  faq: [
    {
      question: "Is this service free?",
      answer: "Yes, you can start for free with no hidden cost",
      value: "item-1",
    },
    {
      question: "Do I need to create an account?",
      answer: "Yes, you need to create an account to use the service.",
      value: "item-2",
    },
    {
      question: "Can I track link performance?",
      answer: "Yes, you can see how many times your link has been clicked.",
      value: "item-3",
    },
    {
      question: "Are my links secure?",
      answer: "We ensure your links are safe and accessible anytime.",
      value: "item-4",
    },
  ],
}
