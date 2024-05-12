import express from "express"
import { createOrderList, dropOrderList, getOrderList, getOrderListById, updateOrderList } from "../controllers/orderlistController"
import { verifyToken } from "../middlewares/authorization"
import { verifyAddOrderList, verifyEditOrderList } from "../middlewares/verifyOrderList"

const app = express()
app.use(express.json())

app.get(`/`, getOrderList)
app.get(`/:id`, getOrderListById)
app.post(`/`, [verifyToken, verifyAddOrderList], createOrderList)
app.put(`/:id`, [verifyToken, verifyEditOrderList], updateOrderList)
app.delete(`/:id`, [verifyToken], dropOrderList)

export default app