import { defineConfig } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

// Keep the downloaded test browser inside this workspace.
process.env.PLAYWRIGHT_BROWSERS_PATH ||= path.join(path.dirname(fileURLToPath(import.meta.url)), '.browsers');
const localBrowser = process.env.PORTFOLIO_BROWSER_PATH || ['C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].find(existsSync);

export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:5173', viewport: { width: 1440, height: 1000 }, headless: true, launchOptions: localBrowser ? { executablePath: localBrowser } : {} },
  webServer: { command: 'node server.mjs --port 5173', url: 'http://127.0.0.1:5173', reuseExistingServer: true }
});
