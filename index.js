const express = require("express")
const mongoose = require("mongoose")
const userRoute  = require("./routes/user")
const authRoute  = require("./routes/authRoute")
const productRoute  = require("./routes/productRoute")
const cartRoute  = require("./routes/cartRoute")
const oorderRoute  = require("./routes/orderRoute")


const app = express()

// mongoose.connect("mongodb://localhost:27017/ecommerce")

app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/productS", productRoute)
app.use("/api/carts", cartRoute)
app.use("/api/orders", oorderRoute)

app.listen(process.env.PORT || 3000,  ()=>{
    console.log("Background server is running")
})

