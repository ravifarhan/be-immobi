const express = require("express");
const router = express.Router();
const positionController = require("../controllers/position");

router.post("/position", positionController.createPosition);
router.get("/position", positionController.getPositions);
router.get("/position/:id", positionController.getPositionById);
router.get("/position/by-department/:departmentId", positionController.getPositionByDepartment);
router.patch("/position/:id", positionController.updatePosition);
router.delete("/position/:id", positionController.deletePosition);

module.exports = router;
