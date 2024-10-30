const path = require('path');
const Exception = require('../utils/models/Error');
const HttpStatus = require('../utils/models/Enums').HttpStatus;


const filterTypeVideo = (req, file, cb) => {
    const fileTypes = /.mp4|.avi|.mkv/
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    console.log("filtering");
    if (extname){
        return cb(null, true);
    }else {
        cb(new Exception(HttpStatus.BAD_REQUEST, "Error: Video Only!"));
    }
}

module.exports = {
    filterTypeVideo
}