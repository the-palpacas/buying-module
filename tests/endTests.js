const puppeteer = require('puppeteer');
const pageUrl = 'http://localhost:8000/1/';

let page;
let browser;
const width = 1280;
const height = 720;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});
afterAll(() => {
  browser.close();
});

describe('client-server-database interaction', () => {

  beforeEach(async () => {
    await page.goto(pageUrl, {waitUntil: 'networkidle2'});
  });

  test('product name is correct', async () => {
    let div = '.product-details h3';
    const name = await page.$eval(div, e => e.textContent);
    expect(name).toEqual('Goanna lizard print');
  });
});
