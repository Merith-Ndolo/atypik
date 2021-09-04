'use strict';
const multer = require("multer");

const MINE_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, "./uploads/prise/")
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MINE_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

const uploadFiles =  multer({ storage : storage });

module.exports = {uploadFiles}