const puppeteer = require("puppeteer");

const creds = require("./credentials");

//hh url
const websiteURL = "https://spb.hh.ru/";

//login\password
const userName = creds.userName;
const userPassword = creds.userPassword;

//TODO: catch err

const scrapHH = {
  initialize: async () => {
    const browser = await puppeteer.launch({
      headless: true, //set "false" for visual debugging
      slowMo: 250 // slow down by 250ms
    });

    //get time for screen filename
    let timeStamp = new Date();
    let whatTimeIsIt =
      timeStamp.getHours() +
      "h" +
      timeStamp.getMinutes() +
      "m" +
      timeStamp.getSeconds() +
      "s";

    const page = await browser.newPage();
    //open websiteURL
    await page.goto(`${websiteURL}`);
    //ensure that we have login form loaded
    await page.waitForSelector('div[data-qa="mainmenu_loginForm"]');
    //i have to simulate "clicking" on div to form popup, otherwise my puppeteer could not find elems
    await page.click('div[data-qa="mainmenu_loginForm"]');

    //typing login and pass
    await page.type('input[name="username"]', `${userName}`);
    await page.type('input[name="password"]', `${userPassword}`);
    //submit data
    await page.click('input[data-qa="account-login-submit"]');

    //clicking on a link to resume's list
    await page.click('a[data-qa="mainmenu_myResumes"]');
    //ensure that we have "renew resume" buttons loaded
    await page.waitForSelector('button[data-qa="resume-update-button"]');

    //getting all buttons and clicking them
    await page.evaluate(() => {
      let refreshButtons = document.querySelectorAll(
        '[data-qa="resume-update-button"]'
      );
      for (let i = 0; i < refreshButtons.length; i++) {
        refreshButtons[i].click();
      }
    });

    //screenshot of the result will be placed in the project directory
    await page.screenshot({ path: `screenShot_${whatTimeIsIt}` + `.png` });

    await browser.close();

    console.log("\x1b[36m%s\x1b[0m", "--");
    console.log("\x1b[33m%s\x1b[0m", `Refreshed @ ${whatTimeIsIt}`);
    console.log("\x1b[36m%s\x1b[0m", "--");
  }
};

module.exports = scrapHH;
