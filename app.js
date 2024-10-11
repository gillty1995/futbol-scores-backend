require("dotenv").config();

console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("MONGO_URL:", process.env.MONGO_URL);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const indexRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/loggers");
const apiLimiter = require("./middlewares/rateLimiter");
const securityMiddleware = require("./middlewares/security");

const app = express();
const PORT = process.env.PORT || 3002;

// Database connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware setup
app.use(apiLimiter);
app.use(securityMiddleware);
app.use(requestLogger);
app.use(cors());
app.use(express.json());
app.use("/", indexRouter);
app.use(errorLogger);
// Celebrate errors
app.use(errors());
app.use(errorHandler);

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
