import { render, screen } from "@testing-library/react"
import Logo from "./Logo"
import { describe, expect, it } from "vitest"

describe("Logo Component", () => {
  it("Must render S first then Shortle", () => {
    render(<Logo />)

    const initialS = screen.getByText("S")
    expect(initialS).toBeDefined()

    const shortleText = screen.getByText("Shortle")
    expect(shortleText).toBeDefined()
  })
})
