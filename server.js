import app from "./app/app.js";
import mongoose from 'mongoose';
const PORT = process.env.PORT || 8000


mongoose
.connect(
  "mongodb+srv://admin1234:admin1234@cluster0.gbzago5.mongodb.net/bookstore?retryWrites=true&w=majority&appName=Cluster0"
).then(() => {
  console.log("db connected success");
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
}).catch(() => {
  console.log("failed");
});