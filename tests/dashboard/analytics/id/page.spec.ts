import test, { expect } from "@playwright/test"

test.describe("Analytics ID Page", () => {
  test("should display the datas of ID", async ({ page }) => {
    await page.route("**/api/links/*", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({
          code: 3,
          message: "Link found successfully",
          data: {
            id: "dbbee1b0-2485-4bbc-bba4-15b0895d76ae",
            short_code: "aEZ1TQ",
            original_url: "https://gewall.my.id",
            title: "Portofolio Web",
            expires_at: "2026-03-16T14:30:00Z",
            is_active: false,
          },
        }),
      })
    })
    await page.goto("/dashboard/analytics/id")
    await expect(page.getByTestId("title")).toBeVisible()
    await expect(page.getByTestId("short-code")).toBeVisible()
    await expect(page.getByTestId("original-url")).toContainText("https://")
    await expect(page.getByTestId("expires-at")).toBeVisible()
    const dropdown = page.getByLabel("link dropdown")
    await dropdown.click()
    await expect(page.getByText("Edit")).toBeVisible()
    await expect(page.getByText("Delete")).toBeVisible()
  })

  test("should display the stats of link", async ({ page }) => {
    await page.route("**/api/links/*/analytics/clicks", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({
          code: 5,
          message: "Time Series Found",
          data: {
            hours: [
              {
                hour: "2026-04-02T07:00:00Z",
                clicks: 2,
              },
            ],
            dates: [
              {
                date: "2026-03-28T00:00:00Z",
                clicks: 2,
              },
              {
                date: "2026-03-30T00:00:00Z",
                clicks: 4,
              },
              {
                date: "2026-04-02T00:00:00Z",
                clicks: 2,
              },
            ],
          },
        }),
      })
    })
    await page.route("**/api/links/*/analytics", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({
          code: 5,
          message: "Analytics Found",
          data: {
            total_clicks: 8,
            unique_clicks: 1,
            clicks_today: 2,
            clicks_7d: 8,
            clicks_30d: 8,
          },
        }),
      })
    })
    await page.route("**/api/links/*/analytics/country", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({
          code: 5,
          message: "Country Analytics Found",
          data: [
            {
              country: "US",
              clicks: 8,
              percentage: 100,
            },
            {
              country: "ID",
              clicks: 4,
              percentage: 100,
            },
          ],
        }),
      })
    })
    await page.goto("/dashboard/analytics/id")
    await expect(page.getByText("Link Stats")).toBeVisible()
    await expect(page.getByText("Click by Dates")).toBeVisible()
    await expect(page.getByText("Click by Hours - 24 hours")).toBeVisible()
    await expect(page.getByText("Click by Country")).toHaveCount(2)
  })

  test("should display the error message from header", async ({ page }) => {
    await page.route("**/api/links/*", async (route) => {
      await route.fulfill({
        status: 500,
        body: JSON.stringify({}),
      })
    })
    await page.goto("/dashboard/analytics/id")
    const errors = page.getByText("Something went wrong")
    await expect(errors).toHaveCount(1)
  })

  test("should display the error message from charts", async ({ page }) => {
    await page.route("**/api/links/*/analytics/country", async (route) => {
      await route.fulfill({
        status: 500,
        body: JSON.stringify({}),
      })
    })
    await page.route("**/api/links/*/analytics/clicks", async (route) => {
      await route.fulfill({
        status: 500,
        body: JSON.stringify({}),
      })
    })
    await page.goto("/dashboard/analytics/id")
    const errors = page.getByText("Something went wrong")
    await expect(errors).toHaveCount(2)
  })

  test("should display the loading spinner ", async ({ page }) => {
    await page.route("**/api/links/*", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      await route.fulfill({
        status: 500,
        body: JSON.stringify({}),
      })
    })
    await page.goto("/dashboard/analytics/id")
    await expect(page.getByTestId("loading")).toBeVisible()
  })

  test("should display the edit dialog", async ({ page }) => {
    await page.route("**/api/links/*", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({
          code: 3,
          message: "Link found successfully",
          data: {
            id: "dbbee1b0-2485-4bbc-bba4-15b0895d76ae",
            short_code: "aEZ1TQ",
            original_url: "https://gewall.my.id",
            title: "Portofolio Web",
            expires_at: "2026-03-16T14:30:00Z",
            is_active: false,
          },
        }),
      })
    })

    await page.goto("/dashboard/analytics/id")

    await page.getByText("Edit").click()

    const dialog = page.getByRole("dialog")
    await expect(dialog).toBeAttached()
    await expect(dialog).toBeVisible()

    const idInput = dialog.getByRole("textbox", { name: /id/i })
    await expect(idInput).toHaveValue("dbbee1b0-2485-4bbc-bba4-15b0895d76ae")
    await expect(idInput).toBeDisabled()

    const titleInput = dialog.getByRole("textbox", { name: /title/i })
    await expect(titleInput).toHaveValue("Portofolio Web")

    const isActive = dialog.getByRole("combobox")
    await expect(isActive).toHaveText("Inactive")

    const saveButton = dialog.getByRole("button", { name: /save/i })
    await expect(saveButton).toBeVisible()
    await saveButton.click()
    await expect(page.getByText("Link edited successfully")).toBeVisible()
  })

  test("should display success message after editing", async ({ page }) => {
    await page.route("**/api/links/*", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({
          code: 3,
          message: "Link found successfully",
          data: {
            id: "dbbee1b0-2485-4bbc-bba4-15b0895d76ae",
            short_code: "aEZ1TQ",
            original_url: "https://gewall.my.id",
            title: "Portofolio Web",
            expires_at: "2026-03-16T14:30:00Z",
            is_active: false,
          },
        }),
      })
    })

    await page.goto("/dashboard/analytics/id")

    await page.getByText("Edit").click()

    const dialog = page.getByRole("dialog")
    await expect(dialog).toBeAttached()
    await expect(dialog).toBeVisible()

    const titleInput = dialog.getByPlaceholder("Title")
    await titleInput.fill("Web Gua")

    await dialog.getByRole("combobox").click()
    await page.getByRole("option", { name: "Active", exact: true }).click()

    const saveButton = dialog.getByRole("button", { name: /save/i })
    await expect(saveButton).toBeVisible()
    await saveButton.click()
    await expect(page.getByText("Link edited successfully")).toBeVisible()
  })

  test("should display the delete dialog", async ({ page }) => {
    await page.route("**/api/links/*", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({
          code: 3,
          message: "Link found successfully",
          data: {
            id: "dbbee1b0-2485-4bbc-bba4-15b0895d76ae",
            short_code: "aEZ1TQ",
            original_url: "https://gewall.my.id",
            title: "Portofolio Web",
            expires_at: "2026-03-16T14:30:00Z",
            is_active: false,
          },
        }),
      })
    })
    await page.goto("/dashboard/analytics/id")

    const deleteButton = page.getByText("Delete")
    await deleteButton.click()
    await expect(page.getByText("Delete Link")).toBeVisible()
    await expect(page.getByRole("button", { name: /continue/i })).toBeVisible()
  })
})
