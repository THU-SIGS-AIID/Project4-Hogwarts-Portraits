import { test, expect } from '@playwright/test'

test('chat -> creates tweet and can like; image viewer works', async ({ page }) => {
  await page.goto('http://localhost:5173/')

  // Send a chat message
  const input = page.getByTestId('chat-input')
  await input.fill('自动化测试消息')
  await page.getByTestId('send').click()

  // It should appear at the top of Posts as a tweet
  const tweetLocator = page.locator('text=自动化测试消息').first()
  await expect(tweetLocator).toBeVisible()

  // Like it
  // Find the heart in the same tweet card; use nearest heart button
  const card = tweetLocator.locator('..').locator('..').locator('..')
  const likeBtn = card.getByRole('button').nth(2)
  await likeBtn.click()
  await expect(likeBtn).toHaveText(/1$/)

  // Image viewer: next and zoom
  const img = page.getByTestId('gallery-image')
  const src1 = await img.getAttribute('src')
  await page.getByTestId('next').click()
  const src2 = await img.getAttribute('src')
  expect(src2).not.toBe(src1)

  await page.getByTestId('zoom-in').click()
  // After zoom in, style should contain scale( > 1 )
  const style = await img.evaluate((el) => (el as HTMLElement).style.transform)
  expect(style).toMatch(/scale\((1\.[0-9]+|2|3|4)\)/)
})

