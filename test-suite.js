// vitest.config.js
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      threshold: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    }
  }
})

// src/test/setup.js
import '@testing-library/jest-dom'

// src/test/LovablePromptsGenerator.test.jsx
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LovablePromptsGenerator from '../LovablePromptsGenerator'

describe('LovablePromptsGenerator', () => {
  beforeEach(() => {
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined)
      }
    })
  })

  it('renders main interface elements', () => {
    render(<LovablePromptsGenerator />)
    
    expect(screen.getByText('Lovable Prompts')).toBeInTheDocument()
    expect(screen.getByText('Generate perfect prompts for Lovable.AI')).toBeInTheDocument()
    expect(screen.getByRole('tablist')).toBeInTheDocument()
  })

  it('generates prompt when selecting images category', async () => {
    const user = userEvent.setup()
    render(<LovablePromptsGenerator />)
    
    // Select images category
    await user.click(screen.getByText('Images'))
    
    // Fill image description
    const imageInput = screen.getByPlaceholderText(/hero background, logo/i)
    await user.type(imageInput, 'hero background')
    
    // Check generated prompt
    await waitFor(() => {
      expect(screen.getByText(/Add hero background image to hero/i)).toBeInTheDocument()
    })
  })

  it('updates prompt when changing design style', async () => {
    const user = userEvent.setup()
    render(<LovablePromptsGenerator />)
    
    // Select design-styles category
    await user.click(screen.getByText('Design Styles'))
    
    // Change design style
    const styleSelect = screen.getByDisplayValue('Neobrutalism')
    await user.selectOptions(styleSelect, 'Glassmorphism')
    
    // Check prompt updated
    await waitFor(() => {
      expect(screen.getByText(/Apply Glassmorphism design style/i)).toBeInTheDocument()
    })
  })

  it('copies prompt to clipboard when copy button clicked', async () => {
    const user = userEvent.setup()
    render(<LovablePromptsGenerator />)
    
    // Generate a prompt first
    await user.click(screen.getByText('Icons'))
    const iconSelect = screen.getByDisplayValue('')
    await user.selectOptions(iconSelect, 'Brain')
    
    // Click copy button
    const copyButton = screen.getByRole('button', { name: /copy generated prompt/i })
    await user.click(copyButton)
    
    // Check clipboard was called
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      expect.stringContaining('Add Brain icon to hero')
    )
    
    // Check toast appears
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByText('Copied to clipboard!')).toBeInTheDocument()
    })
  })

  it('opens Zynx modal when clicking creator link', async () => {
    const user = userEvent.setup()
    render(<LovablePromptsGenerator />)
    
    await user.click(screen.getByText('Created by Zynx'))
    
    expect(screen.getByText('รู้จัก Zynx')).toBeInTheDocument()
    expect(screen.getByText('AI Developer')).toBeInTheDocument()
  })

  it('maintains accessibility standards', () => {
    render(<LovablePromptsGenerator />)
    
    // Check tab navigation structure
    const tablist = screen.getByRole('tablist')
    expect(tablist).toHaveAttribute('aria-label', 'Main navigation')
    
    // Check tabs have proper ARIA attributes
    const tabs = screen.getAllByRole('tab')
    tabs.forEach(tab => {
      expect(tab).toHaveAttribute('aria-selected')
      expect(tab).toHaveAttribute('aria-controls')
    })
    
    // Check copy buttons have labels
    const copyButtons = screen.getAllByLabelText(/copy/i)
    expect(copyButtons.length).toBeGreaterThan(0)
  })
})

// playwright.config.js
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    }
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI
  }
})

// e2e/prompts-generator.spec.js
import { test, expect } from '@playwright/test'

test.describe('Lovable Prompts Generator E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('complete prompt generation workflow', async ({ page }) => {
    // Test main navigation
    await expect(page.getByText('Lovable Prompts')).toBeVisible()
    
    // Select Icons category
    await page.getByText('Icons').click()
    
    // Fill form
    await page.getByRole('combobox', { name: 'Icon Name' }).selectOption('Brain')
    await page.getByRole('combobox', { name: 'Position' }).selectOption('navbar')
    await page.getByRole('combobox', { name: 'Purpose' }).selectOption('Functional')
    
    // Check styling options
    await page.getByLabel('Gradient').check()
    await page.getByLabel('Animation').check()
    
    // Verify generated prompt
    const prompt = page.locator('pre').textContent()
    await expect(prompt).toContain('Add Brain icon to navbar')
    await expect(prompt).toContain('gradient, animation')
    await expect(prompt).toContain('functional purposes')
    
    // Test copy functionality
    await page.getByRole('button', { name: /copy generated prompt/i }).click()
    await expect(page.getByRole('alert')).toBeVisible()
    await expect(page.getByText('Copied to clipboard!')).toBeVisible()
  })

  test('design styles category workflow', async ({ page }) => {
    await page.getByText('Design Styles').click()
    
    // Change design style
    await page.getByRole('combobox', { name: 'Design Style' }).selectOption('Glassmorphism')
    
    // Verify prompt updates
    const prompt = page.locator('pre')
    await expect(prompt).toContainText('Apply Glassmorphism design style')
  })

  test('accessibility with keyboard navigation', async ({ page }) => {
    // Test tab navigation
    await page.keyboard.press('Tab')
    await expect(page.getByText('Images')).toBeFocused()
    
    await page.keyboard.press('Tab')
    await expect(page.getByText('Icons')).toBeFocused()
    
    // Test modal accessibility
    await page.getByText('Created by Zynx').click()
    await expect(page.getByText('รู้จัก Zynx')).toBeVisible()
    
    // Close modal with keyboard
    await page.keyboard.press('Escape')
    await expect(page.getByText('รู้จัก Zynx')).not.toBeVisible()
  })

  test('mobile responsiveness', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Mobile test only on Chromium')
    
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Check mobile layout
    await expect(page.getByText('Lovable Prompts')).toBeVisible()
    await expect(page.getByRole('tablist')).toBeVisible()
    
    // Test touch interactions
    await page.getByText('Icons').tap()
    await expect(page.getByRole('combobox', { name: 'Icon Name' })).toBeVisible()
  })

  test('performance benchmarks', async ({ page }) => {
    // Measure loading performance
    const startTime = Date.now()
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const loadTime = Date.now() - startTime
    
    expect(loadTime).toBeLessThan(3000) // 3 second max load time
    
    // Check no console errors
    const errors = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })
    
    await page.reload()
    expect(errors).toHaveLength(0)
  })
})

// GitHub Actions Workflow
// .github/workflows/ci.yml
/*
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  lint-and-type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run encoding-check

  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v3

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

  bundle-analysis:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - run: npm run size-check
      - run: npm run analyze

  lighthouse-ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - run: npm start &
      - run: sleep 10
      - run: npm run lighthouse
*/