import express from "express"
import userRouter from "../routes/userRoutes.js";
import adminRouter from "../routes/adminRoutes.js";
import commonRouter from "../routes/commonRoutes.js";
import cors from "cors";
import logger from "../middlewares/logger.js";
const app = express()
app.use(express.json())
app.use(cors())
app.use(logger)

app.use('/api/v1/user',userRouter)
app.use('/api/v1/admin',adminRouter)
app.use('/api/v1',commonRouter)

export default app;