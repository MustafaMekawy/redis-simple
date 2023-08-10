import express from 'express'
import personController from '../controller/person.contrroler'
const router =express.Router()

router.post("/", personController.create)
router.get("/", personController.getAll);
export default router;



