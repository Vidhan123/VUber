// Testing using Puppeteer (For reference)

// const puppeteer = require('puppeteer');

// test('Invalid User Login', async () => {
//   const browser = await puppeteer.launch({
//     headless: false,
//     slowMo: 80,
//     args: ['--window-size=1440,900'],
//   });
//   const page = await browser.newPage();
//   await page.goto('http://localhost:3000/logIn');
//   await page.click('input#email');
//   await page.type('input#email', 'test@test.com');
//   await page.click('input#password');
//   await page.type('input#password', 'test');
//   await page.click('button.MuiButton-fullWidth');
//   await page.waitFor(100);
//   const validationText1 = await page.$eval('h6#msg', (e) => e.innerText);
//   expect(validationText1).toBe('Invalid Credentials');
// }, 50000);

// test('Valid User Login', async () => {
//   const browser = await puppeteer.launch({
//     headless: false,
//     slowMo: 80,
//     args: ['--window-size=1440,900'],
//   });
//   const page = await browser.newPage();
//   await page.goto('http://localhost:3000/logIn');
//   await page.click('input#email');
//   await page.type('input#email', 'shahvidhan017@gmail.com');
//   await page.click('input#password');
//   await page.type('input#password', 'Password');
//   await page.click('button.MuiButton-fullWidth');
//   await page.waitFor(100);
//   await page.goto('http://localhost:3000/logIn');
//   const validationText1 = await page.$eval('h6#msg', (e) => e.innerText);
//   expect(validationText1).not.toBe('Invalid Credentials');
// }, 50000);
