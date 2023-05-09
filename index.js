const express = require("express")
const mongoose = require("mongoose")
const userRoute  = require("./routes/user")
const authRoute  = require("./routes/authRoute")

const app = express()

// mongoose.connect("mongodb://localhost:27017/ecommerce")

app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)

app.listen(process.env.PORT || 3000,  ()=>{
    console.log("Background server is running")
})

