const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });
const app = require("./app");
const connectDB = require("./config/db");

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION!  Shutting down...");
  console.error(err);
  process.exit(1);
});
