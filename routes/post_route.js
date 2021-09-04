const router = require("express").Router();
const postController = require("../controllers/posts_controller");
const multer = require("multer");
const upload = multer();
//const multer_prise =  require("../middleware/config_prise");

router.get("/", postController.readPost);
router.post("/", upload.single("file"), postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);
router.patch("/comment-post/:id", postController.commentPost);
router.patch("/reserve-habitat/:id", postController.makeReservation);

router.patch("/add-pic/:id", upload.single("file"), postController.addPicture);
router.patch(
  "/prise-post/:id",
  upload.single("file"),
  postController.prisePost
);
router.patch("/edit-comment-post/:id", postController.editCommentPost);
router.patch("/edit-reservation/:id", postController.editReservation);
router.patch("/delete-comment-post/:id", postController.deleteCommentPost);
router.patch("/delete-reserve/:id", postController.deleteReservation);

router.post("/send-mail", postController.sendMailTo);
router.post("/send-justificatif", postController.sendJustificatif);

module.exports = router;
