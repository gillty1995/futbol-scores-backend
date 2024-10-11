require("dotenv").config();

module.exports = {
  apps: [
    {
      name: "app",
      script: "./app.js",
      env: {
        JWT_SECRET: process.env.JWT_SECRET,
        MONGO_URL: process.env.MONGO_URL,
        NODE_ENV: "production",
      },
    },
  ],
};
