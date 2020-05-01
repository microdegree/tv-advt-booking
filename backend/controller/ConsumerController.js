var express = require('express');
var router = express.Router();

// ******** Add New Booking for consumer ******** 

router.post("/addNewBooking", (request, response) => {

    console.log('addNewBooking ', request.body);
    database.collection("advtBookingTable").insertOne(request.body, (error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

//Upload Project Logo by Admin
var multer = require('multer')
let uploadedBannerName
var storage = multer.diskStorage(
    {
        destination: './backend/uploads/banner/',
        filename: function (req, file, cb) {
            uploadedFileName = Date.now() + '-' + file.originalname
            cb(null, uploadedFileName);
        }
    }
);
var upload = multer({ storage: storage });


router.post('/uploadBanner', upload.single('bannerAdvtFile'), function (request, response) {
    console.log('upload Video controller')

    try {
        console.log('uploadedBannerName ', uploadedBannerName)
        response.send({ 'uploadedBannerName': uploadedBannerName });
    } catch (err) {
        response.send(400);
    }

})


// ******** Fetch User Info using email ******** 
router.get("/getAllProjects", (request, response) => {

    console.log('In getAllProjects')
    database.collection("channelAdvtPricingTable").find({}).toArray((error, result) => {
        if (error) {
            console.log(error)
            return response.status(500).send(error);
        }

        console.log(result)
        response.send(result);
    });
});



// ******** Fetch User Info using email ******** 
router.get("/secret", async (request, response) => {

    console.log('In Payment Gateway flow')

    // Set your secret key. Remember to switch to your live secret key in production!
    const stripe = require('stripe')('sk_test_aN2jTowZHzxgg6EHCSLjVJpY00YsxyoflH');

    const paymentIntent = await stripe.paymentIntents.create({
        amount: 20000,
        currency: 'inr',
        metadata: { integration_check: 'accept_a_payment' },
    });

    console.log('paymentIntent.client_secret ', paymentIntent.client_secret)
    response.json({ client_secret: paymentIntent.client_secret });

});


module.exports = router;

//https://www.thepolyglotdeveloper.com/2018/09/developing-restful-api-nodejs-mongodb-atlas/