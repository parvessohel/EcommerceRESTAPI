const router = require("express").Router()
const User = require("../models/userModel")


const CryptoJs = require("crypto-js")


//REGISTER

router.post("/register", async (req, res) => {


    const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,

        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()

    })
    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json(err)
    }

})


router.post("/login", async (req, res) => {

    try {
        const user = User.findOne({ userName: req.body.userName })
        !user && res.status(401).json("Wrong credentials!")


        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)
        const Originalpassword = hashedPassword.toString(CryptoJs.enc.Utf8)

        Originalpassword !== req.body.password && res.status(401).json("Wrong credentials!")

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        )

        const { password, ...others } = user._doc
        res.status(200).json(...others, accessToken)
    } catch (err) {
        res.status(500).json(err)
    }

})



module.exports = router