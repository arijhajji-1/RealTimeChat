const express = require("express");
const multer = require("multer");
const router = express.Router();
const { addPlat } = require("../Controller/PlatController");
const validator = require("../midill/validator")


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    }
    ,

    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });
router.post("/add",upload.single("plat_image"),validator, addPlat);



module.exports = router;


