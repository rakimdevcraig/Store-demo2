//We make an API folder because these routes will just serve up json
//if I have other routes that serve up views I can put those into another folder

const express = require('express')
const router = express.Router()

/////testing...........
const path = require("path")
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'img/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'img/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        //wont upload images bigger than 5 mb
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter

})
//Item model
//go outside of api folder, outside of routes folder into models folder 
//then Item file
const Item = require('../../models/Item')


//Cart Model
const Cart = require('../../models/Cart')




//test to use alternative routes................. 
var publicPath = path.join(__dirname, '../../public');

router.get('/about', function (req, res) {
    res.sendfile(publicPath + '/about.html');
});

//Route  GET api/items
//description: Get All Items from db in json

router.get('/api/items', (req, res) => {
    Item.find()
        .then(items => res.json(items))
})

//Route  GET api/items
//description: Get All Cart Items from db in json

router.get('/api/cart', (req, res) => {
    Cart.find()
        .then(items => res.json(items))
})

// //Route  GET api/item
// //description: Get ONE Item from db in json
router.get('/api/item/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => res.json(item))
})

router.get('/', (req, res) => {
    res.sendfile(publicPath + '/index.html');
})

//get an item by id
router.get('/item/:id', (req, res) => {
    const id = req.params.id;

    Item.findById(id, function (err, docs) {
        if (err) {
            // console.log(err)
            return res.status(400).json({ err })
        } else {
            // console.log("Result : ", docs)
            return res.status(200).json(docs)

        }
    })
})


//Add an item to the items collection
router.post('/api/items', upload.single('file'), (req, res) => {
    console.log(req.file)
    const newItem = new Item({
        name: req.body.name,
        quantity: req.body.quantity,
        file: req.file.filename
    })

    newItem.save()
        // .then(item => res.json(item))
        .then(res.sendFile(publicPath + '/index.html'))
})

//Add item to cart
router.post('/api/cart', (req, res) => {
    //gonna check if a cart exists because we only want to have 1 cart
    console.log('Req.id', req._id)
    Cart.findOne({ user: req._id })
        .exec((error, cart) => {
            if (error) return res.status(400).json({ error })
            if (cart) {
                //if cart already exists then update
                Cart.findOneAndUpdate({ user: req._id }, {
                    "$push": {
                        "cartItems": [req.body.cartItems]
                    }
                })
                    .exec((error, _cart) => {
                        if (error) return res.status(400).json({ error })
                        if (_cart) {
                            return res.status(201).json({ cart: _cart })
                        }
                    })
            } else {
                const cart = new Cart({
                    cartItems: [req.body.cartItems]
                })

                cart.save((error, cart) => {
                    if (error) return res.status(400).json({ error })
                    if (cart) {
                        return res.status(201).json({ cart })
                    }
                })
            }
        })
})


module.exports = router;

//To test creating a cart in postman make a post to http://localhost:5000/api/cart
// {
//     "cartItems": [
//         {
//         "product": "5f467cb71bf2ca0c8a4b976b",
//         "name": "sd1",
//         "quantity":"sssd"
//         }
//     ]
// }

//to test updating a cart make a post to same address
// {
//     "cartItems":{
//         "product": "5f467cb71bf2ca0c8a4b976b",
//         "name": "sd1",
//         "quantity":"sssd"
//         }

// }