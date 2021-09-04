const router = require("express").Router();
const authController = require("../controllers/authentification_controller");
const userController = require("../controllers/users_controller");
const uploadController = require("../controllers/img_pro_up_controller");
const multer = require("multer");
const upload = multer();

router.post("/loginpro", authController.signInPro);
router.post("/loginadmin", authController.signInAdmin);
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

router.post("/payment", userController.paymentReservation);
router.get("/activate/:token", authController.activateHandle);

router.post("/forgot", authController.forgotPassword);
router.post("/reset/:id", authController.resetPassword);
router.get("/forgot/:token", authController.gotoReset);

module.exports = router;
