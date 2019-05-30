const scrapHH = require("./scrapHH");

//USE FOR RUN EVERY 4 HOURS WITH NODE-CRON
/*
if you have any errors with sandbox, please read:
https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix
and
https://github.com/GoogleChrome/puppeteer/issues/391
*/

const cronJob = require("cron").CronJob;

let renewResume = new cronJob("0 0 */4 * * *", function() {
  (async () => {
    await scrapHH.initialize();
  })();
});

renewResume.start();

//one time run
// (async () => {
//   await scrapHH.initialize();
// })();
