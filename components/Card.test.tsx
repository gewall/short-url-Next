import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import Card from "./Card"

afterEach(() => {
  cleanup() // Memastikan DOM bersih setelah setiap satu blok test selesai
})

describe("Card", () => {
  it("Should render title, description and id ", () => {
    render(<Card title="Test Title" shortCode="sadsds" id="random123" />)

    expect(screen.getByLabelText("card title").textContent).toContain(
      "Test Title"
    )
    expect(screen.getByLabelText("card description").textContent).toContain(
      "sadsds"
    )
    expect(screen.getByRole("link", { name: "analytics link" })).toHaveProperty(
      "href",
      expect.stringContaining("/analytics/random123")
    )
  })

  it("Link should clickable", () => {
    render(
      <Card title="Test Title" shortCode="Test Description" id="random123" />
    )

    const link = screen.getByRole("link", { name: "analytics link" })
    link.click()
  })
})
