import { describe, it, expect } from "vitest"
import Stats from "./Stats"
import { PointerIcon } from "lucide-react"
import { render, screen } from "@testing-library/react"

describe("Stats", () => {
  it("Should render Icon", () => {
    render(
      <Stats
        icon={<PointerIcon aria-label="stats icon" />}
        label="Clicks"
        value={5}
      />
    )

    const label = screen.getByLabelText("stats label")
    const value = screen.getByLabelText("stats value")

    expect(screen.getByLabelText("stats icon")).toBeDefined()
    expect(label).toBeDefined()
    expect(value).toBeDefined()
    expect(label.textContent).toBe("Clicks: ")
    expect(value.textContent).toBe("5")
  })
})
