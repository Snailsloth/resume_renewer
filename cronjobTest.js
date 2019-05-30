var cronJob = require("cron").CronJob;

var myJob = new cronJob("0 0 */4 * * *", function() {
  console.log("pewpew");
});
myJob.start();

//every 4 hours
