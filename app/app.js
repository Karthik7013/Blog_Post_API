import express from "express"
import userRouter from "../routes/userRoutes.js";
import adminRouter from "../routes/adminRoutes.js";
import cors from "cors";
import logger from "../middlewares/logger.js";
const app = express()
app.use(express.json())
app.use(cors())
app.use(logger)
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "frame-ancestors 'none'" // or "frame-ancestors 'self'"
  );
  next();
});
app.use('/api/v1/user',userRouter)
app.use('/api/v1/admin',adminRouter)


export default app;
