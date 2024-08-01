module.exports = {
   apps: [
      
      {
         name: "---Product---job crawl Ventory Fun",
         script: "/nft721-crawler.ts",
         env_production: {
            NODE_ENV: "production",
         },
         env_development: {
            NODE_ENV: "development",
         },
         watch: true,
         log_date_format: "YYYY-MM-DD HH:mm Z",
         cron_restart: "00 */2 * * *",
      },
      {
         name: "---Product---job crawl Ventory Fun",
         script: "./registry-crawler.ts",
         env_production: {
            NODE_ENV: "production",
         },
         env_development: {
            NODE_ENV: "development",
         },
         watch: true,
         log_date_format: "YYYY-MM-DD HH:mm Z",
         cron_restart: "00 */2 * * *",
      },
      {
         name: "---Product---job crawl Ventory Fun",
         script: "./market-crawler.ts",
         env_production: {
            NODE_ENV: "production",
         },
         env_development: {
            NODE_ENV: "development",
         },
         watch: true,
         log_date_format: "YYYY-MM-DD HH:mm Z",
         cron_restart: "00 */2 * * *",
      },


   ],
};
