module.exports = {
  apps: [
    {
      name: "app",
      script: "./app.js",
      env: {
        JWT_SECRET:
          "0ee11c60e2b084a9abf7a067eea03e7a12023cb0bd7cdf165165c6f1ef5a6387",
        MONGO_URL: "mongodb://Gill:Sniffer95@127.0.0.1:27017/futbol_scores",
        NODE_ENV: "production",
      },
    },
  ],
};
