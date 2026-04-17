import test, { expect } from "@playwright/test"

// test.beforeAll(() => server.listen())
// test.afterEach(() => server.resetHandlers())
// test.afterAll(() => server.close())

test.describe("dashboard home page with mocking", () => {
  test("should show links from mocked API", async ({ page }) => {
    // 🔥 mock API
    await page.route("**/api/links", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify([
          { id: "1", title: "Mock Link", shortCode: "abc" },
        ]),
      })
    })

    // buka halaman
    await page.goto("/dashboard")

    // assert UI
    await expect(page.getByText("Mock Link")).toBeVisible()
  })

  test("must display error message if API fails", async ({ page }) => {
    await page.route("**/api/links", async (route) => {
      await route.fulfill({
        status: 500,
        body: JSON.stringify([]),
      })
    })
    await page.goto("/dashboard")

    await expect(page.getByText(/error|gagal|failed/i)).toBeVisible()
  })

  test("should show loading indicator while API is fetching", async ({
    page,
  }) => {
    await page.route("**/api/links", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      await route.fulfill({
        status: 200,
        body: JSON.stringify([
          { id: "1", title: "Mock Link", shortCode: "abc" },
        ]),
      })
    })
    await page.goto("/dashboard")

    await expect(page.getByTestId("loading")).toBeVisible()
  })

  test("should redirect to analytics page", async ({ page }) => {
    await page.route("**/api/links", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify([
          { id: "1", title: "Mock Link", shortCode: "abc" },
        ]),
      })
    })
    await page.goto("/dashboard")
    await page.getByLabel("analytics link").click()
    await expect(page).toHaveURL("/dashboard/analytics/1")
  })

  test("should open add link dialog", async ({ page }) => {
    await page.goto("/dashboard")
    await page.getByLabel("add link").click()
    await expect(
      page.getByText("This form will create a new link for you.")
    ).toBeVisible()
  })

  test("should add a new link", async ({ page }) => {
    await page.goto("/dashboard")
    await page.getByLabel("add link").click()
    await page.getByPlaceholder("Input your Url").fill("https://github.com/")
    await page.getByPlaceholder("Input your short Url").fill("mygit")
    await page.getByPlaceholder("Input your title").fill("My Github")
    await page.getByRole("button", { name: "Save" }).click()
    await expect(page.getByText("Link created successfully")).toBeVisible()
  })

  test("should error when input invalid", async ({ page }) => {
    await page.goto("/dashboard")
    await page.getByLabel("add link").click()
    await page.getByPlaceholder("Input your Url").fill("github")
    await page.getByPlaceholder("Input your short Url").fill("mygit")
    await page.getByPlaceholder("Input your title").fill("")
    await page.getByRole("button", { name: "Save" }).click()
    await expect(page.getByText("Invalid URL")).toBeVisible()
    await expect(page.getByText("Too small")).toBeVisible()
  })
})
