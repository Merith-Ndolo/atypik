const router = require('express').Router();
const paramController = require('../controllers/param_controller');
const uploadController = require('../controllers/slide_controller');
const multer = require("multer");
const upload = multer();

router.get('/', paramController.readParam);
router.post('/', upload.single('file'), paramController.createSlide);
router.delete('/:id', paramController.deleteParam);
router.put('/:id',  paramController.updateParam);
router.post("/upload", upload.single("file"), uploadController.uploadSlide);

module.exports = router;