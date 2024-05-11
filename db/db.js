import mongoose from 'mongoose'
const db = ()=>{
    mongoose
    .connect(
      "mongodb+srv://admin1234:admin1234@cluster0.gbzago5.mongodb.net/bookstore?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("data connected success");
      app.listen(8000, () => {
        console.log("server running on port 8000");
      });
    })
    .catch(() => {
      console.log("failed");
    });
}
export default db;
