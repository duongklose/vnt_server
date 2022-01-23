const express = require('express')
const router = express.Router()
const path = require('path');
const upload = require('../middlewares/uploadMiddleware');
const Resize = require('../middlewares/Resize');

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

router.post('/uploadfile', upload.single('upfile'), async function (req, res) {
    // folder upload
    const imagePath = path.join(__dirname, '/uploads');
    // call class Resize
    const fileUpload = new Resize(imagePath);
    if (!req.file) {
        res.status(401).json({error: 'Please provide an image'});
    }
    const filename = await fileUpload.save(req.file.buffer);
    console.log("url: uploads/"+ filename)
    
    return res.status(200).json({ url: "uploads/" + filename });
});

module.exports = router