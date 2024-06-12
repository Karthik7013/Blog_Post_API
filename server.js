import app from "./app/app.js";
import { configDotenv } from "dotenv";
configDotenv();
const PORT = process.env.PORT || 8000;
import db from "./db/db.js";
db()
  .then(() => {
    console.log("db connected success");
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`)
    })
  })
  .catch(() => {
    console.log("failed")
  });
