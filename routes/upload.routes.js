const express = require('express');
const { Upload } = require('../controllers/uploadController')
const { filterTypeVideo } = require('../middlewares/filter.middleware')
const multer = require('multer')
const _upload = multer({ 
    dest: "multers/",
    fileFilter: filterTypeVideo,
    limits: { fileSize: 10000000}
})

const router = express.Router();

router.post('/files', _upload.single("video"), Upload);

module.exports = router;