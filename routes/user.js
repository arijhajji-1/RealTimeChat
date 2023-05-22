
const express = require("express");

const router = express.Router();
const {
    add,
  
    modify,
    remove,
 
    getOne,
    getByEmail,
    getByCin,
    getById,
    getByName

} = require("../Controller/UserController");
const multer = require("multer");
const  validate  = require("../midill/Validate");
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
router.post("/add", upload.single("image"),validate,add);
router.get("/get", getOne);
router.put("/modify/:id", modify);
router.delete("/remove/:id", remove);
router.get("/getbyid/:id", getById);
router.get("/getbyname/:name", getByName);
router.get("/getbyemail/:email", getByEmail);
router.get("/getbycin/:cin", getByCin);


module.exports = router;



