import express from "express";
import { requireAdmin } from "../middleware/auth.js";
import {getAllMail, sendMail, getMail, readMail} from '../controllers/email.controller.js'

const router = express.Router();

router.route("/").get(requireAdmin, getAllMail).post(sendMail);
router.route("/:id").get(requireAdmin, getMail).put(requireAdmin, readMail);

export default router;
