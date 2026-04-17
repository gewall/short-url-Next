import { describe, it } from "vitest"

import { render, screen } from "@testing-library/react"
import { expect } from "@playwright/test"
import Home from "../page"

describe("AddLink", () => {
  it("should render correctly", async () => {
    render(<Home />)

    const dialogTrigger = screen.getByLabelText("add link")
    await dialogTrigger.click()

    expect(screen.getByLabelText("create form title")).toBeDefined()

    const urlInput = screen.getByPlaceholderText("Input your Url")
    expect(urlInput).toBeDefined()
    const shortCodeInput = screen.getByPlaceholderText("Input your short Url")
    expect(shortCodeInput).toBeDefined()
    const titleInput = screen.getByPlaceholderText("Input your title")
    expect(titleInput).toBeDefined()

    const submitButton = screen.getByRole("button", { name: "Save" })
    expect(submitButton).toBeDefined()
  })
})
