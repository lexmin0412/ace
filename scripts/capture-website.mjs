import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import captureWebsite from 'capture-website';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const screenshotPath = path.resolve(__dirname, '..', 'docs_index.png')

console.log('fs.existsSync(screenshotPath)', fs.existsSync(screenshotPath))
if (fs.existsSync(screenshotPath)) {
  fs.rmSync(screenshotPath)
}

await captureWebsite.file('https://lexmin0412.github.io/ace', 'docs_index.png');
