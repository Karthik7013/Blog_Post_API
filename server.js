import app from "./app/app.js";
// import { configDotenv } from "dotenv";
import db from "./db/db.js";
// configDotenv();
const PORT = process.env.PORT || 8000;

db()
  .then(() => {
    console.log("db connected success");
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(err)
    console.log("failed")
  });
