const express = require('express')
const router = express.Router()
const path = require('path');
const multer = require('multer')

const AdminController = require('../controllers/admin')

router.route('/addTransportation').post(AdminController.addTransportation)

router.route('/blockUser').patch(AdminController.blockUser)

router.route('/deleteTransportation').delete(AdminController.deleteTransportation)

router.route('/deleteUser').delete(AdminController.deleteUser)

router.route('/getNumofUser').get(AdminController.getNumofUser)

router.route('/getNumofTransportation').get(AdminController.getNumOfTransportation)

router.route('/getAllTransportations').get(AdminController.getAllTransportations)

router.route('/getAllUsers').get(AdminController.getAllUsers)

router.route('/unblockUser').patch(AdminController.unblockUser)

var storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, callback) {
        callback(null, file.originalname.slice(0, file.originalname.length-4)  + Date.now() + file.originalname.slice(file.originalname.length-4));
    }
});

var upload = multer({ storage: storage }).single('upfile');

router.route('/uploadfile').post( async (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            console.log(err)
        } else {
            var FileName = req.file.filename;
            console.log("filename " + FileName)
            return res.status(200).json({ url: "uploads/" +  FileName})
        }
    })
});

// router.post('/uploadfile', upload.single('upfile'), async function (req, res) {
//     // // folder upload
//     // const imagePath = path.join(__dirname, '/uploads');
//     // // call class Resize
//     // const fileUpload = new Resize(imagePath);
//     // if (!req.file) {
//     //     res.status(401).json({error: 'Please provide an image'});
//     // }
//     const filename = req.body.name;
//     console.log("url: uploads/"+ filename)
    
//     return res.status(200).json({ url: "uploads/" + filename });
// });

module.exports = router