import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import Menubar from "./Menubar"

afterEach(() => {
  cleanup() // Memastikan DOM bersih setelah setiap satu blok test selesai
})

describe("Menubar", () => {
  it("Should render links and Analytics", () => {
    render(<Menubar />)

    const links = screen.getAllByRole("link")
    expect(links).toHaveLength(2)
    expect(links[0].textContent).toContain("Links")
    expect(links[1].textContent).toContain("Analytics")
  })
})
