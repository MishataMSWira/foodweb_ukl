import express from "express"
import AdminRoute from "./routes/adminRoute";
import FoodRoute from "./routes/foodRoute"
import OrderListRoute from "./routes/orderlistRoute"
import OrderDetailRoute from "./routes/orderdetailRoute"
import path from "path";

const app = express();

const PORT = 8888;



app.use(`/admin`, AdminRoute )
app.use(`/food`, FoodRoute)
app.use(`/order`, OrderListRoute )
app.use(`/history`, OrderDetailRoute )
app.use(`/public`, express.static(path.join(__dirname, `public`)))




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

