import express from "express"
import { verifyToken } from "../middlewares/authorization"
import { authentication, createAdmin, dropAdmin, getAdmin, updateAdmin } from "../controllers/adminController"
import { verifyAddAdmin, verifyAuthentication, verifyEditAdmin } from "../middlewares/verifyAdmin"





const app = express()

app.use(express.json())

app.get(`/`,[verifyToken], getAdmin)
app.post(`/`, [verifyToken ,verifyAddAdmin], createAdmin)
app.put(`/:id`,[verifyToken, verifyEditAdmin], updateAdmin)
app.delete(`/:id`, [verifyToken,], dropAdmin)

app.post(`/auth`,[verifyAuthentication], authentication)
export default app