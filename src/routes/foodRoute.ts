import express from "express"
import { createFood, dropFood, getAllFoods, updateFood } from "../controllers/foodController"
import uploadFile from "../middlewares/uploadImageOfFood"
import { verifyToken } from "../middlewares/authorization"
import { verifyAddFood, verifyEditFood } from "../middlewares/verifyFood"

const app = express()

app.use(express.json())

app.get(`/`, getAllFoods)
app.post(`/`, [verifyToken, uploadFile.single("image"), verifyAddFood], createFood)
app.put(`/:id`, [verifyToken, uploadFile.single("image"), verifyEditFood], updateFood)
app.delete(`/:id`, [verifyToken], dropFood)

export default app