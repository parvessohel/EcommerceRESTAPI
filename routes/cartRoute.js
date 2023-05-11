const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./veryfyToken")
const User = require("../models/userModel")
const Cart = require("../models/cartModel")

const router = require("express").Router()


// CREATE

router.post("/", verifyToken, async(req, res)=>{
    const newCart = new Cart(req.body)

    try {
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    } catch (error) {
        res.status(500).json(error)
    }
})


// UPDATE

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    
    try {
        const updatedCart = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedCart)
    } catch (error) {
        res.status(500).json(error)
    }

})

// DELETE

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been removed from your cart")

    } catch (error) {
        res.status(500).json(error)
    }
})


// GET USER CART




router.get("/find/userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Product.findOne({userId: req.params. userId})
        
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET ALL 

router.get("/", verifyTokenAndAdmin, async (req, res)=> {
   try {
    const carts = await Cart.find()
    res.status(200).json(carts)
   } catch (error) {
    res.status(500).json(error)
   }
}) 

module.exports = router