import express from "express"
import { getOrderDetail } from "../controllers/orderdetailController"

const app = express()
app.use(express.json())

app.get(`/`, getOrderDetail)


export default app