export type Content = {
  hero: {
    title: string
    description: string
    bridge: string
  }
  features: {
    title: string
    description: string
    bridge?: string
    icon: React.ReactNode
  }[]
  hiw: {
    title: string
    description: string
    bridge?: string
  }[]
  faq: {
    question: string
    answer: string
    value: string
  }[]
}
