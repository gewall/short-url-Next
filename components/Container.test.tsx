import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import Container from "./Container"

describe("Container", () => {
  it("Container must have class", () => {
    render(
      <Container>
        <h5 aria-label="child-element">Mock Section</h5>
      </Container>
    )
    expect(screen.getByText("Mock Section")).toBeDefined()
    expect(screen.getByLabelText("child-element")).toBeDefined()
  })

  it("Container must have class", () => {
    const { container } = render(
      <Container>
        <h5 aria-label="child-element">Mock Section</h5>
      </Container>
    )
    const div = container.firstChild as HTMLElement

    expect(div.classList.contains("px-8")).toBe(true)
    expect(div.classList.contains("md:px-16")).toBe(true)
    expect(div.classList.contains("lg:px-32")).toBe(true)
  })
})
