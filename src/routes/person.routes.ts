import express from 'express'
import personController from '../controller/person.contrroler'
const router =express.Router()

router.post("/", personController.create)
router.get("/", personController.getAll);
router.get("/:id", personController.getSingle);
router.delete("/:id", personController.deleteSingle);
router.patch("/:id", personController.update);
export default router;



