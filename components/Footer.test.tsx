import { cleanup, render, screen } from "@testing-library/react"
import Footer from "./Footer"
import { afterEach, describe, expect, it } from "vitest"

afterEach(() => {
  cleanup()
})

describe("Footer", () => {
  it("should render title and description", () => {
    render(<Footer />)

    expect(screen.getByLabelText("footer label").textContent).toBe("Shortle")
    expect(screen.getByLabelText("footer description").textContent).toBe(
      "Crafted with code, coffee, and a bit of chaos."
    )
  })

  it("should render Contact", () => {
    render(<Footer />)
    expect(screen.getByLabelText("footer contact").textContent).toBe(
      "Contact Me!"
    )
    const contactLink = screen.getAllByRole("link")
    expect(contactLink).toHaveLength(2)
  })

  it("should redirect to external link", () => {
    render(<Footer />)
    const contactLink = screen.getAllByRole("link")
    expect(contactLink[0].getAttribute("href")).toContain("mailto:")
    expect(contactLink[1].getAttribute("href")).toContain("https://")
  })
})
