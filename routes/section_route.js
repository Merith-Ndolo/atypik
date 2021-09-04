const router = require('express').Router();
const sectionController = require('../controllers/section_controller');
const uploadController = require('../controllers/img_section_controller');
const multer = require("multer");
const upload = multer();

router.get('/', sectionController.readSection);
router.post('/', upload.single('file'), sectionController.createSection);
router.delete('/:id', sectionController.deleteSection);
router.put('/:id',  sectionController.updateSection);
router.post("/upload", upload.single("file"), uploadController.uploadSection);

module.exports = router;