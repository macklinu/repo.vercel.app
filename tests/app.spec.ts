import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/repo.vercel.app/)
})

test('displays help text', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByText(
      /find the repo for any npm package name. just append \/:pkg-name to the url/i
    )
  ).toBeVisible()
})

const urls: [string, string][] = [
  ['/react', 'https://github.com/facebook/react'],
  ['/express', 'https://github.com/expressjs/express'],
  ['@babel/core', 'https://github.com/babel/babel'],
]

for (const [appUrl, redirectUrl] of urls) {
  test(`redirects from ${appUrl} to ${redirectUrl}`, async ({ page }) => {
    await page.goto(appUrl)

    await expect(page).toHaveURL(redirectUrl)
  })
}

test('shows error page for project that is not found', async ({ page }) => {
  await page.goto('/@macklinu/not-a-thing')

  await expect(page.getByTestId('error-message')).toContainText(
    "It looks like @macklinu/not-a-thing wasn't found in the npm registry."
  )
})

test('shows error page for a package that is found but is missing the git repo in its package.json', async ({
  page,
}) => {
  await page.goto('/array-reduce')

  await expect(page.getByTestId('error-message')).toContainText(
    "It looks like array-reduce doesn't have a repository defined in its package.json."
  )
})
