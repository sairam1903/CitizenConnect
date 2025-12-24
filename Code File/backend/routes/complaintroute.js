const express=require('express')
const {createcomplaint,getcomplaints,getcomplaint,resolveComplaint}=require("../controller/complaintcontroller")
const router=express.Router();

router.post("/",createcomplaint);
router.get("/",getcomplaints);
router.get("/:id",getcomplaint);
router.post("/:id/resolve", resolveComplaint);


module.exports=router;



