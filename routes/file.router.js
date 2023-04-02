var express = require('express');
const files = require("../controllers/file.controller.js");
var router = express.Router();
const multer  = require('multer')
const DIR = './public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        if (!!file) {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
    }
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "application/pdf" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
})

router.post("/users/:id", upload.single('file'), files.uploadUserFile);
router.get('/users/:id', files.showUserFiles)
router.get('/:id', files.showFileById)
router.post('/:id', files.downloadFile)

module.exports = router;